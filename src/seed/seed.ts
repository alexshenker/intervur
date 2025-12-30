import type { Category, Level } from "../db";
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

const questions: DatabaseExport["questions"] = [
    ...Object.values(categories).flatMap((levels) =>
        Object.values(levels).flat()
    ),
];

const seed: DatabaseExport = {
    questions,
};

export const seedData = seed;
