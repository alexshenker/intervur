import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.senior
>[] = [
    // React Hooks Expert
    {
        text: "What are some overused hooks? Why?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "What are some misunderstood hooks? Why?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "Why were hooks introduced instead of improving class components?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },

    // React Advanced
    {
        text: "What are React Server Components and how do they differ from SSR?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum["server-components"], ValidTag.enum.rsc, ValidTag.enum.ssr],
        answers: [],
    },
    {
        text: "What is Suspense and how does it work with data fetching?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.suspense],
        answers: [],
    },
    {
        text: "What are error boundaries and how do you implement them?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum["error-boundaries"]],
        answers: [],
    },

    // Next.js App Router Advanced
    {
        text: "What is the use server directive and how do Server Actions work?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum["server-components"]],
        answers: [],
    },
    {
        text: "What are Route Handlers and how do they differ from API routes?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"]],
        answers: [],
    },
    {
        text: "What is parallel routing and intercepting routes?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.routing],
        answers: [],
    },
    {
        text: "What are route groups and when would you use them?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.routing],
        answers: [],
    },
    {
        text: "How do you handle streaming and partial rendering?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.performance, ValidTag.enum.suspense],
        answers: [],
    },
    {
        text: "What is the difference between static and dynamic rendering in the App Router?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.ssr, ValidTag.enum.ssg],
        answers: [],
    },
    {
        text: "How do you opt out of caching in the App Router?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.caching],
        answers: [],
    },
];
