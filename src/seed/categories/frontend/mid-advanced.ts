import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum["mid-advanced"]
>[] = [
    {
        text: "What's the difference between useCallback and useMemo? When would you use each?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.frontend,
        tags: [
            ValidTag.enum.react,
            ValidTag.enum.hooks,
            ValidTag.enum.performance,
            ValidTag.enum.memoization,
        ],
        answers: [],
    },
    {
        text: "How would you debug large Next.js bundle sizes?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.frontend,
        tags: [
            ValidTag.enum.nextjs,
            ValidTag.enum.debugging,
            ValidTag.enum.bundling,
        ],
        answers: [],
    },
];
