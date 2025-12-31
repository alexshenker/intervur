import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const mid: QuestionForCategoryAndLevel<
    typeof Category.enum.databases,
    typeof Level.enum.mid
>[] = [
    // Database General
    {
        text: "What is the difference between SQL and NoSQL databases?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.mongodb],
        answers: ["SQL databases are relational and use structured schemas with tables, rows, and columns. They enforce relationships through foreign keys and support complex joins and transactions with strong ACID guarantees. NoSQL databases are more flexible - they can be document-based like MongoDB, key-value stores like Redis, or graph databases. They typically prioritize scalability and flexibility over strict consistency. SQL is great when you have well-defined relationships and need complex queries, while NoSQL shines when you need to scale horizontally, have varying data structures, or require extremely high write throughput. The choice really comes down to whether you value strict consistency and relational integrity versus flexibility and horizontal scalability.",
            "The fundamental difference is structure versus flexibility. SQL databases have rigid schemas - you define your tables upfront and every row follows that structure. This gives you powerful querying with joins, transactions, and referential integrity. NoSQL is a broad category that sacrifices some of those guarantees for flexibility and scale. Document stores like MongoDB let you store varied structures without migrations. Key-value stores like Redis are blazing fast for simple lookups. Graph databases excel at relationship-heavy queries. I typically default to SQL, specifically PostgreSQL, because it handles most use cases well and the constraints actually help maintain data quality. I'd reach for NoSQL when I have specific needs - like caching with Redis, or when I genuinely need the horizontal scaling that distributed NoSQL databases offer."
        ],
    },
    {
        text: "What are ACID properties and why do they matter?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.acid, ValidTag.enum.transactions],
        answers: ["ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity means a transaction either completes fully or not at all - no partial states. Consistency ensures the database moves from one valid state to another. Isolation means concurrent transactions don't interfere with each other. Durability guarantees that once a transaction commits, it persists even if the system crashes. These properties matter because they prevent data corruption and ensure reliability. For example, in a banking application, if you're transferring money between accounts, ACID properties ensure the money isn't lost or duplicated if something goes wrong mid-transaction. It's the foundation of data integrity in critical systems.",
            "ACID is the set of guarantees that make relational databases reliable for critical data. Atomicity means transactions are all-or-nothing - if any part fails, everything rolls back. Consistency keeps your data valid according to your constraints after every transaction. Isolation prevents concurrent transactions from stepping on each other, so two simultaneous updates don't create weird states. Durability means once committed, the data survives crashes - it's actually written to disk. The classic example is a money transfer: you need to debit one account and credit another atomically. Without ACID, a crash mid-operation could lose money or create it from thin air. These guarantees are why I reach for PostgreSQL for anything involving money, inventory, or data where correctness is non-negotiable."
        ],
    },
    {
        text: "What is the CAP theorem?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum["cap-theorem"]],
        answers: ["The CAP theorem states that in a distributed database system, you can only guarantee two out of three properties: Consistency, Availability, and Partition tolerance. Consistency means all nodes see the same data at the same time. Availability means every request gets a response. Partition tolerance means the system continues to operate despite network failures between nodes. In practice, partition tolerance is mandatory in distributed systems because network failures happen, so you're really choosing between consistency and availability. For example, traditional SQL databases often choose consistency over availability, while systems like Cassandra choose availability. It's not always a binary choice though - modern systems often tune this tradeoff based on the use case.",
            "CAP describes the fundamental tradeoff in distributed systems. You can have Consistency - everyone sees the same data - or Availability - every request gets a response - or Partition tolerance - the system works even when network connections between nodes fail. But you can only guarantee two at once. Since network partitions are inevitable in distributed systems, you're really choosing between consistency and availability when things go wrong. A CP system like traditional databases will refuse requests rather than return stale data. An AP system like Cassandra will keep responding but might return outdated data. Most modern distributed databases let you tune this per-query. Understanding CAP helps you pick the right database and set appropriate expectations about behavior during network issues."
        ],
    },
    {
        text: "What is the difference between horizontal and vertical scaling for databases?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.scalability, ValidTag.enum.sharding],
        answers: ["Vertical scaling means adding more resources to a single server - more CPU, RAM, or faster disks. It's straightforward and doesn't require application changes, but there's a physical limit to how much you can scale. Horizontal scaling means adding more servers and distributing the load across them. It's more complex because you need to handle data distribution and coordination, but theoretically you can scale indefinitely. For databases, vertical scaling is easier initially but gets expensive and eventually hits limits. Horizontal scaling through techniques like sharding or replication is how you handle massive scale, though it introduces complexity around data consistency and query routing. Most systems start vertical and add horizontal scaling as needed.",
            "Vertical scaling is upgrading your existing machine - bigger CPU, more RAM, faster storage. It's simple because your application doesn't need to change, but there's a ceiling. Eventually you can't buy a bigger server. Horizontal scaling means adding more machines and spreading the load. It requires more architecture work - you need to figure out how to distribute data and route queries - but there's no theoretical limit to how far you can go. For databases, I always start with vertical scaling because it's simpler and often sufficient. You'd be surprised how far a well-tuned PostgreSQL instance can take you. When that's no longer enough, you add read replicas for horizontal read scaling, and if write volume is the bottleneck, that's when sharding comes into play. Each step adds complexity, so I prefer to scale up before scaling out."
        ],
    },
    {
        text: "What is database sharding and when would you use it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sharding, ValidTag.enum.scalability],
        answers: ["Sharding is partitioning your data across multiple database servers based on some key, like user ID or geographic region. Each shard holds a subset of the total data. You'd use it when a single database can't handle your read or write load, or when your data is too large for one machine. For example, you might shard users by their ID range - users 1 to 1 million on shard 1, 1 million to 2 million on shard 2. The challenges are choosing a good shard key that distributes load evenly, handling queries that span multiple shards, and rebalancing when shards get uneven. It adds operational complexity, so you only do it when you truly need that level of scale.",
            "Sharding splits your database horizontally across multiple servers, with each server holding a subset of the data based on a shard key. For example, you might put users A-M on one database and N-Z on another. The main reason to shard is when you've exhausted other scaling options - a single database can't handle the write volume or the dataset is too large. The tricky part is choosing a good shard key. It needs to distribute data evenly and ensure that most queries hit a single shard. Poor shard key choices lead to hot spots where one shard is overloaded while others sit idle. Cross-shard queries and joins become expensive or impossible. Honestly, sharding is something I try to avoid unless absolutely necessary because it adds significant operational complexity. Read replicas and vertical scaling get you surprisingly far before sharding becomes necessary."
        ],
    },
    {
        text: "What is replication and what are the different strategies?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.replication],
        answers: ["Replication is copying data across multiple database servers to improve availability and read performance. The main strategies are primary-replica, where one server handles writes and others replicate the data for reads, and multi-primary, where multiple servers can accept writes. With primary-replica, you get consistency but the primary is a single point of failure for writes. You can do synchronous replication where the primary waits for replicas to confirm, giving consistency but higher latency, or asynchronous where it's faster but replicas might lag. Multi-primary is more complex but handles failover better. The strategy you choose depends on your consistency requirements, read-write ratio, and how you handle conflicts.",
            "Replication keeps copies of your data on multiple servers. The most common setup is primary-replica, where writes go to one primary database that then copies changes to read replicas. This scales reads because you can send queries to any replica, and provides failover if the primary dies. The catch is whether replication is synchronous or asynchronous. Synchronous means the primary waits for replicas to confirm each write, which is slower but guarantees consistency. Asynchronous is faster but there's a lag - a user might write data, hit a replica immediately after, and not see their own write. Multi-primary setups let multiple nodes accept writes, but then you need conflict resolution. I typically use async replication with careful routing - writes and immediately subsequent reads go to the primary, while general reads go to replicas."
        ],
    },
    {
        text: "What is connection pooling and why is it important?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.performance],
        answers: ["Connection pooling is maintaining a set of reusable database connections rather than creating a new one for each request. Opening a database connection is expensive - it involves network handshakes, authentication, and resource allocation. With a pool, connections are created upfront and reused across requests. When your application needs a connection, it borrows one from the pool and returns it when done. This dramatically improves performance, especially under high load. You configure the pool size based on your database's capacity and application's concurrency needs. Too few connections and requests queue up, too many and you overwhelm the database. It's a standard practice in production applications.",
            "Opening a database connection is expensive - it involves TCP handshakes, authentication, and setting up resources on both sides. Without pooling, every request opens a new connection, uses it, then closes it. Under load, this becomes a major bottleneck. Connection pooling solves this by maintaining a set of pre-opened connections that requests borrow and return. The connection stays open between uses. It's dramatically faster because you skip all that setup overhead. The key decision is pool size - too small and requests wait for available connections, too large and you exhaust database resources. I typically start with something like twice the CPU cores and tune from there based on monitoring. Tools like PgBouncer add pooling externally if you need more sophisticated management, which is especially useful in serverless environments."
        ],
    },
    {
        text: "What are database transactions?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.transactions],
        answers: ["A transaction is a sequence of database operations that are executed as a single unit of work. It follows ACID properties - all operations succeed together or fail together. You start a transaction, perform multiple operations like inserts, updates, or deletes, then either commit if everything worked or rollback if something failed. For example, transferring money between accounts involves debiting one account and crediting another - you want both to happen or neither. Transactions ensure data integrity in these scenarios. They also provide isolation so concurrent transactions don't interfere with each other. Most databases support transactions, though the isolation levels and performance characteristics vary.",
            "A transaction groups multiple database operations into one atomic unit. Either all of them succeed and are committed, or if anything fails, the entire set is rolled back and it's like nothing happened. This is essential when you have operations that must happen together. Think of placing an order: you need to create the order record, reduce inventory, and charge the customer. If the payment fails, you don't want the order created with inventory reduced. Transactions guarantee that whole sequence either completes fully or not at all. You start a transaction, run your operations, and then commit or rollback. They also isolate your changes from other concurrent operations until you commit. Every serious application uses transactions for data integrity."
        ],
    },
    {
        text: "What is the difference between optimistic and pessimistic locking?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.concurrency],
        answers: ["Pessimistic locking assumes conflicts will happen, so it locks the data when you read it, preventing others from modifying it until you're done. It's safer but can hurt performance because it blocks concurrent access. Optimistic locking assumes conflicts are rare, so it doesn't lock on read. Instead, it checks if the data changed before committing. Typically this uses a version number or timestamp - if the version changed since you read it, the update fails and you retry. Optimistic locking gives better concurrency but requires handling retry logic. I use pessimistic locking for critical operations with high conflict probability, and optimistic for most other cases where conflicts are unlikely.",
            "The key difference is when you handle potential conflicts. Pessimistic locking grabs a lock when you read the data, preventing anyone else from modifying it until you're done. It's like checking out a library book - no one else can have it until you return it. Optimistic locking takes the opposite approach - you read freely, but when you write, you check if someone else modified the data since you read it, usually via a version column. If the version changed, your update fails and you retry. Optimistic gives much better throughput because there's no blocking, but you need to handle conflicts in your code. I default to optimistic locking for most web applications since conflicts are relatively rare and performance matters. I reserve pessimistic locking for high-stakes scenarios where losing an update would be really bad."
        ],
    },
    {
        text: "What is a deadlock and how do you prevent it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.deadlocks, ValidTag.enum.concurrency],
        answers: ["A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a cycle that prevents any of them from proceeding. For example, transaction A locks row 1 and waits for row 2, while transaction B locks row 2 and waits for row 1. To prevent deadlocks, you can acquire locks in a consistent order across all transactions, keep transactions short, use appropriate isolation levels, or implement timeouts. Most databases can detect deadlocks and will automatically abort one transaction to break the cycle. When that happens, you need to handle it in your application by retrying the transaction. The key is designing your application to minimize lock contention in the first place.",
            "A deadlock happens when transactions get stuck waiting for each other. Transaction A holds lock 1 and needs lock 2. Transaction B holds lock 2 and needs lock 1. Neither can proceed because each is waiting for the other. It's a circular wait. To prevent this, the main strategy is always acquiring locks in the same order - if everyone locks tables in alphabetical order, for example, you can't get circular dependencies. Keeping transactions short reduces the window where conflicts can occur. Databases detect deadlocks automatically and kill one transaction to break the cycle. Your app needs to catch that error and retry. In practice, I focus on keeping transactions tight and fast, which naturally reduces deadlock risk. When I do see deadlocks, I examine the query patterns to find where the ordering is inconsistent."
        ],
    },

    // SQL and PostgreSQL
    {
        text: "What is normalization and when would you denormalize?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.normalization, ValidTag.enum.denormalization, ValidTag.enum["database-design"]],
        answers: ["Normalization is organizing data to reduce redundancy and improve data integrity. You split data into related tables and use foreign keys to establish relationships. The normal forms - first, second, third - progressively eliminate different types of redundancy. It prevents update anomalies where changing one piece of data requires updating multiple places. However, you'd denormalize when read performance becomes critical. Joins across many tables can be slow, so sometimes you duplicate data to avoid those joins. For example, storing a user's name directly on their posts rather than joining to the users table. I denormalize for reporting tables, caching frequently accessed combinations, or when read-heavy workloads outweigh the costs of data redundancy and maintaining consistency.",
            "Normalization eliminates data duplication by splitting information into separate related tables. If user names are stored in one place, you update them once and it's reflected everywhere. The different normal forms each address specific redundancy issues. This gives you data integrity and smaller storage. The tradeoff is query complexity - you need joins to reassemble the data. Denormalization is intentionally adding redundancy back when read performance matters more than write consistency. A common example is storing a user's name directly on orders instead of joining to users every time you display an order. I start normalized and denormalize strategically. Reporting tables are often heavily denormalized since they're read-only. The key is understanding that normalization isn't always better - it's a tradeoff between write simplicity and read performance."
        ],
    },
    {
        text: "What are joins and what are the different types?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.joins],
        answers: ["Joins combine data from multiple tables based on related columns. An INNER JOIN returns only rows where there's a match in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right, with nulls where there's no match. RIGHT JOIN is the opposite. FULL OUTER JOIN returns all rows from both tables with nulls where there's no match. CROSS JOIN returns the cartesian product of both tables. In practice, I use INNER JOIN when I only want matching records, LEFT JOIN when I need all records from the primary table regardless of whether related data exists, and occasionally FULL OUTER JOIN for specific reconciliation scenarios. Understanding joins is fundamental to working with relational databases effectively.",
            "Joins let you combine rows from different tables based on a relationship between them. INNER JOIN is the most common - it returns rows only when both tables have matching values. LEFT JOIN keeps everything from the left table, attaching right table data where it matches and NULLs where it doesn't. RIGHT JOIN is the mirror image but rarely used since you can just reorder tables with LEFT JOIN. FULL OUTER JOIN gives you everything from both sides - it's useful for finding orphan records. CROSS JOIN produces every combination of rows, which is rarely what you want but occasionally useful for generating permutations. Day to day, I use INNER JOIN when both sides are required and LEFT JOIN when the right side is optional. Understanding how joins work is essential because they're how you query across the normalized tables in a relational database."
        ],
    },
    {
        text: "What are indexes and how do they work?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: ["An index is a data structure that improves query performance by allowing the database to find rows quickly without scanning the entire table. Most databases use B-tree indexes, which organize data in a sorted tree structure. When you query with a WHERE clause or JOIN on an indexed column, the database uses the index to jump directly to relevant rows. It's similar to a book's index - instead of reading every page, you look up the term and go to specific pages. The tradeoff is that indexes take up space and slow down writes because the index must be updated. You want to index columns frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses, but not over-index because each index has a maintenance cost.",
            "An index is a separate data structure that speeds up data retrieval. Without one, the database has to scan every row to find matches - fine for small tables, but painfully slow as data grows. With an index, usually a B-tree, the database can navigate directly to the relevant rows. It's sorted and organized so lookups are logarithmic rather than linear. I add indexes on columns used in WHERE conditions, JOIN clauses, and ORDER BY expressions. The cost is storage space and slower writes since every insert and update also needs to update the index. The art is finding the right balance - indexing columns that genuinely speed up frequent queries without creating so many indexes that writes suffer. I use EXPLAIN to verify queries are actually using the indexes I create."
        ],
    },
    {
        text: "What is the difference between a clustered and non-clustered index?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: ["A clustered index determines the physical order of data in the table. The table data is stored in the order of the clustered index, usually the primary key. You can only have one clustered index per table because the data can only be physically sorted one way. A non-clustered index is a separate structure that points to the data. It contains the indexed columns and a pointer back to the actual row. You can have multiple non-clustered indexes. Clustered indexes are faster for range queries and retrieving the full row because the data is right there. Non-clustered indexes are better when you only need specific columns. In PostgreSQL, this concept differs slightly - the primary key isn't necessarily clustered, but you can manually cluster a table on an index.",
            "A clustered index physically reorders the table data to match the index order. The data itself is sorted by the clustered index key, typically the primary key. You can only have one per table since the data can only be physically arranged one way. This makes range scans very fast because sequential rows are stored together on disk. A non-clustered index is a separate structure with pointers back to the actual rows. You can have many of these. When you query a non-clustered index, the database finds the matching entries, then follows the pointers to fetch the actual row data - an extra step. The choice matters for performance: clustered indexes excel at range queries and retrieving full rows, while non-clustered indexes work better when you just need indexed columns or when you're doing point lookups."
        ],
    },
    {
        text: "What are some indexing strategies you would use and why?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing, ValidTag.enum.performance],
        answers: ["I start by indexing foreign keys because they're used in joins. Then I look at the most common queries and index columns in WHERE clauses, especially for high-cardinality columns where the index significantly narrows results. For queries with multiple conditions, composite indexes can be powerful. I also consider covering indexes that include all columns a query needs, avoiding table lookups entirely. For text search, full-text indexes are more efficient than LIKE queries. I monitor slow query logs to identify missing indexes. But I'm careful not to over-index - each index slows down writes and uses storage. I'll drop unused indexes and sometimes create indexes only for specific reporting periods, then drop them when done.",
            "My approach is to index based on actual query patterns rather than guessing. First, foreign keys should almost always be indexed since they're used in joins constantly. Then I look at WHERE clauses in frequent queries and create indexes on those columns. For queries filtering on multiple columns, composite indexes are powerful, but column order matters - I put the most selective column first. Covering indexes that include all selected columns can eliminate table lookups entirely, which is a big win for read-heavy queries. I use EXPLAIN ANALYZE to verify indexes are actually being used. I also audit periodically for unused indexes because they're just overhead. The goal is the minimum set of indexes that covers your critical query paths without hurting write performance."
        ],
    },
    {
        text: "What is a composite index and when would you use it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum.indexing],
        answers: ["A composite index covers multiple columns in a specific order. For example, an index on (last_name, first_name, date_of_birth). The column order matters - the database can use this index for queries filtering on just last_name, or last_name and first_name, but not just first_name alone. It follows the leftmost prefix rule. I use composite indexes when queries frequently filter on multiple columns together. For instance, if you often query orders by customer_id and status, a composite index on (customer_id, status) is more efficient than separate indexes. The key is ordering columns by selectivity and query patterns - put the most selective column first, or the one used in all queries if there are multiple use cases.",
            "A composite index indexes multiple columns together as a single unit. The column order is critical because of the leftmost prefix rule - an index on (A, B, C) can serve queries filtering on A, or A and B, or all three, but not queries that only filter on B or C. Think of it like a phone book sorted by last name then first name. You can find all Smiths easily, or all John Smiths, but you can't efficiently find all Johns across all last names. I use composite indexes when queries regularly filter on the same combination of columns. For example, if I'm always looking up orders by user_id and status together, a composite index on those two columns is better than two separate indexes. Getting the column order right requires understanding your actual query patterns."
        ],
    },
    {
        text: "What is query optimization and how do you read an execution plan?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql, ValidTag.enum["query-optimization"], ValidTag.enum.performance],
        answers: ["Query optimization is improving query performance by restructuring the query or adding indexes. The execution plan shows how the database will execute your query - what indexes it'll use, how it'll join tables, and estimated costs. I use EXPLAIN or EXPLAIN ANALYZE to see the plan. Key things I look for are sequential scans on large tables, which usually mean missing indexes, nested loop joins that might be inefficient, and the estimated rows versus actual rows to spot bad statistics. High-cost operations bubble up as bottlenecks. Once I identify the problem, I might add an index, rewrite the query to be more selective, or break it into smaller queries. Reading execution plans is critical for diagnosing performance issues in production.",
            "Query optimization is about making queries run faster, and execution plans are your primary diagnostic tool. When you run EXPLAIN on a query, the database shows you its strategy - which indexes it'll use, what order it'll join tables, and the estimated cost of each step. EXPLAIN ANALYZE actually runs the query and shows real timings alongside estimates. I look for red flags: Seq Scan on large tables means no useful index exists, huge row estimates that don't match actual rows suggest stale statistics, and Nested Loops over large datasets can be very slow. The goal is finding the most expensive operation and fixing it, whether that's adding an index, rewriting the query, or updating statistics. Getting comfortable reading plans is essential - it takes the guesswork out of performance tuning."
        ],
    },
    {
        text: "What are views and materialized views?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["A view is a stored query that acts like a virtual table. When you query a view, the database executes the underlying query. It's useful for simplifying complex queries, encapsulating logic, or restricting access to specific columns. A materialized view actually stores the query results physically, like a cached table. You refresh it periodically to update the data. Regular views have no storage overhead but run the query every time, while materialized views are fast to query but can have stale data and take up space. I use regular views for abstraction and security, and materialized views for expensive aggregations or reports where slightly stale data is acceptable and query performance is critical.",
            "A view is like a saved query that you can reference like a table. It doesn't store data - every time you query the view, it runs the underlying SQL. Views are great for encapsulating complex joins or logic so users don't need to know the details, and for security by only exposing certain columns. A materialized view takes this further by actually storing the query results. The data persists until you refresh it. This makes reads instant, but the data can be stale between refreshes. I use regular views when I want abstraction without caching. I use materialized views for dashboards and reports with expensive queries where millisecond freshness isn't required. You trade off freshness for speed, so the choice depends on how often data changes and how current it needs to be."
        ],
    },
    {
        text: "What are stored procedures and triggers?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["Stored procedures are precompiled SQL code stored in the database that you can call like functions. They can accept parameters, perform complex logic, and return results. They're useful for encapsulating business logic, reducing network overhead by processing data server-side, and enforcing consistency. Triggers are special stored procedures that automatically execute in response to events like INSERT, UPDATE, or DELETE on a table. They're useful for maintaining data integrity, audit logging, or cascading changes. I use them sparingly though - they can make the system harder to debug and understand because logic is hidden in the database. For most business logic, I prefer keeping it in the application layer where it's more visible and testable.",
            "Stored procedures are blocks of SQL code saved in the database that you call by name. They can have parameters, control flow, and return results. The benefit is reducing round-trips since complex logic executes server-side, and they're precompiled so they can be faster. Triggers are procedures that fire automatically on table events - you might use one to update a timestamp on every row update, or to log changes to an audit table. They're powerful but can be dangerous. Hidden logic in the database makes debugging harder because you can't see what's happening just by looking at application code. I'm cautious with both. I might use a stored procedure for a complex migration or a trigger for something that absolutely must happen on every write. But most business logic I keep in the application where it's testable and visible."
        ],
    },
    {
        text: "What are CTEs (Common Table Expressions)?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["CTEs are temporary named result sets defined with a WITH clause that you can reference in your main query. They make complex queries more readable by breaking them into logical steps. For example, instead of nested subqueries, you define each step as a CTE and reference it by name. They can also be recursive, which is powerful for hierarchical data like organizational charts or threaded comments. The query engine may or may not materialize them depending on optimization. I use CTEs to improve readability when I have multiple subqueries, to avoid repeating the same subquery, and for recursive operations. They're especially helpful when building up complex analytics queries step by step.",
            "CTEs let you define named temporary result sets at the start of a query using WITH clauses. Instead of writing deeply nested subqueries that are hard to follow, you break the logic into named steps. Each CTE is like a building block you reference by name in subsequent CTEs or the final query. This makes complex queries much more readable. Beyond readability, recursive CTEs are invaluable for hierarchical data. If you have a tree structure like categories with parent references, a recursive CTE can walk the entire tree in one query. I reach for CTEs whenever a query starts getting complicated. They don't necessarily change performance since the optimizer may inline them, but the clarity improvement is significant when maintaining complex SQL."
        ],
    },
    {
        text: "What are window functions?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["Window functions perform calculations across a set of rows related to the current row, without collapsing them into a single result like GROUP BY does. You define a window with OVER, optionally partitioning and ordering the data. Common examples are ROW_NUMBER for ranking, LAG and LEAD for accessing previous or next rows, and aggregate functions like SUM or AVG over a window. For instance, you can calculate running totals, rank items within categories, or compare each row to an average without losing the individual rows. They're incredibly powerful for analytics and reporting. I use them frequently for leaderboards, time-series analysis, and any scenario where I need aggregates while maintaining row-level detail.",
            "Window functions let you compute values across a set of related rows without collapsing them. Unlike GROUP BY, which gives you one row per group, window functions keep all your rows and add computed columns. You use OVER to define the window - you can partition by some column and order within partitions. ROW_NUMBER gives you rankings, RANK handles ties, LAG and LEAD access neighboring rows. You can run aggregates like SUM or AVG over the window too, which is great for running totals. For example, I can show each order alongside that customer's average order value, without losing the individual order rows. They're essential for analytics queries. Once you learn window functions, you'll find yourself using them constantly for rankings, time-series comparisons, and running calculations."
        ],
    },
    {
        text: "What are constraints and what types are there?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["Constraints enforce rules on data to maintain integrity. PRIMARY KEY uniquely identifies each row and doesn't allow nulls. FOREIGN KEY ensures referential integrity by requiring values to exist in another table. UNIQUE ensures no duplicate values in a column. NOT NULL prevents null values. CHECK validates that values meet specific conditions, like age being positive. DEFAULT provides a value if none is specified. Constraints are enforced by the database, so invalid data can't be inserted regardless of which application tries. They're critical for data integrity. I define them in the schema rather than relying solely on application-level validation, because they provide a guaranteed safety net and document the data rules at the database level.",
            "Constraints are rules enforced at the database level that keep your data valid. PRIMARY KEY identifies each row uniquely and can't be null. FOREIGN KEY creates relationships between tables and prevents orphaned records. UNIQUE prevents duplicate values. NOT NULL requires a value. CHECK lets you define custom rules, like ensuring a price is positive. DEFAULT provides a fallback value. The power of constraints is they're enforced no matter how data enters the database - your app, migrations, manual SQL, whatever. Even if your application has a bug, the database rejects invalid data. I always prefer database constraints over application-only validation. They serve as both enforcement and documentation of your data rules, and they're the last line of defense for data integrity."
        ],
    },
    {
        text: "What is the difference between DELETE, TRUNCATE, and DROP?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.sql],
        answers: ["DELETE removes specific rows based on a WHERE clause. It's logged, can be rolled back in a transaction, and triggers fire for each row. TRUNCATE removes all rows from a table quickly without logging individual row deletions. It's much faster for clearing large tables but can't be rolled back in all databases and doesn't fire triggers. DROP removes the entire table structure and data from the database. DELETE is for selective removal and maintaining history, TRUNCATE is for quickly clearing all data while keeping the table structure, and DROP is for removing the table entirely. I use DELETE for normal operations, TRUNCATE for clearing staging tables or during testing, and DROP when retiring tables during migrations.",
            "They're three different levels of removal. DELETE removes specific rows based on conditions. It logs each deletion, fires triggers, and is fully transactional. It's what you use in normal application operations. TRUNCATE wipes all rows from a table at once. It's dramatically faster than DELETE because it doesn't log individual rows - it just deallocates the data pages. But triggers don't fire and you can't roll back in some databases. I use TRUNCATE for test data cleanup or clearing staging tables. DROP eliminates the table entirely - structure, data, indexes, everything gone. It's for migrations when you're removing a table permanently. The key distinction is DELETE for targeted removal, TRUNCATE for fast complete clearing, DROP for permanent table removal."
        ],
    },
    {
        text: "What are database migrations and how do you manage them?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.migrations],
        answers: ["Migrations are version-controlled changes to your database schema. Each migration is a script that modifies the schema - adding tables, columns, indexes, or transforming data. They're applied sequentially and tracked so the database knows which migrations have run. I use migration tools like Prisma Migrate, Flyway, or Knex that apply migrations automatically and maintain a history. Each migration should be reversible when possible, though that's not always practical. Best practices include testing migrations on a copy of production data, making backward-compatible changes when possible to allow zero-downtime deployments, and keeping migrations small and focused. They're essential for coordinating schema changes across development, staging, and production environments.",
            "Migrations are how you version control your database schema. Each migration is a script that changes the schema - creating tables, adding columns, modifying constraints. They run in order, and a tracking table records which ones have been applied. When you deploy, the migration tool applies any pending migrations automatically. This keeps development, staging, and production databases in sync. I use tools like Prisma Migrate or Knex that handle the execution and tracking. The key practices I follow are: keep migrations small and focused, test on production-like data before deploying, and try to make changes backward compatible when possible so you can deploy without downtime. Rolling back is tricky - sometimes you can write down migrations, but often it's safer to roll forward with a fix. Migrations are essential infrastructure for any serious project."
        ],
    },
    {
        text: "What is PostgreSQL's JSONB and when would you use it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.postgresql],
        answers: ["JSONB is PostgreSQL's binary JSON data type that stores JSON data in a decomposed binary format. Unlike the JSON type, it's processed for storage, which makes it slower to insert but much faster to query. You can index JSONB columns and use operators to query nested data. I use JSONB when I have semi-structured data that doesn't fit neatly into columns, like user preferences, product attributes that vary by type, or API responses. It's great for flexible schemas while still getting the benefits of SQL like transactions and joins. However, I'm careful not to abuse it - if the data has clear structure and is frequently queried in specific ways, traditional columns with proper indexes are usually better.",
            "JSONB stores JSON in a binary format that's optimized for querying. Unlike plain JSON, JSONB parses and decompresses the data on insert, so writes are slightly slower but reads are much faster. You can index JSONB columns with GIN indexes and query into nested structures using operators like -> and ->>. I use JSONB for semi-structured data that varies between records - user preferences, feature flags, product metadata that differs by category. It gives you schema flexibility within a relational database. The trap to avoid is using JSONB as a crutch for poor data modeling. If you're always querying the same JSONB fields, those should probably be columns. But for genuinely variable data, JSONB is a powerful tool that lets you stay in PostgreSQL rather than reaching for a document database."
        ],
    },
    {
        text: "What are PostgreSQL extensions?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.postgresql],
        answers: ["Extensions add functionality to PostgreSQL beyond the core features. Popular ones include PostGIS for geospatial data, pg_trgm for fuzzy text search and similarity matching, uuid-ossp for generating UUIDs, and pgcrypto for cryptographic functions. You enable them with CREATE EXTENSION. They're powerful because they extend the database with specialized capabilities without modifying the core system. For example, PostGIS adds geographic data types and spatial queries that would be complex to implement in application code. I use extensions when the database can handle certain operations more efficiently than the application layer, like full-text search with the built-in text search extension, or when I need specialized data types and functions that are already well-tested in an extension.",
            "PostgreSQL extensions are add-on modules that provide additional functionality. You install them with CREATE EXTENSION and they integrate seamlessly into the database. Some are essential - uuid-ossp for UUID generation, pgcrypto for encryption. PostGIS is incredible for location-based applications, adding geographic data types and spatial queries. pg_trgm enables fuzzy text matching for search-as-you-type features. There are dozens of extensions for various needs. The benefit is getting battle-tested functionality without implementing it yourself, and operations run inside the database which is often more efficient than doing them in application code. I consider extensions part of my toolkit. Before building something custom, I check if there's an extension that already does it. Most hosted PostgreSQL services support common extensions, though self-hosting gives you the full range."
        ],
    },
    {
        text: "What is full-text search in PostgreSQL?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.postgresql],
        answers: ["PostgreSQL's full-text search provides text search capabilities that are more sophisticated than LIKE or regex patterns. It handles stemming, ranking, stop words, and multiple languages. You use tsvector to store processed documents and tsquery for search queries. It can rank results by relevance and handle phrase searches. I use it for medium-scale search features where a dedicated search engine like Elasticsearch might be overkill. For example, searching product descriptions or article content. You can create GIN indexes on tsvector columns for performance. The advantage is it's built into PostgreSQL, so no additional infrastructure. The limitation is it doesn't scale to massive datasets or provide the advanced features of dedicated search engines, but for many applications it's perfectly sufficient.",
            "PostgreSQL has built-in full-text search that's more powerful than simple LIKE queries. It handles stemming so 'running' matches 'run', ignores stop words like 'the' and 'and', and can rank results by relevance. You convert text to tsvector for storage and use tsquery for searches. Add a GIN index for fast lookups. It supports phrase matching, Boolean operators, and different language configurations. I use it when I need decent search but don't want to set up and maintain Elasticsearch. For a blog, product catalog, or knowledge base, PostgreSQL's full-text search is usually good enough. Where it falls short is very large datasets, complex relevance tuning, or features like typo tolerance. But it saves you from running another service, and for many apps, that simplicity is worth it."
        ],
    },

    // MongoDB
    {
        text: "What is MongoDB and when would you choose it over SQL?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum.sql],
        answers: ["MongoDB is a document-based NoSQL database that stores data as JSON-like documents rather than rows and tables. I'd choose it when I have rapidly evolving schemas where the structure isn't fully defined upfront, or when different records need different fields. It's great for content management systems, catalogs with varied product types, or when you need to scale horizontally across many servers. The flexible schema makes development faster when requirements are changing. However, I'd stick with SQL for complex relational data with many joins, financial systems requiring strict ACID guarantees, or when the team is more familiar with SQL. MongoDB has added transactions and better consistency, but SQL databases still excel at complex relational queries and enforcing strict data integrity.",
            "MongoDB stores data as flexible JSON-like documents rather than fixed tables. Each document can have different fields, and nested structures are natural. I'd pick it for scenarios with highly variable schemas - like a CMS where different content types have different fields, or an e-commerce site where product attributes vary wildly by category. It also shines when you need horizontal scaling built in from the start. However, MongoDB isn't always the right choice. If you have clear relational data with lots of joins and references, SQL handles that better. For financial or inventory systems where data integrity is critical, PostgreSQL's ACID guarantees are more reliable. MongoDB has improved with transactions and better consistency, but I'd default to SQL unless I have a specific reason for document storage."
        ],
    },
    {
        text: "What are documents and collections?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb],
        answers: ["In MongoDB, a document is a single record stored as a JSON-like object with field-value pairs. It's analogous to a row in SQL, but more flexible because different documents can have different fields. A collection is a group of documents, similar to a table in SQL, but without enforcing a schema. For example, a users collection might contain user documents with fields like name, email, and preferences. Documents can have nested objects and arrays, allowing you to model complex hierarchical data naturally. This flexibility is powerful but requires discipline - you still need to think about your data structure, just differently than with rigid schemas. Collections are created implicitly when you insert the first document.",
            "Documents are MongoDB's core data unit - JSON-like objects with fields and values. Unlike rows in SQL, documents are flexible. One user document might have a phone field, another might not. You can nest objects and arrays directly in a document, so instead of join tables, you might embed related data inline. Collections are groups of documents, like tables but without schema enforcement. A 'users' collection holds user documents, but MongoDB won't stop you from inserting a document with completely different fields. This flexibility is a double-edged sword. It speeds up development but requires discipline to maintain consistency. I often use Mongoose or similar tools to add schema validation at the application level while keeping the database flexibility."
        ],
    },
    {
        text: "What is the aggregation pipeline?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum.aggregation],
        answers: ["The aggregation pipeline is MongoDB's framework for data processing and transformation. You pass documents through a series of stages, where each stage performs an operation like filtering, grouping, sorting, or reshaping. Common stages include match for filtering, group for aggregation, project for selecting fields, sort for ordering, and lookup for joins. For example, you might match orders from the last month, group by customer to sum totals, then sort by total descending. Each stage's output becomes the next stage's input. It's similar to SQL's GROUP BY and aggregate functions but more composable and powerful. I use it for analytics, reporting, and complex data transformations that would be cumbersome with simple queries.",
            "The aggregation pipeline is how you do complex data processing in MongoDB. You define a series of stages that documents flow through, each transforming the data. $match filters documents, $group aggregates them, $project reshapes fields, $sort orders results, $lookup does joins, and there are many more. Documents enter the pipeline, each stage processes and passes them along, and you get transformed output at the end. It's like piping commands in a shell. For example, you might $match orders from this week, $group by product to count sales, then $sort by count. It's extremely powerful for analytics and reporting. I find it more intuitive than SQL for certain operations because you can see exactly how data flows through each transformation step."
        ],
    },
    {
        text: "How do you model relationships in MongoDB?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum["database-design"]],
        answers: ["You have two main approaches: embedding and referencing. Embedding puts related data directly in the document as nested objects or arrays. For example, storing a user's addresses as an array within the user document. This is fast for reads because everything is in one place, but can lead to duplication and large documents. Referencing stores related data in separate collections and links them with IDs, similar to foreign keys in SQL. You'd store order IDs on a user document and the actual orders in an orders collection. The choice depends on the relationship and access patterns. Embed when data is always accessed together and has a clear ownership, reference when data is large, shared across documents, or updated independently.",
            "There are two patterns: embedding and referencing. Embedding nests related data directly inside a document. A user document might contain an array of addresses or preferences right inline. This is great when you always need that data together - one read gets everything. But documents can get large, and updating embedded data everywhere it's duplicated is tricky. Referencing stores an ID pointing to another collection, like foreign keys in SQL. A post document has an author_id that points to a user. You need multiple queries or $lookup to join them. My rule of thumb: embed for one-to-few relationships with data that's owned by the parent and always accessed together. Reference for one-to-many, many-to-many, or when the related data is large or shared. The decision really depends on how you'll query the data."
        ],
    },
    {
        text: "What are indexes in MongoDB and how do they differ from SQL?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum.indexing],
        answers: ["MongoDB indexes work similarly to SQL - they're data structures that improve query performance by avoiding full collection scans. MongoDB uses B-tree indexes by default. The difference is that MongoDB can index fields within nested documents and arrays, which is powerful for document-based data. You can create compound indexes, unique indexes, and text indexes. MongoDB also has special index types like geospatial indexes for location queries and TTL indexes that automatically delete documents after a time period. Like SQL, every index speeds up reads but slows writes and uses memory. The principles are the same - index fields you query frequently, especially in filters and sorts. You use explain to see if queries use indexes effectively.",
            "Conceptually, MongoDB indexes work the same as SQL - they're B-tree structures that speed up queries by avoiding full scans. The key difference is MongoDB can index into nested structures and arrays. If you have a document with an address.city field, you can index that nested path. Multikey indexes automatically handle arrays. MongoDB also has specialized indexes: geospatial for location queries, text indexes for search, and TTL indexes that auto-expire documents after a period. The same tradeoffs apply - indexes speed reads but slow writes and consume memory. I focus on indexing fields used in queries, especially in find filters and sort operations. The explain method shows whether a query is using indexes. Without good indexes, MongoDB performance degrades quickly as collections grow."
        ],
    },
    {
        text: "What is Mongoose and what problems does it solve?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongoose, ValidTag.enum.mongodb],
        answers: ["Mongoose is an ODM - Object Data Modeling library - for MongoDB and Node.js. It solves the problem of MongoDB's schema-less nature by allowing you to define schemas and models with validation, type casting, and business logic. It provides structure and consistency that raw MongoDB doesn't enforce. Mongoose adds features like middleware hooks for lifecycle events, virtuals for computed properties, population for reference handling similar to joins, and built-in validation. It also simplifies common operations with a cleaner API. The tradeoff is added complexity and a slight performance overhead. I use Mongoose when I want schema validation and the developer experience benefits outweigh the flexibility of schema-less design, which is most production applications.",
            "Mongoose is an ODM that brings structure to MongoDB's flexible documents. While MongoDB doesn't enforce schemas, in practice you usually want consistency. Mongoose lets you define schemas with field types, validation rules, and defaults. It handles type casting, so a string '123' becomes the number 123 if that's what your schema expects. You get middleware hooks that run before or after saves, useful for things like hashing passwords. Population makes it easier to work with references between documents, similar to SQL joins. The tradeoff is some overhead and added abstraction. But for most Node.js apps using MongoDB, Mongoose's structure and validation prevent bugs that pure schema-less flexibility would allow. It's essentially bringing some of the guarantees of SQL to MongoDB."
        ],
    },
    {
        text: "What are Mongoose schemas and models?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongoose],
        answers: ["A Mongoose schema defines the structure of documents in a collection - what fields exist, their types, validation rules, and default values. It's like a blueprint. For example, you might define a User schema with fields for name, email, and password, specifying that email is required and unique. A model is a constructor compiled from the schema that lets you create, read, update, and delete documents. You create instances of the model representing individual documents. The schema provides the structure and rules, while the model provides the interface to interact with the database. This separation allows you to define your data structure once and reuse it throughout your application while getting validation and type safety.",
            "A schema is the blueprint that defines what a document should look like - the fields, their types, validation, and defaults. You specify that email is a required unique string, that age is a number between 0 and 150, that createdAt defaults to now. The schema is your source of truth for document structure. A model is what you actually use in code. You compile a schema into a model, and that model gives you methods to interact with the database - find, create, update, delete. Model instances represent individual documents. So the schema says 'this is what a User looks like' and the model says 'here's how to work with users in the database.' You define schemas once and use models everywhere in your application."
        ],
    },
    {
        text: "What are Mongoose middleware (pre and post hooks)?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongoose],
        answers: ["Mongoose middleware are functions that run at specific points in a document's lifecycle. Pre hooks run before an operation like save, validate, or remove, while post hooks run after. For example, a pre-save hook might hash a password before saving a user, or validate custom business rules. A post-save hook might log the operation or trigger notifications. You can also have hooks for queries like pre-find to add default filters. They're useful for cross-cutting concerns like auditing, validation, or maintaining computed fields. The key is they're tied to the model, so the logic runs regardless of where in your application you save a document. I use them for operations that should always happen, like timestamps or password hashing.",
            "Middleware hooks let you run code at specific points in the document lifecycle. Pre hooks fire before an operation completes - a pre-save hook runs before the document is written to the database. Post hooks fire after. The classic use case is password hashing: in a pre-save hook, you check if the password field changed, and if so, hash it before it gets stored. Post-save hooks are useful for triggering side effects like sending a welcome email after user creation. Query middleware like pre-find can automatically add filters - maybe always excluding soft-deleted documents. The advantage is centralization. No matter where in your codebase you save a user, the password gets hashed. It's logic that runs at the data layer rather than being scattered across your application."
        ],
    },
    {
        text: "How do you handle transactions in MongoDB?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum.transactions],
        answers: ["MongoDB added multi-document ACID transactions in version 4.0 for replica sets and 4.2 for sharded clusters. You start a session, begin a transaction, perform operations, then commit or abort. If any operation fails, you can roll back all changes. This is crucial when you need to update multiple documents atomically, like transferring inventory between warehouses. However, transactions have performance overhead and are only available on replica sets. MongoDB's document model often eliminates the need for transactions - if you embed related data in a single document, updates are naturally atomic. I use transactions sparingly, only when I truly need atomicity across multiple documents, and design schemas to minimize that need. For simple applications, careful schema design often avoids the need entirely.",
            "MongoDB supports multi-document transactions starting in version 4.0, but they work differently than you might expect coming from SQL. You create a session, start a transaction, run your operations using that session, then commit or abort. Everything in the transaction either succeeds together or rolls back. The catch is transactions require a replica set and add latency. The MongoDB philosophy is to avoid needing them in the first place. If you embed related data in a single document, updates to that document are atomic without a transaction. I try to model data so transactions aren't necessary. When I do need them - like when updating a source and destination document for a transfer - I use them, but I consider it a sign that maybe the schema could be improved."
        ],
    },
    {
        text: "What is the difference between embedding and referencing?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum["database-design"]],
        answers: ["Embedding stores related data directly within a document as nested objects or arrays. Referencing stores related data in separate collections and links them by ID. Embedding gives better read performance since everything is in one document, reduces the need for joins, and makes updates atomic. But it can cause data duplication and documents can grow too large. Referencing normalizes data, avoiding duplication and keeping documents small, but requires multiple queries or lookup operations to get complete data. I embed when there's a one-to-few relationship, data is always accessed together, and is owned by the parent document - like blog post comments. I reference when there's a one-to-many or many-to-many relationship, data is large, or is shared across documents - like authors and books.",
            "Embedding means putting related data directly inside the parent document - nested objects, arrays, whatever. A user document might have their addresses embedded as an array. You get everything in one read, and updates are atomic. Referencing means storing an ID that points to another collection, like how SQL foreign keys work. A post has an author_id pointing to the users collection. The tradeoff is read performance versus flexibility and size. Embedded data is fast to read but duplicated across documents if shared, and can bloat document size. Referenced data stays normalized and small, but requires extra queries. I embed for tightly coupled, small, rarely-updated data. I reference for large, shared, or frequently-updated related data. There's no universal right answer - it depends on your access patterns."
        ],
    },
    {
        text: "What are MongoDB operators?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb],
        answers: ["MongoDB operators are special syntax for performing operations in queries and updates. Query operators like dollar-gt, dollar-lt, dollar-in, and dollar-exists filter documents based on conditions. Update operators like dollar-set, dollar-inc, dollar-push, and dollar-pull modify documents. Aggregation operators transform data in the pipeline. For example, dollar-gt finds documents where a field is greater than a value, dollar-set updates a field, and dollar-push adds an element to an array. They're prefixed with a dollar sign. These operators make MongoDB queries expressive and powerful, allowing you to perform complex operations without pulling data into your application. Learning the common operators is essential for working efficiently with MongoDB - they replace what would be WHERE clauses and UPDATE logic in SQL.",
            "Operators are MongoDB's syntax for expressing query conditions and update operations. They're prefixed with $ and cover different use cases. Query operators like $gt, $lt, $in, and $regex let you filter documents - they're the equivalent of SQL WHERE conditions. Update operators like $set, $inc, $push, and $unset modify documents in place - $inc can atomically increment a counter, $push adds to an array. Aggregation operators transform data through pipeline stages. You chain these together to build powerful queries. For example, finding all users where age $gt 18 and $lt 65, then using $set to update their status. Learning the common operators is essential. They're how you express complex logic without pulling all data into your application and processing it there."
        ],
    },
    {
        text: "How do you handle migrations in MongoDB?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.mongodb, ValidTag.enum.migrations],
        answers: ["MongoDB migrations are trickier than SQL because there's no enforced schema. Schema changes often happen gradually as you update documents. Common approaches include running migration scripts that update existing documents to add or remove fields, using version fields on documents to track their schema version, or handling multiple schema versions in application code. Tools like migrate-mongo or custom scripts help manage this. I write idempotent migration scripts that check if a document needs updating before modifying it. For large collections, I process documents in batches to avoid overwhelming the database. Unlike SQL where you must migrate all data before changing the schema, MongoDB lets you migrate lazily - updating documents as they're accessed and handling both old and new formats in your code during the transition period.",
            "MongoDB migrations work differently than SQL because there's no enforced schema to alter. You have a few strategies. One is running scripts that update all existing documents to the new format - adding fields, transforming data, removing old fields. Tools like migrate-mongo track which migrations have run. Another approach is lazy migration: your application handles both old and new document formats, and documents get updated to the new format whenever they're written. You might add a schemaVersion field to track which format each document is in. For large collections, I batch updates to avoid locking issues. The flexibility that makes MongoDB easy to work with also means migrations need more thought. Unlike ALTER TABLE in SQL, you're responsible for ensuring all your documents eventually match your expected shape."
        ],
    },

    // Prisma
    {
        text: "What is Prisma and how does it differ from other ORMs?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Prisma is a next-generation ORM for Node.js and TypeScript. Unlike traditional ORMs, it uses a declarative schema file and generates a fully type-safe client based on your database schema. The big difference is that you get auto-completion and compile-time type checking for all your queries, which catches errors before runtime. Other ORMs like TypeORM or Sequelize use decorators or models that can get out of sync with the database. Prisma's approach is schema-first - you define your data model in the Prisma schema, and it handles both the database and the TypeScript types. It also has great migration tooling and a visual database browser called Prisma Studio. The developer experience is significantly better than traditional ORMs, especially in TypeScript projects.",
            "Prisma is a modern ORM built for TypeScript. What sets it apart is the schema-first approach. You define your data model in a schema file, and Prisma generates a client with full TypeScript types. Every query is type-checked at compile time - if you typo a field name or use the wrong type, TypeScript catches it before you run the code. Traditional ORMs like TypeORM or Sequelize use decorators or runtime definitions that can drift from the actual database. Prisma's generated client stays in sync with your schema automatically. It also includes excellent migration tools and Prisma Studio for visual database browsing. The developer experience is dramatically better. Autocomplete shows you every available field and operation. It's made database work in TypeScript much more enjoyable."
        ],
    },
    {
        text: "What is the Prisma schema and how do you define models?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["The Prisma schema is a file, usually schema.prisma, where you define your data models, database connection, and generator configuration. You define models using a simple syntax - each model represents a database table. For example, a User model might have id, email, and name fields with their types. You specify the database provider like PostgreSQL or MySQL, and the client generator. The schema is the single source of truth for your database structure. When you run prisma generate, it creates the Prisma Client with TypeScript types matching your schema. When you run prisma migrate, it generates SQL migrations based on schema changes. This centralized schema prevents drift between your code and database, which is a common problem with traditional ORMs.",
            "The Prisma schema is your single source of truth. It's a declarative file where you define your database connection, data models, and relationships. Models map to database tables - you list fields with their types, mark required versus optional, add unique constraints, define relations between models. The syntax is clean and readable. When you change the schema and run prisma generate, it regenerates the TypeScript client with updated types. Run prisma migrate and it creates the SQL migration. Everything flows from this one file. There's no chance for your types, queries, and database to get out of sync because they're all derived from the same source. It's a fundamentally better workflow than manually keeping model classes matched to database tables."
        ],
    },
    {
        text: "What is Prisma Client and how is it generated?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Prisma Client is an auto-generated, type-safe database client based on your Prisma schema. You generate it by running prisma generate, which reads your schema file and creates custom code tailored to your exact data model. Every table becomes a property on the client with methods like findMany, create, update, delete. The TypeScript types are generated automatically, so you get full auto-completion and type checking. When you change your schema, you regenerate the client and your types update. This is different from traditional ORMs where types are loosely coupled. The client handles query building, connection pooling, and translates your method calls into optimized SQL. It's designed to be intuitive while maintaining the full power of SQL underneath.",
            "Prisma Client is the code you actually use to query your database. It's generated from your schema by running prisma generate. What's special is that it's custom-built for your exact data model. If you have a User model with name and email, the client knows those fields exist and TypeScript will autocomplete and type-check them. You call methods like prisma.user.findMany(), prisma.user.create(), with full type safety. Change your schema, regenerate, and your client and types update automatically. This is fundamentally different from generic ORM clients. Prisma Client is tailored to your schema, so invalid queries are caught at compile time. It also handles connection pooling and query optimization under the hood. The developer experience is excellent."
        ],
    },
    {
        text: "How do you handle migrations in Prisma?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma, ValidTag.enum.migrations],
        answers: ["Prisma has two migration workflows: Prisma Migrate for development and production, and db push for prototyping. With Prisma Migrate, you modify your schema file, then run prisma migrate dev which generates a SQL migration file and applies it. The migration files are stored in your project and version controlled. For production, you run prisma migrate deploy which applies pending migrations. Prisma tracks which migrations have run using a migrations table. You can also create empty migrations for custom SQL. The workflow is smooth - change your schema, run migrate, and the database and your client types update together. This is much cleaner than writing raw SQL migrations or using migration libraries separately from your ORM.",
            "Prisma makes migrations straightforward. The typical flow is: change your schema, run prisma migrate dev. Prisma compares your schema to the database, generates the necessary SQL, and applies it. The migration file is saved in your project so you can version control it. For production, prisma migrate deploy applies any pending migrations. There's also db push for quick prototyping - it syncs your schema directly without creating migration files. I use migrate for anything serious since you want the audit trail. Prisma tracks which migrations have run in a database table, so it knows what's been applied. The nice thing is your schema changes drive both the database migrations and the TypeScript types. One change, everything stays in sync."
        ],
    },
    {
        text: "What are relations in Prisma and how do you query them?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Relations in Prisma define relationships between models using relation fields. You can have one-to-one, one-to-many, and many-to-many relationships. For example, a User can have many Posts, and each Post belongs to a User. You define this with relation fields and the relation decorator. To query relations, you use the include or select options. Include fetches related data, like including a user's posts when querying users. This generates an efficient JOIN or multiple queries. You can also use nested selects to precisely choose which fields to return. Prisma handles the SQL complexity - you just specify what data you want. The relations are fully type-safe, so you can't include a relationship that doesn't exist. It's much cleaner than manually joining tables.",
            "You define relations in the schema using relation fields. A User model might have 'posts Post[]' to indicate a one-to-many relationship with posts, while Post has 'author User' and 'authorId Int' for the back-reference. Prisma understands one-to-one, one-to-many, and many-to-many relationships. Querying them is clean - you use include to fetch related data along with the main record. For example, prisma.user.findMany({ include: { posts: true } }) returns users with their posts nested. You can go deeper with nested includes, or use select to pick specific fields. Prisma generates the appropriate SQL, whether that's joins or separate queries. The result type automatically includes the related data. It makes working with relational data intuitive rather than fighting with SQL joins."
        ],
    },
    {
        text: "How do you handle raw SQL queries in Prisma?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma, ValidTag.enum.sql],
        answers: ["Prisma provides raw database access for when you need to drop down to SQL. You use prisma.dollar-queryRaw for queries that return data, or prisma.dollar-executeRaw for operations like updates or deletes. You can use template literals for parameterized queries to prevent SQL injection. The results are returned as plain JavaScript objects, though you can specify a type. I use raw queries for complex operations that are difficult to express with Prisma's query API, like certain aggregations or database-specific features. However, you lose type safety and Prisma's query optimization, so I try to use the standard API when possible. Raw SQL is an escape hatch for when you need it, not the primary way to interact with the database.",
            "Prisma gives you escape hatches when you need raw SQL. Use $queryRaw for SELECT queries that return data and $executeRaw for INSERT, UPDATE, DELETE operations. You write your SQL as a tagged template literal, and Prisma handles parameterization to prevent injection. The results come back as plain objects, though you can add a type annotation. I reach for raw SQL when Prisma's query builder can't express what I need - complex aggregations, window functions, database-specific features, or performance-critical queries where I know exactly the SQL I want. But I use it sparingly because you lose type safety and Prisma's optimizations. For 95% of queries, the standard Prisma client is better. Raw SQL is the escape hatch for that remaining 5%."
        ],
    },
    {
        text: "What are Prisma middleware?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Prisma middleware are functions that run before and after database queries, letting you intercept and modify operations. You use prisma.dollar-use to register middleware. They receive the query parameters and the next function, similar to Express middleware. Common use cases include logging all queries, adding soft delete filters automatically, or implementing row-level security. For example, you might intercept all delete operations and convert them to updates that set a deletedAt field. Or you might log query performance. Middleware runs at the Prisma Client level, so it applies to all queries regardless of where in your application they're called. It's powerful for cross-cutting concerns that should apply to all database operations.",
            "Middleware lets you hook into Prisma operations to add cross-cutting logic. You register middleware with $use, and it intercepts every query before and after execution. The pattern is like Express middleware - you get the params, call next to continue, then optionally modify the result. Common uses are logging query times, implementing soft delete by transforming delete calls into updates, adding filters to all queries for multi-tenancy, or auditing changes. The key advantage is centralization. Rather than adding logging or soft delete logic everywhere you query, you add it once in middleware and it applies universally. I use middleware for concerns that should apply to every database operation without exception."
        ],
    },
    {
        text: "How do you handle soft deletes in Prisma?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Soft deletes mark records as deleted without actually removing them from the database. In Prisma, you add a deletedAt nullable DateTime field to your model. Then you use middleware to intercept delete operations and convert them to updates that set deletedAt. You also intercept find operations to filter out deleted records automatically. This way, delete calls appear to remove the record, but it's actually just marked. You can create explicit methods to find deleted records when needed, like for admin views or recovery features. The advantage is you never lose data and can implement undelete functionality. The downside is your database grows larger and you need to be careful about unique constraints on soft-deleted records. It's a common pattern for applications that need audit trails or data recovery.",
            "Soft delete means marking records as deleted rather than actually removing them. In Prisma, you add a deletedAt timestamp field to your model. Then use middleware to intercept operations: delete calls become updates that set deletedAt to now(), and all find operations automatically filter for deletedAt IS NULL. The app behaves like records are deleted, but the data is preserved. You can build admin tools to view or restore deleted records. The gotchas are unique constraints - if email must be unique, two soft-deleted users with the same email would conflict. You might need partial unique indexes that only apply when deletedAt is null. I use soft deletes for anything users might want to recover, or when audit requirements mean you can't truly delete data."
        ],
    },
    {
        text: "What is the difference between findUnique, findFirst, and findMany?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["FindUnique retrieves a single record by a unique identifier like an ID or email. It requires searching on a field with a unique constraint and returns null if not found. FindFirst retrieves the first record matching a filter, useful when you expect one result but don't have a unique field. It also returns null if nothing matches. FindMany retrieves all records matching a filter and returns an array, which might be empty. Use findUnique when you're looking up by a unique field - it's the most efficient and type-safe. Use findFirst when you want one record but are filtering on non-unique fields, like finding the most recent order. Use findMany when you expect multiple results. The choice affects both performance and the return type.",
            "These three methods have different purposes. findUnique fetches one record by a unique field - ID, email, or any column with a unique constraint. It must use a unique field and returns either the record or null. findFirst returns the first record matching your filter conditions. It works with any fields, not just unique ones, and is useful when you want one result but are filtering on non-unique criteria. findMany returns all matching records as an array, which could be empty. The return types differ: findUnique and findFirst return a single record or null, findMany returns an array. I use findUnique for primary key lookups, findFirst when I know there's at most one match but it's not on a unique field, and findMany when I want a list."
        ],
    },
    {
        text: "How do you handle transactions in Prisma?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma, ValidTag.enum.transactions],
        answers: ["Prisma supports transactions in two ways: sequential operations with dollar-transaction, and interactive transactions. Sequential transactions take an array of Prisma operations and execute them in order - if any fail, they all roll back. This is simple for straightforward multi-step operations. Interactive transactions provide a transaction client that you use within a callback, giving you control flow and the ability to make decisions based on query results. For example, you might read a user's balance, check if it's sufficient, then perform a transfer. The transaction rolls back automatically if an error is thrown. Prisma handles the complexity of starting, committing, and rolling back. Transactions ensure data integrity when multiple operations must succeed or fail together.",
            "Prisma has two transaction patterns. The simple one passes an array of operations to $transaction - they all run in order and roll back together if any fails. It's good for independent operations that must be atomic. For more complex logic, interactive transactions give you a callback with a transaction-scoped client. You can read data, make decisions, and write, all within the transaction. If you throw an error or the callback rejects, everything rolls back. For example, you might check inventory before creating an order - if inventory is insufficient, throw an error and nothing commits. Prisma handles the transaction lifecycle. It's much cleaner than managing BEGIN and COMMIT yourself."
        ],
    },
    {
        text: "What are nested writes in Prisma?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.prisma],
        answers: ["Nested writes let you create, update, or delete related records in a single operation. For example, when creating a user, you can create their profile at the same time using the create nested option. Or when updating a post, you can connect it to different tags. Prisma handles the complexity of multiple operations and foreign keys automatically. You can nest creates, updates, connects, disconnects, and deletes. This is powerful for managing complex data structures in one call instead of multiple sequential operations. Nested writes are executed in a transaction, so either all operations succeed or none do. They make your code cleaner and ensure data consistency. The type system guides you through what nested operations are valid for each relationship.",
            "Nested writes let you modify related records as part of a single operation. When creating a user, you can simultaneously create their associated profile using a nested create. When updating a post, you can connect it to a different category, disconnect from tags, or create new comments inline. Instead of multiple separate calls, you express the entire operation in one query. Prisma executes it all in a transaction, so it's atomic. The operations include create, update, upsert, delete for owned records, and connect, disconnect for relating to existing records. TypeScript tells you exactly what's allowed for each relationship. This is incredibly useful for form submissions where you're modifying a main record and its related data together."
        ],
    },

    // Supabase
    {
        text: "What is Supabase and how does it differ from Firebase?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase],
        answers: ["Supabase is an open-source Firebase alternative built on PostgreSQL. The key difference is that Supabase uses a real SQL database, giving you the full power of PostgreSQL with relations, complex queries, and triggers, while Firebase uses a NoSQL document database. Supabase provides authentication, real-time subscriptions, storage, and edge functions similar to Firebase, but everything is built on standard technologies rather than proprietary ones. You can self-host Supabase or use their hosted service. I prefer Supabase when I want SQL capabilities, need complex queries or relationships, or want to avoid vendor lock-in. Firebase might be better for rapid prototyping with less structured data or when you need Firebase's deeper Google Cloud integration. Supabase feels more like traditional backend development with modern tooling.",
            "Supabase is essentially 'Firebase but with PostgreSQL.' It gives you a backend-as-a-service with auth, realtime subscriptions, storage, and edge functions, but your data lives in a real SQL database. That's the fundamental difference from Firebase - you get proper relations, joins, transactions, and the full power of PostgreSQL. No vendor lock-in since it's all standard tech. You can query your data with SQL, use extensions, and export your database anytime. I reach for Supabase when I want rapid development but know I'll need relational data or complex queries eventually. Firebase is simpler for completely unstructured data, but Supabase gives you more power without much more complexity. The open-source nature means you can self-host if needed."
        ],
    },
    {
        text: "What is Supabase Auth and how do you implement authentication?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase, ValidTag.enum.auth],
        answers: ["Supabase Auth is a complete authentication system built into Supabase. It supports email/password, magic links, OAuth providers like Google and GitHub, and phone authentication. You use the Supabase JavaScript client to call methods like signUp, signIn, and signOut. Supabase handles password hashing, session management, and JWT tokens automatically. The user's session is stored locally and the JWT is included in requests. On the backend, you can use Row Level Security policies that check the JWT to enforce data access rules. Implementing it is straightforward - initialize the client with your project URL and API key, then call the auth methods. The benefit is you get production-ready authentication without building it yourself, and it integrates seamlessly with database security.",
            "Supabase Auth gives you a full authentication system out of the box. It handles email/password, magic links, phone auth, and OAuth providers like Google and GitHub. Implementation is simple - you call supabase.auth.signUp() or signIn() from the client library. Supabase handles password hashing, session tokens, and token refresh automatically. The JWT contains the user's ID and metadata, which you can use in Row Level Security policies. So auth and authorization integrate tightly - you don't just authenticate users, you use that identity to control data access at the database level. It saves a ton of time compared to building auth from scratch. The free tier is generous enough for most small projects."
        ],
    },
    {
        text: "What are Row Level Security policies?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase, ValidTag.enum.rbac, ValidTag.enum.security],
        answers: ["Row Level Security, or RLS, is a PostgreSQL feature that Supabase leverages to secure your data at the database level. You define policies that determine which rows a user can select, insert, update, or delete based on their authentication status. For example, a policy might allow users to only see their own posts by checking if the user_id column matches their authenticated user ID. The policies run in the database using the JWT claims from the user's session. This means security is enforced even if someone bypasses your application code and queries the database directly. I define policies for each table specifying what authenticated users, anonymous users, or specific roles can do. It's more secure than application-level checks because it's impossible to bypass.",
            "RLS lets you define access rules at the database level. You write policies that say things like 'users can only see rows where user_id matches their auth.uid()' or 'only admins can delete.' These policies run inside PostgreSQL using the JWT from Supabase Auth to identify the current user. The beauty is it's enforced at the database layer. Even if there's a bug in your application code, or someone queries the database directly, the policies still apply. You can't accidentally leak data by forgetting a WHERE clause. I enable RLS on every table with sensitive data and write specific policies for each operation - select, insert, update, delete. It's a powerful security model that combines authentication with fine-grained authorization."
        ],
    },
    {
        text: "How do you use Supabase real-time subscriptions?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase, ValidTag.enum["pub-sub"]],
        answers: ["Supabase real-time subscriptions let you listen for changes to your database in real-time. You use the client to subscribe to inserts, updates, or deletes on a table or even specific rows. When the data changes, your callback fires with the new data. For example, you might subscribe to new messages in a chat application. Supabase uses PostgreSQL's replication system and WebSockets to push changes to connected clients. You can filter subscriptions to only receive relevant changes. It's great for collaborative features, live dashboards, or chat applications. The subscription respects Row Level Security policies, so users only receive updates for data they have access to. It's much simpler than setting up your own pub-sub system and integrates naturally with database operations.",
            "Supabase realtime pushes database changes to connected clients over WebSockets. You subscribe to a table and specify what events you want - INSERT, UPDATE, DELETE, or all of them. When matching changes happen, your callback receives the new data. Under the hood, it uses PostgreSQL's replication log to detect changes. You can filter subscriptions to specific rows, like only messages in a particular chat room. It's powerful for building live features without polling. Chat apps, collaborative editors, live dashboards - anything where you want instant updates. RLS policies still apply, so users only see changes they're authorized to access. It's not as sophisticated as dedicated realtime systems, but for many use cases it's all you need, and it comes free with Supabase."
        ],
    },
    {
        text: "What is Supabase Storage and how do you handle file uploads?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase],
        answers: ["Supabase Storage is an S3-compatible object storage service for files and media. You create buckets, which can be public or private, then upload files using the JavaScript client. For uploads, you call the upload method with the file and path. Supabase returns a URL you can use to access the file. You can set up RLS policies on storage buckets just like database tables, controlling who can upload, view, or delete files. For example, users might only be able to upload to their own folder. Supabase handles things like image transformations on the fly, so you can request different sizes of an image. It's useful for user avatars, document uploads, or any file storage needs. The integration with the rest of Supabase makes it seamless compared to managing S3 separately.",
            "Storage gives you S3-compatible file storage integrated with Supabase. You create buckets - public for things like product images, private for user documents. Uploading is straightforward with the JavaScript client. The nice part is you can apply RLS policies to storage, just like database tables. Users can only access files in their own folder, or based on whatever rules you define. Supabase also provides image transformations - request a thumbnail size on the fly without pre-generating. For most applications, this covers file upload needs without setting up separate infrastructure. User avatars, document uploads, media files - it handles all of that. The integration means your auth tokens work automatically, and security policies are consistent across database and storage."
        ],
    },
    {
        text: "How do you handle migrations in Supabase?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase, ValidTag.enum.migrations],
        answers: ["Supabase uses SQL migration files managed through the Supabase CLI. You create migrations with supabase migration new, which creates a timestamped SQL file. You write your schema changes as SQL in this file - creating tables, adding columns, defining RLS policies, etc. Running supabase db push applies pending migrations to your remote database. For local development, you can run a local Supabase instance and apply migrations there first. The migration system tracks which migrations have run using a schema_migrations table. Best practice is to make migrations reversible when possible and test them on a staging environment. Since it's just SQL, you have full control and can do anything PostgreSQL supports. The workflow integrates well with version control and CI/CD pipelines.",
            "Supabase migrations are just SQL files managed by the CLI. Run supabase migration new to create a timestamped file, write your SQL - create tables, alter columns, add RLS policies - then push to apply. The CLI tracks which migrations have run. I like that it's raw SQL rather than a DSL, because you get full PostgreSQL power including extensions, functions, and triggers. For development, you can run a local Supabase instance that mirrors production. Test migrations locally, commit them to version control, deploy through your CI/CD pipeline. The workflow is clean. Just remember to think about backward compatibility for zero-downtime deployments - add columns before code uses them, remove columns after code stops using them."
        ],
    },
    {
        text: "What are the limitations of Supabase?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.supabase],
        answers: ["Supabase's main limitations stem from being built on PostgreSQL. It inherits PostgreSQL's scaling limitations - eventually you need to shard or move to a different architecture for truly massive scale. Real-time subscriptions can struggle with very high connection counts. The free tier has resource limits that are fine for development but not production. Edge functions are relatively new and lack some features of mature serverless platforms. Being newer than Firebase, the ecosystem and community are smaller. There's also the operational overhead if you self-host, though the managed offering mitigates this. For most applications these aren't dealbreakers, but you should be aware of them. The limitations are mainly around extreme scale and the maturity of some features, not fundamental architectural issues.",
            "Supabase inherits PostgreSQL's limitations around horizontal scaling. If you need to scale beyond what a single PostgreSQL instance can handle, you'll need to add read replicas or eventually shard, which Supabase doesn't automate. Realtime can struggle with very high concurrent connections - if you have thousands of simultaneous subscribers, you might hit limits. The free tier is limited for production use. Some features like edge functions are newer and less mature than AWS Lambda. And while the community is growing fast, it's smaller than Firebase's. That said, for 90% of applications, these limits won't matter. Supabase handles significant scale before you hit issues. Just know that at truly massive scale, you'd need to evaluate whether it's still the right fit."
        ],
    },

    // Redis
    {
        text: "What is Redis and what are its primary use cases?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.caching],
        answers: ["Redis is an in-memory data structure store that's extremely fast because it keeps data in RAM. The primary use cases are caching to speed up database queries, session storage for user sessions across servers, pub/sub messaging for real-time features, rate limiting to control API usage, and as a message broker for queues. It's also great for leaderboards, real-time analytics, and temporary data that needs fast access. I use Redis whenever I need sub-millisecond response times and can tolerate potential data loss since it's in-memory. For example, caching expensive database queries or API responses. The key is understanding what belongs in Redis versus a persistent database - Redis is for temporary, fast-access data that enhances performance but isn't the source of truth.",
            "Redis is an in-memory data store that's blazing fast because everything lives in RAM. Its primary use cases are caching expensive database queries, storing sessions so they're shared across application servers, pub/sub messaging for realtime features, and rate limiting. I also use it for leaderboards, queues, and temporary counters. The speed comes from memory access being orders of magnitude faster than disk. The tradeoff is data could be lost if Redis crashes, though you can enable persistence. I think of Redis as a performance layer. The database is the source of truth, but Redis speeds up hot paths. Cache that expensive query result, store that session, buffer those metrics. Anything where you need microsecond reads and can regenerate the data if needed."
        ],
    },
    {
        text: "What data structures does Redis support?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis],
        answers: ["Redis supports strings for simple key-value pairs, hashes for objects with multiple fields, lists for ordered collections that you can push and pop from, sets for unordered unique collections, and sorted sets for ordered unique collections with scores. There are also more advanced types like bitmaps, hyperloglogs for cardinality estimation, and geospatial indexes. Each structure has specific commands optimized for it. For example, sorted sets are perfect for leaderboards because you can add scores and retrieve top players efficiently. Lists work well for message queues. Understanding which structure to use for your data is key to using Redis effectively. The rich data structures make Redis much more powerful than a simple key-value cache.",
            "Redis has rich data types beyond simple key-value. Strings are the basic type - you can store text, numbers, even binary data. Hashes are like objects with fields - great for storing user objects. Lists are ordered and you can push/pop from either end, perfect for queues. Sets are unordered unique collections, useful for tags or membership tests. Sorted sets add a score to each member, enabling leaderboards and priority queues. There's also bitmaps for compact boolean arrays, hyperloglogs for cardinality estimation, and geospatial indexes. The power of Redis comes from choosing the right data structure. Don't just stringify everything - use the native structure that matches your access patterns and you'll get much better performance."
        ],
    },
    {
        text: "What is Redis pub/sub and when would you use it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum["pub-sub"]],
        answers: ["Redis pub/sub is a messaging pattern where publishers send messages to channels and subscribers receive messages from channels they're subscribed to. It's fire-and-forget - if no one is subscribed, the message is lost. I use it for real-time notifications, chat applications, or broadcasting updates to connected clients. For example, when a user posts a comment, you publish to a channel and all subscribed clients receive it instantly. The limitation is messages aren't persisted, so if a subscriber is offline, they miss messages. For more reliable messaging, I'd use Redis Streams or a dedicated message queue. But for ephemeral real-time updates where missing a message occasionally is acceptable, pub/sub is simple and performant.",
            "Pub/sub is Redis's built-in messaging system. Publishers send messages to named channels, and any subscribers listening to that channel receive the message immediately. It's fire-and-forget - if nobody's subscribed when you publish, the message is gone. I use it for real-time notifications across server instances. For example, when user A sends a message in a chat, I publish to that chat's channel, and all servers with users in that chat receive it and push to their WebSocket connections. The key limitation is no persistence - if a subscriber disconnects and misses messages, they're gone. For more reliable messaging, you'd use Redis Streams or a proper message queue. But for ephemeral updates where occasional message loss is acceptable, pub/sub is simple and fast."
        ],
    },
    {
        text: "How do you implement caching with Redis?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.caching],
        answers: ["The basic pattern is to check Redis before querying the database. If the data is in Redis, return it. If not, query the database, store the result in Redis with an expiration time, then return it. This is cache-aside or lazy loading. You set a TTL appropriate for your data - maybe 5 minutes for frequently changing data or an hour for more stable data. For writes, you can update or delete the cache entry to keep it fresh. I use Redis for caching expensive queries, API responses, or computed values. The key is choosing what to cache - high-read, low-write data benefits most. You also need a strategy for cache invalidation when the underlying data changes. Redis's speed makes it ideal for caching, dramatically reducing database load.",
            "The standard pattern is cache-aside. Before hitting the database, check Redis. If the key exists, return the cached value - cache hit. If not, query the database, store the result in Redis with a TTL, then return it - cache miss. The TTL depends on your data freshness requirements. User profiles might cache for an hour, real-time prices for seconds. On writes, either delete the cache key so the next read repopulates it, or update the cache with the new value. The tricky part is invalidation - making sure cached data doesn't become stale. I prefer short TTLs plus explicit invalidation on writes. The performance improvement is dramatic - Redis reads are sub-millisecond versus tens of milliseconds for database queries."
        ],
    },
    {
        text: "What are Redis transactions?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.transactions],
        answers: ["Redis transactions let you execute multiple commands atomically using MULTI, EXEC, and optionally WATCH. You start with MULTI, queue up commands, then EXEC executes them all at once. However, Redis transactions are different from database transactions - they don't support rollback. If one command fails, the others still execute. WATCH lets you implement optimistic locking by watching keys and aborting the transaction if they change. I use transactions when I need multiple operations to execute atomically, like incrementing a counter and adding to a list together. For more complex transactional needs, I'd use Lua scripts which guarantee atomicity. Redis transactions are lighter weight than traditional database transactions and focused on atomicity rather than isolation.",
            "Redis transactions group commands with MULTI and EXEC. After MULTI, commands queue up instead of executing immediately. Then EXEC runs them all atomically - no other commands interleave. But it's not like SQL transactions. There's no rollback - if one command fails, the others still execute. WATCH enables optimistic locking by aborting the transaction if watched keys changed between WATCH and EXEC. For true atomicity with conditionals, Lua scripts are better since the whole script executes atomically. I use MULTI/EXEC when I need to update multiple keys together, like incrementing a counter and logging the action. It's lighter weight than database transactions but solves a specific problem: ensuring commands run without interleaving."
        ],
    },
    {
        text: "What is Redis Cluster and how does it work?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.scalability],
        answers: ["Redis Cluster is Redis's native sharding solution that distributes data across multiple Redis nodes. It uses hash slots - there are 16,384 slots and each key is hashed to a slot. Each master node owns a range of slots. When you set a key, Redis determines which slot and therefore which node it belongs to. Clients need to be cluster-aware to route commands to the correct node. Cluster also provides automatic failover - if a master fails, one of its replicas is promoted. I'd use Redis Cluster when a single Redis instance can't hold all your data or handle the load. The tradeoff is increased operational complexity and some limitations - you can't do multi-key operations that span nodes. For most use cases, a single Redis with replicas is sufficient.",
            "Redis Cluster horizontally shards your data across multiple Redis nodes. It divides the keyspace into 16,384 hash slots, and each node owns a portion. When you access a key, Redis hashes it to determine which slot and thus which node holds it. Clients must be cluster-aware to route requests correctly. The cluster provides automatic failover - each master has replicas, and if a master dies, a replica gets promoted. The tradeoff is complexity. Multi-key operations only work if all keys are on the same node, which you can influence with hash tags. For most applications, a single Redis with replication handles the load. I'd only move to Cluster when I've outgrown what one instance can handle, either in memory or throughput."
        ],
    },
    {
        text: "How do you handle cache invalidation with Redis?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum["cache-invalidation"]],
        answers: ["Cache invalidation is one of the hardest problems in computing. Common strategies include time-based expiration with TTLs, where data expires after a set time. Event-based invalidation deletes or updates cache entries when the underlying data changes. You can also use versioned keys, where the cache key includes a version that changes when data updates. For complex dependencies, tag-based invalidation groups related cache entries. I typically combine TTLs with event-based invalidation - set a reasonable TTL as a safety net, but actively invalidate when data changes. For example, when updating a user, delete their cache entry. The challenge is handling relationships - when you update a post, you might need to invalidate user feeds. The strategy depends on your consistency requirements and update patterns.",
            "Cache invalidation is famously hard. The strategies are TTL-based where entries expire automatically, event-based where you delete cache entries when the source data changes, and versioned keys where you include a version number in the key and increment it on updates. I typically use TTL as a safety net combined with explicit invalidation on writes. When a user updates their profile, I delete the user cache key. The tricky part is cascading invalidation. If a post changes, which feed caches need clearing? Tag-based invalidation helps here - you associate cache entries with tags and invalidate by tag. There's no perfect solution. I accept some staleness with reasonable TTLs and handle the most important invalidation cases explicitly."
        ],
    },
    {
        text: "What is Redis persistence and what are the options (RDB vs AOF)?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis],
        answers: ["Redis persistence saves in-memory data to disk so it survives restarts. RDB creates point-in-time snapshots at intervals - it's compact and fast for backups but you can lose data between snapshots if Redis crashes. AOF logs every write operation, so you can replay them to rebuild state. It's more durable but creates larger files and is slower. You can use both together - RDB for backups and faster restarts, AOF for durability. For pure caching, I often disable persistence since cached data can be regenerated. For sessions or other important data, I use AOF with fsync every second, balancing durability and performance. Understanding the tradeoff between durability and performance is key - more frequent persistence is safer but slower.",
            "Redis is in-memory, but persistence options let data survive restarts. RDB takes snapshots periodically - say, every 15 minutes if 100+ keys changed. It's compact and fast to restore, but you lose changes since the last snapshot if Redis crashes. AOF logs every write operation, so you can replay to rebuild state. It's more durable but files grow larger. You can configure how often to fsync - every second is a good balance. Many setups use both: RDB for backups and fast restarts, AOF for durability. For pure caching, I might disable persistence entirely since the cache can be rebuilt from the source. For sessions or anything critical, I enable AOF. The choice depends on whether you can regenerate the data and how much loss is acceptable."
        ],
    },
    {
        text: "How do you handle session storage with Redis?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum["session-management"]],
        answers: ["Redis is perfect for session storage in distributed applications. You store session data as a hash or JSON string with the session ID as the key. Set a TTL matching your session timeout, and Redis automatically cleans up expired sessions. When a request comes in, look up the session by ID, extend the TTL to keep active sessions alive, and update it as needed. This allows any server to access any user's session, enabling stateless application servers and easy horizontal scaling. I use Redis hashes to store session fields efficiently, and set TTLs to automatically expire inactive sessions. It's much better than in-memory sessions on individual servers because it scales horizontally and survives server restarts. The fast access time keeps requests snappy.",
            "Redis is ideal for session storage, especially with multiple application servers. Store session data with the session ID as the key - either as a hash or serialized JSON. Set a TTL that matches your session timeout. When each request comes in, fetch the session from Redis, optionally extend the TTL to keep active sessions alive. Any server can access any session, so you can load balance freely. Redis's speed means session lookups add negligible latency. I typically use hashes for sessions since I can read and write individual fields without serializing everything. TTLs handle cleanup automatically. Enable AOF persistence so sessions survive Redis restarts. It's the standard solution for horizontally scaled web applications."
        ],
    },
    {
        text: "What are Redis TTL and expiration strategies?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.caching],
        answers: ["TTL, or Time To Live, specifies how long a key should exist before Redis automatically deletes it. You set it with EXPIRE or as part of SET. Redis uses two strategies: passive expiration checks TTL when you access a key, and active expiration periodically scans for and deletes expired keys. This means expired keys might not be deleted immediately if they're not accessed. For caching, I set TTLs based on how fresh data needs to be - maybe 5 minutes for dynamic data or a day for static data. For sessions, TTL matches the session timeout. You can also use sliding expiration by updating the TTL on each access. Understanding TTL is crucial for managing memory and keeping cached data reasonably fresh without manual cleanup.",
            "TTL determines when Redis automatically deletes a key. Set it with EXPIRE, SETEX, or as part of SET EX. Redis expires keys using two mechanisms: passive expiration checks TTL when you try to access the key, and active expiration randomly samples keys periodically to find and delete expired ones. This means a key might linger slightly past its TTL if never accessed, but memory gets reclaimed eventually. For caching, TTL should match how stale your data can be. Static content might get hours, real-time data gets seconds. For sessions, match your session timeout. Sliding expiration - resetting TTL on each access - keeps active sessions alive. I always set TTLs on cached data to prevent memory bloat from orphaned entries."
        ],
    },

    // Caching
    {
        text: "What are cache invalidation strategies and what are the tradeoffs?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching, ValidTag.enum["cache-invalidation"]],
        answers: ["The main strategies are TTL-based, where data expires after a set time, event-based where you invalidate when the source data changes, and version-based where you change the cache key when data updates. TTL is simple but data can be stale, and you might cache miss on popular items. Event-based keeps data fresh but requires complex logic to track what to invalidate and can fail if events are missed. Version-based avoids invalidation by making old cache entries irrelevant, but wastes memory on old versions. In practice, I combine approaches - use TTL as a safety net, invalidate on events when possible, and version static assets. The tradeoff is always between consistency, complexity, and cache hit rate. Perfect consistency requires aggressive invalidation, hurting performance.",
            "The strategies are TTL-based, event-based, and version-based. TTL is simplest - entries expire after a set time. The tradeoff is data can be stale until expiration. Event-based invalidation deletes cache entries when source data changes, keeping things fresh but requiring you to track what to invalidate. Version-based includes a version in the cache key - when data changes, you increment the version and old entries become irrelevant. I usually combine strategies: use TTL as a safety net so stale data eventually expires, explicitly invalidate on writes when the relationship is clear, and version static assets with content hashes. Perfect consistency requires immediate invalidation on every change, which hurts cache hit rates. Most systems accept some staleness in exchange for better performance."
        ],
    },
    {
        text: "What is the difference between write-through, write-behind, and write-around caching?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching, ValidTag.enum["cache-strategies"]],
        answers: ["Write-through writes to the cache and database simultaneously, keeping them in sync but slowing writes. Write-behind writes to cache immediately and asynchronously writes to the database later, making writes fast but risking data loss if the cache fails. Write-around writes directly to the database and bypasses the cache, only caching on reads. Write-through guarantees consistency but adds latency to writes. Write-behind is fastest but complex and risky. Write-around is simple and works when written data isn't immediately re-read. I use write-through when consistency is critical and writes are infrequent, write-behind for high write throughput when some data loss is acceptable, and write-around for write-heavy workloads where reads are rare. The choice depends on your read-write patterns and consistency requirements.",
            "These are three different write strategies. Write-through writes to both cache and database synchronously. Every write is consistent, but it's slower because you wait for both. Write-behind writes to cache immediately and persists to database asynchronously, maybe batching multiple writes. It's fast but risky - if cache crashes before persisting, data is lost. Write-around skips the cache entirely on writes, going straight to database. The cache only gets populated on reads. This avoids cache pollution from data that won't be read soon. I typically use write-through or write-around for most applications. Write-through when I want the cache always up-to-date, write-around when reads are separate from writes. Write-behind is only for specific high-throughput scenarios where I've accepted the data loss risk."
        ],
    },
    {
        text: "What is cache stampede and how do you prevent it?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching],
        answers: ["Cache stampede, or thundering herd, happens when a popular cache entry expires and many requests simultaneously try to regenerate it, overwhelming your database. Imagine a homepage cache expires and 1000 concurrent users all hit the database at once. To prevent it, you can use locking so only one request regenerates the cache while others wait. Another approach is probabilistic early expiration, where you refresh the cache before it expires based on load. You can also serve stale data while refreshing in the background. I typically use a combination - implement a lock so only one request regenerates, and use stale-while-revalidate so users get slightly old data instantly while the cache updates. The key is preventing simultaneous expensive operations when cache misses occur.",
            "Cache stampede, also called thundering herd, happens when a popular cache entry expires and hundreds of concurrent requests all try to regenerate it at once, slamming your database. The solutions are: locking so only one request regenerates while others wait or return stale data, probabilistic early expiration where you randomly refresh entries before they expire to avoid synchronized expiration, and stale-while-revalidate where you return the expired entry immediately while updating in the background. I typically combine approaches. Use a lock to ensure single regeneration, return stale data to waiting requests so users aren't blocked, and consider early expiration for the most popular entries. The goal is ensuring that mass expiration doesn't translate to mass database load."
        ],
    },
    {
        text: "What is the difference between in-memory cache and distributed cache?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching],
        answers: ["In-memory cache stores data in the application server's RAM, making it extremely fast but limited to that server. Each server has its own cache, so data isn't shared. Distributed cache like Redis is a separate service that multiple servers share, providing a consistent cache across your application. In-memory is fastest because there's no network hop, but you lose it when the server restarts and it doesn't help with horizontal scaling since each server caches independently. Distributed cache is slightly slower due to network latency but survives restarts, scales independently, and provides a single source of cached data. I use in-memory for request-scoped caching or data that's okay to be server-specific, and distributed cache for session data or anything that needs to be consistent across servers.",
            "In-memory cache lives in your application process's memory - blazing fast, no network hop. But each server has its own cache, they don't share, and it's lost on restart. Distributed cache like Redis is a separate service that all application servers connect to. Slightly slower because of network calls, but data is consistent across all servers and survives restarts. I use both strategically. In-memory for things that don't need to be shared - like caching parsed config files within a single request. Distributed for anything that needs consistency across servers - sessions, rate limiting, expensive query results. Many architectures layer both: check in-memory first, then distributed cache, then database."
        ],
    },
    {
        text: "When would you use Redis vs Memcached?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.redis, ValidTag.enum.caching],
        answers: ["I'd use Redis over Memcached in most cases because Redis supports richer data structures, persistence, pub/sub, and has more features. Redis can handle lists, sets, and sorted sets, while Memcached is just key-value. Memcached might be slightly faster for pure simple caching due to its simplicity and multi-threading, but the difference is usually negligible. Redis's persistence means it can survive restarts, which is valuable for sessions or important cached data. The only time I'd specifically choose Memcached is if I need the absolute simplest caching solution or want multi-threaded performance for a very high-throughput cache-only use case. For almost every modern application, Redis's extra features make it the better choice without meaningful performance sacrifice.",
            "Redis is my default choice. It has richer data structures, persistence options, pub/sub, Lua scripting, and is still actively developed with new features. Memcached is simpler - pure key-value caching with multi-threaded performance. The performance difference is usually negligible in practice. I'd only consider Memcached for a pure caching use case where I want something simpler to operate and don't need any of Redis's advanced features. But honestly, those situations are rare. Redis has become the standard for a reason. The ecosystem, tooling, and features make it worth the slightly more complex setup. And if I'm already using Redis for sessions or pub/sub, adding caching to it makes more sense than running a separate Memcached."
        ],
    },
    {
        text: "What are caching headers and how do they work?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching, ValidTag.enum["cache-control"]],
        answers: ["HTTP caching headers control how browsers and CDNs cache responses. Cache-Control specifies directives like max-age for how long to cache, no-cache to always revalidate, or private for browser-only caching. ETag provides a version identifier so clients can ask if their cached version is still valid. Expires sets an absolute expiration time, though Cache-Control is preferred. Last-Modified lets clients do conditional requests. For example, Cache-Control: max-age=3600 tells the browser to cache for an hour. Static assets might have max-age of a year, while API responses might be no-cache. Proper caching headers dramatically reduce server load and improve performance. I set aggressive caching for static assets with versioned URLs, and more conservative caching for dynamic content.",
            "HTTP cache headers tell browsers and CDNs how to cache responses. Cache-Control is the main one - max-age says how long to cache, no-cache means always revalidate before using, no-store means never cache. ETag is a content fingerprint so clients can ask 'is my cached version still good?' without downloading again. For static assets with versioned URLs, I set max-age to a year since the URL changes when content changes. For HTML, I typically use no-cache so browsers always check for updates. For API responses, it depends on how dynamic the data is. Proper cache headers are crucial for performance - they're often the difference between instant loads and waiting for every request. It's one of the highest-impact optimizations."
        ],
    },
    {
        text: "What is stale-while-revalidate?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching],
        answers: ["Stale-while-revalidate is a caching strategy where you serve cached content even after it's expired, while simultaneously fetching fresh data in the background. It's specified in the Cache-Control header. For example, max-age=60, stale-while-revalidate=300 means serve from cache for 60 seconds, then serve stale content for up to 300 more seconds while revalidating. This ensures users always get instant responses with reasonably fresh data. The next request gets the updated cache. It's a great middle ground between performance and freshness. I use it for content that changes occasionally but where serving slightly stale data is acceptable, like blog posts or product listings. It prevents the latency spike when cache expires while ensuring data stays relatively current.",
            "Stale-while-revalidate gives you the best of both worlds - instant responses with fresh data eventually. With max-age=60, stale-while-revalidate=300, the cache is considered fresh for 60 seconds. After that, it's stale but still usable for 300 more seconds. During the stale period, requests get the cached response immediately, but the browser or CDN fetches a fresh copy in the background. The next request gets the updated version. Users never wait for regeneration - they always get instant responses. I use this for content where slight staleness is acceptable. Blog posts, product listings, user profiles - data that changes but not every second. It eliminates that slow first request after cache expiration."
        ],
    },
    {
        text: "How do you decide what to cache and for how long?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.caching],
        answers: ["I look at several factors: how expensive is the operation to perform, how frequently is the data accessed, how quickly does it change, and what's the impact of serving stale data. Cache expensive operations with high read frequency and low change rate. For example, a homepage that's expensive to render but only updates hourly is perfect for caching with a 30-minute TTL. User-specific data might not cache well if every user's data is unique. Static assets cache forever with versioned URLs. API responses might cache for seconds to minutes depending on freshness requirements. I use monitoring to identify slow queries that are called frequently - those are prime caching candidates. The TTL should be short enough that staleness is acceptable but long enough to meaningfully reduce load.",
            "I ask: Is this expensive to compute or fetch? Is it accessed frequently? Does it change slowly? Can users tolerate staleness? If the answers are yes, cache it. A database query that takes 500ms and runs on every page load with data that changes hourly - definitely cache that. Static assets with hashed filenames get cached forever. User-specific data usually doesn't cache well unless you cache per-user. For TTL, I think about the cost of stale data versus the benefit of caching. Real-time stock prices might cache for seconds, blog posts for hours. I use monitoring to find the hot paths - the slow queries that run most often. Those are your highest-value caching targets. Start there and measure the impact."
        ],
    },

    // CDN
    {
        text: "What is a CDN and how does it work?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn],
        answers: ["A CDN, or Content Delivery Network, is a distributed network of servers that cache and serve your content from locations close to users. When a user requests a file, the CDN serves it from the nearest edge server rather than your origin server. This reduces latency because data travels shorter distances, and reduces load on your origin. The CDN caches responses based on caching headers you set. The first user in a region hits the origin and the CDN caches the response, then subsequent users in that region get it from cache. CDNs are essential for global applications because they make your site fast worldwide regardless of where your origin server is located. I use CDNs for static assets, images, and sometimes API responses to improve performance globally.",
            "A CDN is a network of servers spread across the globe that cache and serve your content. Instead of every user hitting your origin server in, say, Virginia, a user in Tokyo gets content from an edge server in Tokyo. The latency difference is dramatic - local is milliseconds, cross-ocean is hundreds of milliseconds. CDNs work by caching responses at edge locations based on the caching headers you set. First request for a resource in a region goes to origin, then subsequent requests in that region hit the cache. They also absorb traffic spikes and provide DDoS protection. I put all static assets through a CDN, and often dynamic content too with appropriate cache rules. Any global application needs a CDN for reasonable performance."
        ],
    },
    {
        text: "What is the difference between a push CDN and a pull CDN?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn],
        answers: ["Push CDNs require you to upload content to the CDN servers. You're responsible for keeping them updated. Pull CDNs automatically fetch content from your origin server when requested and cache it. With push, you have control over exactly what's on the CDN but need to manage uploads and updates. With pull, it's automatic but the first request to each edge location is slower because it fetches from origin. Pull is more common and easier to use - you just point the CDN at your origin and it handles everything. I'd use push for large files that rarely change, like video content, where you want to preload the CDN. For most web applications, pull CDNs are simpler and work better.",
            "Push CDNs require you to upload content directly to the CDN. You manage what's there and when it's updated. Pull CDNs fetch content from your origin on demand and cache it automatically. When a request comes in for something not cached, the CDN pulls it from your server. Pull is what most applications use because it's simpler - just point the CDN at your origin and it handles everything. The first request to each edge location is slower since it has to fetch from origin, but subsequent requests are cached. I'd only use push for large assets like video where I want to pre-populate the CDN, or when I want explicit control over what's distributed. For typical web assets, pull is easier and works great."
        ],
    },
    {
        text: "How do you handle cache invalidation with a CDN?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn, ValidTag.enum["cache-invalidation"]],
        answers: ["CDN cache invalidation is tricky because content is distributed across many edge servers. The main approaches are cache purging, where you tell the CDN to delete specific content, and versioned URLs, where you change the URL when content updates so the old cached version becomes irrelevant. Most CDNs provide purge APIs to clear cache by URL or tag. However, purging takes time to propagate and costs money on some CDNs. Versioned URLs with query strings or filenames like app.v2.js are more reliable - the CDN caches indefinitely and you just change the URL in your HTML. I use versioned URLs for static assets and purge APIs for content like HTML pages. The best approach depends on your use case and how frequently content changes.",
            "CDN invalidation is challenging because you're clearing cache across potentially hundreds of edge locations. Two main approaches: purging and versioning. Purging tells the CDN to delete specific URLs from all caches. Most CDNs have APIs for this. But it takes time to propagate globally and some CDNs charge for purges. Versioning avoids the problem entirely - your assets get content hashes in filenames like main.abc123.js. When content changes, the filename changes, so it's a new URL with no old cache to clear. I use versioning for static assets, letting me set infinite cache times. For HTML or content that can't be versioned, I use purging or short cache times. Versioning is more reliable - purging can leave some edges stale."
        ],
    },
    {
        text: "What are edge locations?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn],
        answers: ["Edge locations are the physical data centers around the world where a CDN stores cached content. They're strategically placed in major cities and internet exchange points to be as close to end users as possible. When a user requests content, it's served from the nearest edge location rather than traveling all the way to your origin server. For example, Cloudflare has edge locations in hundreds of cities globally. More edge locations means better global performance because more users are close to a cache. The edge location caches content based on your caching rules and TTLs. Edge locations are the foundation of how CDNs reduce latency - by bringing content physically closer to users worldwide.",
            "Edge locations are the CDN's servers distributed globally - the 'edges' of the network closest to users. Each major CDN has dozens to hundreds of these in cities around the world. When your content is cached, it's stored at these edge locations. A user in Sydney gets content from the Sydney edge, not your origin in the US. More edge locations means more users have a nearby cache. CDNs like Cloudflare have 200+ locations globally. This geographic distribution is why CDNs reduce latency so dramatically - data travels shorter distances. Edge locations also run CDN features like DDoS protection and sometimes edge computing. They're the foundation of the whole CDN concept."
        ],
    },
    {
        text: "How do you configure CDN caching rules?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn, ValidTag.enum.caching],
        answers: ["CDN caching is configured through HTTP headers from your origin and sometimes CDN-specific rules. The Cache-Control header is primary - it tells the CDN how long to cache and under what conditions. You might set max-age=31536000 for static assets to cache for a year, or no-cache for dynamic content. Many CDNs also let you override or supplement these headers with rules in their dashboard. You can configure cache behavior by path, like caching everything under /static/ for a long time. You might cache based on query strings or cookies. I typically set long cache times for versioned static assets, moderate times for images and fonts, and short or no caching for HTML and API responses. Testing and monitoring cache hit rates helps optimize the rules.",
            "CDN caching behavior comes from two places: HTTP headers your origin sends, and rules configured in the CDN's dashboard. Cache-Control is the main header - max-age tells the CDN how long to cache. The CDN reads this and respects it. But most CDNs also let you set rules that override or extend header behavior. You can say 'cache /static/* for one year' or 'never cache /api/*' regardless of what headers say. I configure different behaviors by path: static assets with content hashes get max caching, HTML gets short cache or revalidation, APIs might not cache at all. Most CDN dashboards also show cache hit rates, which help you identify what's being cached and what's hitting origin unnecessarily."
        ],
    },
    {
        text: "What are the tradeoffs between different CDN providers?",
        level: Level.enum.mid,
        category: Category.enum.databases,
        tags: [ValidTag.enum.cdn],
        answers: ["The main factors are number and location of edge servers, pricing models, features, and reliability. Cloudflare has the most edge locations and is very affordable, with a generous free tier. AWS CloudFront integrates well with AWS services but is more expensive. Fastly is developer-friendly with instant purging and flexible configuration. Akamai is enterprise-focused and expensive but extremely reliable. Some CDNs charge for bandwidth, others for requests. Features like image optimization, edge computing, and DDoS protection vary. I'd choose Cloudflare for most projects due to its balance of features, performance, and price. CloudFront if you're heavily invested in AWS. Fastly for advanced edge computing needs. The choice depends on your budget, existing infrastructure, geographic user distribution, and specific feature requirements.",
            "Different CDNs excel at different things. Cloudflare has excellent global coverage, a generous free tier, and built-in DDoS protection - my default choice for most projects. CloudFront integrates tightly with AWS which is valuable if you're already there, but it's pricier. Fastly offers instant purging and great developer tools, ideal if you need real-time cache control. Akamai is the enterprise standard with the largest network, but expensive. Pricing models vary - some charge by bandwidth, others by requests, some have free tiers. Consider edge locations in your users' regions, integration with your stack, and features you need like image optimization or edge computing. For most projects, Cloudflare's combination of performance, features, and price makes it hard to beat."
        ],
    },
];
