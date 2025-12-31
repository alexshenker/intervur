import { ipcRenderer } from "electron";

/**
 * Loads the embedding model in the main process.
 * Call this once on app startup.
 */
export async function loadModel(): Promise<void> {
    await ipcRenderer.invoke("embeddings:load");
}

/**
 * Converts text into an embedding vector via IPC to main process.
 * Model runs in main process (Node.js) where onnxruntime-node works.
 *
 * @param text - The text to embed (question or search query)
 * @returns Promise resolving to embedding vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    return await ipcRenderer.invoke("embeddings:generate", text);
}
