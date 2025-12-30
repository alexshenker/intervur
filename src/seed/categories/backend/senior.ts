import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum.senior
>[] = [
    {
        text: "What are race conditions and how do you handle them?",
        level: Level.enum.senior,
        category: Category.enum.backend,
        tags: [ValidTag.enum["race-conditions"], ValidTag.enum.concurrency],
        answers: [],
    },
    {
        text: "When would you choose one microservices communication protocol over another?",
        level: Level.enum.senior,
        category: Category.enum.backend,
        tags: [ValidTag.enum.microservices],
        answers: [],
    },
];
