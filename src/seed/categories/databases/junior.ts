import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const junior: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum.junior
>[] = [
    // SQL Joins
    {
        text: "What's the difference between INNER JOIN and LEFT JOIN?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.joins],
        answers: [
            "An INNER JOIN returns only the rows where there's a matching value in both tables. If a row in the left table doesn't have a match in the right table, it's excluded from the results entirely. A LEFT JOIN returns all rows from the left table regardless of whether there's a match. If there's a match, you get the combined data; if not, you still get the left table's row but with NULL values for the right table's columns. For example, if you have a users table and an orders table, an INNER JOIN would only show users who have placed orders. A LEFT JOIN would show all users, and users without orders would have NULL in the order columns. I use INNER JOIN when I only want records that exist in both tables, and LEFT JOIN when I need all records from the primary table even if related data is missing.",
            "So the key difference comes down to how they handle non-matching rows. With INNER JOIN, think of it as finding the intersection - you only get rows where both tables have matching data. If there's no match, that row is simply dropped from results. LEFT JOIN is more inclusive - it guarantees you'll see every row from the first table you mention. When there's a match, great, you get the combined data. When there's no match, you still get your left table row, but the right table columns come back as NULL. Practically speaking, I reach for LEFT JOIN when I want a complete list with optional related data - like showing all products even if some have no reviews yet. INNER JOIN is my choice when both sides of the relationship are required - like only showing orders that have valid customers attached."
        ],
    },
    {
        text: "What's a LEFT JOIN vs RIGHT JOIN?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.joins],
        answers: [
            "LEFT JOIN and RIGHT JOIN are mirror images of each other. A LEFT JOIN keeps all rows from the left table and matches what it can from the right table. A RIGHT JOIN does the opposite - it keeps all rows from the right table and matches from the left. In practice, I almost never use RIGHT JOIN because you can always rewrite it as a LEFT JOIN by swapping the table order. Most developers find it more intuitive to think about keeping all records from the first table mentioned. So instead of writing 'orders RIGHT JOIN users', I'd write 'users LEFT JOIN orders'. The result is the same, but LEFT JOIN is the convention. Honestly, if you see RIGHT JOIN in a codebase, it's often worth refactoring to LEFT JOIN for readability.",
            "They're essentially the same operation, just from different perspectives. LEFT JOIN preserves everything from whichever table appears on the left side of the join, filling in NULLs for unmatched right-side columns. RIGHT JOIN flips this - it keeps all rows from the right table instead. The reason you rarely see RIGHT JOIN in production code is that it's always convertible to a LEFT JOIN by simply reversing the table order in your query. The industry has standardized on LEFT JOIN because reading queries left-to-right feels more natural when your main table comes first. If I'm reviewing code and see a RIGHT JOIN, I'd typically suggest rewriting it as a LEFT JOIN for consistency and readability."
        ],
    },
    {
        text: "How does GROUP BY work?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.aggregation],
        answers: [
            "GROUP BY combines rows that have the same values in specified columns into summary rows. You use it with aggregate functions like COUNT, SUM, AVG, MAX, or MIN to perform calculations on each group. For example, if you have an orders table and you GROUP BY customer_id, all orders for each customer become a single row, and you can count how many orders each customer has with COUNT(*). The key thing is that every column in your SELECT must either be in the GROUP BY clause or be wrapped in an aggregate function - you can't select a column that might have different values within a group without telling SQL how to handle it. It's like saying 'give me one row per customer' and then computing summary statistics for each customer's orders.",
            "GROUP BY collapses multiple rows into one based on shared column values. So if I GROUP BY status, all rows with status 'pending' become one row, all rows with 'completed' become another, and so on. The power comes from pairing it with aggregate functions - COUNT tells you how many rows fell into each group, SUM adds up values within each group, AVG gives you the average. One thing that trips people up is you can only SELECT columns that are either in your GROUP BY or wrapped in an aggregate. That's because SQL needs to know what to do when multiple values exist - should it pick the first one, the last one? Instead of guessing, SQL requires you to be explicit through aggregation. It's the foundation for any kind of reporting or analytics query."
        ],
    },
    {
        text: "What's a primary key vs a foreign key?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum["database-design"]],
        answers: [
            "A primary key is a column or set of columns that uniquely identifies each row in a table. Every row must have a unique primary key value, and it can't be NULL. It's like a social security number for your data rows. A foreign key is a column that references the primary key of another table, creating a relationship between them. For example, in an orders table, you'd have a customer_id foreign key that references the id primary key in the customers table. This ensures referential integrity - you can't create an order for a customer that doesn't exist. The database enforces these relationships automatically. Primary keys identify records within a table; foreign keys link records across tables.",
            "Think of a primary key as a unique ID badge for each row - no two rows can share the same primary key, and every row must have one. It's how you definitively point to a specific record. A foreign key is how you create connections between tables. It's a column that stores the primary key value from another table, essentially saying 'this row is linked to that row over there.' For instance, if you have users and posts tables, each post would have a user_id foreign key pointing to who wrote it. The database uses foreign keys to maintain referential integrity - it won't let you create a post referencing a user_id that doesn't exist, and depending on your settings, it can prevent you from deleting a user who still has posts. Together, they're the backbone of relational database design."
        ],
    },
];
