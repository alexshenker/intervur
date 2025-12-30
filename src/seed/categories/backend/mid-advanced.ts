import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Node.js Advanced
    {
        text: "How do you profile and debug memory leaks in Node.js?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.nodejs, ValidTag.enum.debugging, ValidTag.enum.performance],
        answers: [],
    },

    // GraphQL Advanced
    {
        text: "What is schema stitching vs federation?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql],
        answers: [],
    },
    {
        text: "How do you handle file uploads in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql],
        answers: [],
    },
    {
        text: "What are persisted queries and why would you use them?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql, ValidTag.enum.performance],
        answers: [],
    },
    {
        text: "How do you handle caching in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql, ValidTag.enum.caching],
        answers: [],
    },

    // gRPC
    {
        text: "What is gRPC and how does it differ from REST?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["rest-api"]],
        answers: [],
    },
    {
        text: "What are Protocol Buffers?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["protocol-buffers"]],
        answers: [],
    },
    {
        text: "What are the different types of gRPC calls (unary, server streaming, client streaming, bidirectional)?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: [],
    },
    {
        text: "When would you choose gRPC over REST or GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["rest-api"], ValidTag.enum.graphql],
        answers: [],
    },
    {
        text: "How does gRPC handle errors?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["error-handling"]],
        answers: [],
    },
    {
        text: "What is gRPC-web and when do you need it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: [],
    },
    {
        text: "How do you handle authentication in gRPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum.auth],
        answers: [],
    },
    {
        text: "What are interceptors in gRPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: [],
    },
    {
        text: "What is the difference between gRPC and JSON-RPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: [],
    },
    {
        text: "How do you version gRPC APIs?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["api-versioning"]],
        answers: [],
    },

    // WebSockets Advanced
    {
        text: "How do you scale WebSockets horizontally?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.websockets, ValidTag.enum.scalability],
        answers: [],
    },
    {
        text: "How do you handle message ordering and delivery guarantees?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.websockets],
        answers: [],
    },

    // Pagination Advanced
    {
        text: "What are the different pagination strategies?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: [],
    },
    {
        text: "What is offset pagination and what are its drawbacks?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: [],
    },
    {
        text: "What is cursor-based pagination and when would you use it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: [],
    },
    {
        text: "What is keyset pagination?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: [],
    },
    {
        text: "How do you implement infinite scroll?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: [],
    },
    {
        text: "How do you handle pagination in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination, ValidTag.enum.graphql],
        answers: [],
    },
    {
        text: "What are the performance implications of different pagination strategies?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination, ValidTag.enum.performance],
        answers: [],
    },
];
