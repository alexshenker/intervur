import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.senior
>[] = [
    {
        text: "What are some overused hooks? Why?" as const,
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "What are some misunderstood hooks? Why?" as const,
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "How would you optimize a slow loading page?" as const,
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.performance, ValidTag.enum.debugging],
        answers: [],
    },
    {
        text: "When would you choose Redux vs React Context vs Zustand vs React/Tanstack Query for state management?" as const,
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [
            ValidTag.enum.redux,
            ValidTag.enum.zustand,
            ValidTag.enum["context-api"],
            ValidTag.enum["tanstack-query"],
        ],
        answers: [],
    },
];
