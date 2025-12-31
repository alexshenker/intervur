import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const midAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.algorithms,
    typeof Level.enum["mid-advanced"]
>[] = [
    // Time & Space Complexity
    {
        text: "When is O(n²) acceptable?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["time-complexity"], ValidTag.enum["big-o"]],
        answers: [
            "Honestly, more often than people think. If n is small and will stay small - like under 100 elements - the simpler O(n²) algorithm might actually be faster because the overhead of fancier algorithms can outweigh the benefits at small scale. Insertion sort on small arrays beats quicksort in practice. Also when the code complexity isn't worth it - if performance isn't critical and the O(n²) solution is readable and maintainable, that matters. Or when you have other constraints, like needing stability or doing it in-place. The key is knowing your data. If n can grow unbounded, yeah, O(n²) will bite you. But for bounded small inputs? It's often the right call. Don't optimize prematurely.",
        ],
    },

    // Data Structures
    {
        text: "What's a trie and what are its properties?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum["data-structures"], ValidTag.enum.tries],
        answers: [
            "A trie - some people call it a prefix tree - is specialized for storing strings. Each node represents a character, and paths from root to node spell out prefixes. So if you store 'cat' and 'car', they share the 'c-a' path and only branch at the end. What makes it powerful is prefix operations are blazing fast. Looking up a word is O(k) where k is the word length - doesn't matter if you have ten words or ten million. Same for insert and delete. That's why it's great for autocomplete, spell checkers, IP routing tables. The downside is memory - if your strings don't share many prefixes, you're basically storing each character separately with a lot of pointer overhead. But for the right use case, nothing beats it.",
        ],
    },

    // Sorting
    {
        text: "What's the difference between stable and unstable sorting?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting],
        answers: [
            "Stable means equal elements keep their original relative order. So if you have two items that compare as equal, and item A came before item B in the input, A will still be before B in the output. Unstable sorts don't guarantee that - equal items might get swapped around. When does this matter? Sorting by multiple keys. Say you sort a list of people by department, then by name. With a stable sort, people in the same department stay sorted by name from the first pass. With unstable, that ordering could get scrambled. Mergesort is stable, insertion sort is stable. Quicksort and heapsort are not. You can make any sort stable by using the original index as a tiebreaker, but that costs you extra space and time.",
        ],
    },
    {
        text: "Which sorting algorithms are in-place?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum["space-complexity"]],
        answers: [
            "In-place means O(1) extra space - you're rearranging elements within the original array, not copying to a new one. Quicksort, heapsort, insertion sort, selection sort, bubble sort - all in-place. They just swap elements around with a few temp variables. Mergesort is the notable exception among comparison sorts - the standard version needs O(n) extra space for the merge step. There are in-place merge variants but they're complicated and slower. Counting sort, radix sort need extra space proportional to the range or number of digits. So if memory is tight, you're looking at quicksort or heapsort for O(n log n) performance in-place.",
        ],
    },
    {
        text: "What's the best-case and worst-case for quicksort?",
        level: Level.enum["mid-advanced"],
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum.quicksort, ValidTag.enum["time-complexity"]],
        answers: [
            "Best case is O(n log n) - that's when your pivot splits things roughly in half each time. Log n levels of recursion, n work per level. Worst case is O(n²), and that's painful. Happens when the pivot is consistently the smallest or largest element, so you get one partition of n-1 and one of 0. Classic example: using first element as pivot on already-sorted data. Every partition does almost no useful work. To avoid this, you use smarter pivot selection - random pivot, median-of-three where you look at first, middle, last and pick the median. Or you can do what introsort does: start with quicksort but switch to heapsort if recursion gets too deep. That way you keep quicksort's good average case but guarantee O(n log n) worst case.",
        ],
    },
];
