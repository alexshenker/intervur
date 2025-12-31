import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.devops,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Advanced Docker
    {
        text: "What are Docker layers and how does caching work?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker],
        answers: ["Docker images are built in layers, where each instruction in the Dockerfile creates a new layer. Layers are cached and reused when rebuilding images if the instruction and context haven't changed. Docker checks if it has a cached layer for each step - if the instruction and files haven't changed, it reuses the cached layer instead of rebuilding. This makes builds much faster. The key is instruction order - if a layer changes, all subsequent layers are invalidated. That's why you put frequently changing instructions like COPY of application code near the end, and stable instructions like installing system dependencies near the beginning. Understanding layers is crucial for optimization - combining RUN commands reduces layers, and ordering instructions properly maximizes cache hits. Layers also explain why removing files in a later layer doesn't reduce image size - the deletion is a new layer on top."],
    },
    {
        text: "What is a multi-stage build and why would you use it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.dockerfile],
        answers: ["Multi-stage builds use multiple FROM statements in a Dockerfile, where each FROM starts a new stage. You can copy artifacts between stages but only the final stage becomes the image. This is powerful for separating build dependencies from runtime dependencies. For example, you might compile code in the first stage with all build tools installed, then copy just the compiled binary to a minimal runtime image in the second stage. This dramatically reduces final image size since build tools aren't included. I use multi-stage builds for compiled languages like Go or Java, and even for Node.js to separate the build stage with dev dependencies from the runtime stage with only production dependencies. The result is smaller, more secure images that contain only what's needed to run, not build, the application. It also keeps Dockerfiles clean without needing separate build and runtime files."],
    },
    {
        text: "How do you optimize Docker image size?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker],
        answers: ["I optimize Docker image size through several techniques. Use minimal base images like Alpine Linux instead of full Ubuntu - alpine-based images are much smaller. Use multi-stage builds to separate build dependencies from runtime. Combine RUN commands to reduce layers and clean up in the same step - like 'RUN apt-get update && apt-get install -y package && rm -rf /var/lib/apt/lists/*' so the cache files aren't stored in the layer. Remove unnecessary files and use .dockerignore to exclude files from the build context. Choose specific base image tags rather than 'latest'. For Node.js, install only production dependencies in the final stage. Use tools like docker-slim or dive to analyze and reduce images. Smaller images mean faster pulls, less storage, smaller attack surface, and better performance. The key is being intentional about what goes into the image."],
    },
    {
        text: "How do you handle secrets in Docker?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.security],
        answers: ["Never hardcode secrets in Dockerfiles or images. For production, use Docker secrets in Swarm mode or orchestration tools like Kubernetes secrets. Docker secrets are encrypted in transit and at rest, mounted as files in containers. For local development, use environment variables passed at runtime, not baked into images. Use build-time secrets with BuildKit's --secret flag for secrets needed during build without storing them in layers. Mount secrets as volumes from the host or use secret management services like AWS Secrets Manager or HashiCorp Vault. In docker-compose, use the secrets key or environment files. Never commit .env files with real secrets to git. Use docker build --secret for build-time secrets that don't end up in the image. The key principle is secrets should be injected at runtime, not at build time, and never stored in image layers where they can be extracted."],
    },

    // Advanced Kubernetes
    {
        text: "What are StatefulSets and when would you use them?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.statefulsets],
        answers: ["StatefulSets are for running stateful applications that require stable identities, persistent storage, and ordered deployment. Unlike Deployments where pods are interchangeable, StatefulSet pods have stable hostnames (pod-0, pod-1), stable persistent volumes that survive pod rescheduling, and ordered startup and shutdown. Use cases include databases like PostgreSQL or MongoDB, distributed systems like Kafka or Zookeeper, and any application that needs to know its identity or maintain state across restarts. When pod-0 is created, it keeps that identity and its storage forever. If it dies, it comes back as pod-0 with the same storage. Scaling happens in order - pod-1 doesn't start until pod-0 is ready. I use StatefulSets when I need persistence that follows the pod, ordered deployment, or stable network identifiers. For stateless apps, Deployments are simpler and more flexible."],
    },
    {
        text: "What are DaemonSets?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["A DaemonSet ensures a copy of a pod runs on every node in the cluster, or a subset of nodes based on selectors. When new nodes are added, pods are automatically scheduled on them. When nodes are removed, pods are garbage collected. Common use cases include log collectors like Fluentd that need to run on every node to collect logs, monitoring agents like node exporters for Prometheus, and storage daemons for distributed storage. Unlike Deployments where you specify a replica count, DaemonSets automatically match the number of nodes. You can use node selectors or affinity to limit which nodes run the pod. I use DaemonSets for infrastructure-level concerns that need to be present on every node - monitoring, logging, networking agents. They're essential for cluster-wide services that need local access to each node's resources."],
    },
    {
        text: "What is an Ingress and how does it differ from a Service?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.ingress],
        answers: ["Ingress manages external HTTP/HTTPS access to services, providing load balancing, SSL termination, and path-based routing. While a LoadBalancer Service gives you one external IP per service, Ingress lets you route traffic to multiple services based on the URL path or hostname. For example, you could route /api to one service and /web to another, or have different hosts pointing to different services - all behind a single load balancer IP. This saves cost since you don't need a separate load balancer per service. Ingress requires an Ingress controller like nginx-ingress, traefik, or cloud-specific controllers. The Ingress resource defines routing rules, and the controller implements them. I use Ingress for web applications needing path or host-based routing, SSL termination, and centralized load balancing. Services handle the internal routing, Ingress handles external HTTP routing."],
    },
    {
        text: "What are liveness and readiness probes?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["Probes are health checks that Kubernetes uses to manage container lifecycle. Liveness probes check if a container is running properly. If a liveness probe fails, Kubernetes kills and restarts the container. This is for catching situations where a process is running but deadlocked or otherwise unhealthy. Readiness probes check if a container is ready to receive traffic. If it fails, the pod is removed from service endpoints, so traffic stops being routed to it, but the container isn't restarted. This is useful during startup or when a pod temporarily can't handle requests. There are three probe types: HTTP GET, TCP socket, and exec command. I always configure both probes. A common pattern is an HTTP endpoint like /health for liveness and /ready for readiness. Properly configured probes are essential for reliable deployments - they ensure traffic only goes to healthy pods and that stuck processes get restarted."],
    },
    {
        text: "What is horizontal pod autoscaling?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.scalability],
        answers: ["Horizontal Pod Autoscaler (HPA) automatically scales the number of pods based on observed metrics. You define a target metric like CPU utilization at 50%, and the HPA adjusts replica count to maintain that target. When CPU exceeds the target, it scales up. When it drops, it scales down. HPA works with Deployments, ReplicaSets, and StatefulSets. Besides CPU and memory, you can use custom metrics from your application or external metrics from cloud services. For example, scale based on queue depth or request latency. You set minimum and maximum replica counts to prevent under or over-provisioning. HPA checks metrics periodically and calculates the desired replica count. I use HPA for web services and APIs to handle variable traffic. It's essential for cost optimization - you run more pods during peak times and fewer during quiet periods. Combine with Cluster Autoscaler to also scale nodes when needed."],
    },
    {
        text: "What are resource requests and limits?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["Resource requests and limits control CPU and memory allocation for containers. Requests are what the container is guaranteed to get - Kubernetes uses this for scheduling decisions. A pod won't be scheduled on a node that can't satisfy its requests. Limits are the maximum the container can use. If a container exceeds its memory limit, it gets killed. If it exceeds CPU limit, it gets throttled. Setting appropriate values is crucial. Requests too low means pods might not get resources they need under load. Requests too high means poor node utilization and wasted capacity. Limits too low causes unnecessary throttling or OOM kills. Limits too high risks one pod starving others. I typically set requests based on steady-state usage and limits at 2-3x requests. CPU is compressible, meaning containers just slow down, but memory isn't - exceeding memory kills the pod. Use vertical pod autoscaling or monitoring to find right values."],
    },
    {
        text: "What is a Helm chart?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.helm],
        answers: ["Helm is a package manager for Kubernetes, and a chart is a Helm package. Charts bundle together all the Kubernetes manifests needed to run an application - Deployments, Services, ConfigMaps, Secrets, etc. - into a reusable, versioned package. Instead of managing many YAML files, you install a chart with a single command. Charts use Go templates, so you can parameterize values like replica count, image tag, or resource limits through a values.yaml file. This makes the same chart reusable across environments with different configurations. Helm also manages releases - tracking what's deployed, enabling rollbacks, and handling upgrades. I use Helm for deploying third-party applications like databases, monitoring tools, or message queues. For my own applications, Helm helps manage complex deployments and environment-specific configurations. The chart repository ecosystem means you don't have to write Kubernetes manifests from scratch for common software."],
    },
    {
        text: "What is a Kubernetes operator?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["An operator is a method of packaging, deploying, and managing a Kubernetes application using custom resources and controllers. It encodes operational knowledge about running complex applications into software. While Kubernetes knows how to run stateless apps, operators teach it how to manage stateful applications like databases or message queues - handling things like scaling, backups, upgrades, and failure recovery. An operator watches for changes to custom resources you define, then takes actions to reconcile current state with desired state. For example, a PostgreSQL operator might handle creating replicas, managing failover, taking backups, and upgrading versions - things that would otherwise require manual intervention. I use operators for complex stateful applications where I want Kubernetes-native management. They're particularly valuable for databases and data infrastructure where operational tasks are well-defined but tedious to do manually."],
    },
    {
        text: "How do you handle rolling updates and rollbacks?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum["deployment-strategies"]],
        answers: ["Deployments handle rolling updates by default - when you update the pod spec, Kubernetes gradually replaces old pods with new ones. You configure the strategy with maxSurge (how many extra pods during update) and maxUnavailable (how many can be down). A typical zero-downtime config might be maxSurge: 1 and maxUnavailable: 0, meaning we add new pods before removing old ones. The Deployment tracks revision history, so you can rollback with 'kubectl rollout undo' if something goes wrong. I always watch rollouts with 'kubectl rollout status' to catch issues early. Proper readiness probes are essential - Kubernetes won't remove old pods until new ones pass their probes. For more complex strategies like canary deployments, you might use multiple Deployments with service weights, or tools like Argo Rollouts or Flagger. The key is having good health checks and monitoring to detect problems quickly so you can rollback before users are significantly impacted."],
    },
    {
        text: "What is a service mesh (Istio, Linkerd)?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum["service-mesh"]],
        answers: ["A service mesh is infrastructure layer that handles service-to-service communication, providing features like traffic management, security, and observability without changing application code. It works by injecting sidecar proxies next to each pod that intercept all network traffic. Istio and Linkerd are popular implementations. The service mesh provides mutual TLS for encryption, traffic splitting for canary deployments, circuit breaking, retries, timeouts, distributed tracing, and detailed metrics. For example, you can route 10% of traffic to a new version for testing, or automatically retry failed requests. This is powerful for microservices where you have complex service-to-service communication. I use service meshes when I need advanced traffic control, security, or observability across many services. The tradeoff is complexity and resource overhead from sidecar proxies. For simple applications, it might be overkill."],
    },

    // Advanced CI/CD
    {
        text: "What is trunk-based development?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"], ValidTag.enum.git],
        answers: [
            "Trunk-based development is a branching strategy where developers work in short-lived feature branches or directly on a single main branch, often called trunk or main. The key principle is that branches are merged frequently, usually within a day or two, rather than living for weeks or months. This contrasts with GitFlow and similar strategies that have long-lived develop and feature branches. The benefits align well with CI/CD. Since everyone integrates frequently, merge conflicts are smaller and easier to resolve. The main branch is always in a deployable state because changes are small and well-tested. It forces developers to break work into small, incremental chunks rather than big-bang releases. To make this work, you need good practices in place. Feature flags let you merge incomplete features without exposing them to users. Automated testing is essential because you can't rely on long manual testing cycles. Code review happens on small pull requests that are quick to review. The team needs confidence that main is always deployable. Many high-performing engineering teams like Google and Facebook use trunk-based development. It requires discipline but pays off in faster integration, fewer merge conflicts, and more frequent releases.",
        ],
    },
    {
        text: "What is blue-green deployment?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"], ValidTag.enum["blue-green"], ValidTag.enum["deployment-strategies"]],
        answers: [
            "Blue-green deployment is a release strategy that reduces downtime and risk by running two identical production environments called Blue and Green. At any time, one environment is live and serving all production traffic while the other is idle. When you want to deploy a new version, you deploy it to the idle environment. So if Blue is currently live, you deploy the new version to Green. You then run smoke tests and verify everything works correctly on Green. Once you're confident, you switch the router or load balancer to direct traffic from Blue to Green. Green is now live with the new version. The key benefit is that if something goes wrong after the switch, you can instantly rollback by pointing traffic back to Blue, which still has the old version running. This makes rollbacks trivial and nearly instantaneous. The downside is cost, since you need to maintain two full production environments. You also need to handle database migrations carefully since both environments typically share a database. Some teams run Blue-Green at the infrastructure level, while others implement it using container orchestration or feature flags. It's particularly valuable for applications where downtime is costly and you want zero-downtime deployments with easy rollback.",
        ],
    },
    {
        text: "What is canary deployment?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"], ValidTag.enum.canary, ValidTag.enum["deployment-strategies"]],
        answers: [
            "Canary deployment is a strategy where you gradually roll out changes to a small subset of users before deploying to the entire infrastructure. The name comes from the canary in a coal mine concept. You're testing whether it's safe to proceed by exposing a small group first. Here's how it works. You deploy the new version alongside the old one, but initially route only a small percentage of traffic, maybe one or five percent, to the new version. You then closely monitor key metrics like error rates, latency, and business metrics. If everything looks good, you gradually increase the traffic percentage to the new version over time. If you detect problems, you can quickly route all traffic back to the old version, limiting the blast radius of any issues. The advantage over blue-green is that you catch issues with real production traffic patterns before they affect all users. Some bugs only appear under certain conditions or with specific user behaviors, and canary deployments help surface those. The tradeoff is complexity. You need good monitoring and alerting, traffic splitting capabilities, and often automated analysis to detect anomalies. Many teams use tools like Kubernetes with service meshes or specialized deployment tools like Argo Rollouts to manage canary deployments.",
        ],
    },
    {
        text: "What is feature flagging?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "Feature flagging is a technique where you wrap new features in conditional logic that checks whether the feature should be enabled for a given user. This decouples deployment from release. You can deploy code to production with a feature hidden behind a flag, then turn it on when you're ready, without another deployment. There are several use cases. First, you can do gradual rollouts, similar to canary deployments but at the feature level. Enable a feature for ten percent of users, monitor it, then expand. Second, you can do A/B testing by showing different variants to different users and measuring which performs better. Third, you can give early access to specific users like beta testers or internal employees. Fourth, you can use kill switches to instantly disable a problematic feature without rolling back code. In implementation, feature flags can be simple boolean config values, or they can be sophisticated systems that target users based on attributes like location, subscription tier, or user ID. Tools like LaunchDarkly, Split, or open-source options like Unleash provide management interfaces and SDKs. The key is cleaning up old flags once features are fully released. Technical debt accumulates quickly if you leave unused flags in the codebase.",
        ],
    },

    // Advanced Monitoring
    {
        text: "What is distributed tracing?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring, ValidTag.enum.observability],
        answers: [
            "Distributed tracing is a method for tracking requests as they flow through multiple services in a distributed system. When a user clicks a button and that action triggers calls across five different microservices, distributed tracing connects all those pieces together into a single trace. It works by propagating a trace ID and span information through every service call. When Service A calls Service B, it includes headers with the trace context. Service B logs its work under the same trace ID, then passes the context along to Service C, and so on. Each unit of work is a span, which records start time, duration, and metadata. The parent-child relationships between spans create a tree structure showing the complete request flow. Tools like Jaeger, Zipkin, or commercial offerings like Datadog and Honeycomb collect these spans and let you visualize them. You can see a waterfall diagram of exactly where time was spent. If Service B took two seconds but the request to Service C only took one second, you know Service B had one second of its own processing time. This is invaluable for debugging latency issues in microservices. Without tracing, figuring out why a request was slow means logging into multiple systems, correlating timestamps, and hoping you find the right logs. With tracing, you search for the trace ID and see everything instantly.",
        ],
    },
    {
        text: "What is APM (Application Performance Monitoring)?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring, ValidTag.enum.apm],
        answers: [
            "APM stands for Application Performance Monitoring, and it refers to tools that provide deep visibility into your application's performance and behavior. Tools like Datadog APM, New Relic, Dynatrace, or open-source alternatives like Jaeger give you more than just metrics. They automatically instrument your code to track how requests flow through your system. APM tools typically provide several capabilities. Transaction tracing shows you the full journey of a request, including time spent in each function, database query, or external API call. This helps you find bottlenecks quickly. Service maps visualize how your services communicate and highlight problem areas. Error tracking integrates with traces to show you exactly what was happening when an error occurred. Database query analysis shows slow queries and their frequency. Resource correlation ties application behavior to infrastructure metrics. The value of APM is speed of diagnosis. Without it, finding why a particular request was slow means manually adding logging, reproducing the issue, and piecing together what happened. With APM, you can look at any slow request and immediately see where time was spent. The tradeoff is cost. APM tools can be expensive, and the instrumentation adds some overhead. But for production systems where downtime is costly, the investment usually pays off quickly in reduced mean time to resolution.",
        ],
    },
    {
        text: "How do you implement alerting?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring],
        answers: [
            "Good alerting is about being notified of real problems that need human intervention, without being overwhelmed by noise. Here's how I approach it. First, define what's actually worth alerting on. I focus on user-facing symptoms rather than causes. Alert on high error rate or slow response times, not on CPU being at ninety percent. CPU might be fine at ninety percent if users aren't affected. I use Service Level Objectives as the basis. If our SLO says ninety-nine percent of requests should complete in under two hundred milliseconds, alert when we're at risk of missing that. Second, set appropriate thresholds with context. Don't alert on instantaneous spikes. Use sustained conditions like 'error rate above one percent for five minutes'. This reduces false positives from brief blips. Third, implement multiple severity levels. Pages for things that need immediate action like the site is down. Lower-priority notifications for things to investigate during business hours. Fourth, route alerts appropriately. Production outages go to on-call, staging issues go to Slack. Fifth, include actionable context in alerts. Link to relevant dashboards, include recent changes, and suggest runbook steps. Sixth, continuously refine. If an alert fires but never requires action, remove or tune it. Alert fatigue is real and dangerous. Every false positive makes the team more likely to ignore the next real one.",
        ],
    },

    // Advanced AWS
    {
        text: "What are EC2 placement groups?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.aws, ValidTag.enum.ec2],
        answers: ["Placement groups control how EC2 instances are physically placed relative to each other. There are three types: cluster, partition, and spread. Cluster placement groups pack instances close together in a single availability zone to get low-latency, high-throughput network performance - great for HPC applications or tightly-coupled workloads. Spread placement groups do the opposite, placing instances on distinct hardware to minimize correlated failures - good for small critical instances that need to be isolated from each other. Partition placement groups divide instances into logical partitions where each partition is on separate hardware, useful for large distributed systems like Hadoop or Cassandra. In practice, I mostly use cluster groups when I need maximum network performance between instances, and spread groups for high-availability requirements."],
    },
    {
        text: "What is Lambda@Edge?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.aws, ValidTag.enum.lambda],
        answers: ["Lambda@Edge lets you run Lambda functions at CloudFront edge locations, executing code closer to users for lower latency. You can intercept requests and responses at four points: when the viewer request arrives at CloudFront, before CloudFront forwards to origin, when the origin response arrives, and before CloudFront returns to the viewer. Use cases include A/B testing by routing users to different origins, authentication at the edge, URL rewrites and redirects, modifying headers, generating responses directly without hitting origin, and personalizing content. Lambda@Edge has stricter limits than regular Lambda - less memory, shorter timeouts, and no VPC access. The functions must be deployed to us-east-1 and then replicate globally. I use Lambda@Edge for things like adding security headers, authentication checks, or simple transformations that benefit from running at the edge rather than at origin."],
    },
    {
        text: "What is cross-account access?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.aws],
        answers: ["Cross-account access allows resources and users in one AWS account to access resources in another account. This is essential for organizations with multiple accounts for different environments or teams. The main mechanism is IAM role assumption. Account A creates a role with a trust policy allowing Account B to assume it, and a permissions policy defining what the role can do. Users or services in Account B use STS AssumeRole to get temporary credentials for that role. For resources like S3 buckets or KMS keys, you can also use resource-based policies that grant access to principals from other accounts. Organizations SCPs can further restrict what accounts can do. I use cross-account access for separating production from development, giving centralized security teams access across accounts, sharing resources like container registries, and implementing hub-and-spoke logging or security architectures. The principle of least privilege is critical - only grant necessary permissions."],
    },
    {
        text: "What is the difference between CloudFormation and Terraform?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.aws],
        answers: ["The main difference is that CloudFormation is AWS-specific while Terraform is cloud-agnostic and supports multiple providers. CloudFormation uses JSON or YAML, while Terraform has its own HCL language which I find more readable. CloudFormation is tightly integrated with AWS and typically gets new AWS features first, but Terraform's state management is more flexible since you can store it remotely in various backends. Terraform also has a better plan functionality where you can preview changes before applying them. In practice, I'd choose CloudFormation if I'm working purely in AWS and want the native integration and service coverage. I'd pick Terraform if I'm working across multiple cloud providers or prefer its workflow and tooling. Both accomplish the same goal of infrastructure as code, just with different trade-offs."],
    },
];
