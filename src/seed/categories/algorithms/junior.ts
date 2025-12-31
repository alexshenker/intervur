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
            "These represent how an algorithm scales with input size. O(1) means the operation takes fixed time regardless of data size - accessing array[5] is the same speed whether the array has 10 or 10 million elements. O(n) means time grows proportionally with input - if you loop through every element once, doubling the data doubles the time. O(n²) means time grows with the square of input - typically from nested loops where you compare each element against all others. The practical impact is huge: with 1000 items, O(1) does 1 operation, O(n) does 1000, and O(n²) does a million. That's why algorithm efficiency matters so much at scale.",
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
            "Arrays store elements contiguously in memory, giving you instant O(1) access by index but making insertions expensive since you have to shift elements. Linked lists store nodes scattered in memory, each pointing to the next, so insertion and deletion are O(1) if you have a reference to the position, but finding that position requires O(n) traversal. Arrays also benefit from CPU cache locality - sequential access is very fast. Linked lists have pointer overhead per element. In practice, I'd choose arrays for random access patterns and when the size is relatively stable, and linked lists when I'm doing lots of insertions or deletions at known positions, like implementing a queue.",
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
            "Binary search works on sorted data by repeatedly dividing the search space in half. You check the middle element - if it matches, you're done. If your target is smaller, you search the left half; if larger, the right half. Each comparison eliminates half of what's left. This gives you O(log n) time complexity, which is incredibly efficient. To put it in perspective, searching a billion sorted items takes only about 30 comparisons. The key requirement is that the data must be sorted beforehand - without that ordering, you can't make any assumptions about which half to search.",
        ],
    },
    {
        text: "What's the difference between linear search and binary search?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.searching, ValidTag.enum["binary-search"]],
        answers: [
            "Linear search is the straightforward approach - you just go through each element one by one until you find what you're looking for or hit the end. It's simple and works on any collection, sorted or not, but it's O(n) because you might have to check everything. Binary search is way faster at O(log n), but there's a catch - your data has to be sorted first. It works by repeatedly cutting the search space in half. For small datasets, the difference doesn't really matter, but once you're dealing with thousands or millions of items, binary search is dramatically faster. The tradeoff is that sorting requirement.",
            "Linear search checks each element sequentially until it finds a match - it's O(n) and works on unsorted data. Binary search divides the search space in half each step, achieving O(log n), but requires sorted data. The performance gap becomes massive at scale: in a million-element array, linear search averages 500,000 comparisons while binary search needs at most 20. However, if your data isn't sorted and you only search once, linear search wins because sorting itself is O(n log n). Binary search pays off when you search the same sorted data multiple times.",
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
            "Iteration uses loops to repeat operations, while recursion has a function call itself with modified parameters until reaching a stopping condition. Both can solve the same problems, but they have different tradeoffs. Recursion often produces cleaner code for problems with recursive structure - like trees, nested data, or divide-and-conquer algorithms. But each recursive call adds to the call stack, using O(n) memory for n calls, and risks stack overflow on deep recursion. Iteration uses constant extra space and avoids that risk. I typically choose based on what makes the code clearest, then optimize to iteration if stack depth becomes an issue.",
        ],
    },
    {
        text: "What is a base case and why is it necessary?",
        level: Level.enum.junior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.recursion],
        answers: [
            "The base case is basically your exit condition in recursion - it's the scenario where you return a value directly instead of making another recursive call. Without it, your function would just keep calling itself forever until you blow the stack and crash. Classic example: factorial. The base case is when n is 0 or 1, you just return 1. Every recursive call should be working toward that base case, making the problem smaller each time. If you mess up the base case or forget it entirely, you'll get a stack overflow. It's the thing that makes recursion actually terminate.",
            "A base case is the condition where recursion stops and returns a direct result without calling itself again. It's essential because without it, the function recurses infinitely until you get a stack overflow crash. Think of it as the simplest version of your problem that you can solve directly. For calculating factorial, the base case is factorial(0) = 1 or factorial(1) = 1. For traversing a linked list, it's when you hit null. Every recursive step must move toward this base case - if your recursive calls don't make the problem smaller, you'll never reach it and the recursion never ends.",
        ],
    },
];
