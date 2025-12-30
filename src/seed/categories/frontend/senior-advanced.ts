import { Category, Level } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const seniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum["senior-advanced"]
>[] = [];
