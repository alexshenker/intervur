import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.behavioral,
    typeof Level.enum.junior
>[] = [
    {
        text: "Tell me about yourself / Walk me through your background",
        level: Level.enum.junior,
        category: Category.enum.behavioral,
        tags: [ValidTag.enum.behavioral],
        answers: [
            "Sure! So I got into programming about three years ago when I took my first computer science class in college, and I just fell in love with it. There's something really satisfying about building things and solving problems with code. I focused on web development because I liked being able to see what I was building right away. I've worked mainly with JavaScript and React, and more recently I've been diving into TypeScript and Next.js. In my last role, I was on a small team building internal tools, which taught me a lot about working with stakeholders and understanding user needs, not just writing code. I also did a few freelance projects on the side which pushed me to learn things outside my comfort zone, like setting up deployments and working with databases. What I'm really looking for now is a place where I can keep growing, work on challenging problems, and learn from experienced engineers. That's actually what drew me to this role - it seems like a great opportunity to do exactly that.",
        ],
    },
    {
        text: "Where do you see yourself in 5 years?",
        level: Level.enum.junior,
        category: Category.enum.behavioral,
        tags: [ValidTag.enum.behavioral],
        answers: [
            "Honestly, I try not to plan too rigidly because I've learned that opportunities often come from unexpected places. But in terms of direction, I'd love to grow into a senior engineer who can own complex features end-to-end and mentor newer developers. I really enjoy the technical side of things, so I see myself staying hands-on with code rather than moving into pure management. That said, I'm also interested in the bigger picture - understanding how technical decisions impact the business and being part of those conversations. In five years, I'd hope to have deep expertise in a few areas, maybe around frontend architecture or full-stack development, while still being curious and learning new things. I'm also drawn to teams that ship products users actually love, so ideally I'd be at a company where I can see the impact of my work. The main thing is I want to be in a place where I'm still growing and being challenged.",
        ],
    },
    {
        text: "What are you looking for in your next role?",
        level: Level.enum.junior,
        category: Category.enum.behavioral,
        tags: [ValidTag.enum.behavioral],
        answers: [
            "A few things are really important to me. First, I want to be on a team where I can learn from experienced engineers. I've grown a lot on my own, but I know there's so much I can pick up from people who've been doing this longer. Second, I'm looking for a place that values code quality and good engineering practices - things like code reviews, testing, and taking time to do things right rather than just shipping fast and dealing with the mess later. Third, I want to work on something meaningful. It doesn't have to be changing the world, but I want to care about what I'm building and see how it helps users. And finally, I'm looking for a healthy team culture where people communicate openly, support each other, and there's a good balance between work and life. That's actually why I'm excited about this opportunity - from what I've learned about the company, it seems to check a lot of these boxes.",
        ],
    },
    {
        text: "Why are you leaving your current job?",
        level: Level.enum.junior,
        category: Category.enum.behavioral,
        tags: [ValidTag.enum.behavioral],
        answers: [
            "I've learned a ton at my current job and I'm grateful for the experience, but I feel like I've hit a bit of a ceiling in terms of growth. The team is small and the tech stack hasn't evolved much, so I've been doing similar work for a while now. I'm at a point where I want to be challenged more and learn new things, and I don't see a clear path for that where I am. There's nothing wrong with the company - it's just not the right fit for where I want to go next. I'm looking for an environment with more senior engineers I can learn from, more complex problems to solve, and exposure to modern practices and technologies. When I saw this role, it seemed like exactly the kind of opportunity I've been looking for. I'm excited about the technical challenges here and the chance to grow alongside a strong team.",
        ],
    },
];
