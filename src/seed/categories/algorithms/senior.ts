import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const senior: QuestionForCategoryAndLevel<
    typeof Category.enum.algorithms,
    typeof Level.enum.senior
>[] = [
    // Sorting
    {
        text: "When would you use heapsort over quicksort?",
        level: Level.enum.senior,
        category: Category.enum.algorithms,
        tags: [ValidTag.enum.sorting, ValidTag.enum.heapsort, ValidTag.enum.quicksort],
        answers: [
            "A few scenarios come to mind. First, when you absolutely need guaranteed O(n log n) worst case. Quicksort can hit O(n²) with adversarial input, and in security-sensitive contexts, an attacker could potentially exploit that. Heapsort is always O(n log n), period. Second, when you're really tight on stack space - quicksort's recursion uses O(log n) stack on average but O(n) worst case. Heapsort can be done iteratively with O(1) extra space. That said, in most real-world cases quicksort wins because of cache locality - it accesses memory sequentially while heapsort jumps around the heap. The practical solution is often introsort, which starts with quicksort for speed but falls back to heapsort if the recursion gets too deep. You get quicksort's typical performance with heapsort's guarantees as a safety net.",
            "Heapsort is preferred when you need strict O(n log n) worst-case guarantees. Quicksort degrades to O(n²) with adversarial input, which can be a security concern - algorithmic complexity attacks exploit this. Heapsort is also ideal when memory is severely constrained since it's truly in-place with O(1) auxiliary space, while quicksort uses O(log n) to O(n) stack space. Another case is embedded systems where stack depth matters. However, quicksort typically outperforms heapsort due to better cache locality - heapsort's parent-child jumps cause more cache misses. In practice, most standard libraries use introsort: quicksort for average case performance, falling back to heapsort when recursion depth suggests worst-case behavior.",
        ],
    },
];
