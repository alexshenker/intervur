import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.security,
    typeof Level.enum.mid
>[] = [
    // Authentication and Authorization
    {
        text: "What are refresh tokens and why are they needed?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum["refresh-tokens"], ValidTag.enum.auth],
        answers: ["Refresh tokens solve a key security problem with access tokens. Access tokens need to be short-lived for security - if one gets stolen, you want it to expire quickly. But having users log in every 15 minutes would be terrible UX. That's where refresh tokens come in. When a user logs in, you give them both a short-lived access token and a long-lived refresh token. The access token is used for API requests, while the refresh token is stored securely and only used to get new access tokens when the old one expires. This way, if an access token is compromised, it's only valid briefly, but users can stay logged in for weeks or months through the refresh token."],
    },
    {
        text: "What is the difference between access tokens and refresh tokens?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum["refresh-tokens"]],
        answers: ["The main differences come down to their purpose and lifespan. Access tokens are short-lived, typically expiring in 15 minutes to an hour, and they're included with every API request to prove you're authenticated. Refresh tokens are long-lived, lasting days or weeks, and they're only sent to a specific endpoint to get new access tokens. Access tokens can be stored in memory, while refresh tokens should be stored more securely, like in httpOnly cookies. Also, access tokens are lightweight and meant to be used frequently, while refresh tokens often have additional security measures like rotation, where each use generates a new refresh token and invalidates the old one."],
    },
    {
        text: "How does OAuth 2.0 work?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.oauth, ValidTag.enum.auth],
        answers: ["OAuth 2.0 is an authorization framework that lets users grant applications access to their resources without sharing passwords. Here's the basic flow: a user wants to use your app to access their data from another service, like Google. Your app redirects them to Google's authorization server, where they log in and consent to sharing specific data. Google then redirects back to your app with an authorization code. Your app exchanges this code for an access token by making a server-to-server request with your client secret. Finally, you use that access token to make API requests on behalf of the user. The key is that your app never sees the user's password, and the user can revoke access at any time."],
    },
    {
        text: "When would you choose sessions over JWTs?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum["session-management"]],
        answers: ["I'd choose sessions when I need immediate revocation capability. If you need to log users out instantly - like when they change their password, or for admin actions, or security incidents - sessions are the way to go because you can delete them server-side immediately. JWTs can't be revoked until they expire unless you maintain a blacklist, which defeats the stateless benefit. Sessions are also better when you need to store a lot of session data that would make JWTs too large. And for traditional server-rendered web apps, sessions are simpler and more natural. I'd use JWTs mainly for APIs, microservices, or when I need true stateless authentication across multiple services or domains."],
    },
    {
        text: "How do you store tokens securely on the client?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum.security],
        answers: ["For web apps, the most secure approach is to store refresh tokens in httpOnly, secure cookies, which prevents JavaScript from accessing them and protects against XSS attacks. For access tokens, since you need to send them with API requests, I typically keep them in memory - like in a React state or a variable. You could use sessionStorage as a fallback, but avoid localStorage since it persists across sessions and is more vulnerable. The key is never storing sensitive tokens where XSS can reach them. For mobile apps, use the platform's secure storage - Keychain on iOS or Keystore on Android. And always make sure your cookies have the SameSite attribute set to protect against CSRF attacks."],
    },
    {
        text: "What is token revocation and how do you implement it?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum.auth],
        answers: ["Token revocation is the ability to invalidate a token before it naturally expires. For refresh tokens, it's straightforward - you store them in a database with a revoked flag or just delete them when a user logs out. For JWTs used as access tokens, it's trickier since they're stateless. The common approaches are maintaining a blacklist of revoked tokens in Redis with TTL matching the token expiration, or maintaining a whitelist and checking it on each request, though that defeats the stateless benefit. A simpler approach is keeping access tokens short-lived and only revoking refresh tokens, accepting that compromised access tokens could be valid for a few more minutes. You can also implement a version number in your user database and include it in the token claims, incrementing it on logout."],
    },
    {
        text: "What are scopes and claims in OAuth?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.oauth],
        answers: ["Scopes and claims serve different purposes in OAuth. Scopes define what permissions you're requesting - they're like asking for access to specific resources or actions. For example, scopes might be 'read:email', 'write:posts', or 'admin:users'. The user sees these during the consent screen and approves them. Claims, on the other hand, are statements about the user contained in the token itself - like their user ID, email, name, or roles. So scopes are about authorization and what the app can do, while claims are about identity and information about the user. When you request a scope like 'profile', you might get back claims like name, email, and picture in the ID token."],
    },
    {
        text: "What are magic links and passwordless authentication?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.auth],
        answers: ["Magic links are a form of passwordless authentication where users log in by clicking a unique link sent to their email instead of entering a password. When a user wants to log in, they enter their email, and you generate a secure, time-limited token, store it in your database, and email them a link containing that token. When they click the link, you verify the token is valid and not expired, then log them in. The benefits are better UX - no password to remember - and improved security since there's no password to steal or reuse. You can also do passwordless with SMS codes or authenticator apps. The key is making sure tokens are cryptographically random, single-use, and expire quickly, typically in 10-15 minutes."],
    },

    // Security
    {
        text: "How do you configure CORS properly?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.cors, ValidTag.enum.security],
        answers: ["Proper CORS configuration is about being as restrictive as possible while allowing legitimate use. First, never use a wildcard Access-Control-Allow-Origin: * if you're handling credentials - instead, specify exact origins like 'https://myapp.com'. If you need to support multiple origins, maintain a whitelist and check the incoming Origin header against it. Set Access-Control-Allow-Credentials: true only if needed for cookies or authentication headers. For Access-Control-Allow-Methods, only list the HTTP methods you actually use. Same with Access-Control-Allow-Headers - be specific. Set Access-Control-Max-Age to cache preflight responses and reduce overhead. And critically, handle CORS on your backend, not by disabling security in the browser or using proxy workarounds in development."],
    },
    {
        text: "What are security headers and which ones should you use?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["Security headers are HTTP response headers that tell browsers how to behave to protect against attacks. The essential ones are: Content-Security-Policy to prevent XSS by controlling what resources can load, X-Frame-Options or the frame-ancestors CSP directive to prevent clickjacking, Strict-Transport-Security to force HTTPS, X-Content-Type-Options: nosniff to prevent MIME type sniffing attacks, and Referrer-Policy to control what information is leaked in the Referer header. I'd also include Permissions-Policy to control browser features like geolocation or camera. You can test your headers at securityheaders.com. Most frameworks have middleware to set these easily, or you can configure them in your reverse proxy like nginx. These headers provide defense in depth - even if you have other vulnerabilities, they add layers of protection."],
    },
    {
        text: "What is bcrypt and why is it preferred for password hashing?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.bcrypt, ValidTag.enum["password-hashing"]],
        answers: ["Bcrypt is a password hashing function specifically designed to be slow, which makes brute force attacks impractical. It's based on the Blowfish cipher and has a configurable cost factor - typically between 10 and 12 - that determines how many iterations it performs. Each increment doubles the time required. It automatically generates and includes a unique salt for each password, preventing rainbow table attacks. The beauty of bcrypt is that as hardware gets faster, you just increase the cost factor to maintain security. The output is a string that includes the algorithm version, cost factor, salt, and hash all together. This is why bcrypt is preferred over fast cryptographic hashes like SHA-256 - those are designed for speed, but for passwords, you want slowness to make cracking expensive. Libraries like bcryptjs make it easy to use correctly."],
    },
    {
        text: "What are common OWASP vulnerabilities?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["The OWASP Top 10 is a list of the most critical web application security risks. The top ones include Broken Access Control, where users can access resources they shouldn't, like viewing other users' data by changing an ID in the URL. Cryptographic Failures covers things like storing sensitive data unencrypted or using weak encryption. Injection attacks like SQL injection and XSS where untrusted data is executed as code. Insecure Design is about fundamental flaws in the application architecture. Security Misconfiguration like leaving default credentials or unnecessary features enabled. Vulnerable and Outdated Components means using libraries with known vulnerabilities. Authentication and Session Management failures. Software and Data Integrity Failures. Security Logging and Monitoring Failures. And Server-Side Request Forgery. These represent the most common and impactful vulnerabilities developers need to guard against."],
    },
    {
        text: "What is rate limiting and how do you implement it?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum["rate-limiting"], ValidTag.enum.security],
        answers: ["Rate limiting restricts how many requests a user can make in a given time period to prevent abuse, brute force attacks, and DDoS. For implementation, the most common approach is the sliding window or token bucket algorithm. You track requests by user identifier - IP address, API key, or user ID - typically using Redis for fast lookups. For example, you might allow 100 requests per minute per user. On each request, you check Redis for their current count, increment it, and set an expiration. If they're over the limit, you return a 429 Too Many Requests response. Libraries like express-rate-limit make this easy. You can implement different limits for different endpoints - stricter limits on login attempts, looser limits on reading data. Also return headers like X-RateLimit-Remaining so clients know their status."],
    },
    {
        text: "What is clickjacking and how do you prevent it?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["Clickjacking is when an attacker embeds your site in an invisible iframe over their own page and tricks users into clicking on your site without knowing it. For example, they could overlay your 'Delete Account' button under their 'Click here for a prize' button. When users think they're clicking the prize button, they're actually clicking your delete button. The main prevention is the X-Frame-Options header, which you can set to DENY to prevent any framing, or SAMEORIGIN to only allow framing from your own domain. The modern approach is using Content Security Policy with the frame-ancestors directive, which gives you more fine-grained control over which domains can frame your content. You can also use framebusting JavaScript, but headers are more reliable since JavaScript can be disabled."],
    },
    {
        text: "What are secure cookies and what flags should you set?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security, ValidTag.enum["session-management"]],
        answers: ["Secure cookies have specific flags that protect them from attacks. The Secure flag ensures cookies are only sent over HTTPS, preventing them from being intercepted over unencrypted connections. The HttpOnly flag prevents JavaScript from accessing the cookie, which protects against XSS attacks stealing session tokens. The SameSite attribute is crucial for CSRF protection - SameSite=Strict prevents the cookie from being sent on any cross-site requests, while SameSite=Lax allows it on top-level navigation but not on embedded requests. For sensitive cookies like session tokens, you want all three: Secure, HttpOnly, and SameSite=Strict or Lax. You should also set an appropriate expiration time and consider using the __Host- prefix for additional security, which requires the Secure flag and no Domain attribute."],
    },
    {
        text: "How do you handle secrets management?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["Secrets management is about securely storing and accessing sensitive configuration like API keys, database passwords, and encryption keys. First rule: never commit secrets to version control. Use environment variables for development, but for production, use dedicated secrets management services like AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault. These services provide encryption at rest, access control, audit logging, and secret rotation. In your code, load secrets at runtime, not hardcode them. Use .env files for local development with a .env.example template in git, but keep .env itself in .gitignore. For CI/CD, inject secrets as environment variables from your secrets manager. Rotate secrets regularly, especially after team members leave. And apply least privilege - only give access to the specific secrets each service needs."],
    },
    {
        text: "What is the principle of least privilege?",
        level: Level.enum.mid,
        category: Category.enum.security,
        tags: [ValidTag.enum.security, ValidTag.enum.authorization],
        answers: ["The principle of least privilege means giving users, services, and systems only the minimum permissions they need to do their job, and nothing more. For example, a database user for your application should only have permissions on the specific tables it needs, not admin access to the entire database. A junior developer might have read access to production logs but not the ability to deploy. An API key for a reporting service should only have read permissions, not write. This limits the damage if credentials are compromised - an attacker who steals a read-only API key can't delete data. It also reduces the risk of accidents. In practice, this means carefully designing roles and permissions, regularly auditing access, removing permissions when they're no longer needed, and using time-limited access for sensitive operations. It's a fundamental security principle that applies at every level."],
    },
];
