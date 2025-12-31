import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum["junior-advanced"]
>[] = [
    // SQL Joins
    {
        text: "What happens when you JOIN tables with NULL values in the join column?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.joins],
        answers: [
            "NULL values never match anything in a JOIN, not even other NULLs. This is because NULL represents an unknown value, and SQL follows the logic that two unknowns aren't necessarily equal. So if you have a user_id column that's NULL in some rows, those rows won't match any rows in the joined table, even if that table also has NULL values. With an INNER JOIN, rows with NULL in the join column are excluded entirely. With a LEFT JOIN, those rows are kept but won't match anything from the right table. This catches people off guard sometimes. If you actually need to match NULLs together, you'd need to use something like COALESCE to replace NULLs with a sentinel value, or use an IS NULL check combined with OR in your join condition. Understanding this behavior is important when dealing with optional relationships or incomplete data."
        ],
    },

    // SQL Filtering
    {
        text: "What's the difference between WHERE and HAVING?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.aggregation],
        answers: [
            "WHERE filters individual rows before any grouping happens, while HAVING filters groups after aggregation. Think of it as the order of operations - WHERE runs first on the raw data, then GROUP BY creates the groups, then HAVING filters those groups. You use WHERE for conditions on regular columns, like 'WHERE status = active'. You use HAVING for conditions on aggregate results, like 'HAVING COUNT(*) > 5'. A key rule is you can't use aggregate functions in WHERE because the aggregation hasn't happened yet. For example, if you want customers who placed more than 10 orders, you'd GROUP BY customer_id and then use HAVING COUNT(*) > 10. If you want to only count orders from this year, you'd use WHERE order_date >= '2024-01-01' before the grouping. Often you'll use both together - WHERE to filter the input rows, HAVING to filter the output groups."
        ],
    },

    // SQL Indexing
    {
        text: "What is an index and why use it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: [
            "An index is like a book's index - instead of reading every page to find a topic, you look it up in the index and go directly to that page. In databases, an index is a data structure, usually a B-tree, that maintains a sorted reference to your data. Without an index, the database has to scan every row in the table to find matches, which gets slow as the table grows. With an index on a column, the database can quickly locate the exact rows you need. You'd use indexes on columns that appear in WHERE clauses, JOIN conditions, and ORDER BY clauses - basically anywhere you're searching or sorting. The tradeoff is that indexes take up disk space and slow down INSERT, UPDATE, and DELETE operations because the index has to be updated too. So you don't want to index everything, just the columns you frequently query on."
        ],
    },
    {
        text: "What's the downside of adding too many indexes?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing, ValidTag.enum.performance],
        answers: [
            "Every index has a cost. First, there's storage - each index takes up disk space, sometimes as much as the table itself for large indexes. Second, and more importantly, write operations become slower. Every time you INSERT a row, every index on that table needs to be updated. Every UPDATE that touches indexed columns means updating those indexes too. DELETE operations also need to remove entries from all indexes. If you have 10 indexes on a table, that's 10 extra data structures to maintain on every write. For write-heavy tables, this overhead can significantly impact performance. Indexes also need maintenance - they can become fragmented over time and need rebuilding. The key is to be strategic - only create indexes that actually get used. I monitor slow queries to identify where indexes help and use tools to find unused indexes that can be dropped."
        ],
    },
];
