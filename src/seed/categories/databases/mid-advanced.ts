import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum["mid-advanced"]
>[] = [
    {
        text: "What database would you use and why? How do you decide?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum["database-design"]],
        answers: [],
    },
    {
        text: "What are some indexing strategies you would use in your SQL database and why?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: [],
    },
];
