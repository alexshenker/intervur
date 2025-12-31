import { Category, Level } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum["system-design"],
    typeof Level.enum.senior
>[] = [];
