import { env, pipeline, FeatureExtractionPipeline } from "@xenova/transformers";
import path from "path";
import { app } from "electron";

// Configure transformers.js to use local models only
env.allowRemoteModels = false;
env.localModelPath = path.join(app.getAppPath(), "models");

let extractor: FeatureExtractionPipeline | null = null;

/**
 * Loads the embedding model in the main process.
 */
export async function loadModel(): Promise<void> {
    if (!extractor) {
        console.log("[Embeddings] Loading model...");
        extractor = await pipeline(
            "feature-extraction",
            "bge-large-en-v1.5",
            { quantized: true }
        );
        console.log("[Embeddings] Model loaded.");
    }
}

/**
 * Generates embedding for text.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    if (!extractor) {
        throw new Error("Model not loaded. Call loadModel() first.");
    }
    const output = await extractor(text, { pooling: "mean", normalize: true });
    // Convert tensor to plain array for IPC serialization
    const data = output.data;
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
        result.push(data[i]);
    }
    return result;
}

/**
 * Cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
    }
    return dot;
}
