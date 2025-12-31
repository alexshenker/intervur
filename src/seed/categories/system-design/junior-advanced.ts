import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum["system-design"],
    typeof Level.enum["junior-advanced"]
>[] = [
    // Microservices Basics
    {
        text: "What is a microservice architecture and when would you use it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["system-design"]],
        answers: [
            "Microservice architecture is an approach where you break down your application into smaller, independent services that each handle a specific business capability. Each service runs in its own process, has its own database, and communicates with other services through well-defined APIs. You'd typically use this when you have a large, complex application that needs to scale independently in different areas, when you have multiple teams that need to work autonomously, or when different parts of your system have different technology requirements. It's particularly useful for organizations that need to deploy frequently and want to isolate failures - if one service goes down, it doesn't necessarily bring down the entire system."
        ],
    },
    {
        text: "What are the differences between monolithic and microservices architectures?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["system-design"]],
        answers: [
            "The main difference is how the application is structured. In a monolithic architecture, everything is built as a single, unified unit - all your code, business logic, and data access layers are tightly coupled and deployed together. With microservices, you split that into multiple independent services. Monoliths are simpler to develop and deploy initially, and there's no network latency between components since everything runs in one process. However, they can become difficult to scale and maintain as they grow. Microservices give you better scalability since you can scale individual services independently, better fault isolation, and more flexibility with technology choices. The tradeoff is increased complexity in deployment, monitoring, and handling distributed system challenges like network calls and data consistency."
        ],
    },
    {
        text: "How do microservices communicate with each other?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices],
        answers: [
            "There are two main patterns for microservice communication. First is synchronous communication, typically using REST APIs or gRPC, where one service makes a direct request to another and waits for a response. This is straightforward but creates tight coupling and can be problematic if a service is down. The second is asynchronous communication using message queues or event streams like RabbitMQ, Kafka, or AWS SQS. With this approach, services publish events or messages that other services subscribe to, which provides better decoupling and resilience. In practice, most systems use a combination of both - synchronous for things like user-facing queries where you need immediate responses, and asynchronous for background processing or when you want to handle temporary service outages gracefully."
        ],
    },
    {
        text: "What is an API Gateway and why is it useful?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["api-gateway"]],
        answers: [
            "An API Gateway is a single entry point that sits between your clients and your microservices. It handles routing requests to the appropriate backend services, but it does much more than that. It's useful because it centralizes cross-cutting concerns like authentication, rate limiting, request logging, and SSL termination. Without a gateway, each client would need to know about all your individual services and handle things like security and retries themselves. The gateway can also do request aggregation, where it combines calls to multiple services into a single response, which is particularly helpful for mobile clients trying to minimize network calls. Popular solutions include Kong, AWS API Gateway, and Nginx. The tradeoff is that it becomes a critical component that needs to be highly available since all traffic flows through it."
        ],
    },

    // Concurrency Basics
    {
        text: "What is a race condition?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency],
        answers: [
            "A race condition occurs when the behavior of your program depends on the timing or sequence of uncontrollable events, like thread scheduling or task execution order. It happens when multiple threads or processes access shared data concurrently, and at least one is modifying it, leading to unpredictable results. A classic example is two threads trying to increment a counter - they both read the value as 5, increment it to 6, and write it back, so you end up with 6 instead of 7. Race conditions are particularly nasty because they're often intermittent and hard to reproduce - the bug might only appear under specific timing conditions. You prevent them using synchronization mechanisms like locks, mutexes, or atomic operations to ensure that only one thread can access the critical section of code at a time. In languages like JavaScript with its single-threaded event loop, you still get race conditions with async operations if you're not careful about state management."
        ],
    },
    {
        text: "What is the difference between concurrency and parallelism?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency],
        answers: [
            "Concurrency and parallelism are related but different concepts. Concurrency is about dealing with multiple things at once - it's about structure. You have multiple tasks in progress, and you're managing them, but they might not all be executing simultaneously. Think of a single-core CPU running multiple programs by rapidly switching between them. Parallelism is about doing multiple things at once - it's about execution. You're literally running multiple tasks simultaneously, which requires multiple cores or processors. A good analogy is a single person juggling multiple tasks versus multiple people each working on their own task. JavaScript's async/await is concurrent but not parallel - it handles multiple operations but on a single thread. Meanwhile, Web Workers enable true parallelism by running code on separate threads. You can have concurrency without parallelism, parallelism without concurrency, or both together. Modern systems typically use both to handle multiple tasks efficiently."
        ],
    },

    // Design Pattern Basics
    {
        text: "What is dependency injection and why is it useful?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum["dependency-injection"]],
        answers: [
            "Dependency injection is a pattern where you provide objects with their dependencies from the outside rather than having them create dependencies themselves. Instead of a class instantiating the services it needs internally, those dependencies are 'injected' through the constructor, method parameters, or property setters. This is useful for several reasons. First, it makes your code more testable - you can easily inject mock dependencies during testing. Second, it reduces coupling because your class depends on interfaces or abstractions rather than concrete implementations. Third, it makes your code more flexible and maintainable since you can swap implementations without changing the class itself. For example, instead of a UserService creating its own database connection, you inject a database interface, which means you can inject a real database in production and a mock in tests. DI containers like those in Angular, Spring, or NestJS automate this process by managing object creation and wiring dependencies together. The downside is it can add complexity and make it harder to trace where objects come from."
        ],
    },
    {
        text: "What is SOLID principles?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.solid],
        answers: [
            "SOLID is an acronym for five object-oriented design principles that help create more maintainable and flexible code. Single Responsibility means a class should have only one reason to change - it should do one thing well. Open/Closed means classes should be open for extension but closed for modification - you should be able to add new functionality without changing existing code. Liskov Substitution means you should be able to replace a parent class with any of its subclasses without breaking the program. Interface Segregation means clients shouldn't be forced to depend on interfaces they don't use - it's better to have many specific interfaces than one general-purpose one. Dependency Inversion means high-level modules shouldn't depend on low-level modules - both should depend on abstractions. These principles guide you toward code that's easier to test, extend, and refactor. They're not strict rules but guidelines that help avoid common pitfalls like tight coupling and rigid architectures. Following them tends to result in cleaner, more modular code."
        ],
    },
    {
        text: "What is the difference between composition and inheritance?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.oop],
        answers: [
            "Inheritance and composition are two ways to achieve code reuse, but they work differently. Inheritance is an 'is-a' relationship where a class extends another class, inheriting its properties and methods. For example, a Dog class might inherit from an Animal class. Composition is a 'has-a' relationship where a class contains instances of other classes to use their functionality. For example, a Car class might contain an Engine object and a Transmission object. The common wisdom is to favor composition over inheritance because inheritance creates tight coupling - changes to the parent class can break child classes. It also forces you into rigid hierarchies that can be hard to change later. Composition is more flexible - you can swap out components easily and combine different behaviors at runtime. However, inheritance isn't bad - it works well for modeling true hierarchical relationships and can make code more intuitive when the relationship genuinely is an 'is-a' relationship. Modern practice often uses both, but leans toward composition for flexibility."
        ],
    },
    {
        text: "What is the factory pattern?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The factory pattern is a creational design pattern that provides an interface for creating objects without specifying their exact class. Instead of calling 'new' directly to instantiate objects, you call a factory method that decides which class to instantiate based on input parameters or configuration. For example, you might have a ShapeFactory with a createShape method that returns a Circle, Square, or Triangle based on a string parameter. This is useful because it encapsulates object creation logic, making your code more flexible - if you need to change how objects are created or add new types, you only change the factory, not all the places that create objects. It also helps with dependency injection and testing since you can easily swap out the factory to return mock objects. There are variations like Simple Factory, Factory Method, and Abstract Factory, each with slightly different structures. The pattern is particularly helpful when object creation is complex or when the exact type to create depends on runtime conditions."
        ],
    },
    {
        text: "What is the singleton pattern and when would you use it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The singleton pattern ensures a class has only one instance throughout your application and provides a global point of access to it. You implement it by making the constructor private and providing a static method that returns the single instance, creating it on first access if it doesn't exist. You'd use it for things like configuration managers, logging services, database connection pools, or caching mechanisms - resources that should be shared across your application and where multiple instances would be wasteful or problematic. However, singletons are somewhat controversial in modern development. They introduce global state, which makes testing harder since you can't easily replace them with mocks, and they can hide dependencies rather than making them explicit. They also make it difficult to control initialization order and can cause issues in multi-threaded environments if not implemented carefully. Many developers now prefer dependency injection instead, where you configure your DI container to always return the same instance rather than using a true singleton."
        ],
    },
    {
        text: "What is the observer pattern?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically. You have a 'subject' that maintains a list of 'observers' and notifies them of state changes, usually by calling one of their methods. It's the foundation of event-driven programming and is everywhere in modern development. For example, in a user interface, when a model's data changes, all the views observing that model get notified and update themselves. The publish-subscribe pattern is a variation where there's more decoupling between publishers and subscribers, often using an event bus. This pattern is great for maintaining consistency across different parts of your application and creating loosely coupled systems. You see it in DOM event listeners, React's state management, RxJS observables, and countless other places. The downside is that it can make the flow of your program harder to follow since updates happen implicitly, and you can accidentally create memory leaks if observers aren't properly unsubscribed."
        ],
    },
];
