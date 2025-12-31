import { generateEmbedding, loadModel } from "@/lib/embeddings";
import type { DbExportQuestion } from "@/lib/types";
import Fuse from "fuse.js";

/**
 * Number of search results to return.
 * Change this to show more/fewer results.
 */
export const MAX_RESULTS = 1;

/**
 * Calculates cosine similarity between two normalized vectors.
 * Since vectors are normalized, this is just the dot product.
 */
function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
    }
    return dot;
}

/**
 * Pre-computed embedding for a question.
 * Stored alongside the question to avoid recomputing on every search.
 */
interface QuestionWithEmbedding {
    question: DbExportQuestion;
    embedding: number[];
}

/**
 * Search result with match score for display.
 */
export interface SearchResult {
    question: DbExportQuestion;
    /** Combined score from 0-1, where 1 = perfect match */
    score: number;
    /** Human-readable percentage (e.g., "87%") */
    matchPercent: string;
}

/**
 * Manages hybrid semantic + fuzzy search over questions.
 *
 * Usage:
 * 1. Call initialize() once on app startup with all questions
 * 2. Call search() for each user query
 */
class SearchService {
    /** Questions with pre-computed embeddings */
    private questionsWithEmbeddings: QuestionWithEmbedding[] = [];

    /** Fuse.js instance for fuzzy text matching */
    private fuse: Fuse<DbExportQuestion> | null = null;

    /** Whether the service is ready to search */
    private initialized = false;

    /**
     * Initializes the search service with all questions.
     * Generates embeddings for each question (slow on first run).
     *
     * @param questions - All questions to make searchable
     * @param onProgress - Optional callback for loading progress
     */
    async initialize(
        questions: DbExportQuestion[],
        onProgress?: (current: number, total: number) => void
    ): Promise<void> {
        // Load the model in the main process first
        await loadModel();

        // Generate embeddings for all questions
        this.questionsWithEmbeddings = [];
        for (let i = 0; i < questions.length; i++) {
            const embedding = await generateEmbedding(questions[i].text);
            this.questionsWithEmbeddings.push({
                question: questions[i],
                embedding,
            });
            onProgress?.(i + 1, questions.length);
        }

        // Initialize Fuse.js for fuzzy matching
        this.fuse = new Fuse(questions, {
            keys: ["text"],
            includeScore: true,
            threshold: 0.4, // 0 = exact match, 1 = match anything
        });

        this.initialized = true;
    }

    /**
     * Searches for questions matching the query using hybrid approach.
     * Combines semantic similarity (meaning) with fuzzy matching (typos).
     *
     * @param query - User's search text
     * @returns Top matching questions (count determined by MAX_RESULTS)
     */
    async search(query: string): Promise<SearchResult[]> {
        if (!this.initialized || !this.fuse) {
            throw new Error(
                "SearchService not initialized. Call initialize() first."
            );
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(query);

        // Semantic search: compare query to all questions
        const semanticResults = this.questionsWithEmbeddings.map((item) => ({
            question: item.question,
            // Cosine similarity is -1 to 1, normalize to 0 to 1
            score: (cosineSimilarity(queryEmbedding, item.embedding) + 1) / 2,
        }));

        // Fuzzy search: find text matches
        const fuzzyResults = this.fuse.search(query);

        // Combine scores: 70% semantic, 30% fuzzy
        const combined = semanticResults.map((semantic) => {
            const fuzzyMatch = fuzzyResults.find(
                (f) => f.item.text === semantic.question.text
            );
            // Fuse score is 0 (perfect) to 1 (worst), invert it
            const fuzzyScore = fuzzyMatch ? 1 - (fuzzyMatch.score ?? 1) : 0;

            const combinedScore = semantic.score * 0.7 + fuzzyScore * 0.3;

            return {
                question: semantic.question,
                score: combinedScore,
                matchPercent: `${Math.round(combinedScore * 100)}%`,
            };
        });

        // Sort by score descending, return top results
        combined.sort((a, b) => b.score - a.score);

        return combined.slice(0, MAX_RESULTS);
    }
}

/** Singleton instance */
export const searchService = new SearchService();
