import { Category, Level } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.behavioral,
    typeof Level.enum.senior
>[] = [
    {
        text: "How do you decide what tech stack to use?",
        level: Level.enum.senior,
        category: Category.enum.behavioral,
        tags: [],
        answers: [],
    },
    {
        text: "Tell me about the biggest project you've ever built. How did you go about it, step by step?",
        level: Level.enum.senior,
        category: Category.enum.behavioral,
        tags: [],
        answers: [],
    },
];
