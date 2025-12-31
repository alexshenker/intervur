import { Category, Level, ValidTag } from "../../../db";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.algorithms,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Time & Space Complexity
    {
        text: "What does O(n log n) mean?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["time-complexity"], ValidTag.enum["big-o"]],
        answers: [
            "O(n log n) sits between linear and quadratic - it's the sweet spot for efficient sorting. You'll see it in algorithms like mergesort and quicksort. The way I think about it: the 'n' comes from touching each element, and the 'log n' comes from repeatedly dividing the problem in half. So if you have 1000 elements, O(n²) would be about a million operations, but O(n log n) is more like 10,000. That's a massive difference. It's why we generally prefer these sorting algorithms over simpler O(n²) ones like bubble sort - the gap just keeps growing as your data gets bigger.",
        ],
    },
    {
        text: "What's the time complexity of searching in a hash map vs a sorted array?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["time-complexity"], ValidTag.enum["hash-tables"], ValidTag.enum.arrays],
        answers: [
            "Hash maps give you O(1) average case for lookups - you hash the key, go straight to that bucket, done. The catch is worst case can be O(n) if you have tons of collisions, but that's rare with a decent hash function. Sorted arrays need binary search, which is O(log n). So for pure lookups, hash maps are faster. But sorted arrays have their place - they use less memory, they're better for range queries like 'give me everything between A and B,' and their performance is more predictable. Really depends on what you need to do beyond just looking things up.",
        ],
    },

    // Data Structures
    {
        text: "When would you use a stack vs a queue?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.stacks, ValidTag.enum.queues],
        answers: [
            "It comes down to the order you need. Stack is last-in-first-out - like a stack of plates, you grab from the top. That's useful for things like undo functionality, tracking function calls, or parsing matching brackets. Queue is first-in-first-out - like a line at a coffee shop, first person there gets served first. You'd use that for task scheduling, BFS in graphs, or any kind of job queue where fairness matters. I think of it as: stack is for when the most recent thing is most relevant, queue is for when arrival order matters.",
        ],
    },
    {
        text: "What's the difference between a binary tree and a binary search tree?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.trees, ValidTag.enum["binary-trees"], ValidTag.enum["binary-search-trees"]],
        answers: [
            "A binary tree is just any tree where each node has at most two children. That's it - no rules about how values are arranged. A binary search tree adds an ordering constraint: everything in a node's left subtree is smaller than that node, everything on the right is larger. That's the key difference. With that ordering, you can search efficiently - at each node, you know whether to go left or right, so you can find things in O(log n) on average. Without it, you'd have to check every single node, which defeats the purpose of having a tree structure.",
        ],
    },
    {
        text: "What's the difference between a graph and a tree?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.trees, ValidTag.enum.graphs],
        answers: [
            "A tree is actually a restricted type of graph. Graphs are the general structure - nodes connected by edges, and you can connect them however you want, including cycles. Trees have rules: they're connected, they have no cycles, and there's exactly one path between any two nodes. If you have n nodes in a tree, you always have n-1 edges. Think of it this way: a file system with folders is naturally a tree - clear hierarchy, no loops. A social network where people can be mutual friends? That's a graph, because you can have cycles like A friends with B, B friends with C, C friends with A.",
        ],
    },

    // Searching
    {
        text: "What's required for binary search to work?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.searching, ValidTag.enum["binary-search"]],
        answers: [
            "Two things. First, the data has to be sorted. That's non-negotiable because the whole algorithm is based on 'is my target bigger or smaller than the middle?' If things aren't sorted, that comparison tells you nothing. Second, you need random access - the ability to jump directly to the middle in constant time. That's why binary search works great on arrays but not on linked lists. With a linked list, just getting to the middle element is O(n), which kills the whole benefit. So sorted data plus random access, those are your requirements.",
        ],
    },

    // Recursion
    {
        text: "What causes stack overflow in recursion?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.recursion],
        answers: [
            "Every recursive call adds a frame to the call stack - that's where your local variables and return address live. Stack overflow happens when you run out of stack space. Usually it's one of two things: either your base case is wrong or missing entirely, so the recursion never stops and you just keep piling up frames until boom. Or sometimes the input is just too big - even with correct logic, if you need a million recursive calls, you might not have enough stack. The fixes are: make sure your base case is right, convert to iteration if you can, or use tail recursion if your language optimizes that.",
        ],
    },
];
