import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
    categories,
    levels,
    validTags,
    type Category,
    type Level,
    type ValidTag,
} from "./constants";

// NOTE: Valid values for level and category are defined in ./constants.ts

// Questions table
export const questions = sqliteTable(
    "questions",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        text: text("text").notNull(),
        level: text("level", { enum: levels }).$type<Level>().notNull(),
        category: text("category", { enum: categories })
            .$type<Category>()
            .notNull(),
        createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
        updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => [
        // CHECK constraints to enforce valid enum values at database level
        check(
            "level_check",
            sql`${table.level} IN (${sql.join(
                levels.map((l) => sql`${l}`),
                sql`, `
            )})`
        ),
        check(
            "category_check",
            sql`${table.category} IN (${sql.join(
                categories.map((c) => sql`${c}`),
                sql`, `
            )})`
        ),
    ]
);

// Answers table
export const answers = sqliteTable("answers", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    questionId: integer("question_id")
        .notNull()
        .references(() => questions.id, { onDelete: "cascade" }), // Delete answers when question is deleted
    text: text("text").notNull(),
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
        check(
            "tag_name_check",
            sql`${table.name} IN (${sql.join(
                validTags.map((t) => sql`${t}`),
                sql`, `
            )})`
        ),
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

// Type exports for TypeScript inference
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

export type Answer = typeof answers.$inferSelect;
export type InsertAnswer = typeof answers.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

export type QuestionTag = typeof questionTags.$inferSelect;
export type InsertQuestionTag = typeof questionTags.$inferInsert;
