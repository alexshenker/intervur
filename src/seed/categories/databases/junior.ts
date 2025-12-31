import { Category, Level, ValidTag } from "../../../db";
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
            "An INNER JOIN returns only the rows where there's a matching value in both tables. If a row in the left table doesn't have a match in the right table, it's excluded from the results entirely. A LEFT JOIN returns all rows from the left table regardless of whether there's a match. If there's a match, you get the combined data; if not, you still get the left table's row but with NULL values for the right table's columns. For example, if you have a users table and an orders table, an INNER JOIN would only show users who have placed orders. A LEFT JOIN would show all users, and users without orders would have NULL in the order columns. I use INNER JOIN when I only want records that exist in both tables, and LEFT JOIN when I need all records from the primary table even if related data is missing."
        ],
    },
    {
        text: "What's a LEFT JOIN vs RIGHT JOIN?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.joins],
        answers: [
            "LEFT JOIN and RIGHT JOIN are mirror images of each other. A LEFT JOIN keeps all rows from the left table and matches what it can from the right table. A RIGHT JOIN does the opposite - it keeps all rows from the right table and matches from the left. In practice, I almost never use RIGHT JOIN because you can always rewrite it as a LEFT JOIN by swapping the table order. Most developers find it more intuitive to think about keeping all records from the first table mentioned. So instead of writing 'orders RIGHT JOIN users', I'd write 'users LEFT JOIN orders'. The result is the same, but LEFT JOIN is the convention. Honestly, if you see RIGHT JOIN in a codebase, it's often worth refactoring to LEFT JOIN for readability."
        ],
    },
    {
        text: "How does GROUP BY work?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.aggregation],
        answers: [
            "GROUP BY combines rows that have the same values in specified columns into summary rows. You use it with aggregate functions like COUNT, SUM, AVG, MAX, or MIN to perform calculations on each group. For example, if you have an orders table and you GROUP BY customer_id, all orders for each customer become a single row, and you can count how many orders each customer has with COUNT(*). The key thing is that every column in your SELECT must either be in the GROUP BY clause or be wrapped in an aggregate function - you can't select a column that might have different values within a group without telling SQL how to handle it. It's like saying 'give me one row per customer' and then computing summary statistics for each customer's orders."
        ],
    },
    {
        text: "What's a primary key vs a foreign key?",
        level: Level.enum.junior,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum["database-design"]],
        answers: [
            "A primary key is a column or set of columns that uniquely identifies each row in a table. Every row must have a unique primary key value, and it can't be NULL. It's like a social security number for your data rows. A foreign key is a column that references the primary key of another table, creating a relationship between them. For example, in an orders table, you'd have a customer_id foreign key that references the id primary key in the customers table. This ensures referential integrity - you can't create an order for a customer that doesn't exist. The database enforces these relationships automatically. Primary keys identify records within a table; foreign keys link records across tables."
        ],
    },
];
