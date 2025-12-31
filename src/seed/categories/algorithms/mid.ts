import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.algorithms,
    typeof Level.enum.mid
>[] = [
    // Time & Space Complexity
    {
        text: "What does 'amortized' time complexity mean?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["time-complexity"], ValidTag.enum["big-o"]],
        answers: [
            "Amortized is about looking at the average cost per operation over a sequence of operations. The classic example everyone uses is dynamic arrays. Most of the time when you append, it's O(1) - you just stick it at the end. But occasionally the array fills up and you have to allocate a new bigger array and copy everything over - that's O(n). Sounds bad, right? But if you double the capacity each time, those expensive operations happen rarely enough that when you spread the cost over all operations, it's still O(1) per insert. So amortized analysis captures that - individual operations might vary wildly, but on average you're doing fine.",
        ],
    },
    {
        text: "What's the space complexity of recursion?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["space-complexity"], ValidTag.enum.recursion],
        answers: [
            "At minimum it's O(d) where d is how deep your recursion goes, because each call adds a frame to the stack. That frame holds your local variables, parameters, return address. So something like factorial of n is O(n) space just from the stack. Tree traversal would be O(h) for tree height. Mergesort is interesting - the recursion depth is O(log n), but you also need O(n) for the temporary array during merging. People sometimes forget about this implicit space cost of recursion. It's why deep recursion can blow your stack even when your algorithm is correct - there's just not enough memory.",
        ],
    },

    // Data Structures
    {
        text: "How does a hash table handle collisions?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum["hash-tables"]],
        answers: [
            "Two main approaches. Chaining is probably more common - each bucket holds a linked list, so when two keys hash to the same spot, you just add to that list. Lookup means hash to find the bucket, then walk the list. Simple, handles high load okay, but you're paying for those extra pointers. Open addressing is the other way - everything lives directly in the array. When there's a collision, you probe for the next empty slot. Linear probing just goes to the next index, quadratic probing jumps by increasing amounts. More cache-friendly, but performance tanks as the table fills up. Either way, you typically resize when the load factor gets too high.",
        ],
    },
    {
        text: "How does a heap work? What's it used for?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.heaps],
        answers: [
            "A heap is a complete binary tree with a special property - in a max-heap, every parent is bigger than its children, so the max is always at the root. Min-heap is the opposite. The clever part is you store it in an array - for any index i, left child is at 2i+1, right child at 2i+2. No pointers needed. Insert and extract-max are O(log n) because you bubble up or down through the tree. It's the go-to for priority queues - when you constantly need to grab the highest or lowest priority item. Also used for heapsort, finding top-k elements, that kind of thing. Whenever you need quick access to an extreme value, think heap.",
        ],
    },

    // Sorting
    {
        text: "How does quicksort work?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum.quicksort],
        answers: [
            "You pick a pivot element, then partition the array so everything smaller is on one side and everything larger is on the other. After partitioning, that pivot is in its final sorted position. Then you recursively quicksort the two sides. The partition is where the magic happens - you typically use two pointers scanning from opposite ends, swapping things that are on the wrong side. Average case is O(n log n), which is great. The problem is if you pick bad pivots consistently - like always the smallest element - you get O(n²). That's why pivot selection matters. Random pivot, median-of-three, things like that help avoid the worst case.",
        ],
    },
    {
        text: "How does mergesort work?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum.mergesort],
        answers: [
            "It's divide and conquer. You split the array in half, recursively sort each half, then merge the two sorted halves together. The merge is the key step - you're comparing the front of each half and taking the smaller one, building up the result. Since you always split exactly in half, you get O(log n) levels of recursion, and each level does O(n) work for all the merging. So O(n log n) guaranteed, no bad cases like quicksort has. The tradeoff is you need O(n) extra space for the merge step. That's why quicksort is often preferred in practice - same average time but in-place.",
        ],
    },

    // Searching
    {
        text: "How do you search in a hash table vs a binary search tree?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.searching, ValidTag.enum["hash-tables"], ValidTag.enum["binary-search-trees"]],
        answers: [
            "Hash table: compute the hash, jump straight to that bucket, handle any collisions. Average O(1), worst case O(n) if your hash is terrible. BST: start at the root, compare your target, go left if smaller, right if larger, repeat until you find it or hit null. O(log n) if balanced, O(n) if the tree is completely skewed. Hash tables win for pure key lookup speed. But BSTs give you ordering - you can iterate in sorted order, do range queries, find the next smaller or larger element. Pick based on what operations you actually need. If it's just 'is this key here,' hash table all day.",
        ],
    },

    // Recursion
    {
        text: "What's tail recursion?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.recursion],
        answers: [
            "Tail recursion is when the recursive call is literally the last thing the function does - nothing happens after it returns. Like if you're just returning the result of calling yourself, that's tail recursive. But if you do something with the result first, like multiply it by n, that's not tail recursive. Why does this matter? Some compilers can optimize tail calls by reusing the current stack frame instead of creating a new one. Basically turns recursion into a loop under the hood, so no stack overflow risk. Functional languages like Scheme require this optimization. JavaScript technically has it in the spec but most engines don't actually do it. Still a useful concept to know.",
        ],
    },
];
