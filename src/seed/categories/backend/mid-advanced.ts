import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["mid-advanced"]
>[] = [
    {
        text: "How would you handle the n+1 problem in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql, ValidTag.enum.performance],
        answers: [],
    },
    {
        text: "What protocols do microservices use to communicate?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.microservices],
        answers: [],
    },
];
