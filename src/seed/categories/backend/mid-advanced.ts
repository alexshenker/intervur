import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Node.js Advanced
    {
        text: "How do you profile and debug memory leaks in Node.js?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.nodejs, ValidTag.enum.debugging, ValidTag.enum.performance],
        answers: ["There are several approaches I typically use for tracking down memory leaks in Node.js. First, I'll use the built-in --inspect flag to connect Chrome DevTools and take heap snapshots at different points in time. By comparing snapshots, you can see which objects are growing unexpectedly. I also rely on tools like clinic.js or the Node.js memory profiler to visualize memory usage over time. For production environments, I'll use process.memoryUsage() to monitor heap usage and set up alerts. The key is to look for objects that keep growing - often it's event listeners that weren't removed, closures holding references, or caching without bounds. Once you identify the leak, fixing it usually involves proper cleanup, removing event listeners, and implementing cache size limits."],
    },

    // GraphQL Advanced
    {
        text: "What is schema stitching vs federation?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql],
        answers: ["Both are approaches to combining multiple GraphQL schemas into a single unified API, but they work quite differently. Schema stitching is the older approach where you have a gateway that manually merges schemas and delegates queries to the appropriate services. It's flexible but requires more manual configuration and the gateway needs to know a lot about how the schemas relate. Federation, on the other hand, was developed by Apollo and takes a more declarative approach. Each service defines its own schema and can extend types from other services using special directives like @key and @external. The gateway discovers the schemas automatically and knows how to resolve queries across services. Federation is generally more scalable and maintainable for larger systems because the relationship logic lives in the services themselves rather than in the gateway."],
    },
    {
        text: "How do you handle file uploads in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql],
        answers: ["File uploads in GraphQL are typically handled using the GraphQL multipart request specification. The most common approach is to use a library like graphql-upload on the server side. You define an Upload scalar type in your schema, then in your mutation you can accept that type as an argument. On the client side, you send a multipart form request where the file is one part and the GraphQL operation is another. The server then maps the file to the appropriate resolver argument. An alternative approach some teams use is to separate file uploads from GraphQL entirely - you upload the file to a separate endpoint or directly to S3, get back a URL or ID, and then pass that through your GraphQL mutation. This can be cleaner for very large files and gives you more control over the upload process."],
    },
    {
        text: "What are persisted queries and why would you use them?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql, ValidTag.enum.performance],
        answers: ["Persisted queries are a technique where instead of sending the full GraphQL query string with each request, you send a hash or ID that maps to a pre-registered query on the server. There are several benefits to this approach. First, it significantly reduces bandwidth since you're sending just a small ID instead of potentially large query strings, which is especially valuable for mobile clients. Second, it improves security by creating a whitelist of allowed operations - the server only accepts queries it knows about, preventing arbitrary queries from being executed. Third, it can improve performance since the server can skip the parsing and validation steps. The way it typically works is during your build process, you extract all queries from your application, register them with the server with their hashes, and then at runtime your client sends the hash instead of the full query. Apollo has good support for this with their automatic persisted queries feature."],
    },
    {
        text: "How do you handle caching in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.graphql, ValidTag.enum.caching],
        answers: ["Caching in GraphQL is more nuanced than REST because every request can be unique. On the server side, I typically implement field-level caching using DataLoader to batch and cache database queries within a single request - this prevents the N+1 query problem. For longer-term caching, you can use Redis or similar to cache resolver results with appropriate TTLs. The key is to cache at the resolver level based on the arguments. On the client side, libraries like Apollo Client provide normalized caching where objects are stored by their ID and typename, so when you fetch the same object in different queries, it's automatically deduplicated. You can also use HTTP caching with GET requests and cache-control headers if you structure your queries to be cacheable. For mutations, you need to be thoughtful about cache invalidation - either by refetching affected queries, updating the cache manually, or using subscriptions to keep data fresh."],
    },

    // gRPC
    {
        text: "What is gRPC and how does it differ from REST?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["rest-api"]],
        answers: ["gRPC is a high-performance RPC framework developed by Google that uses HTTP/2 and Protocol Buffers by default. The main differences from REST are quite significant. First, gRPC uses binary serialization with Protocol Buffers instead of JSON, which makes it much faster and more bandwidth-efficient. Second, it runs on HTTP/2, so you get features like multiplexing, bidirectional streaming, and header compression out of the box. Third, gRPC is contract-first - you define your service methods in a .proto file, which generates client and server code automatically, whereas REST is more flexible but requires more manual work. Fourth, gRPC supports different communication patterns like server streaming, client streaming, and bidirectional streaming, not just request-response. The tradeoff is that gRPC is less human-readable since it's binary, and browser support isn't as straightforward - you need gRPC-web. REST is still better for public APIs and when you need broad compatibility, but gRPC excels for internal microservices communication."],
    },
    {
        text: "What are Protocol Buffers?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["protocol-buffers"]],
        answers: ["Protocol Buffers, or protobufs, are a language-agnostic binary serialization format developed by Google. You define your data structures in .proto files using a simple interface definition language, and then you use a compiler to generate code for your target programming language. The main advantages over JSON are size and speed - protobufs are typically much smaller and faster to serialize and deserialize because they're binary and the schema is known ahead of time. They're also strongly typed and provide built-in versioning through field numbers, which makes it safer to evolve your API over time. The schema-first approach also serves as documentation and ensures consistency between client and server. The downside is they're not human-readable like JSON, which makes debugging a bit harder, and you need the schema to decode the messages. But for high-performance systems and internal service communication, protobufs are usually the better choice."],
    },
    {
        text: "What are the different types of gRPC calls (unary, server streaming, client streaming, bidirectional)?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: ["gRPC supports four different communication patterns. Unary is the simplest - it's just like a regular function call where the client sends one request and gets one response back. Server streaming is when the client sends a single request but the server responds with a stream of messages, which is useful for things like tailing logs or pushing real-time updates. Client streaming is the opposite - the client sends a stream of messages and the server responds with a single message when it's done processing everything, which is great for things like uploading chunks of a file. Bidirectional streaming is where both client and server can send streams of messages to each other independently, useful for things like chat applications or real-time collaboration. The key thing is that these are all built into the protocol itself, so you get proper backpressure handling and flow control that you'd have to implement yourself with other approaches."],
    },
    {
        text: "When would you choose gRPC over REST or GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["rest-api"], ValidTag.enum.graphql],
        answers: ["I'd choose gRPC primarily for internal microservices communication where performance is critical. If you have services that need to talk to each other with low latency and high throughput, gRPC's binary format and HTTP/2 multiplexing really shine. It's also great when you need streaming capabilities - if you're doing real-time data processing, bidirectional communication, or need to push updates from server to client efficiently. The strong typing and code generation are huge benefits for internal APIs because they catch errors at compile time and make refactoring safer. I'd stick with REST for public APIs where you need broad compatibility and human-readable responses, or when you're working with clients that don't have good gRPC support. GraphQL is better when you have diverse clients with different data needs and you want to avoid over-fetching - it gives clients more flexibility. But for service-to-service communication in a microservices architecture, especially when performance matters, gRPC is hard to beat."],
    },
    {
        text: "How does gRPC handle errors?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["error-handling"]],
        answers: ["gRPC has a well-defined error model with a set of standard status codes similar to HTTP status codes, but more specific to RPC semantics. When an error occurs, the server returns a status code like INVALID_ARGUMENT, NOT_FOUND, PERMISSION_DENIED, or INTERNAL, along with an optional error message and metadata. On the client side, you catch these errors and check the status code to handle different error cases appropriately. What's nice is that error handling is consistent across all languages that gRPC supports. You can also use the richer error details mechanism where you attach structured error information using Google's error details protos - things like BadRequest, RetryInfo, or custom error details. This gives clients more context about what went wrong and how to fix it. For streaming calls, errors can be sent at any point in the stream, and the client needs to handle both per-message errors and stream-level errors."],
    },
    {
        text: "What is gRPC-web and when do you need it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: ["gRPC-web is a JavaScript implementation of gRPC that allows browser clients to communicate with gRPC services. The challenge is that browsers can't make raw gRPC calls because they don't have low-level control over HTTP/2 frames that standard gRPC requires. gRPC-web solves this by providing a compatibility layer - it uses HTTP/1.1 or HTTP/2 in a way that browsers can handle, and you need a proxy like Envoy in front of your gRPC server to translate between gRPC-web and standard gRPC. You need gRPC-web when you want your web frontend to directly call your gRPC backend services. It gives you type safety from your proto definitions all the way to the browser, and you can share the same service definitions between your backend services and frontend. The tradeoff is the added complexity of the proxy and some limitations - for example, bidirectional streaming isn't fully supported in all browsers. For many web apps, REST or GraphQL might be simpler, but gRPC-web is great when you're already invested in gRPC and want consistency."],
    },
    {
        text: "How do you handle authentication in gRPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum.auth],
        answers: ["Authentication in gRPC is typically handled through metadata, which is similar to HTTP headers. The most common approach is to use SSL/TLS for the transport layer security, and then pass authentication tokens in the metadata. For example, you might send a JWT or API key in the authorization metadata field with each request. gRPC has built-in support for different authentication mechanisms through its credentials system. You can use channel credentials for transport-level security like SSL, and call credentials for request-level authentication like tokens. On the server side, you typically implement an interceptor that extracts and validates the credentials from the metadata before the request reaches your actual handler. For service-to-service authentication, mutual TLS is common where both client and server authenticate each other using certificates. You can also integrate with external auth systems - for example, using OAuth2 tokens or integrating with service meshes like Istio that handle authentication at the infrastructure level."],
    },
    {
        text: "What are interceptors in gRPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: ["Interceptors in gRPC are basically middleware - they let you intercept and modify RPC calls before they reach the handler or before the response goes back to the client. They're incredibly useful for cross-cutting concerns. On the server side, you might use interceptors for authentication, logging, metrics collection, error handling, or request validation. On the client side, they're useful for adding authentication headers, implementing retry logic, or logging outgoing requests. The way they work is you chain interceptors together, and each one can inspect or modify the request, call the next interceptor in the chain, and then inspect or modify the response. For example, you might have a logging interceptor that records the start time, calls the next handler, and then logs the duration. You can have both unary interceptors for single request-response calls and streaming interceptors for handling streaming calls. The pattern is very similar to middleware in web frameworks like Express."],
    },
    {
        text: "What is the difference between gRPC and JSON-RPC?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc],
        answers: ["While both are RPC frameworks, they're quite different in their approach. JSON-RPC is much simpler and lighter weight - it's just a specification for calling remote procedures using JSON over HTTP. You send a JSON object with a method name and parameters, and get back a JSON response. It's easy to debug since everything is human-readable JSON, and it works over regular HTTP/1.1. gRPC, on the other hand, is a full-featured RPC framework with binary serialization using Protocol Buffers, HTTP/2 transport, code generation from schema definitions, and built-in support for streaming. gRPC is generally much faster and more efficient, but it's also more complex to set up. JSON-RPC is great for simpler use cases or when you want something lightweight and easy to understand. gRPC shines when you need high performance, strong typing, streaming capabilities, or you're building a complex microservices architecture. Basically, JSON-RPC is simpler but less powerful, while gRPC is more sophisticated but comes with more overhead."],
    },
    {
        text: "How do you version gRPC APIs?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.grpc, ValidTag.enum["api-versioning"]],
        answers: ["There are a few approaches to versioning gRPC APIs. The most common is to include the version in the package name of your proto files, like 'package myapp.v1' or 'package myapp.v2'. This keeps different versions completely separate and allows you to run multiple versions simultaneously. When you need to make breaking changes, you create a new version of the service and gradually migrate clients over. Another approach is to make backward-compatible changes only - Protocol Buffers are designed to support this through field numbers. You can add new fields, deprecate old ones, and clients using older versions will still work. For this to work, you need to follow rules like never reusing field numbers and making new fields optional. Some teams also version at the method level by creating new methods like 'GetUserV2' while keeping the old ones around. The key is to be thoughtful about breaking changes and give clients time to migrate. In a microservices environment, you often run multiple versions side by side and route traffic based on client version."],
    },

    // WebSockets Advanced
    {
        text: "How do you scale WebSockets horizontally?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.websockets, ValidTag.enum.scalability],
        answers: ["Scaling WebSockets horizontally is challenging because they're stateful, long-lived connections. The main issue is that if a user is connected to server A, and you need to send them a message but it originates from server B, you need a way to route that message. The typical solution is to use a pub-sub system like Redis. When a message needs to be sent to a user, you publish it to a channel, and all servers subscribe to that channel. The server that has the actual WebSocket connection with the user picks up the message and sends it down. You also need sticky sessions or consistent hashing in your load balancer so that a user's connection attempts go to the same server. Another approach is to use a service mesh or a specialized WebSocket proxy that handles the routing for you. For very large scale, some teams separate the WebSocket servers from the application servers entirely - the WebSocket servers just handle connections and message routing, while the application logic runs separately. Tools like Socket.io have built-in support for this with their Redis adapter."],
    },
    {
        text: "How do you handle message ordering and delivery guarantees?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.websockets],
        answers: ["WebSockets themselves only guarantee in-order delivery within a single connection, but they don't guarantee that messages are actually received or processed. To add stronger guarantees, you typically need to build them into your application layer. For ordering, you can add sequence numbers to your messages - the client keeps track of the last sequence number it processed and can detect gaps or out-of-order messages. For delivery guarantees, you implement an acknowledgment system where the client confirms receipt of each message, and the server retries if it doesn't get an ack within a timeout. You might also persist unacknowledged messages in a database or queue. Some libraries like Socket.io provide built-in support for this with delivery guarantees and automatic reconnection. For critical applications, you might implement an at-least-once delivery pattern where you store messages until they're acknowledged, which means you also need idempotency on the receiving side to handle duplicates. The key is understanding that WebSockets are just the transport - you need to add your own reliability layer if you need strong guarantees."],
    },

    // Pagination Advanced
    {
        text: "What are the different pagination strategies?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: ["There are three main pagination strategies, each with different tradeoffs. Offset-based pagination is the simplest - you use LIMIT and OFFSET in your SQL queries, like 'get me 20 items starting at position 40'. It's easy to implement and allows jumping to any page, but it has performance issues with large datasets and can show duplicates or skip items if data changes between requests. Cursor-based pagination uses a pointer to a specific record, usually based on a unique, sequential field like an ID or timestamp. You return a cursor with each page, and the next request uses that cursor to fetch the next set of results. This is much more efficient and handles data changes gracefully, but you can't jump to arbitrary pages. Keyset pagination is similar to cursor-based but uses the actual values of the ordering columns as the cursor. For example, 'give me items where created_at > last_timestamp ORDER BY created_at'. This is the most performant for large datasets but requires indexed columns and doesn't handle arbitrary ordering well. For infinite scroll and real-time feeds, cursor-based is usually best. For traditional page navigation, offset can work if your dataset isn't huge."],
    },
    {
        text: "What is offset pagination and what are its drawbacks?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: ["Offset pagination is the traditional approach where you use LIMIT and OFFSET in your queries - for example, to get page 3 with 20 items per page, you'd do LIMIT 20 OFFSET 40. It's intuitive and easy to implement, and it allows users to jump to any page number, which is nice for UI. The main drawback is performance - as the offset grows, the database still has to scan through all those rows before returning results, so page 1000 will be much slower than page 1. The second major issue is consistency - if items are added or deleted between page requests, you can see duplicates or skip items entirely. For example, if you're on page 2 and someone deletes an item from page 1, when you go to page 3 you'll skip an item. Similarly, if items are added, you might see the same item twice. For small datasets or admin interfaces where these issues don't matter much, offset pagination is fine. But for large datasets, public APIs, or real-time feeds, you generally want to use cursor-based pagination instead."],
    },
    {
        text: "What is cursor-based pagination and when would you use it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: ["Cursor-based pagination uses an opaque cursor token that points to a specific position in your dataset, usually based on a unique identifier or timestamp. Instead of saying 'give me page 3', you say 'give me 20 items after this cursor'. The cursor is typically an encoded or hashed value that contains the ID or timestamp of the last item from the previous page. The big advantages are consistent performance regardless of how deep you paginate, and it handles real-time data changes gracefully - you won't see duplicates or skip items. You'd use cursor-based pagination for infinite scroll interfaces, real-time feeds like social media timelines, or any large dataset where offset pagination would be too slow. It's also the standard for most modern APIs. The main limitation is you can't jump to arbitrary pages - you can only go forward or backward from where you are, which is fine for most use cases but not great if you need traditional page numbers. Implementation-wise, you typically include next and previous cursor tokens in your API response, and the client includes the cursor in the next request."],
    },
    {
        text: "What is keyset pagination?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: ["Keyset pagination, also called seek pagination, is a technique where you use the actual values of indexed columns as your pagination marker instead of an offset. For example, if you're paginating by created_at timestamp, instead of OFFSET 40, you'd query WHERE created_at > last_timestamp ORDER BY created_at LIMIT 20. The key is that you're using a WHERE clause on an indexed column rather than OFFSET, which allows the database to use the index to jump directly to the right position. This makes it extremely fast even for deep pagination. The advantages are similar to cursor-based pagination - consistent performance and no issues with skipping or duplicating items. The difference is that keyset pagination uses the actual column values rather than an opaque cursor, which can be simpler to implement and debug. The main requirement is that you need an indexed, unique, sequential column to paginate on - usually a combination of timestamp and ID. It also requires more complex queries if you're sorting by multiple columns. This is the most performant option for large datasets, but it requires careful index design."],
    },
    {
        text: "How do you implement infinite scroll?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination],
        answers: ["Infinite scroll is best implemented with cursor-based pagination on the backend. You start by loading an initial batch of items, and with the response you include a cursor that points to the last item. On the frontend, you detect when the user is approaching the bottom of the page using either scroll event listeners or, better yet, the Intersection Observer API which is more performant. When the user gets close to the bottom, you make another API request including the cursor from the previous response to get the next batch of items. The server uses that cursor to fetch items after that point and returns them along with a new cursor. You append the new items to your existing list and update the cursor. You also need to handle loading states, show a spinner while fetching, and handle the case when there are no more items to load. On the backend, make sure you're using indexed columns for your cursor to keep queries fast. Some nice touches are prefetching the next page before the user reaches the bottom, and implementing a 'back to top' button once they've scrolled far enough. Libraries like React Query or TanStack Query make this easier by handling the caching and state management for you."],
    },
    {
        text: "How do you handle pagination in GraphQL?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination, ValidTag.enum.graphql],
        answers: ["GraphQL has a well-established pattern for pagination called Connections, which comes from the Relay specification. The basic idea is that instead of returning a list directly, you return a connection object that contains edges and pageInfo. Each edge wraps a node with a cursor, and pageInfo tells you whether there are more pages and provides cursors for the next and previous pages. So your schema might look like: users(first: 10, after: cursor) returns a UserConnection with edges, where each edge has a cursor and node. This gives you cursor-based pagination out of the box. You can query 'first: 10' to get the first 10 items, then use the endCursor from pageInfo to get the next batch with 'first: 10, after: endCursor'. The pattern also supports backward pagination with 'last' and 'before'. While the schema looks verbose, it's very powerful and flexible. Most GraphQL libraries have utilities to implement connections easily. You can also implement simpler offset-based pagination if you want, just accepting 'limit' and 'offset' arguments, though cursor-based is generally preferred for the same performance and consistency reasons as with REST APIs."],
    },
    {
        text: "What are the performance implications of different pagination strategies?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.pagination, ValidTag.enum.performance],
        answers: ["The performance differences can be huge, especially at scale. Offset pagination degrades linearly with the offset size because the database has to scan through all the skipped rows even though it doesn't return them. So OFFSET 10000 LIMIT 20 might scan 10,020 rows to return 20. This gets really slow on large tables. Cursor-based and keyset pagination, on the other hand, maintain constant performance regardless of how deep you paginate because they use WHERE clauses on indexed columns - the database can jump directly to the right position using the index. The query is essentially the same whether you're getting items 1-20 or items 10,001-10,020. The key is that your cursor column needs to be indexed. In terms of database load, offset pagination also tends to produce more variable query plans which can be harder for the database to optimize. Memory usage is similar across strategies for the returned results, but offset can cause more disk I/O. For large datasets - think millions of rows - the difference between offset and cursor-based can be orders of magnitude. That's why social media feeds, which might have billions of posts, always use cursor-based pagination."],
    },
];
