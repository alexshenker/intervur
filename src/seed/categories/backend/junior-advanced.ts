import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Express Basics
    {
        text: "What is Express and how does middleware work?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express, ValidTag.enum.middleware, ValidTag.enum.nodejs],
        answers: [],
    },
    {
        text: "What is the difference between app.use() and app.get()?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express, ValidTag.enum.middleware],
        answers: [],
    },
    {
        text: "What is the request-response cycle in Express?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express],
        answers: [],
    },
    {
        text: "What is the difference between req.params, req.query, and req.body?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express],
        answers: [],
    },

    // REST APIs Basics
    {
        text: "What is REST and what are its constraints?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["api-design"]],
        answers: [],
    },
    {
        text: "What are idempotent operations and why do they matter?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum.idempotency],
        answers: [],
    },
    {
        text: "What is the difference between PUT and PATCH?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["http-methods"]],
        answers: [],
    },
    {
        text: "What are HTTP status codes and when do you use each?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["status-codes"]],
        answers: [],
    },
    {
        text: "What are query parameters vs path parameters and when do you use each?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["api-design"]],
        answers: [],
    },
];
