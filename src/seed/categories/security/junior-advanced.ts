import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.security,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Authentication Basics
    {
        text: "What is the difference between authentication and authorization?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.auth, ValidTag.enum.authorization],
        answers: ["Authentication and authorization are often confused but they're fundamentally different. Authentication is about verifying who you are - like logging in with a username and password to prove your identity. Authorization happens after that and determines what you're allowed to do. For example, once you're authenticated as a user, authorization checks whether you have permission to access certain resources or perform specific actions. So authentication answers 'who are you?' while authorization answers 'what are you allowed to do?'"],
    },
    {
        text: "What are JWTs and how do they work?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum.auth],
        answers: ["JWTs, or JSON Web Tokens, are a compact way to securely transmit information between parties as a JSON object. They're commonly used for authentication. Here's how they work: when a user logs in, the server creates a JWT containing claims about the user, signs it with a secret key, and sends it to the client. The client then includes this token in subsequent requests, typically in the Authorization header. The server can verify the token's signature to ensure it hasn't been tampered with and extract the user information from it without hitting the database. The key benefit is that they're stateless - the server doesn't need to store session data since all the information is contained in the token itself."],
    },
    {
        text: "What is the structure of a JWT?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt],
        answers: ["A JWT has three parts separated by dots: header, payload, and signature. The header contains metadata like the token type and signing algorithm, usually HS256 or RS256. The payload contains the claims - the actual data you want to transmit, like user ID, email, or permissions. Then there's the signature, which is created by encoding the header and payload together with a secret key. All three parts are Base64URL encoded, so a JWT looks like 'xxxxx.yyyyy.zzzzz'. The important thing to remember is that while the data is encoded, it's not encrypted, so you shouldn't put sensitive information in the payload. The signature just ensures the token hasn't been modified."],
    },
    {
        text: "What is the difference between sessions and JWTs?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum["session-management"], ValidTag.enum.auth],
        answers: ["The main difference is where the authentication state is stored. With sessions, the server stores the user's session data in memory, a database, or Redis, and gives the client a session ID cookie. On each request, the server looks up that session ID to get the user's information. With JWTs, all the user information is stored in the token itself on the client side, and the server just verifies the signature. This makes JWTs stateless, which is great for scaling horizontally since any server can validate the token. However, sessions give you more control - you can immediately invalidate a session, while with JWTs, once issued, they're valid until they expire. Sessions also keep less data on the client and can handle larger amounts of session data."],
    },

    // Security Basics
    {
        text: "What is CSRF and how do you prevent it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.csrf, ValidTag.enum.security],
        answers: ["CSRF, or Cross-Site Request Forgery, is when an attacker tricks a user's browser into making unwanted requests to a site where they're authenticated. For example, you're logged into your bank, and you visit a malicious site that contains a form that submits a transfer request to your bank using your cookies. The main prevention is CSRF tokens - you generate a random token, store it in the session, and include it in forms or as a header. When the form is submitted, you verify the token matches. This works because the attacker can't access the token due to same-origin policy. Other defenses include SameSite cookies, which prevent the browser from sending cookies on cross-site requests, and checking the Origin or Referer headers. For APIs, if you're using custom headers for authentication instead of cookies, you're already protected."],
    },
    {
        text: "What is XSS and what are the different types?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.xss, ValidTag.enum.security],
        answers: ["XSS, or Cross-Site Scripting, is when an attacker injects malicious JavaScript into your application that runs in other users' browsers. There are three main types. Stored XSS is the most dangerous - the malicious script is saved in your database, like in a comment or profile, and executes whenever someone views that content. Reflected XSS happens when user input from the URL or form is immediately reflected back in the response without sanitization. DOM-based XSS occurs entirely in the browser when client-side JavaScript processes user input unsafely. To prevent XSS, you need to escape output based on context - HTML escaping for content, JavaScript escaping for scripts, URL encoding for URLs. Use Content Security Policy headers, avoid innerHTML, and use frameworks like React that escape by default. Never trust user input."],
    },
    {
        text: "What is SQL injection and how do you prevent it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum["sql-injection"], ValidTag.enum.security],
        answers: ["SQL injection is when an attacker manipulates your SQL queries by injecting malicious input. For example, if you build a query like 'SELECT * FROM users WHERE username = ' + userInput, an attacker could input something like 'admin' OR '1'='1' to bypass authentication or use UNION attacks to access other tables. The primary defense is parameterized queries or prepared statements, which separate the SQL structure from the data. Instead of concatenating strings, you use placeholders and let the database driver handle escaping. With an ORM like Prisma or TypeORM, you're generally protected if you use their query builders. Also validate input - ensure usernames only contain expected characters. And apply the principle of least privilege - database users should only have permissions they need."],
    },
    {
        text: "What is CORS and why does it exist?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.cors, ValidTag.enum.security],
        answers: ["CORS, or Cross-Origin Resource Sharing, is a security mechanism that controls which websites can make requests to your API from the browser. It exists because of the same-origin policy, which by default prevents JavaScript from making requests to different domains. Without this, a malicious site could make requests to your bank's API using your cookies. CORS lets you selectively relax this restriction. When a browser makes a cross-origin request, it first sends a preflight OPTIONS request asking if the request is allowed. Your server responds with CORS headers like Access-Control-Allow-Origin specifying which origins are permitted. If the origin is allowed, the browser proceeds with the actual request. It's important to understand that CORS is a browser security feature - it doesn't prevent tools like curl from making requests."],
    },
    {
        text: "What is HTTPS and how does TLS work?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["HTTPS is HTTP over TLS, which encrypts the communication between client and server so no one can eavesdrop or tamper with it. Here's how the TLS handshake works: the client connects and the server sends its certificate, which contains its public key. The client verifies this certificate against trusted certificate authorities. Then the client generates a session key, encrypts it with the server's public key, and sends it back. Now both parties have the same session key and use it for symmetric encryption going forward - symmetric is much faster than asymmetric. This provides confidentiality through encryption, integrity through message authentication codes, and authenticity through certificate validation. Modern TLS 1.3 is even faster with fewer round trips. The important thing is HTTPS should be everywhere now - it's free with Let's Encrypt and essential for security."],
    },
    {
        text: "How do you securely store passwords?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum["password-hashing"], ValidTag.enum.bcrypt, ValidTag.enum.security],
        answers: ["You never store passwords in plain text - always hash them using a strong, slow hashing algorithm designed for passwords. The current best practices are bcrypt, scrypt, or Argon2. These algorithms are intentionally slow and include a salt automatically to prevent rainbow table attacks. When a user registers, you hash their password and store only the hash. On login, you hash the submitted password and compare it to the stored hash. The key is these algorithms have a work factor you can tune - as computers get faster, you increase the work factor to keep brute force attacks expensive. Never use fast algorithms like MD5 or SHA-1 for passwords. Don't try to implement your own - use well-tested libraries. And enforce strong password requirements, though passphrase-based approaches are often better than complex character requirements."],
    },
    {
        text: "What is the difference between encryption and hashing?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["The fundamental difference is that encryption is reversible while hashing is one-way. With encryption, you transform data using a key so it's unreadable, but you can decrypt it back to the original using the key. You use encryption when you need to retrieve the original data later, like encrypting credit card numbers or messages. Hashing, on the other hand, is a one-way function that produces a fixed-size output from any input. You can't reverse a hash to get the original data. You use hashing when you only need to verify that data hasn't changed, like with passwords - you don't need to know the original password, just verify that what they entered hashes to the same value. Hashing is also used for data integrity and creating unique identifiers."],
    },
    {
        text: "What is input validation and sanitization?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.validation, ValidTag.enum.security],
        answers: ["Input validation and sanitization are both about handling untrusted data safely, but they're different approaches. Validation is about rejecting bad input - you check if the input matches expected criteria and reject it if it doesn't. For example, validating that an email has the right format, or that an age is a number between 1 and 120. Sanitization is about cleaning input to make it safe - you remove or escape dangerous characters. For example, stripping HTML tags from user input or escaping SQL special characters. The best practice is to validate first - use strict validation and reject anything that doesn't match your expected format. Then sanitize what you accept based on how you're using it. Use libraries like Joi or Zod for validation, and context-specific sanitization - HTML escaping for display, SQL parameterization for queries. Never trust user input."],
    },
];
