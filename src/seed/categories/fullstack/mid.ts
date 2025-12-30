import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum.mid
>[] = [
    {
        text: "What are some debugging tools you use?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.debugging],
        answers: [],
    },
];
