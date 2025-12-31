import { Category, Level } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.devops,
    typeof Level.enum.junior
>[] = [];
