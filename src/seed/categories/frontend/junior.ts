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
        answers: [
            "The main difference is that == does type coercion while === doesn't. So with ==, JavaScript will try to convert the values to the same type before comparing them. For example, '5' == 5 would be true because JavaScript converts the string to a number. But with ===, it checks both the value and the type, so '5' === 5 would be false. In general, it's better to use === because it's more predictable and avoids unexpected behavior from type coercion.",
        ],
    },
    {
        text: "What is the difference between null and undefined?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [
            "Both represent the absence of a value, but they're used differently. Undefined means a variable has been declared but hasn't been assigned a value yet, or a function doesn't return anything. Null is an intentional assignment that represents 'no value' - you explicitly set something to null. For example, let x would be undefined, but let y = null is intentionally set to nothing. Also, typeof undefined returns 'undefined' while typeof null returns 'object', which is actually a historical bug in JavaScript.",
        ],
    },
    {
        text: "What is the difference between var, let, and const?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["var-let-const"], ValidTag.enum.scope],
        answers: [
            "The main differences are scope and reassignment. Var is function-scoped, meaning it's accessible anywhere in the function, and it gets hoisted. Let and const are block-scoped, so they only exist within the curly braces they're declared in. The difference between let and const is that let can be reassigned but const can't - though with const objects and arrays, you can still modify their contents, you just can't reassign the variable itself. These days, most people use const by default and only use let when they need to reassign.",
        ],
    },
    {
        text: "What is hoisting and how does it affect variables and functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum.hoisting],
        answers: [
            "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. With function declarations, the entire function gets hoisted, so you can call a function before it's defined in your code. With var variables, the declaration gets hoisted but not the initialization, so it'll be undefined if you access it before the assignment. Let and const are also hoisted but they're in a 'temporal dead zone' until their declaration is reached, so you'll get a ReferenceError if you try to access them early.",
        ],
    },
    {
        text: "What is the difference between function declarations and function expressions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [
            "A function declaration is when you use the function keyword to define a named function, like 'function myFunc() {}'. A function expression is when you assign a function to a variable, like 'const myFunc = function() {}'. The key difference is hoisting - function declarations are fully hoisted so you can call them before they appear in your code, but function expressions aren't hoisted in the same way. Also, function expressions can be anonymous while declarations must have a name.",
        ],
    },
    {
        text: "What are arrow functions and how do they differ from regular functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["arrow-functions"]],
        answers: [
            "Arrow functions are a shorter syntax for writing functions, using the => syntax. The main differences are that arrow functions don't have their own 'this' binding - they inherit this from their surrounding scope, which is really useful in callbacks. They also don't have their own arguments object, and they can't be used as constructors with the new keyword. For simple functions, you can make them even more concise by omitting the curly braces and return keyword if it's a single expression.",
        ],
    },
    {
        text: "What is the difference between synchronous and asynchronous code execution?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["async-await"]],
        answers: [
            "Synchronous code runs line by line, blocking the next line until the current one finishes. Asynchronous code allows JavaScript to continue executing other code while waiting for something to complete, like an API call or timer. This is crucial because JavaScript is single-threaded - if everything was synchronous, the entire app would freeze while waiting for operations to complete. We handle async code using callbacks, promises, or async/await syntax.",
        ],
    },

    // HTML
    {
        text: "What is semantic HTML and why does it matter?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum["semantic-html"], ValidTag.enum.accessibility],
        answers: [
            "Semantic HTML means using HTML tags that clearly describe their meaning and purpose, like header, nav, article, section, instead of just using div for everything. It matters for several reasons - it improves accessibility because screen readers can better understand the page structure, it helps with SEO since search engines can better understand your content, and it makes your code more readable and maintainable for other developers. For example, using a button tag instead of a div with an onclick handler gives you keyboard navigation and proper accessibility for free.",
        ],
    },
    {
        text: "What is the difference between <div> and <section> and <article>?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum["semantic-html"]],
        answers: [
            "A div is a generic container with no semantic meaning - it's just for grouping and styling. A section represents a thematic grouping of content, usually with a heading, like different parts of a page. An article is for self-contained content that could be distributed independently, like a blog post or news article. So you'd use article for a blog post, section for the different parts within that post, and div when you just need a wrapper for styling purposes.",
        ],
    },
    {
        text: "What is the difference between <button> and <a> for actions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.accessibility],
        answers: [
            "Use a button for actions that do something on the current page, like submitting a form or opening a modal. Use an anchor tag for navigation to a different page or location. This matters for accessibility - buttons work with the space bar, anchors work with enter, and screen readers announce them differently. Also, buttons don't have a default href so they won't mess up your routing, while anchors are meant for navigation and should have a valid URL.",
        ],
    },
    {
        text: "What is the DOM and how does it relate to HTML?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.javascript],
        answers: [
            "The DOM, or Document Object Model, is a programming interface that represents your HTML as a tree structure of objects that JavaScript can interact with. When the browser loads your HTML, it parses it and creates this DOM tree. Each HTML element becomes a node in the tree that you can access and manipulate with JavaScript. So HTML is the markup you write, and the DOM is the live representation of that in memory that you can change dynamically.",
        ],
    },

    // CSS Fundamentals
    {
        text: "What is the CSS box model?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css, ValidTag.enum["box-model"]],
        answers: [
            "The box model describes how elements are sized and spaced in CSS. Every element is a box with four parts - the content in the center, then padding around the content, then a border around the padding, and finally margin around the border. By default, when you set width and height, it only applies to the content, and padding and border add to the total size. But with box-sizing: border-box, the width includes the padding and border, which is usually more intuitive and why a lot of projects set it globally.",
        ],
    },
    {
        text: "What is the difference between display: none and visibility: hidden?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "Display: none completely removes the element from the page layout - it's like it doesn't exist, and other elements will move to fill the space. Visibility: hidden hides the element but it still takes up space in the layout, so you'll see a blank area where it was. Also, display: none removes it from the accessibility tree so screen readers won't see it, while visibility: hidden might still be announced depending on the screen reader. Use display: none when you want to fully remove something, and visibility: hidden when you want to keep the layout intact.",
        ],
    },
    {
        text: "What is the difference between position: relative, absolute, fixed, and sticky?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "Relative positioning keeps the element in the normal document flow but lets you offset it from its original position. Absolute positioning removes it from the flow and positions it relative to its nearest positioned ancestor. Fixed positioning also removes it from the flow but positions it relative to the viewport, so it stays in place when you scroll. Sticky is a hybrid - it acts like relative until you scroll past a threshold, then it becomes fixed. Sticky is great for headers that stick to the top when scrolling.",
        ],
    },
    {
        text: "What is the cascade in CSS?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "The cascade is how CSS determines which styles to apply when there are conflicting rules. It considers three main factors - specificity, which measures how targeted a selector is, source order where later rules override earlier ones with the same specificity, and importance where !important declarations win. Inline styles beat ID selectors, which beat class selectors, which beat element selectors. Understanding the cascade helps you write CSS that behaves predictably without needing !important everywhere.",
        ],
    },
    {
        text: "What is the difference between em, rem, %, vh, and vw?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "These are all relative units. Em is relative to the font size of the element itself, which can compound if you nest elements. Rem is relative to the root element's font size, which is more predictable. Percent is relative to the parent element's value for that property. Vh and vw are viewport units - 1vh is 1% of the viewport height, 1vw is 1% of the viewport width. Rem is great for spacing and typography, percent for fluid layouts, and viewport units for full-screen sections.",
        ],
    },

    // React Fundamentals
    {
        text: "What is React and what problems does it solve?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [
            "React is a JavaScript library for building user interfaces, primarily for single-page applications. It solves the problem of keeping the UI in sync with your data by using a component-based architecture and a virtual DOM. Instead of manipulating the DOM directly, you describe what the UI should look like based on your current state, and React efficiently updates only what changed. This makes it much easier to build complex, interactive UIs that are maintainable and performant. It also encourages reusable components, which speeds up development.",
        ],
    },
    {
        text: "What are React hooks?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [
            "Hooks are functions that let you use React features like state and lifecycle methods in functional components. Before hooks, you had to use class components for anything that needed state or side effects. The most common hooks are useState for managing state, useEffect for side effects like data fetching, and useContext for accessing context. Hooks must be called at the top level of your component and can't be inside conditions or loops, which helps React keep track of them correctly between renders.",
        ],
    },
    {
        text: "What is JSX and how does it get transformed?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.jsx],
        answers: [
            "JSX is a syntax extension that lets you write HTML-like code in JavaScript. It looks like HTML but it's actually JavaScript that gets transformed by tools like Babel. Under the hood, JSX elements are converted to React.createElement calls. So something like <div>Hello</div> becomes React.createElement('div', null, 'Hello'). This transformation happens during your build process, which is why you need a build tool when working with React. JSX makes components more readable and intuitive to write compared to manual createElement calls.",
        ],
    },
    {
        text: "What is the difference between props and state?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.props, ValidTag.enum.state],
        answers: [
            "Props are data passed down from a parent component - they're read-only and the component receiving them can't modify them. State is data that the component manages itself and can update. Think of props like function parameters and state like variables declared inside a function. When state changes, React re-renders the component. A common pattern is to have a parent component manage state and pass it down as props to child components, which then call functions passed as props to update that state.",
        ],
    },
    {
        text: "What is the difference between functional and class components?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [
            "Functional components are just JavaScript functions that return JSX, while class components are ES6 classes that extend React.Component. Before hooks were introduced, you needed class components to use state and lifecycle methods. Now with hooks, functional components can do everything class components can, and they're simpler with less boilerplate. Most new React code uses functional components because they're easier to read, test, and have better performance optimizations. Class components are mostly legacy code at this point.",
        ],
    },

    // Git Basics
    {
        text: "What is Git and how does it work?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.git],
        answers: [
            "Git is a version control system that tracks changes to your code over time. It works by creating snapshots of your project called commits. Each commit records what changed, who changed it, and when. You can create branches to work on features independently, then merge them back into the main branch. Git is distributed, meaning everyone has the full history of the project locally, so you can work offline and merge changes later. It's essential for collaboration and for being able to revert changes if something breaks.",
        ],
    },
    {
        text: "What is a merge conflict and how do you resolve it?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.git, ValidTag.enum["conflict-resolution"]],
        answers: [
            "A merge conflict happens when Git can't automatically merge changes because two branches modified the same lines of code differently. When this occurs, Git marks the conflicting sections in the file with conflict markers like <<<<<<<, =======, and >>>>>>>. To resolve it, you open the file, decide which changes to keep or combine both, remove the conflict markers, and then stage and commit the resolved file. Most IDEs have tools to make this easier by showing you both versions side by side.",
        ],
    },
];
