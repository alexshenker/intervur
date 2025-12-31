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
            "NULL values never match anything in a JOIN, not even other NULLs. This is because NULL represents an unknown value, and SQL follows the logic that two unknowns aren't necessarily equal. So if you have a user_id column that's NULL in some rows, those rows won't match any rows in the joined table, even if that table also has NULL values. With an INNER JOIN, rows with NULL in the join column are excluded entirely. With a LEFT JOIN, those rows are kept but won't match anything from the right table. This catches people off guard sometimes. If you actually need to match NULLs together, you'd need to use something like COALESCE to replace NULLs with a sentinel value, or use an IS NULL check combined with OR in your join condition. Understanding this behavior is important when dealing with optional relationships or incomplete data.",
            "This is a common gotcha - NULLs don't equal anything, including other NULLs. In SQL's three-valued logic, NULL compared to NULL returns unknown, not true. So when you join on a column containing NULLs, those rows will fail to match. For INNER JOINs, this means rows with NULL join keys simply disappear from results. For LEFT JOINs, you'll still see those rows, but they won't have matched data from the right table. This behavior is actually intentional - NULL means 'I don't know this value,' so the database can't assume two unknown values are the same. If you need to handle NULLs specially, you can use COALESCE to substitute a placeholder value, or add explicit IS NULL conditions to your join. It's something I always keep in mind when working with optional foreign keys or data with missing values."
        ],
    },

    // SQL Filtering
    {
        text: "What's the difference between WHERE and HAVING?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.aggregation],
        answers: [
            "WHERE filters individual rows before any grouping happens, while HAVING filters groups after aggregation. Think of it as the order of operations - WHERE runs first on the raw data, then GROUP BY creates the groups, then HAVING filters those groups. You use WHERE for conditions on regular columns, like 'WHERE status = active'. You use HAVING for conditions on aggregate results, like 'HAVING COUNT(*) > 5'. A key rule is you can't use aggregate functions in WHERE because the aggregation hasn't happened yet. For example, if you want customers who placed more than 10 orders, you'd GROUP BY customer_id and then use HAVING COUNT(*) > 10. If you want to only count orders from this year, you'd use WHERE order_date >= '2024-01-01' before the grouping. Often you'll use both together - WHERE to filter the input rows, HAVING to filter the output groups.",
            "It comes down to timing in the query execution. WHERE filters rows before the database even starts grouping - it decides which raw rows to include. HAVING filters after grouping, operating on the aggregated results. So if you're trying to filter based on an aggregate like COUNT or SUM, you must use HAVING because those values don't exist until after GROUP BY runs. For example, finding categories with more than 100 products requires HAVING COUNT(*) > 100, not WHERE. On the flip side, if you want to exclude certain rows before counting, that's WHERE. A practical query might use both: WHERE to only consider orders from this month, GROUP BY customer, and HAVING to show only customers with orders totaling over $500. They work together, just at different stages of query processing."
        ],
    },

    // SQL Indexing
    {
        text: "What is an index and why use it?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: [
            "An index is like a book's index - instead of reading every page to find a topic, you look it up in the index and go directly to that page. In databases, an index is a data structure, usually a B-tree, that maintains a sorted reference to your data. Without an index, the database has to scan every row in the table to find matches, which gets slow as the table grows. With an index on a column, the database can quickly locate the exact rows you need. You'd use indexes on columns that appear in WHERE clauses, JOIN conditions, and ORDER BY clauses - basically anywhere you're searching or sorting. The tradeoff is that indexes take up disk space and slow down INSERT, UPDATE, and DELETE operations because the index has to be updated too. So you don't want to index everything, just the columns you frequently query on.",
            "An index is essentially a shortcut that helps the database find data faster. Without one, the database performs a full table scan - checking every single row to find what you're looking for. With a million rows, that's slow. An index maintains a sorted structure, typically a B-tree, that lets the database jump directly to matching rows. I use indexes on columns I frequently filter by, join on, or sort by. The classic example is putting an index on email if you regularly look up users by email. But there's a cost - every time you insert or update data, the index needs updating too, and indexes consume storage. So it's about balance. I index what I query often and leave out columns that are rarely used in lookups. For write-heavy tables, I'm especially careful not to over-index."
        ],
    },
    {
        text: "What's the downside of adding too many indexes?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing, ValidTag.enum.performance],
        answers: [
            "Every index has a cost. First, there's storage - each index takes up disk space, sometimes as much as the table itself for large indexes. Second, and more importantly, write operations become slower. Every time you INSERT a row, every index on that table needs to be updated. Every UPDATE that touches indexed columns means updating those indexes too. DELETE operations also need to remove entries from all indexes. If you have 10 indexes on a table, that's 10 extra data structures to maintain on every write. For write-heavy tables, this overhead can significantly impact performance. Indexes also need maintenance - they can become fragmented over time and need rebuilding. The key is to be strategic - only create indexes that actually get used. I monitor slow queries to identify where indexes help and use tools to find unused indexes that can be dropped.",
            "The main issue is write performance degradation. Every insert, update, or delete has to modify not just the table, but every index on that table. So if you have 15 indexes, that's 15 additional data structures being written to on every single write operation. For read-heavy applications it might not matter much, but for anything write-intensive, excessive indexes can seriously slow things down. There's also the storage overhead - indexes take up disk space and memory. And they require maintenance; over time indexes can become fragmented and need rebuilding. I've seen databases where someone indexed every column 'just in case' and the write performance was terrible. The approach I take is to start minimal, add indexes based on actual slow query patterns, and periodically audit for unused indexes that can be dropped."
        ],
    },
];
