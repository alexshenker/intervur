import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.junior
>[] = [
    {
        text: "What are React hooks?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "What is React?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [],
    },
    {
        text: "Why is React important?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [],
    },
    {
        text: "What is TypeScript?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.typescript],
        answers: [],
    },
];
