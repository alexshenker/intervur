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
];
