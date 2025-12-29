// Level enum values for question difficulty
export const levels = [
    "junior",
    "junior-advanced",
    "mid",
    "mid-advanced",
    "senior",
    "senior-advanced",
] as const;

export type Level = (typeof levels)[number];

// Category enum values for question domains
export const categories = [
    "frontend",
    "backend",
    "fullstack",
    "devops",
    "databases",
    "system-design",
    "behavioral",
    "algorithms",
    "security",
] as const;

export type Category = (typeof categories)[number];

// Predefined tags for technologies and concepts
export const validTags = [
    // Frontend
    "react",
    "nextjs",
    "typescript",
    "javascript",
    "html",
    "css",
    "tailwind",
    "vue",
    "angular",

    // Backend
    "nodejs",
    "express",
    "nestjs",
    "graphql",
    "rest-api",

    // Databases
    "mongodb",
    "sql",
    "postgresql",
    "mysql",
    "redis",

    // Infrastructure
    "aws",
    "docker",
    "kubernetes",
    "ci-cd",

    // Concepts
    "auth",
    "caching",
    "performance",
    "testing",
    "security",
    "database-design",
] as const;

export type ValidTag = (typeof validTags)[number];
