import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.algorithms,
    typeof Level.enum.junior
>[] = [
    // Time & Space Complexity
    {
        text: "Explain the difference between O(1), O(n), and O(n²).",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["time-complexity"], ValidTag.enum["big-o"]],
        answers: [
            "So O(1) is constant time - it takes the same amount of time no matter how big your input is. Like grabbing an item from an array by its index, that's instant whether you have 10 items or 10 million. O(n) is linear, meaning if you double your input, you roughly double your time. Think of searching through an unsorted list - you might have to check every single element. And O(n²) is quadratic, which gets bad fast. That's when you have nested loops, like comparing every element to every other element. With 1000 items, that's a million comparisons. So as your data grows, O(n²) can really hurt you, which is why we care about these distinctions.",
        ],
    },

    // Data Structures
    {
        text: "What's the difference between an array and a linked list?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.arrays, ValidTag.enum["linked-lists"]],
        answers: [
            "The big difference is how they're stored in memory. Arrays are contiguous - all the elements are next to each other - so you can jump to any index instantly, that's O(1) access. But if you want to insert something in the middle, you have to shift everything after it, which is O(n). Linked lists are the opposite. Each element is a node that points to the next one, so they can be scattered in memory. That means inserting or deleting is just updating a couple pointers - super fast if you're already at that spot. But finding an element means walking through the list one by one. So arrays win for random access, linked lists win for frequent insertions and deletions.",
        ],
    },

    // Searching
    {
        text: "How does binary search work?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.searching, ValidTag.enum["binary-search"]],
        answers: [
            "Binary search is basically the 'guess the number' game strategy. You need a sorted collection, and you start by looking at the middle element. If that's your target, great, you're done. If your target is smaller, you know it has to be in the left half, so you ignore the right half entirely. If it's larger, you search the right half. Then you repeat - check the middle of whatever half you're looking at, cut it in half again. Each step eliminates half the remaining elements, which is why it's O(log n). For a million items, that's only about 20 comparisons instead of potentially a million with linear search.",
        ],
    },
    {
        text: "What's the difference between linear search and binary search?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.searching, ValidTag.enum["binary-search"]],
        answers: [
            "Linear search is the straightforward approach - you just go through each element one by one until you find what you're looking for or hit the end. It's simple and works on any collection, sorted or not, but it's O(n) because you might have to check everything. Binary search is way faster at O(log n), but there's a catch - your data has to be sorted first. It works by repeatedly cutting the search space in half. For small datasets, the difference doesn't really matter, but once you're dealing with thousands or millions of items, binary search is dramatically faster. The tradeoff is that sorting requirement.",
        ],
    },

    // Recursion
    {
        text: "What's the difference between recursion and iteration?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.recursion],
        answers: [
            "Recursion is when a function calls itself to break a problem into smaller pieces of the same type. Each call goes on the call stack until you hit a base case that stops it. Iteration is using loops - for, while, that kind of thing. They can actually solve the same problems, just differently. Recursion tends to be more elegant for things like tree traversal or anything with a naturally recursive structure. But it uses more memory because of all those stack frames. Iteration is usually more efficient memory-wise, but sometimes the code ends up more complicated. I generally reach for recursion when the problem naturally fits it, and iteration otherwise.",
        ],
    },
    {
        text: "What is a base case and why is it necessary?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.recursion],
        answers: [
            "The base case is basically your exit condition in recursion - it's the scenario where you return a value directly instead of making another recursive call. Without it, your function would just keep calling itself forever until you blow the stack and crash. Classic example: factorial. The base case is when n is 0 or 1, you just return 1. Every recursive call should be working toward that base case, making the problem smaller each time. If you mess up the base case or forget it entirely, you'll get a stack overflow. It's the thing that makes recursion actually terminate.",
        ],
    },
];
