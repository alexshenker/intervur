import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum["mid-advanced"]
>[] = [
    {
        text: "What database would you use and why? How do you decide?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum["database-design"]],
        answers: [
            "My database choice really depends on the data model and access patterns of the application. For most applications, I'd start with PostgreSQL because it's incredibly versatile. It handles relational data well, has excellent JSON support for semi-structured data, and has a mature ecosystem. If I'm building something where relationships between entities are complex and central to the application, like a social network or recommendation engine, I'd consider a graph database like Neo4j. For high-throughput applications with simple key-value access patterns, like session storage or caching, Redis makes a lot of sense. If I need to handle massive amounts of unstructured or semi-structured data with horizontal scaling, something like MongoDB could work, though honestly PostgreSQL's JSONB often covers those use cases now. For time-series data like metrics or IoT sensor readings, I'd look at TimescaleDB or InfluxDB. The key questions I ask are: What's the shape of the data? What are the query patterns? How much scale do we need? And what's the team's familiarity with the technology? Sometimes the best database is the one your team knows well, especially for MVPs where velocity matters more than theoretical optimization.",
        ],
    },
    {
        text: "What are some indexing strategies you would use in your SQL database and why?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: [
            "My indexing strategy always starts with understanding the query patterns. The most common approach is creating indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY statements. For tables where we filter by multiple columns together, I'd use composite indexes, but the column order matters since they work left to right. So if I'm frequently querying by user_id and then created_at, the index should be on (user_id, created_at) in that order. For columns with low cardinality like status or type fields, I might use partial indexes that only index rows matching a specific condition, which saves space and improves performance. If we're doing full-text search, I'd use GIN indexes with PostgreSQL's text search capabilities rather than relying on LIKE queries. For JSON columns, GIN indexes work well too. I'm also careful not to over-index. Every index speeds up reads but slows down writes and takes up storage. I regularly review slow query logs and use EXPLAIN ANALYZE to identify missing indexes, and I also look for unused indexes that should be removed. The goal is finding the right balance for the application's specific read/write ratio.",
        ],
    },
];
