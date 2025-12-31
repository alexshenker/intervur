import { Category, Level } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.behavioral,
    typeof Level.enum.senior
>[] = [
    {
        text: "How do you decide what tech stack to use?",
        level: Level.enum.senior,
        category: Category.enum.behavioral,
        tags: [],
        answers: [
            "When choosing a tech stack, I consider several factors in a rough priority order. First is team expertise. The best technology is often the one your team already knows well because velocity and maintainability matter more than theoretical performance gains. If we're hiring, I also consider the talent pool. Second, I look at the problem domain. Building a real-time collaborative app has different requirements than a content management system. I match the technology to the problem rather than forcing a favorite stack onto every project. Third is ecosystem maturity. I want libraries, documentation, and community support that will help us move fast and debug issues when they arise. Fourth is scalability needs, but I try to be realistic here. Most projects never need to handle millions of requests per second, so I avoid premature optimization. Fifth, I consider the long-term maintenance story. Will this technology still be well-supported in three to five years? Finally, if it's a startup or side project, I factor in speed of development. Something like Next.js with a managed database might get us to market faster than a custom microservices architecture. I typically write up a brief tech decision document outlining these tradeoffs so the team can discuss and align before committing.",
        ],
    },
    {
        text: "Tell me about the biggest project you've ever built. How did you go about it, step by step?",
        level: Level.enum.senior,
        category: Category.enum.behavioral,
        tags: [],
        answers: [
            "The biggest project I worked on was a complete platform rebuild for a fintech company. We were migrating from a legacy monolith to a modern microservices architecture while keeping the business running. Here's how we approached it. First, we did extensive discovery. I spent several weeks mapping out the existing system, documenting all the business logic hidden in the codebase, and identifying the highest-risk areas. We talked to stakeholders across the company to understand pain points and requirements. Next, we created a technical design. We identified natural service boundaries based on business domains and designed the data model and API contracts. We were careful to plan for the transition period where old and new systems would need to coexist. Then we set up the foundation, which included CI/CD pipelines, monitoring, infrastructure as code, and a shared component library. Getting this right early saved us massive time later. We used a strangler fig pattern for the migration, building new features in the new system while gradually moving functionality over from the legacy system. We started with lower-risk, less coupled components to build confidence. Throughout, we maintained close communication with stakeholders, gave regular demos, and adjusted priorities based on business needs. The whole project took about eighteen months, and the key lesson was that the technical work was maybe sixty percent of it. The rest was communication, change management, and making sure we were solving the right problems.",
        ],
    },
];
