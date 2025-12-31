import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum["system-design"],
    typeof Level.enum["mid-advanced"]
>[] = [
    // Advanced Microservices
    {
        text: "What is a service mesh?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["service-mesh"]],
        answers: [
            "A service mesh is an infrastructure layer that handles service-to-service communication in a microservices architecture. It typically works by deploying a lightweight proxy, called a sidecar, alongside each service instance. These proxies handle all the network traffic between services and provide features like automatic retries, timeouts, circuit breaking, load balancing, and mutual TLS for security. The key benefit is that these capabilities are handled outside your application code, so developers don't have to implement them in each service. Popular service meshes include Istio and Linkerd. The mesh also collects telemetry data, giving you deep visibility into how services are communicating. The downside is added complexity and resource overhead from running all those sidecar proxies, so it's typically only worth it for larger microservice deployments.",
            "A service mesh moves networking concerns out of your application code and into the infrastructure. It deploys a sidecar proxy next to each service instance - every network call goes through this proxy. The proxies handle cross-cutting concerns like mutual TLS encryption, retries with exponential backoff, circuit breaking, load balancing, and observability. Istio and Linkerd are the main players. The appeal is that developers write business logic without worrying about resilience patterns - the mesh handles it uniformly. You also get rich telemetry since all traffic flows through proxies that can report metrics and traces. The cost is significant: you're running a proxy for every service instance, which adds latency and resource overhead. You also need to learn and operate complex mesh infrastructure. It makes sense at scale when you have many services and teams, but it's overkill for smaller deployments."
        ],
    },
    {
        text: "What is the strangler fig pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["design-patterns"]],
        answers: [
            "The strangler fig pattern is a strategy for incrementally migrating from a legacy monolithic system to microservices without doing a risky big-bang rewrite. It's named after strangler fig trees that grow around existing trees. The idea is to gradually replace functionality in the old system by building new services alongside it. You put a facade or proxy in front of the old system that intercepts requests. Initially, it routes everything to the legacy system. Then you build new services piece by piece, and update the facade to route those specific requests to the new services instead. Over time, more and more functionality moves to the new architecture until the old system is completely replaced and can be shut down. This approach is much safer than a full rewrite because you can do it incrementally, test each piece, and roll back if needed. It also lets you deliver value continuously rather than waiting years for a big rewrite to complete.",
            "Named after strangler fig trees that grow around and eventually replace their host, this pattern is how you migrate from a legacy system without the risk of a big-bang rewrite. You place a routing layer in front of your monolith. Initially, everything goes to the old system. Then you build new functionality as microservices and gradually redirect specific routes to them. For each feature you extract, you update the router: requests for user profiles now go to the new User Service instead of the monolith. Over months or years, you extract more and more until the old system handles nothing and can be decommissioned. The beauty is risk management - each migration is small and reversible. If the new service has issues, route traffic back. You ship continuously and learn as you go rather than betting everything on a multi-year rewrite."
        ],
    },
    {
        text: "What is distributed tracing?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum.monitoring, ValidTag.enum.tracing],
        answers: [
            "Distributed tracing is a technique for tracking requests as they flow through a microservices architecture. When a user makes a request, it might touch five or ten different services before completing. Distributed tracing assigns a unique trace ID to that request and tracks it through every service, recording timing information at each step. Each service adds spans to the trace showing what work it did and how long it took. This creates a complete picture of the request's journey through your system. Tools like Jaeger, Zipkin, and AWS X-Ray visualize this as a timeline showing you exactly where time was spent and where failures occurred. This is incredibly valuable for debugging performance issues or errors in distributed systems because you can see if the problem is network latency between services, a slow database query in a specific service, or something else. Without distributed tracing, troubleshooting issues across multiple services is extremely difficult.",
            "When a single request bounces through five services, how do you debug latency or find where an error originated? Distributed tracing solves this. It assigns a unique trace ID to each incoming request and propagates it through every service call. Each service reports spans - units of work with start time, duration, and metadata. Tools like Jaeger or Zipkin collect these spans and reconstruct the complete request flow as a waterfall diagram. You can see that the API Gateway took 5ms, the User Service took 20ms, the database query inside it took 15ms, and the Notification Service took 200ms - there's your bottleneck. For error debugging, you can filter traces by error status and immediately see which service threw the exception. It requires instrumentation in your code or service mesh to propagate trace headers, but it's indispensable for operating microservices. Without it, you're flying blind."
        ],
    },
    {
        text: "What are the 12-factor app principles?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["system-design"]],
        answers: [
            "The 12-factor app is a methodology for building modern, cloud-native applications, particularly suited for microservices. Some key principles include: storing config in environment variables rather than code, treating backing services like databases as attached resources, strictly separating build and run stages, running the app as stateless processes, and exporting services via port binding. Other factors cover keeping dev and prod environments as similar as possible, treating logs as event streams, running admin tasks as one-off processes, and maintaining a single codebase tracked in version control. The principles also emphasize explicitly declaring dependencies, executing the app as one or more stateless processes, and enabling fast startup and graceful shutdown. These principles help create applications that are easy to deploy, scale horizontally, and run reliably in cloud environments. They've become foundational practices for building microservices and cloud-native applications.",
            "The 12-factor methodology is a set of best practices for building apps that run well in the cloud. The key ones: keep one codebase in version control, deploy to multiple environments. Store config in environment variables, not code - no secrets in git. Treat databases, caches, and queues as attached resources you can swap. Keep your processes stateless so any instance can handle any request. Export your service through port binding rather than relying on a web server container. Scale by running more processes, not bigger ones. Handle logs as event streams that the environment routes, don't write log files. Make dev, staging, and prod as similar as possible. Run admin tasks as one-off processes in the same environment. Start fast and shut down gracefully. These principles make your app portable, scalable, and suitable for container orchestration. They're basically table stakes for modern cloud-native development."
        ],
    },

    // Advanced Design Patterns
    {
        text: "What is the command pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The command pattern encapsulates a request as an object, which lets you parameterize clients with different requests, queue requests, and support undoable operations. Instead of directly calling a method, you create a command object that knows how to execute the action. This object has an execute method and optionally an undo method. For example, in a text editor, each action like typing, deleting, or formatting could be a command object. This lets you easily implement undo/redo by keeping a stack of executed commands. It also decouples the object that invokes the operation from the one that knows how to perform it. You see this pattern in GUI buttons where the button doesn't need to know what action it triggers, job queues where you can schedule and prioritize commands, and macro recording where you capture a sequence of commands to replay later. It makes your code more flexible and enables powerful features like logging all operations, implementing transactional behavior, or distributing commands across a network.",
            "Command turns a method call into an object. Instead of calling document.save() directly, you create a SaveCommand object with an execute() method. Why bother? It enables powerful capabilities. Undo/redo becomes trivial: each command has an undo() method, you keep a history stack, and reversal is just popping and undoing. Queuing becomes possible: serialize commands and execute them later or on another machine. Macro recording: capture a sequence of commands and replay them. Logging: record every command for audit trails. The invoker doesn't need to know what operation it's triggering - hand it any command and it calls execute(). Text editors, game engines, and transaction systems use this heavily. It adds a bit of ceremony - you're creating objects instead of calling methods - but the flexibility is worth it when you need these capabilities."
        ],
    },
    {
        text: "What is CQRS?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.cqrs],
        answers: [
            "CQRS stands for Command Query Responsibility Segregation. It's a pattern that separates read operations from write operations by using different models for each. Commands change state but don't return data, while queries return data but don't change state. In practice, this often means having separate data models, services, and sometimes even databases for reads and writes. The write side might be optimized for transactional consistency and business rules, while the read side is optimized for query performance and can be denormalized. This is particularly useful when you have very different requirements for reading and writing - for example, complex business logic for updates but simple, fast queries for displaying data. You often see CQRS paired with event sourcing, where the write side stores events and the read side builds projections from those events. The benefits are better performance through optimization of each side independently, and clearer separation of concerns. The downside is added complexity and the need to handle eventual consistency between the read and write models.",
            "CQRS splits your system into two separate models: one for writes, one for reads. The write model handles commands - operations that change state. The read model handles queries - operations that return data. They can use different data structures, different databases, even different services. Why do this? Because reads and writes often have completely different requirements. Writes need to enforce business rules and maintain consistency. Reads need to be fast and might require data shaped very differently than how it's stored. By separating them, you can optimize each independently. The write side might use a normalized relational model with complex validation. The read side might use denormalized views or search indexes for speed. The tradeoff is complexity: you're maintaining two models that must stay in sync, usually through events. It pairs naturally with event sourcing. Don't use it unless you have clear asymmetric scaling needs or very different read/write patterns."
        ],
    },
    {
        text: "What is event sourcing?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum["event-sourcing"]],
        answers: [
            "Event sourcing is a pattern where you store the history of state changes as a sequence of events rather than just storing the current state. Instead of saving 'user balance is $100', you save events like 'deposited $50', 'withdrew $20', 'deposited $70'. The current state is derived by replaying all events from the beginning. This gives you a complete audit trail of everything that happened in your system, which is valuable for debugging, compliance, and analytics. You can reconstruct the state at any point in time by replaying events up to that moment. It also enables powerful features like time travel debugging and the ability to project the same events into different read models. Event sourcing pairs naturally with CQRS - the event store is your write model, and you build read models by consuming events. The challenges are increased storage requirements since you keep all events forever, and the need to handle schema evolution as your event structures change over time. It's commonly used in financial systems, e-commerce, and any domain where audit trails are critical.",
            "Instead of storing current state, you store the sequence of events that led to it. A bank account isn't stored as 'balance: $500' - it's a log of 'AccountOpened', 'Deposited $300', 'Withdrew $100', 'Deposited $300'. Current state is computed by replaying events. This sounds strange, but the benefits are significant. You get a complete audit trail by default - invaluable in finance, healthcare, or anywhere compliance matters. You can rebuild state at any point in time for debugging. You can build multiple read models from the same events - one for the web app, one for analytics, one for search. It pairs naturally with CQRS. The challenges are real though: storage grows forever, you need to handle event schema evolution carefully, and rebuilding state from millions of events requires snapshots. It's not for every application, but for domains where history matters, it's powerful."
        ],
    },
    {
        text: "What is the saga pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["saga-pattern"]],
        answers: [
            "The saga pattern is a way to manage data consistency across microservices without using distributed transactions. It works by breaking a business transaction into a sequence of local transactions, where each service performs its own transaction and publishes an event. The next service listens for that event and performs its transaction, and so on. If any step fails, the saga executes compensating transactions to undo the changes made by previous steps. There are two main implementation approaches: choreography, where services listen to events and know what to do next, and orchestration, where a central coordinator tells each service what to do. For example, in an order system, you might have steps for reserving inventory, charging payment, and creating shipment. If payment fails, you'd compensate by unreserving the inventory. It's more complex than traditional transactions but necessary in distributed systems.",
            "Since you can't do ACID transactions across microservices, sagas provide an alternative. A saga is a sequence of local transactions where each step either succeeds and triggers the next, or fails and triggers compensating transactions to roll back previous steps. Say you're placing an order: reserve inventory, charge payment, schedule shipping. If payment fails after inventory is reserved, you run a compensating transaction to unreserve it. There are two coordination approaches: choreography, where services react to events - Inventory Service sees OrderPlaced and reserves stock, Payment Service sees InventoryReserved and charges - and orchestration, where a central saga coordinator explicitly tells each service what to do and handles failures. Choreography is decentralized but can get tangled. Orchestration is more explicit but adds a coordination service. Either way, you need to design compensating actions for every step, which forces you to think carefully about failure modes."
        ],
    },
    {
        text: "How do you handle distributed transactions in microservices?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["distributed-transactions"]],
        answers: [
            "Distributed transactions are one of the hardest problems in microservices because traditional ACID transactions don't work well across service boundaries. The most common approach is to avoid them when possible by rethinking your service boundaries. When you can't avoid them, you typically use the saga pattern, which breaks the transaction into a series of local transactions in each service. If something fails partway through, you execute compensating transactions to undo the previous steps. Another approach is eventual consistency, where you accept that data might be temporarily out of sync but will eventually become consistent through event processing. Some teams use a two-phase commit protocol, but it's generally discouraged because it's complex and can create availability issues. The key is designing your system so that most operations can be handled within a single service's boundary.",
            "The honest answer is: try not to need them. If a business operation requires updating data in multiple services atomically, that's often a sign your service boundaries are wrong. First, see if you can redesign so the transaction stays within one service. When you genuinely can't avoid it, you have options. The saga pattern is most common - a sequence of local transactions with compensating actions if something fails. You accept eventual consistency rather than immediate atomicity. Two-phase commit exists but creates availability problems and tight coupling, so it's generally avoided. The outbox pattern helps: write your data change and the event to publish in the same local transaction, then a separate process publishes the event. This guarantees at-least-once event delivery. You also need idempotent operations so retries are safe. The bottom line is that distributed transactions are painful by design - microservices trade consistency for availability and partition tolerance."
        ],
    },
];
