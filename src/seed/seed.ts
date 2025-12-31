import type { Category, Level, ValidTag } from "../db/constants";
import type { DatabaseExport, DbExportQuestion } from "../lib/types";
import { algorithmsQuestions } from "./categories/algorithms";
import { backendQuestions } from "./categories/backend";
import { behavioralQuestions } from "./categories/behavioral";
import { databasesQuestions } from "./categories/databases";
import { devopsQuestions } from "./categories/devops";
import { frontendQuestions } from "./categories/frontend";
import { fullstackQuestions } from "./categories/fullstack";
import { securityQuestions } from "./categories/security";
import { systemDesignQuestions } from "./categories/system-design";

const categories: Record<Category, Record<Level, DbExportQuestion[]>> = {
    frontend: frontendQuestions,
    backend: backendQuestions,
    fullstack: fullstackQuestions,
    devops: devopsQuestions,
    databases: databasesQuestions,
    "system-design": systemDesignQuestions,
    behavioral: behavioralQuestions,
    algorithms: algorithmsQuestions,
    security: securityQuestions,
};

export const questions: DatabaseExport["questions"] = [
    ...Object.values(categories).flatMap((levels) =>
        Object.values(levels).flat()
    ),
];

type QuestionSansAnswer = {
    text: string;
    level: Level;
    category: Category;
    tags: ValidTag[];
};

const filterQuestions = (
    qs: QuestionSansAnswer[],
    categories: Category[],
    levels: Level[],
    tags: ValidTag[]
) => {
    if (!categories.length && !levels.length && !tags.length) {
        return qs;
    }

    return qs.filter((q) => {
        const categoryMatch =
            categories.length === 0 || categories.includes(q.category);
        const levelMatch = levels.length === 0 || levels.includes(q.level);
        const tagsMatch =
            tags.length === 0 || tags.every((tag) => q.tags.includes(tag));

        return categoryMatch && levelMatch && tagsMatch;
    });
};

//This is for having something like AI choose and read questions without giving it too much context to read. Answers are omitted as they can be long and aren't needed for simply asking/listing questions.
export const questionsSansAnswers = filterQuestions(
    questions.map(({ text, level, category, tags }) => ({
        text,
        level,
        category,
        tags,
    })),
    [],
    [],
    []
);

const seed: DatabaseExport = {
    questions,
};

export const seedData = seed;
