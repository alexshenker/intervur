import { Category, Level } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.behavioral,
    typeof Level.enum.mid
>[] = [
    {
        text: "What's the most complicated feature or project you've ever worked on?",
        level: Level.enum.mid,
        category: Category.enum.behavioral,
        tags: [],
        answers: [],
    },
    {
        text: "What's your proudest accomplishment (of something you built)?",
        level: Level.enum.mid,
        category: Category.enum.behavioral,
        tags: [],
        answers: [],
    },
];
