import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum["system-design"],
    typeof Level.enum.mid
>[] = [
    // Microservices
    {
        text: "What is service discovery?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["service-discovery"]],
        answers: [
            "Service discovery is the mechanism that allows microservices to find and communicate with each other dynamically. In a microservices environment, services can be deployed across multiple servers and their locations can change as you scale up or down, or when instances fail and restart. Rather than hardcoding IP addresses and ports, you use a service registry like Consul, Eureka, or etcd where services register themselves when they start up. When a service needs to call another service, it queries the registry to get the current location. There are two approaches - client-side discovery where the client queries the registry directly, and server-side discovery where you use a load balancer that handles the registry lookup. Most modern platforms like Kubernetes have built-in service discovery capabilities."
        ],
    },
    {
        text: "What are the benefits and challenges of microservices?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices],
        answers: [
            "The main benefits are independent scalability, where you can scale just the services that need it, better fault isolation so failures are contained, and team autonomy since different teams can own different services and deploy independently. You also get technology flexibility - each service can use whatever language or database makes sense for its specific use case. The challenges are significant though. You're dealing with distributed system complexity like network latency and failures, data consistency across services becomes harder, and you need sophisticated deployment and monitoring infrastructure. Debugging issues that span multiple services is more difficult, and there's operational overhead in managing many more deployable units. Testing end-to-end flows is also more complex. Generally, microservices make sense when you have the organizational scale and problems to justify the added complexity."
        ],
    },
    {
        text: "What is eventual consistency?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["eventual-consistency"]],
        answers: [
            "Eventual consistency is a consistency model used in distributed systems where data doesn't have to be synchronized immediately across all nodes or services, but will become consistent over time. Instead of requiring all updates to happen atomically like in traditional ACID transactions, you accept that there might be a period where different parts of the system have different views of the data. For example, if you update a user's profile, different services might see the old version for a few seconds or minutes before the changes propagate. This is usually implemented through asynchronous messaging or event streaming. The benefit is better availability and performance since you don't have to wait for all systems to acknowledge the change. The tradeoff is complexity in handling scenarios where users might see stale data, so you need to design your application logic to handle temporary inconsistencies gracefully."
        ],
    },
    {
        text: "How do you handle versioning in microservices?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["api-versioning"]],
        answers: [
            "API versioning in microservices is critical because you need to evolve services without breaking existing clients. The most common approaches are URL versioning like /v1/users or /v2/users, header-based versioning where the client specifies the version in a custom header, or content negotiation using the Accept header. URL versioning is simple and explicit, which makes it easy to route and debug. The general strategy is to maintain backward compatibility as much as possible by making additive changes only - adding new fields is fine, but removing fields or changing behavior requires a new version. You'll typically run multiple versions of a service simultaneously during a transition period. It's important to have a deprecation policy where you announce version sunsets well in advance. The goal is to give clients time to migrate while not maintaining too many versions indefinitely, which becomes a maintenance burden."
        ],
    },
    {
        text: "What is circuit breaking and why is it important?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["circuit-breaker"]],
        answers: [
            "A circuit breaker is a design pattern that prevents cascading failures in distributed systems. It works like an electrical circuit breaker - it monitors calls to a downstream service, and if failures reach a certain threshold, the circuit 'opens' and immediately fails subsequent calls without even attempting them. This gives the failing service time to recover instead of being overwhelmed with requests. After a timeout period, the circuit goes into a 'half-open' state where it lets a few test requests through. If those succeed, it closes the circuit and resumes normal operation. If they fail, it opens again. This is important because in microservices, when one service goes down, you don't want all your other services to waste resources waiting for timeouts or making doomed requests. Libraries like Hystrix and Resilience4j implement this pattern. It helps prevent resource exhaustion and improves overall system resilience."
        ],
    },
    {
        text: "How do you monitor microservices?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum.monitoring],
        answers: [
            "Monitoring microservices requires a multi-layered approach. First, you need metrics collection using tools like Prometheus or Datadog to track things like request rates, error rates, latency, and resource usage for each service. You typically follow the RED method - Rate, Errors, and Duration. Second, you need centralized logging since logs are distributed across many services. Tools like the ELK stack or Splunk aggregate logs from all services into one place where you can search and correlate them. Third, you need distributed tracing with tools like Jaeger or Zipkin to track requests as they flow through multiple services, which is crucial for debugging performance issues. You also want health checks and alerting so you're notified when services go down or performance degrades. Finally, dashboards that visualize the health of your entire system help you spot patterns and issues quickly. The key is having visibility into both individual services and the system as a whole."
        ],
    },

    // Concurrency
    {
        text: "What is deadlock and how do you prevent it?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency],
        answers: [
            "A deadlock is a situation where two or more threads are blocked forever, each waiting for the other to release a resource. The classic example is Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1 - they're stuck waiting for each other indefinitely. Deadlock requires four conditions: mutual exclusion, hold and wait, no preemption, and circular wait. To prevent it, you can break any of these conditions. The most common approach is to avoid circular wait by acquiring locks in a consistent global order - if all threads always acquire Lock 1 before Lock 2, they can't deadlock. You can also use timeouts so threads don't wait forever, or try to acquire all locks at once and back off if you can't get them all. Lock-free data structures using atomic operations can avoid the problem entirely. In databases, the system typically detects deadlocks and aborts one of the transactions to break the cycle."
        ],
    },
    {
        text: "What are the different ways to handle concurrency in JavaScript?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency, ValidTag.enum.javascript],
        answers: [
            "JavaScript has several mechanisms for handling concurrency. The foundation is the event loop with callbacks, where asynchronous operations like network requests or timers register callbacks that execute when the operation completes. Promises improved on this by providing a cleaner way to handle async operations and chain them together. Async/await built on promises to make asynchronous code look and behave more like synchronous code, which is much easier to read and reason about. For CPU-intensive tasks that would block the main thread, you can use Web Workers, which run JavaScript in separate threads and communicate via message passing. Service Workers are similar but designed for background tasks like caching and push notifications. There's also the newer Atomics and SharedArrayBuffer APIs for low-level concurrent programming with shared memory, though they're less commonly used. The key is that JavaScript's concurrency model is primarily single-threaded and event-driven, avoiding many traditional multi-threading issues while still handling many operations concurrently."
        ],
    },
    {
        text: "What is optimistic vs pessimistic locking?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency, ValidTag.enum.databases],
        answers: [
            "These are two different strategies for handling concurrent access to data. Pessimistic locking assumes conflicts will happen, so it locks the data when you read it, preventing others from modifying it until you're done. It's like checking out a book from a library - nobody else can take it while you have it. This guarantees you won't have conflicts, but it can reduce concurrency and lead to contention if many users are trying to access the same data. Optimistic locking assumes conflicts are rare, so it doesn't lock anything. Instead, it tracks a version number or timestamp. When you try to save your changes, it checks if the version has changed since you read it. If it has, someone else modified it, and your update is rejected. This allows much better concurrency since multiple people can read and work with the data simultaneously, but you have to handle the case where updates fail. Optimistic locking works well for low-conflict scenarios, while pessimistic locking is better when conflicts are common or when failing an update is costly."
        ],
    },
    // Architecture/Design Patterns
    {
        text: "What is the repository pattern?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The repository pattern is a design pattern that creates an abstraction layer between your business logic and data access code. Essentially, it provides a collection-like interface for accessing domain objects, hiding the details of how data is stored and retrieved. Instead of having database queries scattered throughout your application, you centralize them in repository classes. For example, you might have a UserRepository with methods like findById, findByEmail, and save. Your business logic just calls these methods without knowing whether the data comes from a SQL database, MongoDB, an API, or even an in-memory cache. This makes your code more testable since you can easily mock the repository, and it makes it easier to switch data sources. It also keeps your domain models clean - they don't need to know about database details. The pattern works particularly well with ORMs and is common in Domain-Driven Design. The main criticism is that it can add a layer of indirection, and if not done carefully, repositories can become bloated with too many specific query methods."
        ],
    },
    {
        text: "What is the adapter pattern?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The adapter pattern is a structural design pattern that allows incompatible interfaces to work together. It acts as a bridge between two interfaces by wrapping one interface to make it compatible with another. Think of it like a power adapter that lets you plug a US device into a European outlet. In software, you might have a third-party library with one interface, but your code expects a different interface. Rather than changing all your code or the library, you create an adapter class that translates between them. For example, if you're switching from one payment provider to another with different APIs, you could create adapters for each that implement a common payment interface. This keeps your business logic clean and makes it easy to swap implementations. The adapter can do simple translation of method names and parameters, or more complex transformations of data formats. It's particularly useful when integrating legacy code with new systems or when you want to use a library but isolate your code from its specific API."
        ],
    },
    {
        text: "What is the decorator pattern?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The decorator pattern lets you add new functionality to objects dynamically by wrapping them in decorator objects that have the same interface. It's a way to extend behavior without modifying the original class or using inheritance. You start with a base component, then wrap it in decorator classes that add additional responsibilities. Each decorator implements the same interface as the component it's decorating, so you can stack multiple decorators. A classic example is a coffee ordering system - you have a base Coffee class, then decorators like Milk, Sugar, and WhippedCream that each add to the cost and description. You can combine them in any way at runtime. This is more flexible than inheritance because you can mix and match behaviors, and you follow the Open/Closed principle by extending functionality without modifying existing code. You see this pattern in Java's I/O streams, React higher-order components, and Python decorators, though the latter is a language feature inspired by the pattern rather than a direct implementation."
        ],
    },
    {
        text: "What is the strategy pattern?",
        level: Level.enum.mid,
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Instead of having complex conditional logic to choose between different algorithms, you define a common interface and implement different strategies that conform to it. At runtime, you select which strategy to use. For example, you might have different sorting strategies like QuickSort, MergeSort, and BubbleSort, all implementing a Sorter interface. Your code uses the Sorter interface without knowing the specific implementation. This makes your code more flexible and maintainable because you can add new strategies without modifying existing code, and you can switch strategies easily, even at runtime. It's commonly used for things like payment processing where you might support credit cards, PayPal, and cryptocurrency, or validation where different fields have different validation rules. The pattern eliminates conditional statements and makes testing easier since you can test each strategy independently. The tradeoff is a slight increase in the number of classes."
        ],
    },
];
