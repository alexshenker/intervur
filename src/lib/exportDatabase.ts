import { eq, inArray } from "drizzle-orm";
import type { ValidTag } from "../db/constants";
import { db } from "../db/database";
import { answers, questions, questionTags, tags } from "../db/schema";
import type { DatabaseExport } from "./types";

/**
 * Exports the entire database as a JSON object
 * Includes all questions with their answers and tags
 */
export async function exportDatabase(): Promise<DatabaseExport> {
    // Get all questions
    const allQuestions = await db.select().from(questions);

    const result: DatabaseExport = {
        questions: [],
    };

    // For each question, get its answers and tags
    for (const question of allQuestions) {
        // Get answers for this question
        const questionAnswers = await db
            .select()
            .from(answers)
            .where(eq(answers.questionId, question.id));

        // Get tags for this question
        const questionTagsData = await db
            .select()
            .from(questionTags)
            .where(eq(questionTags.questionId, question.id));

        // Get tag details
        const tagIds = questionTagsData.map((qt) => qt.tagId);
        const questionTagObjects =
            tagIds.length > 0
                ? await db.select().from(tags).where(inArray(tags.id, tagIds))
                : [];

        result.questions.push({
            text: question.text,
            level: question.level,
            category: question.category,
            tags: questionTagObjects.map((t) => t.name) as ValidTag[],
            answers: questionAnswers.map((a) => ({ text: a.text })),
        });
    }

    return result;
}
