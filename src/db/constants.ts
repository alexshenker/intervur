import { z } from "zod";

// Level enum values for question difficulty
export const levels = [
    "junior",
    "junior-advanced",
    "mid",
    "mid-advanced",
    "senior",
    "senior-advanced",
] as const;

export const Level = z.enum(levels);

export type Level = z.infer<typeof Level>;

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

export const Category = z.enum(categories);

// Predefined tags for technologies and concepts
export const validTags = [
    // Frontend
    "react",
    "hooks",
    "nextjs",
    "typescript",
    "javascript",
    "html",
    "css",
    "tailwind",
    "redux",
    "zustand",
    "context-api",
    "tanstack-query",
    "virtual-dom",
    "ssr",
    "csr",
    "lazy-loading",
    "code-splitting",
    "memoization",
    "webpack",
    "vite",
    "turbopack",

    // Backend
    "nodejs",
    "express",
    "nestjs",
    "graphql",
    "rest-api",
    "websockets",
    "serverless",
    "grpc",
    "message-queues",

    // Databases & ORMs
    "mongodb",
    "mongoose",
    "sql",
    "postgresql",
    "mysql",
    "redis",
    "prisma",
    "typeorm",
    "supabase",
    "indexing",

    // AWS Services
    "aws",
    "s3",
    "lambda",
    "cognito",

    // Infrastructure & DevOps
    "docker",
    "kubernetes",
    "ci-cd",
    "git",
    "cdn",

    // Testing
    "testing",
    "jest",
    "rtl",
    "tdd",
    "e2e",

    // Security
    "security",
    "auth",
    "jwt",
    "oauth",
    "cors",

    // Performance & Optimization
    "performance",
    "caching",
    "tree-shaking",
    "bundling",
    "web-vitals",

    // Architecture & Design
    "api-design",
    "database-design",
    "microservices",
    "event-driven",
    "system-design",

    // Debugging & Monitoring
    "debugging",
    "monitoring",
    "observability",
    "error-tracking",
    "logging",

    // Concurrency & Distributed Systems
    "race-conditions",
    "concurrency",
] as const;

export type ValidTag = (typeof validTags)[number];

export const ValidTag = z.enum(validTags);
