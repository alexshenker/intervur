import { Category, Level } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const seniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["senior-advanced"]
>[] = [];
