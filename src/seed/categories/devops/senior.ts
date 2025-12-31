import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.devops,
    typeof Level.enum.senior
>[] = [
    // Senior CI/CD
    {
        text: "How do you implement database migrations in CI/CD?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"], ValidTag.enum.migrations],
        answers: [
            "Database migrations in CI/CD require careful handling because unlike application code, you can't just roll back to a previous version if something goes wrong. Data is stateful. The approach I use starts with writing migrations as code using tools like Flyway, Liquibase, Prisma Migrate, or Knex. Each migration is a versioned file that describes a change, like adding a table or column. These migrations are committed to version control with the application code. In the pipeline, migrations typically run after the build stage but before the application deployment. This ensures the database schema is ready for the new code. For safety, I follow a few principles. Make migrations backward compatible when possible. If you're renaming a column, first add the new column, deploy code that writes to both, then remove the old column in a later release. This allows rollback of the application without database issues. Always back up before running migrations in production. Run migrations in a separate step so you can see exactly what changed. Test migrations against a copy of production data in staging. For large tables, be careful about locks and consider online migration tools. Some teams use expand-contract pattern where you expand the schema first, migrate data, then contract by removing old structures.",
        ],
    },
    {
        text: "What is infrastructure as code in CI/CD?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "Infrastructure as code means managing and provisioning infrastructure through machine-readable configuration files rather than manual processes or interactive tools. In the context of CI/CD, it means your pipeline can automatically create, update, and destroy infrastructure as part of the deployment process. Tools like Terraform, Pulumi, AWS CloudFormation, or Kubernetes manifests define what infrastructure should exist. These definitions are version controlled alongside your application code. When the pipeline runs, it applies these definitions to create or update the actual infrastructure. This has huge benefits. Infrastructure changes go through the same review process as code changes. You can see exactly what changed in a pull request. Environments are reproducible. If you need a new staging environment, you run the same code that created the existing one. Disaster recovery becomes much simpler when you can recreate infrastructure from code. In practice, a pipeline might run Terraform plan on pull requests to show what infrastructure changes would occur, then apply those changes automatically when merged to main. I typically separate infrastructure changes from application deployments to reduce risk, but they're both managed through the same CI/CD pipeline approach.",
        ],
    },
    {
        text: "How do you handle secrets in CI/CD?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"], ValidTag.enum.security],
        answers: [
            "Handling secrets in CI/CD is critical because pipelines often need access to API keys, database credentials, and other sensitive data. The golden rule is never commit secrets to your repository, not even in encrypted form if you can avoid it. Most CI/CD platforms have built-in secret management. In GitHub Actions, you define secrets in the repository or organization settings, then reference them as environment variables in your workflows. They're masked in logs and not exposed to forked repositories on pull requests. Jenkins has credentials management, CircleCI has contexts, and so on. For more complex setups, I use dedicated secret managers like HashiCorp Vault, AWS Secrets Manager, or Google Secret Manager. The pipeline authenticates with the secret manager at runtime and fetches what it needs. This has advantages like centralized secret rotation and audit logging. Some best practices I follow. Use different secrets for different environments. Production should have different credentials than staging. Rotate secrets regularly and automate that rotation where possible. Limit secret scope so each job only has access to what it needs. Audit who has access to secrets. And never echo or print secrets in logs, even accidentally. If a secret is compromised, having good rotation practices and limited scope minimizes the blast radius.",
        ],
    },

    // Senior Monitoring
    {
        text: "What are performance metrics you should track?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring, ValidTag.enum.performance],
        answers: [
            "The key performance metrics depend on your application type, but there are some universal ones I always track. For web applications, latency is critical. I track P50, P95, and P99 percentiles for response time because averages hide problems. If your P99 is ten seconds, one percent of users are having a terrible experience. Throughput, usually measured as requests per second, tells you how much load you're handling. Error rate as a percentage of requests shows reliability. For backend services, I track similar request metrics plus resource utilization: CPU, memory, disk I/O, and network. These help with capacity planning and detecting resource leaks. Database query times and connection pool utilization are often bottlenecks worth watching closely. For user-facing applications, I track Core Web Vitals: Largest Contentful Paint for load time, First Input Delay for interactivity, and Cumulative Layout Shift for visual stability. These directly correlate with user experience and SEO. I also track business metrics tied to performance. Conversion rate, cart abandonment, or feature usage. If performance degrades and conversions drop, that connects technical metrics to business impact. The Google SRE book popularized the RED method for services: Rate, Errors, Duration. And the USE method for resources: Utilization, Saturation, Errors. Both are good frameworks for comprehensive coverage.",
        ],
    },
    {
        text: "What is the difference between synthetic monitoring and real user monitoring?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring],
        answers: [
            "Synthetic monitoring and Real User Monitoring are complementary approaches to understanding application performance. Synthetic monitoring uses automated scripts or bots that simulate user interactions on a schedule. You might have a synthetic test that logs in, adds an item to cart, and checks out every five minutes from servers in different geographic regions. The tests are consistent and controlled, so you can detect issues before real users are affected and compare performance over time without variation from user behavior or network conditions. It's great for uptime monitoring, testing critical flows, and baseline measurements. Real User Monitoring captures data from actual users as they interact with your application. A JavaScript snippet or mobile SDK collects performance data from real browsers and devices, including page load times, JavaScript errors, and user interactions. You see performance across the true diversity of your user base: different devices, networks, browsers, and geographic locations. RUM tells you what users actually experience, which might differ significantly from your synthetic tests run on fast machines with good connections. I use both together. Synthetic monitoring is like a canary in a coal mine, giving you consistent alerting even at three AM when traffic is low. RUM gives you the full picture of user experience and helps you prioritize optimizations that will actually impact real users. If synthetic tests pass but RUM shows problems, you might have issues that only appear under real-world conditions.",
        ],
    },
    {
        text: "What is error tracking and how do tools like Sentry work?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum["error-tracking"], ValidTag.enum.sentry, ValidTag.enum.monitoring],
        answers: [
            "Error tracking is the practice of automatically capturing, aggregating, and analyzing errors that occur in your application. Tools like Sentry, Bugsnag, or Rollbar go beyond simple logging by providing rich context around errors and helping you prioritize what to fix. Here's how Sentry works. You install an SDK in your application that hooks into the error handling. When an unhandled exception occurs, or when you manually capture an error, the SDK collects context like the stack trace, request data, user information, browser details, and recent breadcrumbs showing what led up to the error. This is sent to Sentry's servers. Sentry then groups similar errors together. If the same null pointer exception happens a thousand times, you see one issue with a count, not a thousand separate entries. This deduplication is crucial because otherwise you'd be overwhelmed with noise. You get alerting when new issues appear or when error rates spike. The dashboard shows which errors are most frequent or affecting the most users, helping you prioritize. You can also track releases, seeing if a new deployment introduced new errors or fixed old ones. Integration with issue trackers means you can create Jira or GitHub issues directly from Sentry. Overall, it turns chaotic production errors into actionable, prioritized issues.",
        ],
    },
    {
        text: "What analytics tools do you use and how do you implement them?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring],
        answers: [
            "Analytics tools help you understand how users interact with your product, which features they use, and where they drop off. The tools I typically use depend on the need. For product analytics, tools like Amplitude, Mixpanel, or PostHog track user events and let you analyze funnels, retention, and feature adoption. You implement them by adding an SDK and then tracking events at key points in your code, like user signed up, feature X used, or checkout completed. Each event can include properties for richer analysis. For web analytics, Google Analytics is common for traffic sources, page views, and basic user behavior. Plausible or Fathom are privacy-focused alternatives that don't require cookie banners. For session recording and heatmaps, tools like Hotjar or FullStory show you exactly what users do on your site, where they click, and where they get stuck. Implementation best practices include defining a clear event taxonomy upfront so naming is consistent. I create a tracking plan document listing all events and their properties. I ensure user privacy is respected by not tracking sensitive data and complying with GDPR or other regulations. I also validate that tracking is working correctly, since broken analytics is worse than none because you make decisions on bad data. Finally, I set up dashboards for key metrics so the team can easily monitor product health.",
        ],
    },
    {
        text: "What is A/B testing and how do you implement it?",
        level: Level.enum.senior,
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring],
        answers: [
            "A/B testing is a method for comparing two versions of something to determine which performs better. You split users into groups, show each group a different variant, and measure which version achieves better results on your chosen metric. For example, testing whether a green or blue signup button leads to more conversions. Implementation typically involves three components. First is the randomization and assignment system. You need to consistently assign users to variants so they don't see flickering between versions, usually by hashing their user ID. Tools like LaunchDarkly, Optimizely, Split, or open-source options like GrowthBook handle this for you. Second is the variant rendering. Your code checks which variant the user is assigned to and renders accordingly. This needs to be fast to avoid layout shifts or flash of wrong content. Third is measurement and analysis. You track the metrics you care about, segmented by variant, then use statistical analysis to determine if differences are significant. This is where most teams underestimate the effort. You need enough sample size for statistical power, you need to avoid peeking at results too early, and you need to account for multiple comparisons. Best practices include defining success metrics and sample size before starting, running tests to completion rather than stopping early when results look good, and documenting learnings even from failed experiments.",
        ],
    },
];
