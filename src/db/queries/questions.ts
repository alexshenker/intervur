import { eq } from "drizzle-orm";
import type { Category, Level, ValidTag } from "../constants";
import { db } from "../database";
import { answers, questions } from "../schema";
import { linkTagToQuestion } from "./tags";

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
 * Deletes a question
 * Also deletes all associated answers and tag relationships (cascade)
 */
export async function deleteQuestion(questionId: number) {
    await db.delete(questions).where(eq(questions.id, questionId));
}
