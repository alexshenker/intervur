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
            "The trigger points would be around scale, control, and global distribution. On scale, if realtime connections are overwhelming Supabase's limits or we need write throughput beyond what a single PostgreSQL instance can handle, I'd consider breaking out to managed PostgreSQL on AWS or GCP with a separate realtime solution. For control, if we need custom PostgreSQL configurations, extensions Supabase doesn't support, or direct replication setup, self-managed makes sense. For global distribution, Supabase is single-region - if we need multi-region for latency, CockroachDB or PlanetScale are better fits. Cost matters too - at enterprise scale, the math might favor self-hosted or other managed services. What I'd switch to depends on the constraint. AWS RDS or Cloud SQL for managed PostgreSQL with more control. CockroachDB or PlanetScale for global distribution. Separate services for realtime if that's the bottleneck. But I'd resist switching prematurely. The operational overhead of managing infrastructure is real. If Supabase is working and the team is productive, that's worth a lot."
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
            "The issues cluster around connections, queries, locking, and replication. Connection exhaustion is often first - your app opens more connections than the database can handle. Solution is connection pooling with PgBouncer or similar, and tuning pool sizes per application. Query performance degrades as data grows - queries that were fine with thousands of rows become painful with millions. EXPLAIN ANALYZE is the diagnostic tool. Usually it's missing indexes, bad query plans, or queries scanning more data than they need. Lock contention shows up as queries hanging. Long-running transactions or hot rows cause this. I look at breaking up transactions, using optimistic locking, or restructuring to avoid contention. With read replicas, replication lag can cause stale reads right after writes. Monitor lag, route read-after-write to primary. For troubleshooting, I rely on pg_stat_statements for query analysis, monitoring for connections and replication lag, and slow query logs. The key is having visibility before problems become critical. Set up monitoring and alerting early."
        ],
    },
];
