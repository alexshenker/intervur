import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum.senior
>[] = [
    {
        text: "If you use Supabase, at what point would you switch to something else, what would it be, and why?",
        level: Level.enum.senior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase],
        answers: [],
    },
];
