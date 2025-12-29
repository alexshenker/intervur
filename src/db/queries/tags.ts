import { and, eq, inArray } from "drizzle-orm";
import type { ValidTag } from "../constants";
import { validTags } from "../constants";
import { db } from "../database";
import { questionTags, tags } from "../schema";

/**
 * Syncs the tags table with the validTags constant
 * - Inserts any missing tags from validTags
 * - Deletes any tags not in validTags (cascade deletes tag relationships)
 */
export async function syncTags() {
    return db.transaction(async (tx) => {
        // Get all existing tags from database
        const existingTags = await tx.select().from(tags);
        const existingTagNames = new Set(existingTags.map((t) => t.name));
        const validTagNames = new Set(validTags);

        // Find tags that need to be inserted (in validTags but not in DB)
        const tagsToInsert = validTags.filter(
            (tagName) => !existingTagNames.has(tagName)
        );

        // Find tags that need to be deleted (in DB but not in validTags)
        const tagsToDelete = existingTags.filter(
            (tag) => !validTagNames.has(tag.name as ValidTag)
        );

        // Insert missing tags
        if (tagsToInsert.length > 0) {
            await tx
                .insert(tags)
                .values(tagsToInsert.map((name) => ({ name })));
        }

        // Delete removed tags (cascade deletes tag relationships)
        if (tagsToDelete.length > 0) {
            const idsToDelete = tagsToDelete.map((tag) => tag.id);
            await tx.delete(tags).where(inArray(tags.id, idsToDelete));
        }

        return {
            inserted: tagsToInsert.length,
            deleted: tagsToDelete.length,
        };
    });
}

/**
 * Helper function to link a tag to a question
 * Assumes tag already exists (guaranteed by syncTags on startup)
 * Works with both db and transaction contexts
 */
export async function linkTagToQuestion(
    tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
    questionId: number,
    tagName: ValidTag
) {
    // Get tag (guaranteed to exist after syncTags)
    const [tag] = await tx
        .select()
        .from(tags)
        .where(eq(tags.name, tagName))
        .limit(1);

    // Link the tag to the question (if not already linked)
    await tx
        .insert(questionTags)
        .values({
            questionId,
            tagId: tag.id,
        })
        .onConflictDoNothing();
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
