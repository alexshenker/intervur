import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum.mid
>[] = [
    // Jest - Core Mid-Level
    {
        text: "How do you test async code in Jest?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: [
            "Jest has great support for async code. The cleanest way is using async/await - just make your test function async and await your promises. Jest will wait for the promise to resolve before finishing the test. You can also return a promise from your test, and Jest will wait for it. For callbacks, you can use the done parameter that Jest passes to your test function, and call done() when the async operation completes. If you forget to call done, Jest will fail with a timeout. For promises that should reject, you can use expect().rejects or try-catch with async/await. Jest also provides resolves and rejects matchers, like await expect(promise).resolves.toBe(value). A common mistake is forgetting to await or return the promise, which makes the test pass before the async code actually runs. Always make sure Jest knows to wait for your async operations.",
            "There are a few approaches depending on what you're testing. My go-to is async/await - you just mark the test function as async and await the promise. Jest automatically waits for it to resolve before completing the test. Alternatively, you can return a promise directly from the test and Jest handles it. For older callback-style APIs, Jest provides a done callback - you add done as a parameter to your test function and call it when the async operation finishes. If you forget to call done, the test times out. For testing rejections, use await expect(promise).rejects.toThrow() or wrap in try-catch. The biggest gotcha is forgetting to await or return - your test will pass immediately before the async code even runs, giving you a false positive. I always double-check that my async assertions are properly awaited.",
        ],
    },
    {
        text: "What are Jest snapshots and when should you use them?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum["snapshot-testing"]],
        answers: [
            "Jest snapshots serialize a value and save it to a file, then compare future test runs against that saved output. You create one with expect(value).toMatchSnapshot(). They're most commonly used for React component testing to catch unintended UI changes. When you first run the test, Jest creates a snapshot file. On subsequent runs, it compares the new output to the saved snapshot. If they differ, the test fails and you can either fix the code or update the snapshot if the change was intentional. Use snapshots for things like component rendering output, API response structures, or error messages - basically, large outputs where writing manual assertions would be tedious. Avoid them for values that change often or are non-deterministic like timestamps. Don't use them as a crutch to avoid thinking about what you're actually testing. I find they work best as a complement to specific assertions, not a replacement. And always review snapshot changes carefully in code review.",
            "Snapshots are a way to capture the output of something - typically rendered component output - and automatically compare it against a stored reference in future runs. You call expect(something).toMatchSnapshot() and Jest saves a .snap file. Next time the test runs, it compares the current output against that file. If there's a difference, the test fails and you decide whether to update the snapshot or fix your code. They're great for catching unexpected UI regressions without writing verbose assertions for every DOM element. I use them for component rendering and sometimes for large API response structures. Where they fall short is with dynamic content like dates or random IDs - you need to either mock those or use property matchers. Also, developers sometimes blindly update snapshots without reviewing changes, which defeats the purpose. I treat them as a safety net, not a replacement for meaningful assertions on critical behavior.",
        ],
    },
];
