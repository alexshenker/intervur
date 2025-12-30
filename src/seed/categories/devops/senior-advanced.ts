import { Category, Level } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const seniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.devops,
    typeof Level.enum["senior-advanced"]
>[] = [];
