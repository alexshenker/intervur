import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum.senior
>[] = [
    {
        text: "If you use Supabase, at what point would you switch to something else, what would it be, and why?",
        level: Level.enum.senior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase],
        answers: [
            "I love Supabase for rapid development and startups, but there are a few scenarios where I'd consider switching. First, if the application requires complex transactions or stored procedures that need fine-grained control, I might move to a self-hosted PostgreSQL instance where I have full administrative access. Second, if we're hitting the concurrent connection limits or need more aggressive scaling, especially for real-time features, I'd consider moving to a managed PostgreSQL service like AWS RDS or Google Cloud SQL combined with a dedicated real-time solution like Pusher or Socket.io. Third, if multi-region deployments become critical for latency, something like CockroachDB or PlanetScale might make more sense since they're built for global distribution. Cost can also be a factor at scale. Once you're paying enterprise-tier Supabase prices, it sometimes makes sense to move to self-hosted or a different managed service where you have more pricing flexibility. That said, I'd always weigh the operational overhead of managing infrastructure against the convenience Supabase provides. If the team is small and Supabase is working, the productivity benefits often outweigh the raw cost savings of switching.",
        ],
    },
    {
        text: "What common issues might you face when scaling a database for a growing user base, and how do you troubleshoot them?",
        level: Level.enum.senior,
        category: Category.enum.databases,
        tags: [
            ValidTag.enum.scalability,
            ValidTag.enum.sharding,
            ValidTag.enum.replication,
            ValidTag.enum.indexing,
            ValidTag.enum["query-optimization"],
        ],
        answers: [
            "So there are a few big ones I've run into. First is connection pool exhaustion—you start seeing timeouts and errors because the database can't handle all the concurrent connections. The fix there is usually implementing a connection pooler like PgBouncer, and tuning your max connections settings. Another common one is slow queries. As your data grows, queries that worked fine with a thousand rows start crawling when you hit millions. I'd use EXPLAIN ANALYZE to figure out what's going on—usually it's a missing index or a bad query plan. Lock contention is another one that sneaks up on you. You'll see queries just hanging, waiting for locks to release. That usually means you've got long-running transactions somewhere, so I'd look at breaking those up or switching to optimistic locking. If you're using read replicas, replication lag can bite you—users update something and then immediately read stale data from a replica. You need to monitor that lag and route time-sensitive reads to the primary. And then for really write-heavy workloads, you might need to look at sharding by tenant ID or partitioning by time. Oh, and I'd definitely set up something like pg_stat_statements early on so you can catch problematic queries before they become emergencies.",
        ],
    },
];
