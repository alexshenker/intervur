import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.backend,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Express Basics
    {
        text: "What is Express and how does middleware work?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express, ValidTag.enum.middleware, ValidTag.enum.nodejs],
        answers: [
            "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's essentially a layer built on top of Node's HTTP module that makes it easier to handle routing, requests, and responses. Now, middleware is really the heart of Express. It's basically functions that have access to the request object, the response object, and the next middleware function in the request-response cycle. When a request comes in, it flows through a chain of middleware functions - each one can modify the request or response, execute code, or end the request-response cycle. For example, you might have middleware that parses JSON, logs requests, checks authentication, or handles errors. Each middleware either calls next() to pass control to the next middleware, or it sends a response to end the cycle. This pattern makes Express really modular and flexible."
        ],
    },
    {
        text: "What is the difference between app.use() and app.get()?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express, ValidTag.enum.middleware],
        answers: [
            "The key difference is that app.use() is for mounting middleware functions and will match any HTTP method, while app.get() is specifically for handling GET requests to a particular route. So app.use() is more general-purpose - you might use it to apply middleware globally to all routes, like body parsing or authentication. For example, app.use(express.json()) applies to all incoming requests. On the other hand, app.get() is route-specific and method-specific. When you write app.get('/users', handler), that handler only runs for GET requests to that exact path. Another difference is that app.use() with a path will match that path and anything under it - so app.use('/api', middleware) matches /api, /api/users, /api/posts, and so on. But app.get('/api', handler) only matches exactly /api. So in practice, use app.use() for middleware you want to apply broadly, and app.get() when you're defining specific route handlers."
        ],
    },
    {
        text: "What is the request-response cycle in Express?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express],
        answers: [
            "The request-response cycle is the flow that happens from when a client makes a request to when they get a response back. In Express, when a request comes in, it starts at the top of your middleware stack and flows through each middleware function in order. Each middleware can do something with the request or response, and then it either calls next() to pass control to the next middleware, or it sends a response which ends the cycle. So a typical flow might be: the request comes in, goes through body parsing middleware, then maybe authentication middleware, then your route handler which queries the database, and finally sends back a JSON response. Once any middleware or route handler sends a response using methods like res.send() or res.json(), the cycle ends and that response goes back to the client. If none of the middleware sends a response, you'd typically hit a 404 handler at the end. The important thing is that the cycle must end with a response - you can't just leave it hanging."
        ],
    },
    {
        text: "What is the difference between req.params, req.query, and req.body?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum.express],
        answers: [
            "These are three different ways to get data from a request. req.params contains route parameters - these are the named segments in your URL path. So if your route is /users/:id and someone requests /users/123, then req.params.id would be '123'. req.query contains the query string parameters - the key-value pairs after the question mark in a URL. So for a request to /search?term=node&limit=10, req.query would be an object with term: 'node' and limit: '10'. These are typically used for optional filters or pagination. req.body contains the data sent in the request body, usually for POST or PUT requests. This is where form data or JSON payloads go, like when creating or updating a resource. You need middleware like express.json() to populate req.body. So to summarize: params for URL path segments, query for URL parameters, and body for data in the request payload."
        ],
    },

    // REST APIs Basics
    {
        text: "What is REST and what are its constraints?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["api-design"]],
        answers: [
            "REST stands for Representational State Transfer, and it's an architectural style for designing networked applications, particularly web services. The idea is that you interact with resources using standard HTTP methods. As for the constraints, there are six main ones. First is client-server separation - the client and server are independent and can evolve separately. Second is statelessness - each request must contain all the information needed to process it, the server doesn't store client context between requests. Third is cacheability - responses should indicate whether they can be cached or not. Fourth is a uniform interface - REST uses standard HTTP methods and URIs to interact with resources in a consistent way. Fifth is a layered system - you can have intermediaries like load balancers or caches between the client and server. And sixth is code-on-demand, which is optional - servers can send executable code to clients. In practice, the most important ones are statelessness and the uniform interface, which make REST APIs predictable and scalable."
        ],
    },
    {
        text: "What are idempotent operations and why do they matter?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum.idempotency],
        answers: [
            "An idempotent operation is one where making the same request multiple times has the same effect as making it once. The result is the same whether you call it once or a hundred times. In HTTP, GET, PUT, and DELETE are idempotent, while POST typically isn't. For example, if you send a PUT request to update a user's email to john@example.com, it doesn't matter if you send that request once or ten times - the email ends up as john@example.com either way. Same with DELETE - deleting a resource once or multiple times results in that resource being gone. But POST isn't idempotent because each request usually creates a new resource. This matters a lot in real-world systems because networks are unreliable. If a client makes a request and doesn't get a response due to a timeout, they don't know if it succeeded or not. With idempotent operations, it's safe to retry - you can send the request again without worrying about unintended side effects. This makes systems more robust and easier to work with, especially in distributed environments."
        ],
    },
    {
        text: "What is the difference between PUT and PATCH?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["http-methods"]],
        answers: [
            "The main difference is that PUT is for full resource replacement, while PATCH is for partial updates. When you use PUT, you're expected to send the complete representation of the resource. So if you have a user object with name, email, and age, and you want to update just the email, you'd still send all three fields with PUT - the new email plus the existing name and age. If you only send the email, the other fields might get cleared or set to defaults depending on the implementation. PATCH, on the other hand, is specifically designed for partial updates. You only send the fields you want to change. So you could send just the email field, and the name and age remain untouched. Both are idempotent in theory, though PATCH can be trickier depending on how it's implemented. In practice, PUT is useful when you're updating an entire resource or when you have all the data anyway. PATCH is better when you're only changing one or two fields and don't want to require the client to send everything back."
        ],
    },
    {
        text: "What are HTTP status codes and when do you use each?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["status-codes"]],
        answers: [
            "HTTP status codes are three-digit numbers that indicate the result of an HTTP request. They're grouped into five categories. The 2xx codes mean success - 200 OK is the standard success response, 201 Created is for when you've successfully created a new resource like with POST, and 204 No Content is for successful requests that don't return any data, like some DELETE operations. The 3xx codes are for redirects. The 4xx codes indicate client errors - 400 Bad Request means the request was malformed, 401 Unauthorized means authentication is required, 403 Forbidden means you're authenticated but don't have permission, 404 Not Found means the resource doesn't exist, and 422 Unprocessable Entity is for validation errors. The 5xx codes are server errors - 500 Internal Server Error is a generic server failure, and 503 Service Unavailable means the server is temporarily unable to handle requests. Using the right status codes is important because it helps clients understand what happened and how to handle the response. Like, if they get a 404, they know not to retry, but a 503 might mean they should try again later."
        ],
    },
    {
        text: "What are query parameters vs path parameters and when do you use each?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.backend,
        tags: [ValidTag.enum["rest-api"], ValidTag.enum["api-design"]],
        answers: [
            "Path parameters are part of the URL path itself and are used to identify specific resources, while query parameters come after the question mark and are typically used for filtering, sorting, or providing optional data. For example, in /users/123, the 123 is a path parameter identifying which user. In /users?role=admin&limit=10, role and limit are query parameters filtering the results. The general rule is to use path parameters for required values that identify a resource - they're part of the resource hierarchy. So /users/:userId/posts/:postId makes sense because you're drilling down to a specific post for a specific user. Use query parameters for optional modifiers or filters that don't change which resource you're accessing, just how you're viewing it. Things like pagination, sorting, search terms, or filters. So /products?category=electronics&sort=price&page=2 is filtering and paginating the products list. Path parameters feel more permanent and structural, while query parameters feel more like adjustable settings on top of that structure."
        ],
    },
];
