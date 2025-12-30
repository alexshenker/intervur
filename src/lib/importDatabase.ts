import { db } from "../db/database";
import { linkTagToQuestion } from "../db/queries/tags";
import { answers, questions } from "../db/schema";
import { databaseExportSchema } from "./types";

/**
 * Imports a database from a JSON string and adds it to the existing database
 * Validates the JSON structure before importing
 * Skips any duplicate questions (based on unique text constraint)
 * Adds new questions, answers, and tag relationships
 *
 * @param jsonString - JSON string containing database export
 * @returns Object with counts and any validation errors
 * @throws Error if JSON is invalid or structure doesn't match schema
 */
export async function importDatabase(jsonString: string): Promise<{
    success: boolean;
    questionsAdded: number;
    questionsSkipped: number;
    error?: string;
    validationErrors?: string[];
}> {
    // Step 1: Parse JSON
    let parsed: unknown;
    try {
        parsed = JSON.parse(jsonString);
    } catch (error) {
        return {
            success: false,
            questionsAdded: 0,
            questionsSkipped: 0,
            error: "Invalid JSON format",
            validationErrors: [
                error instanceof Error ? error.message : "Failed to parse JSON",
            ],
        };
    }

    // Step 2: Validate structure with Zod
    const validation = databaseExportSchema.safeParse(parsed);
    if (!validation.success) {
        const errors = validation.error.issues.map((err) => {
            const path = err.path.join(".");
            return `${path}: ${err.message}`;
        });

        return {
            success: false,
            questionsAdded: 0,
            questionsSkipped: 0,
            error: "Invalid database structure",
            validationErrors: errors,
        };
    }

    // Step 3: Import validated data
    const data = validation.data;
    let questionsAdded = 0;
    let questionsSkipped = 0;

    for (const questionData of data.questions) {
        try {
            await db.transaction(async (tx) => {
                // Try to insert the question
                const [insertedQuestion] = await tx
                    .insert(questions)
                    .values({
                        text: questionData.text,
                        level: questionData.level,
                        category: questionData.category,
                    })
                    .returning()
                    .catch((): [null] => [null]); // Catch unique constraint violation

                // If question already exists, skip it
                if (!insertedQuestion) {
                    questionsSkipped++;
                    return;
                }

                questionsAdded++;

                // Insert answers for this question
                if (questionData.answers.length > 0) {
                    await tx.insert(answers).values(
                        questionData.answers.map((answer) => ({
                            questionId: insertedQuestion.id,
                            text: answer.text,
                        }))
                    );
                }

                // Link tags to this question
                if (questionData.tags.length > 0) {
                    for (const tagName of questionData.tags) {
                        await linkTagToQuestion(
                            tx,
                            insertedQuestion.id,
                            tagName
                        );
                    }
                }
            });
        } catch (error) {
            // If transaction fails, count as skipped
            questionsSkipped++;
        }
    }

    return {
        success: true,
        questionsAdded,
        questionsSkipped,
    };
}
