import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Rendering Strategies
    {
        text: "When would you use server-side rendering vs client-side rendering?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.ssr, ValidTag.enum.csr, ValidTag.enum.nextjs],
        answers: [
            "The choice between server-side rendering and client-side rendering really depends on the specific needs of the application. I'd choose server-side rendering when SEO is critical, like for marketing pages, blogs, or e-commerce product pages where search engine visibility directly impacts business. SSR also makes sense when you need fast initial page loads since the browser receives fully rendered HTML immediately, which is especially important for users on slower connections or devices. On the flip side, I'd go with client-side rendering for highly interactive applications like dashboards, admin panels, or apps behind authentication where SEO doesn't matter. CSR shines when you want a more app-like experience with smooth transitions between views without full page reloads. In practice, I often use a hybrid approach with frameworks like Next.js. For example, I might use SSR for the initial landing and product pages, then switch to client-side rendering once the user logs in. This gives you the best of both worlds: great SEO and fast initial loads for public pages, with rich interactivity for authenticated users.",
        ],
    },

    // Advanced Testing
    {
        text: "What is TDD and what are its benefits and drawbacks?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.tdd],
        answers: ["TDD, or Test-Driven Development, is the practice of writing tests before you write the actual code. You follow a red-green-refactor cycle: write a failing test, write just enough code to make it pass, then refactor. The benefits are significant - it forces you to think about your API design upfront, ensures you have good test coverage from the start, and gives you confidence when refactoring. It also helps prevent over-engineering because you only write code that's needed to pass tests. The drawbacks are that it can slow you down initially, especially when you're exploring or prototyping. It also requires discipline and can feel unnatural at first. Sometimes it's hard to know what tests to write before you fully understand the problem. In my experience, TDD works great for well-defined problems like algorithms or business logic, but I'm more flexible with it during early exploration phases."],
    },
    {
        text: "What is test coverage and why is 100% coverage not always the goal?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.coverage],
        answers: ["Test coverage measures what percentage of your code is executed when your tests run. It typically tracks line coverage, branch coverage, and function coverage. While high coverage is generally good, chasing 100% coverage can be counterproductive. Some code just isn't worth testing - like simple getters and setters, or configuration files. More importantly, coverage is a quantitative metric, not a qualitative one. You can have 100% coverage with terrible tests that don't actually verify correct behavior. It's also possible to have diminishing returns - the last 10% of coverage often requires disproportionate effort for edge cases that rarely matter. In my view, coverage is a useful tool to find gaps, but the goal should be testing critical paths and business logic thoroughly, not hitting an arbitrary number. I've seen teams with 80% coverage and rock-solid tests, and teams with 95% coverage that still ship bugs."],
    },
    {
        text: "What are test doubles (mocks, stubs, spies, fakes)?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["test-doubles"], ValidTag.enum.mocking],
        answers: ["Test doubles are generic stand-ins for real dependencies in tests. The terminology can be confusing, but here's how I think about them: Stubs provide canned responses - you stub a function to return specific values without caring if it was called. Spies wrap real functions to track how they're used - you can verify a function was called with certain arguments while still executing the real code. Mocks are pre-programmed with expectations - they know what calls to expect and will fail the test if those expectations aren't met. Fakes are working implementations that are simpler than production, like an in-memory database instead of PostgreSQL. In practice, many testing libraries blur these distinctions. Jest, for example, calls everything a mock even when you're technically creating a stub or spy. What matters more than the terminology is understanding when to use each approach and not over-relying on any one pattern."],
    },
    {
        text: "What is snapshot testing and what are its drawbacks?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["snapshot-testing"]],
        answers: ["Snapshot testing captures the output of a component or function and saves it as a reference file. In subsequent test runs, the output is compared against this snapshot, and the test fails if they don't match. It's really useful for catching unintended changes, especially in UI components. The drawbacks are significant though. Snapshots can become too large and unreadable, making it hard to spot actual problems when they fail. Developers often just update snapshots without reviewing the changes carefully, which defeats the purpose. They also create a lot of noise in pull requests with snapshot diffs. Snapshots can give a false sense of security - they only tell you something changed, not whether it's correct. I use snapshot testing selectively, mainly for things like testing serialized output or error messages, but I prefer more explicit assertions for critical logic and UI behavior."],
    },
    {
        text: "How do you mock modules in Jest?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.mocking],
        answers: ["Jest provides several ways to mock modules. The most common is jest.mock() which you call at the top of your test file with the module path. This automatically mocks all exports of that module. You can provide a factory function as the second argument to define custom implementations. For example, jest.mock('./api') would replace the entire module, or you can do jest.mock('./api', () => ({ fetchUser: jest.fn() })) to control what's mocked. There's also manual mocks where you create a __mocks__ folder next to the module and Jest automatically uses it. For partial mocking, you can use jest.requireActual() to get the original module and only mock specific functions. And if you need to mock a module just for one test, you can use jest.doMock(). The key is calling jest.mock() before importing the module you're testing, since Jest hoists these calls."],
    },
    {
        text: "What is jest.fn() vs jest.spyOn()?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.mocking],
        answers: ["jest.fn() creates a brand new mock function from scratch. You use it when you want to create a standalone mock or replace a function entirely. You can give it an implementation or just track calls to it. It's useful for mocking callbacks or creating mock objects. jest.spyOn(), on the other hand, wraps an existing method on an object and tracks calls to it while preserving the original implementation by default. You'd use it when you want to verify that a real method was called without replacing its behavior. For example, jest.spyOn(console, 'log') lets you track console.log calls while still logging to the console. You can then use mockImplementation() or mockReturnValue() to change its behavior. The key difference is jest.fn() creates something new, while jest.spyOn() wraps something that already exists. And remember to restore spies with mockRestore() to clean up."],
    },
    {
        text: "How do you handle timers in Jest?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: ["Jest provides fake timers that let you control time in tests without actually waiting. You enable them with jest.useFakeTimers(). Then you can use jest.advanceTimersByTime(milliseconds) to fast-forward time, or jest.runAllTimers() to immediately execute all pending timers. There's also jest.runOnlyPendingTimers() which only runs timers that were already scheduled, not new ones they create. This is crucial for testing code with setTimeout, setInterval, or debounce/throttle functions. Without fake timers, you'd have to use actual waits which makes tests slow and flaky. After your test, you call jest.useRealTimers() to restore normal timer behavior, usually in an afterEach hook. One gotcha is that fake timers don't play well with Promises by default in older Jest versions, but modern Jest handles this better with jest.useFakeTimers('modern'). I use this all the time for testing things like auto-save functionality or polling mechanisms."],
    },
    {
        text: "What is code coverage in Jest and how do you configure it?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.coverage],
        answers: ["Code coverage in Jest measures which parts of your code are executed during test runs. Jest uses Istanbul under the hood to track this. You enable it by running jest with the --coverage flag, or by setting collectCoverage: true in your Jest config. It tracks four metrics: statement coverage, branch coverage, function coverage, and line coverage. You can configure collectCoverageFrom to specify which files to include, usually something like ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}']. You can set coverage thresholds with coverageThreshold to fail the build if coverage drops below certain percentages. The coverageDirectory option specifies where to output the reports, and coverageReporters lets you choose formats like 'text', 'lcov', or 'html'. I usually exclude test files, type definitions, and config files from coverage since they don't need testing themselves."],
    },
    {
        text: "How do you run tests in parallel vs sequentially?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: ["By default, Jest runs test files in parallel across multiple worker processes to speed things up. It runs tests within a single file sequentially though. You can control parallelization with the --maxWorkers flag - for example, --maxWorkers=50% uses half your CPU cores, or --maxWorkers=1 forces sequential execution. Running sequentially is useful when you have tests that share resources like a database or file system and might conflict with each other. You can also use --runInBand which is an alias for --maxWorkers=1 and runs everything in the current process, which is helpful for debugging. For tests that must run sequentially within a file but you still want parallel file execution, you can use test.sequential or describe.serial in some test runners, though Jest doesn't have this built-in. The trade-off is speed versus isolation - parallel is faster but requires better test isolation."],
    },
];
