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
            "Amortized time complexity averages the cost of operations over a sequence, giving a more accurate picture than worst-case analysis alone. The classic example is ArrayList or vector appends: most insertions are O(1), but occasionally the array is full and requires O(n) copying to a new larger array. If we double capacity each resize, these expensive operations become exponentially less frequent. Over n insertions, total work is roughly 2n, giving O(1) amortized per operation. This concept is crucial because it explains why dynamic arrays are practical despite occasional O(n) operations - the expensive cases are rare enough not to impact overall performance.",
        ],
    },
    {
        text: "What's the space complexity of recursion?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["space-complexity"], ValidTag.enum.recursion],
        answers: [
            "At minimum it's O(d) where d is how deep your recursion goes, because each call adds a frame to the stack. That frame holds your local variables, parameters, return address. So something like factorial of n is O(n) space just from the stack. Tree traversal would be O(h) for tree height. Mergesort is interesting - the recursion depth is O(log n), but you also need O(n) for the temporary array during merging. People sometimes forget about this implicit space cost of recursion. It's why deep recursion can blow your stack even when your algorithm is correct - there's just not enough memory.",
            "Recursion uses O(d) space for the call stack where d is maximum recursion depth. Each stack frame stores parameters, local variables, and return address. For linear recursion like factorial(n), that's O(n) stack frames. For tree traversal, it's O(h) where h is tree height. For balanced binary recursion like mergesort, depth is O(log n). But total space might be higher - mergesort also needs O(n) auxiliary space for merging. This implicit stack space is often overlooked when analyzing algorithms. It's why the same algorithm can have different space characteristics when implemented recursively versus iteratively.",
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
            "There are two primary strategies. Separate chaining stores a linked list at each bucket - colliding keys simply append to that list. Lookups hash to the bucket then traverse the list. It handles high load factors gracefully but has pointer overhead. Open addressing stores all entries directly in the array. On collision, you probe for another slot using a probing sequence - linear probing checks consecutive slots, quadratic uses increasing gaps, double hashing uses a second hash function. Open addressing is more cache-efficient but degrades badly above 70% load factor. Most implementations resize the table when load factor exceeds a threshold, typically 0.7 or 0.75.",
        ],
    },
    {
        text: "How does a heap work? What's it used for?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.heaps],
        answers: [
            "A heap is a complete binary tree with a special property - in a max-heap, every parent is bigger than its children, so the max is always at the root. Min-heap is the opposite. The clever part is you store it in an array - for any index i, left child is at 2i+1, right child at 2i+2. No pointers needed. Insert and extract-max are O(log n) because you bubble up or down through the tree. It's the go-to for priority queues - when you constantly need to grab the highest or lowest priority item. Also used for heapsort, finding top-k elements, that kind of thing. Whenever you need quick access to an extreme value, think heap.",
            "A heap is a complete binary tree satisfying the heap property: in a max-heap, each parent is greater than or equal to its children, keeping the maximum at the root. It's stored as an array where node at index i has children at 2i+1 and 2i+2, parent at (i-1)/2. This gives pointer-free navigation with excellent cache locality. Insertion adds to the end and bubbles up; extraction removes the root, replaces with the last element, and bubbles down. Both operations are O(log n). Primary use case is priority queues where you need efficient access to the highest or lowest priority element. Also powers heapsort and algorithms like Dijkstra's shortest path.",
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
            "Quicksort is a divide-and-conquer algorithm. You select a pivot, then partition the array so elements less than pivot go left and greater go right. The pivot ends up in its final sorted position. Then recursively sort both partitions. It's in-place, using O(log n) stack space on average, with O(n log n) average time complexity. The weakness is O(n²) worst case when pivots are poorly chosen, like always picking the minimum in sorted data. Good implementations use randomized pivot selection or median-of-three to avoid this. Despite the worst case, quicksort often outperforms mergesort in practice due to better cache locality and lower constant factors.",
        ],
    },
    {
        text: "How does mergesort work?",
        level: Level.enum.mid,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum.mergesort],
        answers: [
            "It's divide and conquer. You split the array in half, recursively sort each half, then merge the two sorted halves together. The merge is the key step - you're comparing the front of each half and taking the smaller one, building up the result. Since you always split exactly in half, you get O(log n) levels of recursion, and each level does O(n) work for all the merging. So O(n log n) guaranteed, no bad cases like quicksort has. The tradeoff is you need O(n) extra space for the merge step. That's why quicksort is often preferred in practice - same average time but in-place.",
            "Mergesort divides the array in half repeatedly until you have single-element subarrays, then merges them back together in sorted order. The merge operation compares elements from two sorted halves, taking the smaller one each time into the result array. Time complexity is O(n log n) in all cases - best, average, and worst - because you always split evenly regardless of input. It requires O(n) auxiliary space for the merge buffer, which is its main drawback compared to quicksort. However, mergesort is stable, making it ideal when you need to preserve relative order of equal elements. It's also naturally suited for external sorting of data too large to fit in memory.",
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
            "In a hash table, you compute the hash of your key, index into the bucket array, and handle any collisions - O(1) average, O(n) worst case with many collisions. In a BST, you traverse from root, comparing at each node to decide left or right, until you find the key or reach null - O(log n) for balanced trees, O(n) if degenerate. Hash tables are faster for pure lookups but lose ordering information. BSTs maintain sorted order, enabling efficient range queries, min/max finding, and in-order traversal. Choose hash tables for key-value lookups; choose BSTs when you need ordered operations or guaranteed O(log n) with self-balancing variants like red-black trees.",
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
            "Tail recursion occurs when the recursive call is the final operation - the function returns the recursive call's result directly without further computation. Standard factorial isn't tail recursive because you do n * factorial(n-1), but you can rewrite it with an accumulator parameter to make it tail recursive. The significance is that compilers can perform tail call optimization (TCO), reusing the current stack frame instead of allocating a new one. This transforms recursion into iteration internally, eliminating stack overflow risk. Languages like Scheme, Haskell, and Scala guarantee TCO. Many other languages, including most JavaScript engines despite ES6 specifying it, don't implement it reliably.",
        ],
    },
];
