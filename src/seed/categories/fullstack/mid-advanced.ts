import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum["mid-advanced"]
>[] = [
    {
        text: "When would you use server-side rendering vs client-side rendering?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.ssr, ValidTag.enum.csr, ValidTag.enum.nextjs],
        answers: [],
    },
];
