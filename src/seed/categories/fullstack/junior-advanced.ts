import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Testing Fundamentals
    {
        text: "What is the difference between unit, integration, and end-to-end tests?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["unit-testing"], ValidTag.enum["integration-testing"], ValidTag.enum.e2e],
        answers: [
            "Unit tests focus on testing individual functions or components in isolation. They're fast, specific, and help you catch bugs at the smallest level. For example, testing a single utility function with different inputs. Integration tests verify that multiple units work together correctly - like testing that your API route properly interacts with your database layer. They're slower but catch issues that unit tests miss. End-to-end tests simulate real user behavior, testing the entire application flow from the UI through to the database and back. These are the slowest but give you the most confidence that features actually work from a user's perspective. I think of it as: unit tests prove the parts work, integration tests prove the parts work together, and E2E tests prove the whole system delivers value to users.",
            "So the way I think about it is in terms of scope and speed. Unit tests are the foundation - they test a single function or module completely isolated from everything else. You mock out all dependencies, so they run in milliseconds. Integration tests sit in the middle - they test how several pieces work together, like your service layer talking to your repository layer. You might use a real test database here. E2E tests are at the top - they test the entire user journey through the real application, clicking buttons, filling forms, the whole thing. The trade-off is confidence versus speed: unit tests are fast but don't catch integration issues, while E2E tests give you the most realistic testing but are slow and can be flaky. In practice, you want a healthy mix of all three.",
        ],
    },
    {
        text: "What is the testing pyramid vs testing trophy?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [
            "The testing pyramid is the traditional model that says you should have lots of unit tests at the base, fewer integration tests in the middle, and just a handful of E2E tests at the top. The idea is that unit tests are fast and cheap, so you write many of them. The testing trophy, popularized by Kent C. Dodds, challenges this by putting integration tests at the widest part. The argument is that integration tests give you the best return on investment - they're not too slow like E2E tests, but they test real interactions between parts of your system, unlike isolated unit tests. The trophy still includes all test types, but emphasizes integration tests more. In practice, I think the right balance depends on your application. For frontend-heavy apps, I lean more toward the trophy approach, but for utility libraries, the pyramid makes more sense.",
            "These are two different philosophies about how to distribute your testing effort. The pyramid is the classic approach - it says write tons of unit tests because they're cheap and fast, some integration tests, and only a few E2E tests because they're expensive and slow. The trophy model flips this on its head. Kent C. Dodds argues that integration tests actually give you the best bang for your buck because they test real behavior without being as brittle as E2E tests. The trophy has a small base of static type checking, then unit tests, then a bulge of integration tests, and E2E at the top. Personally, I've found the trophy resonates more with React applications where components are the unit of composition, but the pyramid still makes sense for backend services with lots of pure business logic.",
        ],
    },
    {
        text: "What is arrange-act-assert?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [
            "Arrange-Act-Assert, or AAA, is a pattern for structuring tests that makes them clearer and more maintainable. In the Arrange phase, you set up the test conditions - creating objects, mocking dependencies, preparing input data. In the Act phase, you execute the code you're testing - calling the function or triggering the behavior. In the Assert phase, you verify the results match your expectations. For example, testing a calculator: arrange by creating the calculator instance, act by calling add(2, 3), assert that the result equals 5. This structure makes tests readable because anyone can quickly see what's being tested, how it's being exercised, and what the expected outcome is. Some people also use a Given-When-Then variation which is essentially the same idea. I find this pattern helps keep tests focused - if you have multiple act or assert blocks, that's usually a sign you should split into separate tests.",
            "It's a simple pattern for writing clean, readable tests. You break every test into three distinct sections. First, Arrange - this is where you set up everything the test needs. Create your objects, prepare your test data, configure your mocks. Second, Act - this is the single action you're testing, usually just one line calling the method or function under test. Third, Assert - verify the outcome is what you expected. This separation makes tests much easier to read and debug. When a test fails, you can quickly identify if the problem is in setup, execution, or expectations. I also like that it enforces discipline - if I find myself with multiple Act sections, that's a code smell telling me I should split this into separate tests. Some teams use Given-When-Then which is the same concept with BDD-style naming.",
        ],
    },
    {
        text: "What makes a good test?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [
            "A good test should be reliable, fast, and easy to understand. It should test one thing at a time so when it fails, you immediately know what broke. Good tests are independent - they don't rely on other tests running first or share state. They should be deterministic, giving the same result every time, not flaky with random failures. Speed matters too - slow tests don't get run frequently. A good test also resembles how the code is actually used in production rather than testing implementation details. The test should have clear, descriptive names that explain what scenario is being tested. And importantly, when a good test fails, it should give you enough information to understand why without having to dig through the code. I also think good tests serve as documentation - a new developer should be able to read your tests and understand how the system behaves.",
            "I follow a few key principles. First, a good test is deterministic - it passes or fails consistently, never flaky. Second, it's isolated - no dependencies on other tests or shared mutable state. Third, it tests behavior, not implementation - I should be able to refactor the internals without breaking tests as long as the public contract stays the same. Fourth, it's fast enough to run constantly during development. Fifth, it has a descriptive name that tells you exactly what scenario failed. And sixth, when it does fail, the error message should point you straight to the problem. I also believe tests should act as living documentation - someone new to the codebase should be able to read the test suite and understand what the system does and how it's meant to be used.",
        ],
    },
    {
        text: "What is mocking and when should you avoid it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.mocking],
        answers: [
            "Mocking is replacing real dependencies with fake implementations in your tests. For example, mocking a database call to return predefined data instead of hitting the actual database. It's useful for isolating the code you're testing, making tests faster, and controlling test conditions. However, you should avoid mocking when it makes your tests brittle or disconnected from reality. If you're mocking too much, your tests might pass even though the real integration is broken - you end up testing your mocks, not your code. I try to avoid mocking implementation details and prefer mocking at architectural boundaries, like external APIs or databases. Also, if mocking something is really complicated, that's often a sign the code is too tightly coupled and needs refactoring. Kent C. Dodds has a great saying: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Excessive mocking works against that principle.",
            "Mocking lets you substitute real dependencies with controlled fake versions. Say you're testing a service that calls an external payment API - you don't want to actually charge cards during tests, so you mock that API to return predictable responses. The main benefits are speed, isolation, and control over edge cases. But there's a dark side. Over-mocking is a common trap where you end up testing that your mocks work rather than testing actual behavior. I avoid mocking things I own when possible - if I'm testing a controller, I might use a real service with a mocked external dependency rather than mocking the service itself. The rule I follow is: mock at the boundaries of your system, not inside it. And if setting up mocks becomes painful, that's usually a design smell telling you your code is too coupled.",
        ],
    },

    // Jest Basics
    {
        text: "What is Jest and how do you configure it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: [
            "Jest is a JavaScript testing framework developed by Facebook that's become pretty much the standard for testing React applications, though it works great for any JavaScript project. It comes with everything built in - test runner, assertion library, mocking, and coverage reporting. Configuration is typically done through a jest.config.js file or a jest section in package.json. For basic projects, it often works with zero configuration, but you might configure things like the test environment - jsdom for frontend or node for backend. You can set up module name mappers to handle imports like CSS or images, configure coverage thresholds, set up transform options for TypeScript or JSX with babel-jest or ts-jest, and specify which files to include or exclude from test runs. You might also configure setupFilesAfterEnv for test setup code that runs before each test file.",
            "Jest is an all-in-one testing framework for JavaScript that Meta originally built for React but works with any JS project. What makes it popular is that it bundles everything together - assertions, mocking, code coverage, snapshot testing - so you don't need to piece together multiple libraries. For configuration, you create a jest.config.js or add a jest key in package.json. Common settings include testEnvironment to choose between jsdom for browser-like testing or node for backend, moduleNameMapper to handle non-JS imports like CSS modules, transform to set up Babel or TypeScript compilation, and setupFilesAfterEnv to run setup code before tests. I also usually configure collectCoverageFrom to define which files to track for coverage. The nice thing is Jest has sensible defaults, so for many projects you can start with almost no config.",
        ],
    },
    {
        text: "What are Jest matchers?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.matchers],
        answers: [
            "Jest matchers are the assertion methods you use to verify test expectations. They're the methods you chain after expect(). The most common one is toBe() for strict equality using Object.is, which is like ===. Then there's toEqual() for deep equality, which is what you use for objects and arrays. You have toBeNull(), toBeUndefined(), toBeTruthy(), toBeFalsy() for checking specific values. For numbers, there's toBeGreaterThan(), toBeLessThan(), and toBeCloseTo() for floating point comparisons. For strings, you can use toMatch() with regex. For arrays and iterables, toContain() checks if an item exists. There's also toThrow() for exceptions and toHaveBeenCalled() for mock functions. You can negate any matcher with .not, like expect(value).not.toBe(null). Jest also supports custom matchers if you need something specific to your domain.",
            "Matchers are how you make assertions in Jest - they're the methods that come after expect(). The two you'll use most are toBe() and toEqual(). toBe() uses strict reference equality, so it's good for primitives and checking if two variables point to the same object. toEqual() does deep comparison, so you use it for comparing object contents. Beyond those, you have truthiness matchers like toBeTruthy(), toBeFalsy(), toBeDefined(). Number matchers like toBeGreaterThan(), toBeCloseTo() for floats. String matchers like toMatch() for regex. Array matchers like toContain() and toHaveLength(). For async code, there's resolves and rejects. For mocks, toHaveBeenCalled() and toHaveBeenCalledWith(). You can flip any matcher with .not. And if the built-in ones don't cover your use case, you can write custom matchers with expect.extend().",
        ],
    },
    {
        text: "What are Jest hooks (beforeEach, afterEach, etc.)?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: [
            "Jest hooks are lifecycle functions that run at specific points during test execution. beforeEach() runs before each test in a describe block, which is perfect for setting up common test data or resetting state. afterEach() runs after each test, useful for cleanup like clearing mocks or closing connections. beforeAll() runs once before all tests in a block, good for expensive setup like database connections. afterAll() runs once after all tests, for final cleanup. These hooks are scoped to the describe block they're in, and they nest - if you have nested describe blocks, the outer hooks run before inner ones. I use beforeEach for things like creating fresh instances or resetting mocks with jest.clearAllMocks(). The hooks can be async too, just like tests. One thing to watch out for is putting too much logic in hooks - it can make tests harder to understand when the setup is far from the test itself.",
            "These are setup and teardown functions that Jest runs automatically at specific points in your test lifecycle. beforeEach runs before every single test in a describe block - I typically use it to reset mocks with jest.clearAllMocks() or create fresh test fixtures. afterEach runs after each test for cleanup. Then beforeAll and afterAll run once per describe block, before any tests start and after all tests finish - useful for expensive operations like spinning up a test database connection. Hooks follow scoping rules, so a beforeEach in an outer describe runs before hooks in nested describes. They support async operations too, just return a promise or use async/await. One tip: don't go overboard with hooks. If your beforeEach is doing a lot, it can make individual tests hard to understand because the setup is hidden away. Sometimes explicit setup in the test itself is clearer.",
        ],
    },
];
