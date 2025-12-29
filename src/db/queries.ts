import { and, eq } from "drizzle-orm";
import type { Category, Level, ValidTag } from "./constants";
import { db } from "./database";
import { answers, questions, questionTags, tags } from "./schema";

/**
 * Helper function to link a tag to a question
 * Creates the tag if it doesn't exist
 * Works with both db and transaction contexts
 */
async function linkTagToQuestion(
    tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
    questionId: number,
    tagName: ValidTag
) {
    // Check if tag already exists
    let [existingTag] = await tx
        .select()
        .from(tags)
        .where(eq(tags.name, tagName))
        .limit(1);

    // If tag doesn't exist, create it
    if (!existingTag) {
        [existingTag] = await tx
            .insert(tags)
            .values({ name: tagName })
            .returning();
    }

    // Link the tag to the question (if not already linked)
    await tx
        .insert(questionTags)
        .values({
            questionId,
            tagId: existingTag.id,
        })
        .onConflictDoNothing();
}

interface CreateQuestionInput {
    text: string;
    level: Level;
    category: Category;
    tags?: ValidTag[];
    answers?: string[];
}

/**
 * Creates a question with optional answers and tags
 * All operations happen in a transaction - if anything fails, nothing is committed
 */
export async function createQuestion(input: CreateQuestionInput) {
    return db.transaction(async (tx) => {
        // 1. Insert the question
        const [question] = await tx
            .insert(questions)
            .values({
                text: input.text,
                level: input.level,
                category: input.category,
            })
            .returning();

        // 2. Insert answers if provided
        if (input.answers !== undefined && input.answers.length > 0) {
            await tx.insert(answers).values(
                input.answers.map((answerText) => ({
                    questionId: question.id,
                    text: answerText,
                }))
            );
        }

        // 3. Handle tags if provided
        if (input.tags !== undefined && input.tags.length > 0) {
            for (const tagName of input.tags) {
                await linkTagToQuestion(tx, question.id, tagName);
            }
        }

        return question;
    });
}

/**
 * Updates a question's text
 */
export async function updateQuestionText(questionId: number, text: string) {
    await db
        .update(questions)
        .set({ text, updatedAt: new Date().toISOString() })
        .where(eq(questions.id, questionId));
}

/**
 * Updates a question's category
 */
export async function updateQuestionCategory(
    questionId: number,
    category: Category
) {
    await db
        .update(questions)
        .set({ category, updatedAt: new Date().toISOString() })
        .where(eq(questions.id, questionId));
}

/**
 * Updates a question's level
 */
export async function updateQuestionLevel(questionId: number, level: Level) {
    await db
        .update(questions)
        .set({ level, updatedAt: new Date().toISOString() })
        .where(eq(questions.id, questionId));
}

/**
 * Adds a tag to a question
 * Creates the tag if it doesn't exist
 */
export async function addTagToQuestion(questionId: number, tagName: ValidTag) {
    return db.transaction(async (tx) => {
        await linkTagToQuestion(tx, questionId, tagName);
    });
}

/**
 * Adds an answer to an existing question
 */
export async function addAnswer(questionId: number, answerText: string) {
    return db
        .insert(answers)
        .values({
            questionId,
            text: answerText,
        })
        .returning();
}

/**
 * Updates an answer's text
 */
export async function updateAnswerText(answerId: number, text: string) {
    await db
        .update(answers)
        .set({ text, updatedAt: new Date().toISOString() })
        .where(eq(answers.id, answerId));
}

/**
 * Deletes an answer
 */
export async function deleteAnswer(answerId: number) {
    await db.delete(answers).where(eq(answers.id, answerId));
}

/**
 * Deletes a question
 * Also deletes all associated answers and tag relationships (cascade)
 */
export async function deleteQuestion(questionId: number) {
    await db.delete(questions).where(eq(questions.id, questionId));
}

/**
 * Removes a tag from a question
 */
export async function removeTagFromQuestion(
    questionId: number,
    tagName: ValidTag
) {
    return db.transaction(async (tx) => {
        // Get the tag ID
        const [tag] = await tx
            .select()
            .from(tags)
            .where(eq(tags.name, tagName))
            .limit(1);

        if (!tag) {
            // Tag doesn't exist, nothing to remove
            return;
        }

        // Remove the link between question and tag
        await tx
            .delete(questionTags)
            .where(
                and(
                    eq(questionTags.questionId, questionId),
                    eq(questionTags.tagId, tag.id)
                )
            );
    });
}
