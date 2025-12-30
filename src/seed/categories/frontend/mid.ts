import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.mid
>[] = [
    {
        text: "What are some rules of hooks?",
        level: Level.enum.mid,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "What is prop drilling? Why is it an issue?",
        level: Level.enum.mid,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [],
    },
    {
        text: "What is the React Virtual DOM and why is it important?",
        level: Level.enum.mid,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum["virtual-dom"]],
        answers: [],
    },
    {
        text: "What are generics in TypeScript?",
        level: Level.enum.mid,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.typescript],
        answers: [],
    },
];
