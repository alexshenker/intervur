import { Category, Level, ValidTag } from "../../../db/constants";
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
            "Double equals performs loose equality with type conversion, while triple equals is strict equality checking both value and type. I always use triple equals in my code because it prevents subtle bugs. For instance, the string '5' loosely equals the number 5, but strictly they're different. Triple equals is more explicit about your intent and makes code behavior more predictable. The only time I'd consider double equals is when deliberately checking for null or undefined together, since null == undefined is true.",
        ],
    },
    {
        text: "What is the difference between null and undefined?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [
            "Both represent the absence of a value, but they're used differently. Undefined means a variable has been declared but hasn't been assigned a value yet, or a function doesn't return anything. Null is an intentional assignment that represents 'no value' - you explicitly set something to null. For example, let x would be undefined, but let y = null is intentionally set to nothing. Also, typeof undefined returns 'undefined' while typeof null returns 'object', which is actually a historical bug in JavaScript.",
            "Undefined is JavaScript's way of saying a value hasn't been assigned yet - it's the default for uninitialized variables or missing function parameters. Null is something you explicitly assign to indicate 'no value on purpose.' When I'm writing code, I use null to intentionally clear a value or signal emptiness, and I check for undefined when handling optional parameters. A quick tip: you can check for both at once with value == null since they loosely equal each other.",
        ],
    },
    {
        text: "What is the difference between var, let, and const?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["var-let-const"], ValidTag.enum.scope],
        answers: [
            "The main differences are scope and reassignment. Var is function-scoped, meaning it's accessible anywhere in the function, and it gets hoisted. Let and const are block-scoped, so they only exist within the curly braces they're declared in. The difference between let and const is that let can be reassigned but const can't - though with const objects and arrays, you can still modify their contents, you just can't reassign the variable itself. These days, most people use const by default and only use let when they need to reassign.",
            "I approach this by defaulting to const for everything, then switching to let only when I actually need to reassign. Var is essentially legacy at this point. The key difference is scoping - var leaks out of blocks like if statements, while let and const stay contained. Const doesn't make values immutable, just the binding - so a const array can still have items pushed to it. This is a common interview gotcha. Modern JavaScript has largely moved away from var because block scoping is more predictable.",
        ],
    },
    {
        text: "What is hoisting and how does it affect variables and functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum.hoisting],
        answers: [
            "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. With function declarations, the entire function gets hoisted, so you can call a function before it's defined in your code. With var variables, the declaration gets hoisted but not the initialization, so it'll be undefined if you access it before the assignment. Let and const are also hoisted but they're in a 'temporal dead zone' until their declaration is reached, so you'll get a ReferenceError if you try to access them early.",
            "Hoisting means JavaScript moves declarations to the top of their scope before execution. Function declarations get fully hoisted - you can call them anywhere in the file. Variables declared with var get their declaration hoisted but not the value, so accessing them early gives undefined. Let and const behave differently - they exist in a temporal dead zone where accessing them before declaration throws an error. Understanding hoisting helps explain why some code works in unexpected orders, though I generally write code that doesn't rely on it.",
        ],
    },
    {
        text: "What is the difference between function declarations and function expressions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript],
        answers: [
            "A function declaration is when you use the function keyword to define a named function, like 'function myFunc() {}'. A function expression is when you assign a function to a variable, like 'const myFunc = function() {}'. The key difference is hoisting - function declarations are fully hoisted so you can call them before they appear in your code, but function expressions aren't hoisted in the same way. Also, function expressions can be anonymous while declarations must have a name.",
            "Function declarations start with the function keyword and are hoisted entirely, so you can call them before they're defined. Function expressions assign a function to a variable, and the function won't be available until that line executes. In practice, I often use arrow functions as expressions since they're more concise. The choice matters most when you need to reference a function before its definition in the code, which declarations allow but expressions don't.",
        ],
    },
    {
        text: "What are arrow functions and how do they differ from regular functions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["arrow-functions"]],
        answers: [
            "Arrow functions are a shorter syntax for writing functions, using the => syntax. The main differences are that arrow functions don't have their own 'this' binding - they inherit this from their surrounding scope, which is really useful in callbacks. They also don't have their own arguments object, and they can't be used as constructors with the new keyword. For simple functions, you can make them even more concise by omitting the curly braces and return keyword if it's a single expression.",
            "Arrow functions provide a concise syntax and lexically bind 'this', meaning they capture the context from where they're defined rather than where they're called. This is huge for callbacks and event handlers where you'd otherwise lose the correct 'this' binding. They're perfect for inline functions like array methods - map, filter, reduce. The only times I reach for regular functions are when I need dynamic 'this' binding or when defining object methods where I want 'this' to refer to the object.",
        ],
    },
    {
        text: "What is the difference between synchronous and asynchronous code execution?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.javascript, ValidTag.enum["async-await"]],
        answers: [
            "Synchronous code runs line by line, blocking the next line until the current one finishes. Asynchronous code allows JavaScript to continue executing other code while waiting for something to complete, like an API call or timer. This is crucial because JavaScript is single-threaded - if everything was synchronous, the entire app would freeze while waiting for operations to complete. We handle async code using callbacks, promises, or async/await syntax.",
            "Synchronous means operations happen in sequence - each line waits for the previous to complete. Asynchronous lets the program continue while waiting for slow operations like network requests or file reads. Since JavaScript runs on a single thread, async is essential to keep the UI responsive. Imagine if fetching data took three seconds and the whole page froze during that time - users would hate it. I use async/await for most asynchronous code because it reads like synchronous code while being non-blocking.",
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
            "Semantic HTML is about choosing elements that describe your content's meaning - using nav for navigation, main for primary content, aside for sidebars. It's not just about visual presentation, which CSS handles. The benefits are threefold: accessibility, since screen readers use these elements to help users navigate; SEO, because search engines understand your page structure better; and maintainability, since other developers immediately understand the page layout. I always reach for semantic elements first before falling back to generic divs.",
        ],
    },
    {
        text: "What is the difference between <div> and <section> and <article>?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum["semantic-html"]],
        answers: [
            "A div is a generic container with no semantic meaning - it's just for grouping and styling. A section represents a thematic grouping of content, usually with a heading, like different parts of a page. An article is for self-contained content that could be distributed independently, like a blog post or news article. So you'd use article for a blog post, section for the different parts within that post, and div when you just need a wrapper for styling purposes.",
            "Div is purely for grouping without meaning - use it when you need a container for CSS but there's no semantic significance. Section groups related content that forms part of a larger whole, typically with its own heading. Article is for standalone content that makes sense on its own - think blog posts, comments, or product cards. A good test for article is whether that content could be syndicated elsewhere and still make sense independently.",
        ],
    },
    {
        text: "What is the difference between <button> and <a> for actions?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.accessibility],
        answers: [
            "Use a button for actions that do something on the current page, like submitting a form or opening a modal. Use an anchor tag for navigation to a different page or location. This matters for accessibility - buttons work with the space bar, anchors work with enter, and screen readers announce them differently. Also, buttons don't have a default href so they won't mess up your routing, while anchors are meant for navigation and should have a valid URL.",
            "The simple rule I follow: if clicking takes you somewhere, use an anchor; if clicking does something, use a button. Links navigate to URLs, buttons trigger actions. Screen readers announce these differently, and keyboard behavior differs too. Using a div styled as a button breaks accessibility because you lose focus management and keyboard support. This distinction is fundamental to proper accessibility and one of the most common mistakes I see in codebases.",
        ],
    },
    {
        text: "What is the DOM and how does it relate to HTML?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.html, ValidTag.enum.javascript],
        answers: [
            "The DOM, or Document Object Model, is a programming interface that represents your HTML as a tree structure of objects that JavaScript can interact with. When the browser loads your HTML, it parses it and creates this DOM tree. Each HTML element becomes a node in the tree that you can access and manipulate with JavaScript. So HTML is the markup you write, and the DOM is the live representation of that in memory that you can change dynamically.",
            "The DOM is the browser's in-memory representation of your HTML document as a tree of nodes. When you write HTML, it's static markup. Once the browser parses it, it becomes the DOM - a live, interactive structure that JavaScript can query and modify. When you change the DOM with JavaScript, the page updates immediately. React and other frameworks abstract this by managing DOM updates for you, but understanding the underlying DOM is essential for debugging and performance optimization.",
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
            "Every HTML element is a rectangular box with layers: content at the center, surrounded by padding, then border, then margin. The tricky part is the default box model where setting width only affects content, so adding padding makes the element bigger than you specified. Most projects use box-sizing: border-box globally, which makes width include padding and border, giving you predictable sizing. Understanding this is crucial for layout debugging - unexpected element sizes usually trace back to box model issues.",
        ],
    },
    {
        text: "What is the difference between display: none and visibility: hidden?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "Display: none completely removes the element from the page layout - it's like it doesn't exist, and other elements will move to fill the space. Visibility: hidden hides the element but it still takes up space in the layout, so you'll see a blank area where it was. Also, display: none removes it from the accessibility tree so screen readers won't see it, while visibility: hidden might still be announced depending on the screen reader. Use display: none when you want to fully remove something, and visibility: hidden when you want to keep the layout intact.",
            "Display none takes the element completely out of the document flow - it's as if it doesn't exist. Visibility hidden keeps the element's space but makes it invisible. I use display none when toggling elements in and out because I want the layout to reflow. Visibility hidden is useful when you need to preserve layout, like in a slideshow where you want all slides to maintain their positions. There's also opacity zero, which hides content but keeps it interactive and in the tab order.",
        ],
    },
    {
        text: "What is the difference between position: relative, absolute, fixed, and sticky?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "Relative positioning keeps the element in the normal document flow but lets you offset it from its original position. Absolute positioning removes it from the flow and positions it relative to its nearest positioned ancestor. Fixed positioning also removes it from the flow but positions it relative to the viewport, so it stays in place when you scroll. Sticky is a hybrid - it acts like relative until you scroll past a threshold, then it becomes fixed. Sticky is great for headers that stick to the top when scrolling.",
            "Relative moves an element from its normal position while keeping its space in the flow. Absolute pulls it out of the flow entirely and positions it against the nearest positioned ancestor. Fixed is like absolute but relative to the viewport, so it stays put when scrolling - perfect for navigation bars. Sticky is the newer hybrid that toggles between relative and fixed based on scroll position. I use absolute most often for tooltips or dropdowns, fixed for persistent UI elements, and sticky for table headers.",
        ],
    },
    {
        text: "What is the cascade in CSS?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "The cascade is how CSS determines which styles to apply when there are conflicting rules. It considers three main factors - specificity, which measures how targeted a selector is, source order where later rules override earlier ones with the same specificity, and importance where !important declarations win. Inline styles beat ID selectors, which beat class selectors, which beat element selectors. Understanding the cascade helps you write CSS that behaves predictably without needing !important everywhere.",
            "The cascade is CSS's algorithm for resolving conflicts when multiple rules target the same element. It evaluates importance first, then specificity, then source order. Specificity ranks from inline styles at the top, then IDs, then classes and attributes, then element selectors. When I debug CSS not applying as expected, I trace through the cascade - usually someone wrote a more specific selector elsewhere. Reaching for !important is usually a sign something is wrong with your selector strategy.",
        ],
    },
    {
        text: "What is the difference between em, rem, %, vh, and vw?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.css],
        answers: [
            "These are all relative units. Em is relative to the font size of the element itself, which can compound if you nest elements. Rem is relative to the root element's font size, which is more predictable. Percent is relative to the parent element's value for that property. Vh and vw are viewport units - 1vh is 1% of the viewport height, 1vw is 1% of the viewport width. Rem is great for spacing and typography, percent for fluid layouts, and viewport units for full-screen sections.",
            "These are relative units that scale based on different references. Rem is my go-to because it's relative to the root font size, making everything scale proportionally if users change their default font size. Em compounds through nesting which can be tricky. Percentages depend on parent values, useful for fluid widths. Viewport units like vh and vw relate to screen dimensions, ideal for hero sections or full-height layouts. I avoid fixed pixels for typography and spacing since they don't respect user accessibility preferences.",
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
            "React is a library that makes building interactive UIs manageable by breaking them into reusable components. The core insight is declarative rendering - you describe what the UI should look like for any given state, and React handles updating the DOM efficiently. Before React, manually keeping the DOM in sync with data was error-prone and tedious. The component model also promotes code reuse and makes applications easier to reason about since each component encapsulates its own logic and presentation.",
        ],
    },
    {
        text: "What are React hooks?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [
            "Hooks are functions that let you use React features like state and lifecycle methods in functional components. Before hooks, you had to use class components for anything that needed state or side effects. The most common hooks are useState for managing state, useEffect for side effects like data fetching, and useContext for accessing context. Hooks must be called at the top level of your component and can't be inside conditions or loops, which helps React keep track of them correctly between renders.",
            "Hooks let functional components tap into React features that were previously only available in classes. useState gives you state, useEffect handles side effects, and there are many others for specific use cases. The key rules are calling hooks at the top level and only from React functions. What I love about hooks is they allow you to extract and share stateful logic between components through custom hooks, which was difficult to do cleanly with class components. They've essentially replaced class components for most use cases.",
        ],
    },
    {
        text: "What is JSX and how does it get transformed?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.jsx],
        answers: [
            "JSX is a syntax extension that lets you write HTML-like code in JavaScript. It looks like HTML but it's actually JavaScript that gets transformed by tools like Babel. Under the hood, JSX elements are converted to React.createElement calls. So something like <div>Hello</div> becomes React.createElement('div', null, 'Hello'). This transformation happens during your build process, which is why you need a build tool when working with React. JSX makes components more readable and intuitive to write compared to manual createElement calls.",
            "JSX is syntactic sugar that makes writing React components feel like writing HTML, but it's actually JavaScript under the hood. When your code builds, JSX transforms into React.createElement function calls. This means you can embed JavaScript expressions inside curly braces, use conditional rendering, and map over arrays naturally. JSX isn't required for React, but it makes component code so much more readable that virtually everyone uses it. It's one of those things that feels weird for a day then feels essential forever.",
        ],
    },
    {
        text: "What is the difference between props and state?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.props, ValidTag.enum.state],
        answers: [
            "Props are data passed down from a parent component - they're read-only and the component receiving them can't modify them. State is data that the component manages itself and can update. Think of props like function parameters and state like variables declared inside a function. When state changes, React re-renders the component. A common pattern is to have a parent component manage state and pass it down as props to child components, which then call functions passed as props to update that state.",
            "Props flow down from parent components and are immutable from the child's perspective - you receive them but can't change them. State is internal to the component and triggers re-renders when updated. The pattern I use is lifting state to the lowest common ancestor that needs it, then passing it down as props. If a child needs to update the state, I pass down a callback function as a prop. This one-way data flow makes applications predictable and easier to debug.",
        ],
    },
    {
        text: "What is the difference between functional and class components?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react],
        answers: [
            "Functional components are just JavaScript functions that return JSX, while class components are ES6 classes that extend React.Component. Before hooks were introduced, you needed class components to use state and lifecycle methods. Now with hooks, functional components can do everything class components can, and they're simpler with less boilerplate. Most new React code uses functional components because they're easier to read, test, and have better performance optimizations. Class components are mostly legacy code at this point.",
            "Functional components are simpler - they're functions that take props and return JSX. Class components use the ES6 class syntax with render methods and lifecycle methods. Since React 16.8 introduced hooks, functional components can handle everything classes did, with cleaner syntax. I exclusively write functional components now. You'll still see class components in older codebases and for error boundaries, which currently require class syntax, but functionalwith hooks is the modern standard.",
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
            "Git tracks your project's history through commits - snapshots of your code at specific points. The power comes from branching, which lets multiple developers work independently without stepping on each other. When a feature is complete, you merge it back. Git is distributed, so every developer has the complete history locally - there's no single point of failure. I use it daily for everything from solo projects to large team collaborations. It's foundational to modern software development.",
        ],
    },
    {
        text: "What is a merge conflict and how do you resolve it?",
        level: Level.enum.junior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.git, ValidTag.enum["conflict-resolution"]],
        answers: [
            "A merge conflict happens when Git can't automatically merge changes because two branches modified the same lines of code differently. When this occurs, Git marks the conflicting sections in the file with conflict markers like <<<<<<<, =======, and >>>>>>>. To resolve it, you open the file, decide which changes to keep or combine both, remove the conflict markers, and then stage and commit the resolved file. Most IDEs have tools to make this easier by showing you both versions side by side.",
            "Conflicts occur when Git can't automatically reconcile changes to the same lines from different branches. Git marks conflicts with special markers showing both versions. I resolve them by understanding what each change intended, keeping the correct code, removing the markers, then staging and committing. VS Code and other editors have built-in merge tools that make this visual and straightforward. Frequent merges and good communication with teammates minimize conflicts.",
        ],
    },
];
