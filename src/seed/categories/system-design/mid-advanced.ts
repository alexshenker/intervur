import { Category, Level, ValidTag } from "../../../db";
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
            "A service mesh is an infrastructure layer that handles service-to-service communication in a microservices architecture. It typically works by deploying a lightweight proxy, called a sidecar, alongside each service instance. These proxies handle all the network traffic between services and provide features like automatic retries, timeouts, circuit breaking, load balancing, and mutual TLS for security. The key benefit is that these capabilities are handled outside your application code, so developers don't have to implement them in each service. Popular service meshes include Istio and Linkerd. The mesh also collects telemetry data, giving you deep visibility into how services are communicating. The downside is added complexity and resource overhead from running all those sidecar proxies, so it's typically only worth it for larger microservice deployments."
        ],
    },
    {
        text: "What is the strangler fig pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["design-patterns"]],
        answers: [
            "The strangler fig pattern is a strategy for incrementally migrating from a legacy monolithic system to microservices without doing a risky big-bang rewrite. It's named after strangler fig trees that grow around existing trees. The idea is to gradually replace functionality in the old system by building new services alongside it. You put a facade or proxy in front of the old system that intercepts requests. Initially, it routes everything to the legacy system. Then you build new services piece by piece, and update the facade to route those specific requests to the new services instead. Over time, more and more functionality moves to the new architecture until the old system is completely replaced and can be shut down. This approach is much safer than a full rewrite because you can do it incrementally, test each piece, and roll back if needed. It also lets you deliver value continuously rather than waiting years for a big rewrite to complete."
        ],
    },
    {
        text: "What is distributed tracing?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum.monitoring, ValidTag.enum.tracing],
        answers: [
            "Distributed tracing is a technique for tracking requests as they flow through a microservices architecture. When a user makes a request, it might touch five or ten different services before completing. Distributed tracing assigns a unique trace ID to that request and tracks it through every service, recording timing information at each step. Each service adds spans to the trace showing what work it did and how long it took. This creates a complete picture of the request's journey through your system. Tools like Jaeger, Zipkin, and AWS X-Ray visualize this as a timeline showing you exactly where time was spent and where failures occurred. This is incredibly valuable for debugging performance issues or errors in distributed systems because you can see if the problem is network latency between services, a slow database query in a specific service, or something else. Without distributed tracing, troubleshooting issues across multiple services is extremely difficult."
        ],
    },
    {
        text: "What are the 12-factor app principles?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["system-design"]],
        answers: [
            "The 12-factor app is a methodology for building modern, cloud-native applications, particularly suited for microservices. Some key principles include: storing config in environment variables rather than code, treating backing services like databases as attached resources, strictly separating build and run stages, running the app as stateless processes, and exporting services via port binding. Other factors cover keeping dev and prod environments as similar as possible, treating logs as event streams, running admin tasks as one-off processes, and maintaining a single codebase tracked in version control. The principles also emphasize explicitly declaring dependencies, executing the app as one or more stateless processes, and enabling fast startup and graceful shutdown. These principles help create applications that are easy to deploy, scale horizontally, and run reliably in cloud environments. They've become foundational practices for building microservices and cloud-native applications."
        ],
    },

    // Advanced Concurrency
    {
        text: "What is the actor model?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency, ValidTag.enum["design-patterns"]],
        answers: [
            "The actor model is a concurrency pattern where 'actors' are the fundamental units of computation. Each actor is an independent entity that has its own private state and communicates with other actors exclusively through asynchronous message passing - they never share state directly. When an actor receives a message, it can do three things: create new actors, send messages to other actors, or change its own private state. The key benefit is that you avoid all the complexity of locks, mutexes, and shared memory synchronization because actors are isolated. This makes it much easier to reason about concurrent systems and avoid bugs like race conditions and deadlocks. It's particularly well-suited for distributed systems. Erlang and Elixir are built around this model, and frameworks like Akka bring it to the JVM. The downside is that it requires thinking differently about program structure, and debugging can be challenging since you're dealing with asynchronous message flows rather than direct function calls."
        ],
    },

    // Advanced Design Patterns
    {
        text: "What is the command pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The command pattern encapsulates a request as an object, which lets you parameterize clients with different requests, queue requests, and support undoable operations. Instead of directly calling a method, you create a command object that knows how to execute the action. This object has an execute method and optionally an undo method. For example, in a text editor, each action like typing, deleting, or formatting could be a command object. This lets you easily implement undo/redo by keeping a stack of executed commands. It also decouples the object that invokes the operation from the one that knows how to perform it. You see this pattern in GUI buttons where the button doesn't need to know what action it triggers, job queues where you can schedule and prioritize commands, and macro recording where you capture a sequence of commands to replay later. It makes your code more flexible and enables powerful features like logging all operations, implementing transactional behavior, or distributing commands across a network."
        ],
    },
    {
        text: "What is CQRS?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.cqrs],
        answers: [
            "CQRS stands for Command Query Responsibility Segregation. It's a pattern that separates read operations from write operations by using different models for each. Commands change state but don't return data, while queries return data but don't change state. In practice, this often means having separate data models, services, and sometimes even databases for reads and writes. The write side might be optimized for transactional consistency and business rules, while the read side is optimized for query performance and can be denormalized. This is particularly useful when you have very different requirements for reading and writing - for example, complex business logic for updates but simple, fast queries for displaying data. You often see CQRS paired with event sourcing, where the write side stores events and the read side builds projections from those events. The benefits are better performance through optimization of each side independently, and clearer separation of concerns. The downside is added complexity and the need to handle eventual consistency between the read and write models."
        ],
    },
    {
        text: "What is event sourcing?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum["event-sourcing"]],
        answers: [
            "Event sourcing is a pattern where you store the history of state changes as a sequence of events rather than just storing the current state. Instead of saving 'user balance is $100', you save events like 'deposited $50', 'withdrew $20', 'deposited $70'. The current state is derived by replaying all events from the beginning. This gives you a complete audit trail of everything that happened in your system, which is valuable for debugging, compliance, and analytics. You can reconstruct the state at any point in time by replaying events up to that moment. It also enables powerful features like time travel debugging and the ability to project the same events into different read models. Event sourcing pairs naturally with CQRS - the event store is your write model, and you build read models by consuming events. The challenges are increased storage requirements since you keep all events forever, and the need to handle schema evolution as your event structures change over time. It's commonly used in financial systems, e-commerce, and any domain where audit trails are critical."
        ],
    },
    {
        text: "What is the saga pattern?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["saga-pattern"]],
        answers: [
            "The saga pattern is a way to manage data consistency across microservices without using distributed transactions. It works by breaking a business transaction into a sequence of local transactions, where each service performs its own transaction and publishes an event. The next service listens for that event and performs its transaction, and so on. If any step fails, the saga executes compensating transactions to undo the changes made by previous steps. There are two main implementation approaches: choreography, where services listen to events and know what to do next, and orchestration, where a central coordinator tells each service what to do. For example, in an order system, you might have steps for reserving inventory, charging payment, and creating shipment. If payment fails, you'd compensate by unreserving the inventory. It's more complex than traditional transactions but necessary in distributed systems."
        ],
    },
    {
        text: "How do you handle distributed transactions in microservices?",
        level: Level.enum["mid-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["distributed-transactions"]],
        answers: [
            "Distributed transactions are one of the hardest problems in microservices because traditional ACID transactions don't work well across service boundaries. The most common approach is to avoid them when possible by rethinking your service boundaries. When you can't avoid them, you typically use the saga pattern, which breaks the transaction into a series of local transactions in each service. If something fails partway through, you execute compensating transactions to undo the previous steps. Another approach is eventual consistency, where you accept that data might be temporarily out of sync but will eventually become consistent through event processing. Some teams use a two-phase commit protocol, but it's generally discouraged because it's complex and can create availability issues. The key is designing your system so that most operations can be handled within a single service's boundary."
        ],
    },
];
