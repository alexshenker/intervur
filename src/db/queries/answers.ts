import { eq } from "drizzle-orm";
import { db } from "../database";
import { answers } from "../schema";

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
