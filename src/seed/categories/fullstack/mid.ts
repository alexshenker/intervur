import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum.mid
>[] = [
    // Debugging
    {
        text: "What are some debugging tools you use?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.debugging],
        answers: ["I use a combination of tools depending on the context. For frontend work, Chrome DevTools is my go-to - especially the debugger with breakpoints, the network tab for API calls, and the React DevTools extension for component hierarchies. On the backend, I rely on the Node.js debugger, either through VS Code's built-in debugger or using the inspector protocol. I also use logging strategically with structured logging libraries like Winston or Pino. For database issues, I'll use query logging and tools like pgAdmin or MongoDB Compass. And honestly, sometimes good old console.log or debugger statements are the fastest way to track down an issue, especially in unfamiliar codebases."],
    },

    // Jest - Core Mid-Level
    {
        text: "How do you test async code in Jest?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: ["Jest has great support for async code. The cleanest way is using async/await - just make your test function async and await your promises. Jest will wait for the promise to resolve before finishing the test. You can also return a promise from your test, and Jest will wait for it. For callbacks, you can use the done parameter that Jest passes to your test function, and call done() when the async operation completes. If you forget to call done, Jest will fail with a timeout. For promises that should reject, you can use expect().rejects or try-catch with async/await. Jest also provides resolves and rejects matchers, like await expect(promise).resolves.toBe(value). A common mistake is forgetting to await or return the promise, which makes the test pass before the async code actually runs. Always make sure Jest knows to wait for your async operations."],
    },
    {
        text: "What are Jest snapshots and when should you use them?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum["snapshot-testing"]],
        answers: ["Jest snapshots serialize a value and save it to a file, then compare future test runs against that saved output. You create one with expect(value).toMatchSnapshot(). They're most commonly used for React component testing to catch unintended UI changes. When you first run the test, Jest creates a snapshot file. On subsequent runs, it compares the new output to the saved snapshot. If they differ, the test fails and you can either fix the code or update the snapshot if the change was intentional. Use snapshots for things like component rendering output, API response structures, or error messages - basically, large outputs where writing manual assertions would be tedious. Avoid them for values that change often or are non-deterministic like timestamps. Don't use them as a crutch to avoid thinking about what you're actually testing. I find they work best as a complement to specific assertions, not a replacement. And always review snapshot changes carefully in code review."],
    },
];
