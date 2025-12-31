import { createHash } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { embeddingCache } from "../schema";

/** Current model version - change this to invalidate all cached embeddings */
export const MODEL_VERSION = "bge-large-en-v1.5";

/**
 * Generates a SHA-256 hash of the question text.
 * Used as the primary key for cached embeddings.
 *
 * @param text - Question text to hash
 * @returns Hex-encoded SHA-256 hash
 */
export function hashText(text: string): string {
    return createHash("sha256").update(text).digest("hex");
}

/**
 * Serializes an embedding vector to JSON string for storage.
 *
 * @param embedding - Array of floats representing the embedding
 * @returns JSON string
 */
export function serializeEmbedding(embedding: number[]): string {
    return JSON.stringify(embedding);
}

/**
 * Deserializes an embedding from JSON string.
 *
 * @param json - JSON string from database
 * @returns Array of floats
 */
export function deserializeEmbedding(json: string): number[] {
    return JSON.parse(json) as number[];
}

/**
 * Retrieves a cached embedding for the given text.
 * Returns null if not cached or if model version doesn't match.
 *
 * @param text - Question text to look up
 * @returns Cached embedding or null
 */
export function getCachedEmbedding(text: string): number[] | null {
    const textHash = hashText(text);

    const result = db
        .select()
        .from(embeddingCache)
        .where(eq(embeddingCache.textHash, textHash))
        .get();

    if (!result || result.modelVersion !== MODEL_VERSION) {
        return null;
    }

    return deserializeEmbedding(result.embedding);
}

/**
 * Saves an embedding to the cache.
 * Overwrites any existing entry for the same text.
 *
 * @param text - Question text (used to generate hash key)
 * @param embedding - Embedding vector to cache
 */
export function saveCachedEmbedding(text: string, embedding: number[]): void {
    const textHash = hashText(text);

    db.insert(embeddingCache)
        .values({
            textHash,
            embedding: serializeEmbedding(embedding),
            modelVersion: MODEL_VERSION,
        })
        .onConflictDoUpdate({
            target: embeddingCache.textHash,
            set: {
                embedding: serializeEmbedding(embedding),
                modelVersion: MODEL_VERSION,
            },
        })
        .run();
}

/**
 * Retrieves all cached embeddings for the current model version.
 * Returns a Map keyed by text hash for O(1) lookups.
 *
 * @returns Map of textHash -> embedding
 */
export function getAllCachedEmbeddings(): Map<string, number[]> {
    const results = db
        .select()
        .from(embeddingCache)
        .where(eq(embeddingCache.modelVersion, MODEL_VERSION))
        .all();

    const cache = new Map<string, number[]>();
    for (const row of results) {
        cache.set(row.textHash, deserializeEmbedding(row.embedding));
    }
    return cache;
}
