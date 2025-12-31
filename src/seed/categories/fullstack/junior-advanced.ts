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
        answers: ["Unit tests focus on testing individual functions or components in isolation. They're fast, specific, and help you catch bugs at the smallest level. For example, testing a single utility function with different inputs. Integration tests verify that multiple units work together correctly - like testing that your API route properly interacts with your database layer. They're slower but catch issues that unit tests miss. End-to-end tests simulate real user behavior, testing the entire application flow from the UI through to the database and back. These are the slowest but give you the most confidence that features actually work from a user's perspective. I think of it as: unit tests prove the parts work, integration tests prove the parts work together, and E2E tests prove the whole system delivers value to users."],
    },
    {
        text: "What is the testing pyramid vs testing trophy?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: ["The testing pyramid is the traditional model that says you should have lots of unit tests at the base, fewer integration tests in the middle, and just a handful of E2E tests at the top. The idea is that unit tests are fast and cheap, so you write many of them. The testing trophy, popularized by Kent C. Dodds, challenges this by putting integration tests at the widest part. The argument is that integration tests give you the best return on investment - they're not too slow like E2E tests, but they test real interactions between parts of your system, unlike isolated unit tests. The trophy still includes all test types, but emphasizes integration tests more. In practice, I think the right balance depends on your application. For frontend-heavy apps, I lean more toward the trophy approach, but for utility libraries, the pyramid makes more sense."],
    },
    {
        text: "What is arrange-act-assert?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: ["Arrange-Act-Assert, or AAA, is a pattern for structuring tests that makes them clearer and more maintainable. In the Arrange phase, you set up the test conditions - creating objects, mocking dependencies, preparing input data. In the Act phase, you execute the code you're testing - calling the function or triggering the behavior. In the Assert phase, you verify the results match your expectations. For example, testing a calculator: arrange by creating the calculator instance, act by calling add(2, 3), assert that the result equals 5. This structure makes tests readable because anyone can quickly see what's being tested, how it's being exercised, and what the expected outcome is. Some people also use a Given-When-Then variation which is essentially the same idea. I find this pattern helps keep tests focused - if you have multiple act or assert blocks, that's usually a sign you should split into separate tests."],
    },
    {
        text: "What makes a good test?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: ["A good test should be reliable, fast, and easy to understand. It should test one thing at a time so when it fails, you immediately know what broke. Good tests are independent - they don't rely on other tests running first or share state. They should be deterministic, giving the same result every time, not flaky with random failures. Speed matters too - slow tests don't get run frequently. A good test also resembles how the code is actually used in production rather than testing implementation details. The test should have clear, descriptive names that explain what scenario is being tested. And importantly, when a good test fails, it should give you enough information to understand why without having to dig through the code. I also think good tests serve as documentation - a new developer should be able to read your tests and understand how the system behaves."],
    },
    {
        text: "What is mocking and when should you avoid it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.mocking],
        answers: ["Mocking is replacing real dependencies with fake implementations in your tests. For example, mocking a database call to return predefined data instead of hitting the actual database. It's useful for isolating the code you're testing, making tests faster, and controlling test conditions. However, you should avoid mocking when it makes your tests brittle or disconnected from reality. If you're mocking too much, your tests might pass even though the real integration is broken - you end up testing your mocks, not your code. I try to avoid mocking implementation details and prefer mocking at architectural boundaries, like external APIs or databases. Also, if mocking something is really complicated, that's often a sign the code is too tightly coupled and needs refactoring. Kent C. Dodds has a great saying: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Excessive mocking works against that principle."],
    },

    // Jest Basics
    {
        text: "What is Jest and how do you configure it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: ["Jest is a JavaScript testing framework developed by Facebook that's become pretty much the standard for testing React applications, though it works great for any JavaScript project. It comes with everything built in - test runner, assertion library, mocking, and coverage reporting. Configuration is typically done through a jest.config.js file or a jest section in package.json. For basic projects, it often works with zero configuration, but you might configure things like the test environment - jsdom for frontend or node for backend. You can set up module name mappers to handle imports like CSS or images, configure coverage thresholds, set up transform options for TypeScript or JSX with babel-jest or ts-jest, and specify which files to include or exclude from test runs. You might also configure setupFilesAfterEnv for test setup code that runs before each test file."],
    },
    {
        text: "What are Jest matchers?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.matchers],
        answers: ["Jest matchers are the assertion methods you use to verify test expectations. They're the methods you chain after expect(). The most common one is toBe() for strict equality using Object.is, which is like ===. Then there's toEqual() for deep equality, which is what you use for objects and arrays. You have toBeNull(), toBeUndefined(), toBeTruthy(), toBeFalsy() for checking specific values. For numbers, there's toBeGreaterThan(), toBeLessThan(), and toBeCloseTo() for floating point comparisons. For strings, you can use toMatch() with regex. For arrays and iterables, toContain() checks if an item exists. There's also toThrow() for exceptions and toHaveBeenCalled() for mock functions. You can negate any matcher with .not, like expect(value).not.toBe(null). Jest also supports custom matchers if you need something specific to your domain."],
    },
    {
        text: "What are Jest hooks (beforeEach, afterEach, etc.)?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: ["Jest hooks are lifecycle functions that run at specific points during test execution. beforeEach() runs before each test in a describe block, which is perfect for setting up common test data or resetting state. afterEach() runs after each test, useful for cleanup like clearing mocks or closing connections. beforeAll() runs once before all tests in a block, good for expensive setup like database connections. afterAll() runs once after all tests, for final cleanup. These hooks are scoped to the describe block they're in, and they nest - if you have nested describe blocks, the outer hooks run before inner ones. I use beforeEach for things like creating fresh instances or resetting mocks with jest.clearAllMocks(). The hooks can be async too, just like tests. One thing to watch out for is putting too much logic in hooks - it can make tests harder to understand when the setup is far from the test itself."],
    },
];
