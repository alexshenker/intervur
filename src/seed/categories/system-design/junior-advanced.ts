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
            "Microservice architecture is an approach where you break down your application into smaller, independent services that each handle a specific business capability. Each service runs in its own process, has its own database, and communicates with other services through well-defined APIs. You'd typically use this when you have a large, complex application that needs to scale independently in different areas, when you have multiple teams that need to work autonomously, or when different parts of your system have different technology requirements. It's particularly useful for organizations that need to deploy frequently and want to isolate failures - if one service goes down, it doesn't necessarily bring down the entire system.",
            "Think of microservices as building your application like LEGO blocks instead of carving it from a single piece of stone. Each service owns one specific business function - maybe user authentication, payment processing, or inventory management - and they communicate over the network via APIs or message queues. You'd reach for this architecture when your team is growing and you need people to work independently without stepping on each other's code, or when different parts of your system need to scale differently. For instance, your checkout service might need ten instances during a sale while your user profile service stays at two. The tradeoff is operational complexity - you're now managing a distributed system with all that entails."
        ],
    },
    {
        text: "What are the differences between monolithic and microservices architectures?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["system-design"]],
        answers: [
            "The main difference is how the application is structured. In a monolithic architecture, everything is built as a single, unified unit - all your code, business logic, and data access layers are tightly coupled and deployed together. With microservices, you split that into multiple independent services. Monoliths are simpler to develop and deploy initially, and there's no network latency between components since everything runs in one process. However, they can become difficult to scale and maintain as they grow. Microservices give you better scalability since you can scale individual services independently, better fault isolation, and more flexibility with technology choices. The tradeoff is increased complexity in deployment, monitoring, and handling distributed system challenges like network calls and data consistency.",
            "A monolith is a single deployable unit containing all your application logic - one codebase, one database, one deployment. It's straightforward to develop, test locally, and debug since everything's in one place. Microservices break that into separate services that deploy and run independently. The key differences come down to scaling, deployment, and team dynamics. With a monolith, you scale everything together even if only one feature needs more capacity. With microservices, you scale just what needs it. For deployment, a monolith means deploying the whole thing for any change, while microservices let teams deploy their piece independently. The catch is that microservices turn simple function calls into network calls, introducing latency and failure modes you didn't have before. Most startups should start with a monolith and extract services only when they hit specific pain points."
        ],
    },
    {
        text: "How do microservices communicate with each other?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices],
        answers: [
            "There are two main patterns for microservice communication. First is synchronous communication, typically using REST APIs or gRPC, where one service makes a direct request to another and waits for a response. This is straightforward but creates tight coupling and can be problematic if a service is down. The second is asynchronous communication using message queues or event streams like RabbitMQ, Kafka, or AWS SQS. With this approach, services publish events or messages that other services subscribe to, which provides better decoupling and resilience. In practice, most systems use a combination of both - synchronous for things like user-facing queries where you need immediate responses, and asynchronous for background processing or when you want to handle temporary service outages gracefully.",
            "Services typically communicate in one of two ways: synchronously or asynchronously. Synchronous means direct HTTP calls - usually REST or gRPC - where one service calls another and waits for an answer. It's simple and works well when you need an immediate response, like fetching user details to display on a page. Asynchronous communication uses message brokers like Kafka or RabbitMQ - a service publishes an event, and interested services consume it on their own time. This is more resilient because if the downstream service is temporarily down, messages queue up and get processed when it recovers. In my experience, you use sync for queries and real-time operations, and async for things like sending notifications, updating analytics, or any workflow that can tolerate a small delay. Many systems use both depending on the use case."
        ],
    },
    {
        text: "What is an API Gateway and why is it useful?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.microservices, ValidTag.enum["api-gateway"]],
        answers: [
            "An API Gateway is a single entry point that sits between your clients and your microservices. It handles routing requests to the appropriate backend services, but it does much more than that. It's useful because it centralizes cross-cutting concerns like authentication, rate limiting, request logging, and SSL termination. Without a gateway, each client would need to know about all your individual services and handle things like security and retries themselves. The gateway can also do request aggregation, where it combines calls to multiple services into a single response, which is particularly helpful for mobile clients trying to minimize network calls. Popular solutions include Kong, AWS API Gateway, and Nginx. The tradeoff is that it becomes a critical component that needs to be highly available since all traffic flows through it.",
            "An API Gateway acts as the front door to your microservices architecture. Rather than having clients call ten different services directly, they call one gateway that routes requests to the right place. What makes it valuable is that it handles all the common stuff in one spot: authentication, rate limiting, logging, and transforming requests. Without it, you'd be duplicating auth logic across every service or exposing internal service URLs directly to clients. It can also aggregate responses - say a mobile app needs data from three services for one screen, the gateway can fetch all three and combine them into one response, saving the client multiple round trips. The downside is it's a potential single point of failure and can become a bottleneck, so you need to design it for high availability from the start. Tools like Kong, AWS API Gateway, or even Nginx can serve this role."
        ],
    },

    // Concurrency Basics
    {
        text: "What is a race condition?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency],
        answers: [
            "A race condition occurs when the behavior of your program depends on the timing or sequence of uncontrollable events, like thread scheduling or task execution order. It happens when multiple threads or processes access shared data concurrently, and at least one is modifying it, leading to unpredictable results. A classic example is two threads trying to increment a counter - they both read the value as 5, increment it to 6, and write it back, so you end up with 6 instead of 7. Race conditions are particularly nasty because they're often intermittent and hard to reproduce - the bug might only appear under specific timing conditions. You prevent them using synchronization mechanisms like locks, mutexes, or atomic operations to ensure that only one thread can access the critical section of code at a time. In languages like JavaScript with its single-threaded event loop, you still get race conditions with async operations if you're not careful about state management.",
            "A race condition happens when two or more operations try to access the same data at the same time and the outcome depends on which one gets there first. The classic example: two threads read a counter value of 10, both add 1, both write back 11 - you've lost an increment. The bug is subtle because it doesn't happen every time; it depends on the exact timing of thread scheduling. What makes them nasty is they're hard to reproduce and test for. To prevent them, you use synchronization primitives like locks, mutexes, or atomic operations that guarantee only one operation accesses the critical section at a time. Even in single-threaded JavaScript, you can hit race conditions with async code - two async functions might both check if a record exists, both see it doesn't, and both try to create it. The solution is always the same: ensure mutual exclusion around the critical section."
        ],
    },
    {
        text: "What is the difference between concurrency and parallelism?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum.concurrency],
        answers: [
            "Concurrency and parallelism are related but different concepts. Concurrency is about dealing with multiple things at once - it's about structure. You have multiple tasks in progress, and you're managing them, but they might not all be executing simultaneously. Think of a single-core CPU running multiple programs by rapidly switching between them. Parallelism is about doing multiple things at once - it's about execution. You're literally running multiple tasks simultaneously, which requires multiple cores or processors. A good analogy is a single person juggling multiple tasks versus multiple people each working on their own task. JavaScript's async/await is concurrent but not parallel - it handles multiple operations but on a single thread. Meanwhile, Web Workers enable true parallelism by running code on separate threads. You can have concurrency without parallelism, parallelism without concurrency, or both together. Modern systems typically use both to handle multiple tasks efficiently.",
            "The distinction is subtle but important. Concurrency means dealing with multiple things at once - you're managing multiple tasks, switching between them, but not necessarily executing them simultaneously. A single CPU core running an event loop is concurrent: it handles many connections but only executes one thing at a time, switching rapidly. Parallelism means doing multiple things at once - actually executing on multiple cores simultaneously. A web server with worker processes across eight cores is parallel. Rob Pike put it well: concurrency is about structure, parallelism is about execution. Node.js is inherently concurrent with its event loop but needs worker threads or child processes for true parallelism. In practice, most systems use both: concurrent design patterns to structure the work, with parallelism across cores to speed up execution. You can have one without the other, but they often work together."
        ],
    },

    // Design Pattern Basics
    {
        text: "What is dependency injection and why is it useful?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum["dependency-injection"]],
        answers: [
            "Dependency injection is a pattern where you provide objects with their dependencies from the outside rather than having them create dependencies themselves. Instead of a class instantiating the services it needs internally, those dependencies are 'injected' through the constructor, method parameters, or property setters. This is useful for several reasons. First, it makes your code more testable - you can easily inject mock dependencies during testing. Second, it reduces coupling because your class depends on interfaces or abstractions rather than concrete implementations. Third, it makes your code more flexible and maintainable since you can swap implementations without changing the class itself. For example, instead of a UserService creating its own database connection, you inject a database interface, which means you can inject a real database in production and a mock in tests. DI containers like those in Angular, Spring, or NestJS automate this process by managing object creation and wiring dependencies together. The downside is it can add complexity and make it harder to trace where objects come from.",
            "Instead of a class creating its own dependencies internally, you pass them in from outside - typically through the constructor. So rather than a UserService doing 'this.db = new Database()', you write 'constructor(db: Database)' and let the caller provide it. This flips the control of dependency creation. The immediate benefit is testability: you can inject a mock database in tests instead of hitting a real one. It also means you can swap implementations easily - switch from MySQL to Postgres by injecting a different implementation, without touching the UserService code. The class becomes more focused on its actual job rather than knowing how to construct its collaborators. Most frameworks have DI containers that automate the wiring, so you just declare what you need and the container provides it. The tradeoff is some indirection - you can't always see where an object came from at a glance - but the flexibility and testability are usually worth it."
        ],
    },
    {
        text: "What is SOLID principles?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.solid],
        answers: [
            "SOLID is an acronym for five object-oriented design principles that help create more maintainable and flexible code. Single Responsibility means a class should have only one reason to change - it should do one thing well. Open/Closed means classes should be open for extension but closed for modification - you should be able to add new functionality without changing existing code. Liskov Substitution means you should be able to replace a parent class with any of its subclasses without breaking the program. Interface Segregation means clients shouldn't be forced to depend on interfaces they don't use - it's better to have many specific interfaces than one general-purpose one. Dependency Inversion means high-level modules shouldn't depend on low-level modules - both should depend on abstractions. These principles guide you toward code that's easier to test, extend, and refactor. They're not strict rules but guidelines that help avoid common pitfalls like tight coupling and rigid architectures. Following them tends to result in cleaner, more modular code.",
            "SOLID is five design principles that guide you toward maintainable object-oriented code. Single Responsibility: each class does one thing, so it only changes for one reason. Open/Closed: extend behavior through new code rather than modifying existing code - use interfaces and polymorphism instead of conditionals. Liskov Substitution: any subclass should be usable wherever its parent is expected without surprises. Interface Segregation: don't force clients to depend on methods they don't use - smaller, focused interfaces beat large general ones. Dependency Inversion: depend on abstractions, not concrete implementations - your business logic shouldn't know about specific databases or frameworks. These aren't rigid rules but heuristics. When code violates them, you often feel the pain through difficult testing, fragile changes, or tight coupling. You don't apply them everywhere dogmatically, but they're useful lenses for evaluating design decisions."
        ],
    },
    {
        text: "What is the difference between composition and inheritance?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"], ValidTag.enum.oop],
        answers: [
            "Inheritance and composition are two ways to achieve code reuse, but they work differently. Inheritance is an 'is-a' relationship where a class extends another class, inheriting its properties and methods. For example, a Dog class might inherit from an Animal class. Composition is a 'has-a' relationship where a class contains instances of other classes to use their functionality. For example, a Car class might contain an Engine object and a Transmission object. The common wisdom is to favor composition over inheritance because inheritance creates tight coupling - changes to the parent class can break child classes. It also forces you into rigid hierarchies that can be hard to change later. Composition is more flexible - you can swap out components easily and combine different behaviors at runtime. However, inheritance isn't bad - it works well for modeling true hierarchical relationships and can make code more intuitive when the relationship genuinely is an 'is-a' relationship. Modern practice often uses both, but leans toward composition for flexibility.",
            "Both let you reuse code, but in different ways. Inheritance says 'class B is a type of class A' - B extends A and inherits its methods and fields. Composition says 'class B has an A' - B contains an instance of A and delegates to it. The practical difference is coupling. With inheritance, you're locked into a hierarchy that's hard to change - if you need B to behave differently, you might break code expecting the parent behavior. With composition, you can swap components at runtime, combine behaviors from multiple sources, and change implementations without touching the containing class. The rule of thumb is favor composition: use inheritance only when there's a genuine 'is-a' relationship and you want to share implementation, not just interface. Many problems people solve with inheritance are better solved with composition plus interfaces. That said, inheritance is still the right tool sometimes - React class components extending Component, for instance, or true hierarchies like Error types."
        ],
    },
    {
        text: "What is the factory pattern?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The factory pattern is a creational design pattern that provides an interface for creating objects without specifying their exact class. Instead of calling 'new' directly to instantiate objects, you call a factory method that decides which class to instantiate based on input parameters or configuration. For example, you might have a ShapeFactory with a createShape method that returns a Circle, Square, or Triangle based on a string parameter. This is useful because it encapsulates object creation logic, making your code more flexible - if you need to change how objects are created or add new types, you only change the factory, not all the places that create objects. It also helps with dependency injection and testing since you can easily swap out the factory to return mock objects. There are variations like Simple Factory, Factory Method, and Abstract Factory, each with slightly different structures. The pattern is particularly helpful when object creation is complex or when the exact type to create depends on runtime conditions.",
            "A factory is a function or class that creates objects for you instead of you calling constructors directly. Instead of 'new PostgresDatabase()' scattered throughout your code, you call 'DatabaseFactory.create(config)' and it returns the right type based on configuration. This centralizes creation logic so changes happen in one place. If you later add MySQL support, you update the factory, not every file that needs a database. It's also great for testing - swap the factory to return mocks. There are a few variations: Simple Factory is just a function with a switch statement, Factory Method uses inheritance so subclasses decide what to create, and Abstract Factory creates families of related objects. You reach for this pattern when object creation is complex, involves configuration, or when the type is determined at runtime rather than compile time."
        ],
    },
    {
        text: "What is the singleton pattern and when would you use it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The singleton pattern ensures a class has only one instance throughout your application and provides a global point of access to it. You implement it by making the constructor private and providing a static method that returns the single instance, creating it on first access if it doesn't exist. You'd use it for things like configuration managers, logging services, database connection pools, or caching mechanisms - resources that should be shared across your application and where multiple instances would be wasteful or problematic. However, singletons are somewhat controversial in modern development. They introduce global state, which makes testing harder since you can't easily replace them with mocks, and they can hide dependencies rather than making them explicit. They also make it difficult to control initialization order and can cause issues in multi-threaded environments if not implemented carefully. Many developers now prefer dependency injection instead, where you configure your DI container to always return the same instance rather than using a true singleton.",
            "A singleton guarantees exactly one instance of a class exists and gives you a global way to access it. The implementation usually involves a private constructor and a static method that returns the shared instance, creating it lazily on first access. Classic use cases are things like configuration managers, loggers, or connection pools - resources where having multiple instances would be wasteful or cause problems. That said, singletons have a bad reputation in modern code. They're essentially global variables, which makes testing painful since you can't easily substitute a mock. They hide dependencies instead of making them explicit in constructors. The modern approach is to use dependency injection configured to return the same instance - you get the 'single instance' behavior without the global access problems. If you do use a singleton, make sure it's thread-safe if your application is concurrent."
        ],
    },
    {
        text: "What is the observer pattern?",
        level: Level.enum["junior-advanced"],
        category: Category.enum["system-design"],
        tags: [ValidTag.enum["design-patterns"]],
        answers: [
            "The observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically. You have a 'subject' that maintains a list of 'observers' and notifies them of state changes, usually by calling one of their methods. It's the foundation of event-driven programming and is everywhere in modern development. For example, in a user interface, when a model's data changes, all the views observing that model get notified and update themselves. The publish-subscribe pattern is a variation where there's more decoupling between publishers and subscribers, often using an event bus. This pattern is great for maintaining consistency across different parts of your application and creating loosely coupled systems. You see it in DOM event listeners, React's state management, RxJS observables, and countless other places. The downside is that it can make the flow of your program harder to follow since updates happen implicitly, and you can accidentally create memory leaks if observers aren't properly unsubscribed.",
            "The observer pattern lets objects subscribe to changes in another object and get notified automatically when something happens. You have a subject that holds a list of observers and calls their update method when its state changes. This decouples the object that changes from the objects that care about those changes - the subject doesn't need to know the specifics of its observers. You see this pattern everywhere: DOM event listeners, React state updates, WebSocket connections, RxJS streams. The publish-subscribe variant adds more decoupling through an event bus so publishers and subscribers don't even know about each other directly. The tradeoffs are that control flow becomes implicit - it's harder to trace what happens when something changes - and you need to be careful about cleaning up subscriptions to avoid memory leaks. But for reactive UIs and event-driven systems, it's essential."
        ],
    },
];
