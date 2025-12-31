import { Category, Level, ValidTag } from "../../../db/constants";
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
            "I start by understanding the data and how it'll be accessed. PostgreSQL is my default for almost everything - it handles relational data, has great JSON support, and the ecosystem is excellent. I'd only deviate for specific reasons. Graph databases like Neo4j make sense when relationships are the primary focus - friend networks, recommendation engines, fraud detection. Redis for anything needing sub-millisecond reads - sessions, caching, rate limiting. MongoDB if I genuinely have document-oriented data with varying schemas, though PostgreSQL's JSONB handles a lot of what people used to need MongoDB for. Time-series databases for metrics and IoT data. The decision framework is: What shape is the data? What are the query patterns? What scale do we need? What does the team know? I've seen projects fail from picking exotic databases when PostgreSQL would have been fine. For an MVP, team familiarity and development speed often matter more than theoretical optimal choice. You can always migrate later once you understand the real access patterns."
        ],
    },
];
