import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.junior
>[] = [
    // JavaScript Fundamentals
    {
        text: "What is the difference between == and ===?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [],
    },
    {
        text: "What is the difference between null and undefined?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [],
    },
    {
        text: "What is the difference between var, let, and const?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["var-let-const"], ValidTag.enum.scope],
        answers: [],
    },
    {
        text: "What is hoisting and how does it affect variables and functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum.hoisting],
        answers: [],
    },
    {
        text: "What is the difference between function declarations and function expressions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [],
    },
    {
        text: "What are arrow functions and how do they differ from regular functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["arrow-functions"]],
        answers: [],
    },
    {
        text: "What is the difference between synchronous and asynchronous code execution?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["async-await"]],
        answers: [],
    },

    // HTML
    {
        text: "What is semantic HTML and why does it matter?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum["semantic-html"], ValidTag.enum.accessibility],
        answers: [],
    },
    {
        text: "What is the difference between <div> and <section> and <article>?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum["semantic-html"]],
        answers: [],
    },
    {
        text: "What is the difference between <button> and <a> for actions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.accessibility],
        answers: [],
    },
    {
        text: "What is the DOM and how does it relate to HTML?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.javascript],
        answers: [],
    },

    // CSS Fundamentals
    {
        text: "What is the CSS box model?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css, ValidTag.enum["box-model"]],
        answers: [],
    },
    {
        text: "What is the difference between display: none and visibility: hidden?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [],
    },
    {
        text: "What is the difference between position: relative, absolute, fixed, and sticky?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [],
    },
    {
        text: "What is the cascade in CSS?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [],
    },
    {
        text: "What is the difference between em, rem, %, vh, and vw?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [],
    },

    // React Fundamentals
    {
        text: "What is React and what problems does it solve?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [],
    },
    {
        text: "What are React hooks?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [],
    },
    {
        text: "What is JSX and how does it get transformed?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.jsx],
        answers: [],
    },
    {
        text: "What is the difference between props and state?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.props, ValidTag.enum.state],
        answers: [],
    },
    {
        text: "What is the difference between functional and class components?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [],
    },

    // Git Basics
    {
        text: "What is Git and how does it work?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.git],
        answers: [],
    },
    {
        text: "What is a merge conflict and how do you resolve it?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.git, ValidTag.enum["conflict-resolution"]],
        answers: [],
    },
];
