import { Category, Level } from "../../../db/constants";
import { QuestionForCategoryAndLevel } from "../../../lib/types";
import { junior } from "./junior";
import { juniorAdvanced } from "./junior-advanced";
import { mid } from "./mid";
import { midAdvanced } from "./mid-advanced";
import { senior } from "./senior";
import { seniorAdvanced } from "./senior-advanced";

export const devopsQuestions: Record<
    Level,
    QuestionForCategoryAndLevel<typeof Category.enum.devops, Level>[]
> = {
    junior,
    "junior-advanced": juniorAdvanced,
    mid,
    "mid-advanced": midAdvanced,
    senior,
    "senior-advanced": seniorAdvanced,
};
