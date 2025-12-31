import { Category, Level } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.behavioral,
    typeof Level.enum.junior
>[] = [];
