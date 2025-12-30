import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.fullstack,
    typeof Level.enum.mid
>[] = [
    {
        text: "What are some debugging tools you use?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.debugging],
        answers: [],
    },

    // Testing Fundamentals
    {
        text: "What is the difference between unit, integration, and end-to-end tests?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["unit-testing"], ValidTag.enum["integration-testing"], ValidTag.enum.e2e],
        answers: [],
    },
    {
        text: "What is the testing pyramid vs testing trophy?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [],
    },
    {
        text: "What is TDD and what are its benefits and drawbacks?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.tdd],
        answers: [],
    },
    {
        text: "What is test coverage and why is 100% coverage not always the goal?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.coverage],
        answers: [],
    },
    {
        text: "What is mocking and when should you avoid it?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum.mocking],
        answers: [],
    },
    {
        text: "What are test doubles (mocks, stubs, spies, fakes)?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["test-doubles"], ValidTag.enum.mocking],
        answers: [],
    },
    {
        text: "What is snapshot testing and what are its drawbacks?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing, ValidTag.enum["snapshot-testing"]],
        answers: [],
    },
    {
        text: "How do you test async code?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [],
    },
    {
        text: "What is arrange-act-assert?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [],
    },
    {
        text: "What makes a good test?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.testing],
        answers: [],
    },

    // Jest
    {
        text: "What is Jest and how do you configure it?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: [],
    },
    {
        text: "What are Jest matchers?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.matchers],
        answers: [],
    },
    {
        text: "How do you mock modules in Jest?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.mocking],
        answers: [],
    },
    {
        text: "What is jest.fn() vs jest.spyOn()?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.mocking],
        answers: [],
    },
    {
        text: "How do you test async code in Jest?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.testing],
        answers: [],
    },
    {
        text: "What are Jest hooks (beforeEach, afterEach, etc.)?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: [],
    },
    {
        text: "How do you handle timers in Jest?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: [],
    },
    {
        text: "What is code coverage in Jest and how do you configure it?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum.coverage],
        answers: [],
    },
    {
        text: "How do you run tests in parallel vs sequentially?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest],
        answers: [],
    },
    {
        text: "What are Jest snapshots and when should you use them?",
        level: Level.enum.mid,
        category: Category.enum.fullstack,
        tags: [ValidTag.enum.jest, ValidTag.enum["snapshot-testing"]],
        answers: [],
    },
];
