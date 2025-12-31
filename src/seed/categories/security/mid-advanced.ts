import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.security,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Advanced OAuth/Auth
    {
        text: "What are the different OAuth grant types and when do you use each?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.oauth],
        answers: ["There are several OAuth grant types for different scenarios. Authorization Code is the most common and secure - you use it for web apps where you have a backend server that can securely store the client secret. Authorization Code with PKCE is for mobile apps and SPAs where you can't safely store secrets. Client Credentials is for server-to-server communication when there's no user involved, like microservices talking to each other. The Resource Owner Password Credentials flow, where users give their credentials directly to your app, is mostly deprecated now because it defeats the purpose of OAuth. And then there's the Implicit flow, which was used for SPAs but has been replaced by Authorization Code with PKCE for better security."],
    },
    {
        text: "What is OIDC (OpenID Connect) and how does it relate to OAuth?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.oauth, ValidTag.enum.auth],
        answers: ["OpenID Connect is an identity layer built on top of OAuth 2.0. While OAuth is purely about authorization - granting access to resources - it doesn't handle authentication well. OIDC adds authentication on top of OAuth. The key difference is that with OIDC, you get an ID token in addition to the access token. This ID token is a JWT that contains verified information about the user like their name, email, and profile picture. So OAuth answers 'what can this app access?' while OIDC answers 'who is this user?'. In practice, when you implement 'Sign in with Google', you're using OIDC, not just OAuth, because you're authenticating the user and getting their identity information."],
    },
    {
        text: "How do you implement token rotation?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.jwt, ValidTag.enum["refresh-tokens"]],
        answers: ["Token rotation is a security pattern where each time a refresh token is used, you issue a new one and invalidate the old one. Here's how it works: when a client uses a refresh token to get a new access token, instead of just returning the access token, you also generate and return a new refresh token, and mark the old one as used in your database. If someone tries to use an already-used refresh token, that's a sign of theft, so you invalidate the entire token family. This limits the window of opportunity for attackers - if a refresh token is stolen, it's only valid until the legitimate user rotates it. You need to store refresh tokens server-side to track their usage and implement this properly."],
    },
    {
        text: "What is PKCE and why is it important for mobile/SPA apps?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.oauth],
        answers: ["PKCE, which stands for Proof Key for Code Exchange, solves a critical security problem for public clients like mobile apps and SPAs that can't securely store a client secret. Without PKCE, an attacker could intercept the authorization code during the redirect and exchange it for tokens. Here's how PKCE works: before starting the OAuth flow, your app generates a random code verifier and creates a code challenge from it using SHA256. You send the code challenge with the initial authorization request. Then, when exchanging the authorization code for tokens, you send the original code verifier. The authorization server verifies that the code verifier matches the challenge, proving that the same app that started the flow is completing it. This prevents authorization code interception attacks."],
    },
    {
        text: "What is SAML and how does it differ from OAuth?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.auth, ValidTag.enum.oauth],
        answers: ["SAML and OAuth solve different problems, though they're often confused. SAML is primarily for authentication and SSO, especially in enterprise environments. It uses XML-based assertions to pass identity information from an identity provider to a service provider. OAuth is for authorization, delegating access to resources without sharing passwords. SAML is older, more complex, and heavyweight - the tokens are large XML documents. OAuth is modern, lightweight, and uses JSON tokens. SAML is better for enterprise SSO where employees log in once to access internal apps. OAuth is better for consumer apps and API authorization, like letting a third-party app access your Google data. These days, for modern apps, OIDC built on OAuth has largely replaced SAML for authentication."],
    },
    {
        text: "How do you handle authentication in microservices?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.auth, ValidTag.enum.microservices],
        answers: ["In microservices, you typically use a centralized authentication service and JWTs for distributed authorization. The pattern I usually follow is: the client authenticates with an auth service, which issues a JWT. The client then includes this JWT in requests to any microservice. Each service validates the JWT signature using a shared public key, without needing to call back to the auth service - that's the beauty of JWTs being stateless. You can use an API gateway to handle authentication at the edge and forward the token to internal services. For service-to-service communication, you might use mutual TLS or a service mesh like Istio. The key is avoiding cascading authentication calls - once authenticated, the JWT should be enough for any service to verify identity and permissions."],
    },
    {
        text: "What is the difference between symmetric and asymmetric encryption?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["Symmetric encryption uses the same key for both encryption and decryption - like a password that locks and unlocks a safe. It's fast and efficient, which is why it's used for encrypting large amounts of data, like file encryption or HTTPS traffic after the handshake. The challenge is securely sharing that key with the other party. Examples are AES and ChaCha20. Asymmetric encryption uses a pair of keys - a public key for encryption and a private key for decryption. Anyone can encrypt with the public key, but only the private key holder can decrypt. It's much slower but solves the key distribution problem. This is used in HTTPS handshakes and digital signatures. In practice, you often use both - asymmetric encryption to securely exchange a symmetric key, then symmetric encryption for the actual data transfer."],
    },
    {
        text: "What is Content Security Policy?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.security],
        answers: ["Content Security Policy is a powerful security header that prevents XSS and other injection attacks by controlling what resources the browser is allowed to load. You define policies for different resource types using directives. For example, script-src 'self' means JavaScript can only load from your own domain, img-src * allows images from anywhere, and default-src 'none' blocks everything by default. You can use nonces or hashes to allow specific inline scripts. CSP operates in two modes: enforcement mode where violations are blocked, and report-only mode where violations are just logged, which is great for testing. The challenge with CSP is it can break things if too strict, so you start permissive and gradually tighten it. When properly configured, even if an attacker finds an XSS vulnerability, CSP prevents their script from executing."],
    },
    {
        text: "What is SSO (Single Sign-On) and how do you implement it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.auth],
        answers: ["Single Sign-On lets users authenticate once and access multiple applications without logging in again. For example, logging into Google gives you access to Gmail, Drive, and YouTube. To implement SSO, you typically set up an identity provider - this could be your own OAuth/OIDC server or a service like Auth0 or Okta. All your applications then redirect to this identity provider for authentication. The IdP maintains the session, and when users access a different app, it checks if they're already authenticated and just issues a new token without asking for credentials again. The key is sharing the authentication state across apps through the identity provider, using protocols like SAML, OAuth 2.0, or OIDC. For enterprise SSO, you'd integrate with their existing IdP like Active Directory."],
    },
    {
        text: "What is multi-factor authentication and how do you implement it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.security,
        tags: [ValidTag.enum.auth],
        answers: ["Multi-factor authentication requires users to verify their identity using two or more different types of credentials - something they know like a password, something they have like a phone or security key, and something they are like a fingerprint. To implement it, the most common approach is TOTP, Time-based One-Time Passwords. After the user enters their password, you generate a secret key and create a QR code using a library like speakeasy or otplib. The user scans this with an authenticator app like Google Authenticator. Then on login, they provide the 6-digit code from their app, and you verify it matches what your server generates from the stored secret. You can also implement SMS codes, though those are less secure, or use WebAuthn for hardware security keys, which is the most secure option."],
    },
];
