import { sql } from "drizzle-orm";
import {
    check,
    integer,
    SQLiteColumn,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";
import {
    categories,
    levels,
    validTags,
    type Category,
    type Level,
    type ValidTag,
} from "./constants";

// NOTE: Valid values for level and category are defined in ./constants.ts

/**
 * Creates a CHECK constraint for enum values
 * @param name - Name of the constraint
 * @param column - The column to check
 * @param validValues - Array of valid enum values
 * @returns CHECK constraint
 */
function createEnumCheck(
    name: string,
    column: SQLiteColumn,
    validValues: readonly string[]
) {
    // SQLite doesn't allow parameters in CHECK constraints, so we need to inline the values
    const valuesList = validValues.map((v) => `'${v}'`).join(", ");
    return check(name, sql.raw(`${column.name} IN (${valuesList})`));
}

// Questions table
export const questions = sqliteTable(
    "questions",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        text: text("text").notNull().unique(), // Question text must be unique
        level: text("level", { enum: levels }).$type<Level>().notNull(),
        category: text("category", { enum: categories })
            .$type<Category>()
            .notNull(),
        createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
        updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => [
        // CHECK constraints to enforce valid enum values at database level
        createEnumCheck("level_check", table.level, levels),
        createEnumCheck("category_check", table.category, categories),
    ]
);

// Answers table
export const answers = sqliteTable("answers", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    questionId: integer("question_id")
        .notNull()
        .references(() => questions.id, { onDelete: "cascade" }), // Delete answers when question is deleted
    text: text("text").notNull().unique(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Tags table
export const tags = sqliteTable(
    "tags",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        name: text("name", { enum: validTags })
            .$type<ValidTag>()
            .notNull()
            .unique(), // Tag names must be unique (e.g., "aws", "react")
    },
    (table) => [
        // CHECK constraint to enforce valid tag values at database level
        createEnumCheck("tag_name_check", table.name, validTags),
    ]
);

// Question-Tags junction table (many-to-many relationship)
export const questionTags = sqliteTable("question_tags", {
    questionId: integer("question_id")
        .notNull()
        .references(() => questions.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
        .notNull()
        .references(() => tags.id, { onDelete: "cascade" }),
});

/**
 * Cached embeddings for semantic search.
 * Keyed by hash of question text to detect when regeneration is needed.
 */
export const embeddingCache = sqliteTable("embedding_cache", {
    /** SHA-256 hash of the question text (primary key) */
    textHash: text("text_hash").primaryKey(),
    /** Serialized embedding vector as JSON array of floats */
    embedding: text("embedding").notNull(),
    /** Model identifier for cache invalidation on model change */
    modelVersion: text("model_version").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Type exports for TypeScript inference
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

export type Answer = typeof answers.$inferSelect;
export type InsertAnswer = typeof answers.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

export type QuestionTag = typeof questionTags.$inferSelect;
export type InsertQuestionTag = typeof questionTags.$inferInsert;

export type EmbeddingCache = typeof embeddingCache.$inferSelect;
export type InsertEmbeddingCache = typeof embeddingCache.$inferInsert;
