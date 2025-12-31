import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.frontend,
    typeof Level.enum.senior
>[] = [
    // React Hooks Expert
    {
        text: "What are some overused hooks? Why?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [
            "I'd say useEffect is probably the most overused hook. People tend to reach for it whenever they need to do something side-effecty, but a lot of times you don't actually need it. For example, if you're deriving state from props or other state, you should just calculate it during render rather than using useEffect to keep things in sync. Another common one is useCallback and useMemo - developers often wrap everything in these for premature optimization. The truth is, in most cases, the re-rendering isn't actually a performance problem. You should profile first and only memoize when you have actual evidence of a performance issue. I've seen codebases where literally every function is wrapped in useCallback, which just adds complexity without real benefit."
        ],
    },
    {
        text: "What are some misunderstood hooks? Why?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [
            "useEffect is definitely the most misunderstood. People often think of it as lifecycle methods from class components - like componentDidMount or componentDidUpdate - but that's not quite right. It's really about synchronizing with external systems. The dependency array is another source of confusion - developers either leave it empty when they shouldn't, or they fight the linter by omitting dependencies, which leads to stale closures and bugs. Another one is useCallback - people think it prevents re-renders, but it doesn't. It only prevents the function reference from changing, which is only useful if you're passing it to a memoized child component or using it as a dependency in another hook. And useRef is often misunderstood too - people don't realize it can be used for more than just DOM references. It's great for persisting any mutable value that shouldn't trigger re-renders when it changes."
        ],
    },
    {
        text: "Why were hooks introduced instead of improving class components?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.hooks],
        answers: [
            "The React team identified some fundamental issues with classes that couldn't really be fixed by just improving them. First, classes don't minify as well and they make hot reloading unreliable. But more importantly, classes made it really hard to reuse stateful logic between components. Before hooks, you'd have to use patterns like higher-order components or render props, which led to wrapper hell and made your code harder to follow. With classes, related logic would also get split across different lifecycle methods - like setting up and cleaning up a subscription would be in componentDidMount and componentWillUnmount. Hooks let you organize code by concern rather than lifecycle. Plus, classes were just confusing - the binding of 'this' tripped up a lot of developers, even experienced ones. Hooks gave us a way to use state and other React features without classes, making the code more functional and composable."
        ],
    },

    // React Advanced
    {
        text: "What are React Server Components and how do they differ from SSR?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum["server-components"], ValidTag.enum.rsc, ValidTag.enum.ssr],
        answers: [
            "So Server Components are a new paradigm where components run exclusively on the server and never send their JavaScript to the client. This is different from SSR, which renders components to HTML on the server but still ships all the JavaScript to the client for hydration. With traditional SSR, you're essentially rendering everything twice - once on the server for initial HTML, then again on the client to attach event handlers. Server Components can directly access backend resources like databases or the file system without needing an API layer. They render to a special format that gets streamed to the client and integrated with Client Components. The key benefit is you get a much smaller JavaScript bundle because Server Components' code never reaches the browser. You can mix Server and Client Components in the same tree - Server Components can't use hooks or interactivity, while Client Components are your traditional React components that can have state and event handlers."
        ],
    },
    {
        text: "What is Suspense and how does it work with data fetching?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum.suspense],
        answers: [
            "Suspense is React's way of handling asynchronous operations declaratively. It lets you specify a fallback UI to show while a component is waiting for something to load. The way it works is pretty clever - when a component suspends, it essentially throws a promise, and React catches that promise and shows the fallback from the nearest Suspense boundary. Once the promise resolves, React retries rendering the component. For data fetching specifically, this enables a render-as-you-fetch pattern rather than fetch-on-render. Instead of starting your data fetch in useEffect after the component mounts, you can start fetching earlier and the component will suspend until the data is ready. This works really well with Server Components and frameworks like Next.js. You can also nest Suspense boundaries to create more granular loading states - maybe you show a skeleton for a specific section while the rest of the page is interactive. It's a much more composable approach than managing loading states manually with useState."
        ],
    },
    {
        text: "What are error boundaries and how do you implement them?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.react, ValidTag.enum["error-boundaries"]],
        answers: [
            "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the whole app. Right now, they have to be class components - you implement either getDerivedStateFromError to render a fallback UI, or componentDidCatch to log error information, or both. When an error is thrown during rendering, in a lifecycle method, or in a constructor of any child component, the error boundary catches it. It's important to note that error boundaries don't catch errors in event handlers, async code, or errors thrown in the error boundary itself. In practice, you typically wrap sections of your app with error boundaries to prevent one broken component from taking down the entire application. You might have a top-level boundary for catastrophic failures and more granular ones around specific features. There's been talk about adding hook-based error boundaries, but for now, this is one of the few cases where you still need a class component."
        ],
    },

    // Next.js App Router Advanced
    {
        text: "What is the use server directive and how do Server Actions work?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum["server-components"]],
        answers: [
            "The 'use server' directive marks functions that run exclusively on the server but can be called from client components. Server Actions are async functions that use this directive, and they're really powerful for handling mutations and form submissions without writing API routes. You can put 'use server' at the top of a file to make all exported functions Server Actions, or inline it at the top of an async function. What's cool is you can pass these functions directly to client components, even as form actions. When a Server Action is called from the client, Next.js handles the serialization, makes a POST request behind the scenes, executes the function on the server, and returns the result. They integrate really nicely with React's useFormState and useFormStatus hooks for building forms with loading states and progressive enhancement. You can also do things like revalidating cache or redirecting after a mutation, all from within the Server Action. It's a much more ergonomic way to handle data mutations compared to manually setting up API routes."
        ],
    },
    {
        text: "What are Route Handlers and how do they differ from API routes?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"]],
        answers: [
            "Route Handlers are the App Router's replacement for API routes from the Pages Router. They're defined in route.js or route.ts files within the app directory, and you export functions named after HTTP methods like GET, POST, PUT, DELETE, etc. The main differences are that Route Handlers use the Web Request and Response APIs, which are standard web APIs, whereas API routes used Next.js-specific req and res objects. This makes Route Handlers more portable and closer to web standards. They also have better integration with the App Router's caching and revalidation mechanisms. You can co-locate them with your pages in the app directory, but a route.js file in a folder means that folder can't also have a page.js - it's one or the other. Route Handlers can be dynamic or static depending on whether they use dynamic functions or data fetching, whereas API routes were always dynamic. Overall, they're more flexible and feel more modern than the old API routes."
        ],
    },
    {
        text: "What is parallel routing and intercepting routes?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.routing],
        answers: [
            "Parallel routes let you render multiple pages in the same layout simultaneously, each with their own independent loading and error states. You define them using the @folder convention - like @analytics and @team - and they're passed as props to the parent layout. This is great for dashboards where you want to show multiple sections that load independently. Intercepting routes are different - they let you intercept a navigation and show a different route while keeping the URL updated. You use conventions like (..) to go up levels in the route hierarchy. The classic use case is a photo gallery where clicking a photo shows it in a modal, but if you refresh the page or share the URL, it shows the full photo page. You'd intercept the route to /photo/123 and show the modal, but the URL still updates to /photo/123. If someone navigates directly to that URL, they get the full page. It's a really elegant way to handle modal patterns while maintaining proper URL semantics and browser history."
        ],
    },
    {
        text: "What are route groups and when would you use them?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.routing],
        answers: [
            "Route groups are folders wrapped in parentheses, like (marketing) or (dashboard), and they let you organize your routes without affecting the URL structure. So if you have app/(marketing)/about/page.tsx, the URL is just /about, not /marketing/about. They're super useful for a few things. First, you can organize your codebase logically - grouping related routes together even if they're not nested in the URL. Second, and this is huge, you can have different layouts for different sections of your app. For example, you might have a (public) group with a marketing layout and a (dashboard) group with an app layout. You can also use them to have multiple root layouts in the same app, which lets you have completely different HTML structures for different sections. Another use case is opting specific groups of routes in or out of layouts - maybe you want most routes to have a sidebar, but some shouldn't. Route groups make this kind of organization really clean without polluting your URLs."
        ],
    },
    {
        text: "How do you handle streaming and partial rendering?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.performance, ValidTag.enum.suspense],
        answers: [
            "Streaming and partial rendering in Next.js App Router work through Suspense boundaries and React's streaming SSR capabilities. Instead of waiting for the entire page to render on the server before sending anything to the client, you can stream parts of the page as they become ready. You wrap slower components in Suspense boundaries with a loading fallback, and Next.js will immediately send the initial HTML with the fallbacks, then stream in the actual content when it's ready. The client receives chunks of HTML and progressively updates the page. This is huge for performance because your Time to First Byte is much faster - users see something immediately rather than staring at a blank screen. You can also use loading.js files, which automatically wrap route segments in Suspense. For more fine-grained control, you can strategically place Suspense boundaries around specific components. The key is identifying which parts of your page are slow - maybe a complex data query or a slow API call - and isolating those so they don't block the rest of your page from rendering."
        ],
    },
    {
        text: "What is the difference between static and dynamic rendering in the App Router?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.ssr, ValidTag.enum.ssg],
        answers: [
            "Static rendering happens at build time, where routes are pre-rendered and cached. The HTML is generated once and reused on every request, which makes it super fast. Dynamic rendering happens at request time, so the route is rendered fresh for each request. Next.js automatically determines which to use based on what your route does. If you use dynamic functions like cookies, headers, or searchParams, or if you opt out of caching with specific fetch options, the route becomes dynamic. Otherwise, it's static by default. Static is great for pages that don't change often - like blog posts or marketing pages - because you get the best possible performance. Dynamic is necessary when you need request-specific information or personalized content. You can also use revalidation to have the best of both worlds - static generation with periodic updates. Set a revalidate time, and Next.js will regenerate the page in the background after that time period. The App Router makes this much more granular than the Pages Router - you can have static and dynamic segments within the same page."
        ],
    },
    {
        text: "How do you opt out of caching in the App Router?",
        level: Level.enum.senior,
        category: Category.enum.frontend,
        tags: [ValidTag.enum.nextjs, ValidTag.enum["app-router"], ValidTag.enum.caching],
        answers: [
            "There are several ways to opt out of caching depending on what you need. For fetch requests, you can pass { cache: 'no-store' } as an option, which makes that specific request dynamic. You can also set { next: { revalidate: 0 } } to disable caching for a fetch call. At the route segment level, you can export a variable like export const dynamic = 'force-dynamic' to make the entire route dynamic and disable all caching. Using dynamic functions like cookies(), headers(), or searchParams automatically opts the route out of static rendering and caching. For Route Handlers specifically, they're dynamic by default, but you can export const dynamic = 'force-static' if you want them cached. There's also export const revalidate = 0 to disable caching at the segment level. The caching model in the App Router has multiple layers - there's the Data Cache for fetch requests, the Full Route Cache for static rendering, and the Router Cache on the client. You need to be aware of which cache you're trying to bypass and use the appropriate method."
        ],
    },
];
