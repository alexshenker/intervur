import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum.senior
>[] = [
    {
        text: "What are race conditions and how do you handle them?",
        level: Level.enum.senior,
        category: Category.enum.backend,
        tags: [ValidTag.enum["race-conditions"], ValidTag.enum.concurrency],
        answers: [
            "A race condition occurs when the behavior of code depends on the timing or interleaving of multiple concurrent operations. The classic example is two processes trying to update the same bank account balance at the same time. If both read the balance as one hundred dollars, then both add fifty dollars and write back one hundred fifty, you've lost fifty dollars instead of having two hundred. I handle race conditions differently depending on the context. At the database level, I use transactions with appropriate isolation levels. For critical operations like financial transactions, I might use serializable isolation or SELECT FOR UPDATE to lock rows. For counters and simple updates, atomic operations like PostgreSQL's UPDATE with expressions or Redis's INCR avoid read-modify-write races entirely. At the application level, I use mutexes or locks for shared resources in multi-threaded code. In distributed systems, I might use distributed locks with Redis or a coordination service like ZooKeeper, though I try to avoid this when possible by designing for idempotency instead. Optimistic concurrency control is another approach I use frequently. You add a version number or timestamp to records and check it hasn't changed before committing updates. If it has, you retry or fail gracefully. The key is identifying where races can occur during design, not after they've caused production incidents.",
        ],
    },
    {
        text: "When would you choose one microservices communication protocol over another?",
        level: Level.enum.senior,
        category: Category.enum.backend,
        tags: [ValidTag.enum.microservices],
        answers: [
            "The choice of communication protocol depends on the specific requirements of the interaction. For synchronous request-response patterns where a service needs an immediate answer, REST over HTTP is my default choice. It's simple, well-understood, and has great tooling. The APIs are easy to debug with curl or Postman, and it works well for CRUD operations. When I need better performance or have complex data structures, I consider gRPC. It uses Protocol Buffers for efficient binary serialization, supports streaming, and generates type-safe client libraries. It's particularly good for internal service-to-service communication where the human readability of REST isn't as important. For asynchronous communication where I want to decouple services, I use message queues like RabbitMQ or Kafka. This is ideal for event-driven architectures where a service publishes events and multiple consumers can react independently. It also gives you natural resilience since messages persist in the queue if a consumer is temporarily down. If I need real-time bidirectional communication, WebSockets or Server-Sent Events come into play. GraphQL is another option when the client needs flexibility in what data it fetches, though I typically use it at the edge between frontend and a backend-for-frontend service rather than between microservices. The key is matching the protocol to the communication pattern rather than using one approach for everything.",
        ],
    },
];
