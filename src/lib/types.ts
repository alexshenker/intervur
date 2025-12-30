import { z } from "zod";
import { Category, Level, ValidTag } from "../db/constants";

const category = "category";
const level = "level";

const dbExportQuestion = z.object({
    text: z.string().min(1, "Question text cannot be empty"),
    [level]: Level,
    [category]: Category,
    tags: z.array(ValidTag),
    answers: z.array(z.string().min(1, "Answer text cannot be empty")),
});

export type DbExportQuestion = z.infer<typeof dbExportQuestion>;

/**
 * Utility type to create a question constrained to a specific category
 */
export type QuestionForCategory<C extends Category> = Omit<
    DbExportQuestion,
    typeof category
> & {
    [category]: C;
};

/**
 * Utility type to create a question constrained to a specific category and level
 */
export type QuestionForCategoryAndLevel<
    C extends Category,
    L extends Level,
> = Omit<QuestionForCategory<C>, typeof level> & {
    [level]: L;
};

/**
 * Zod schema for validating database import/export JSON
 */
export const databaseExportSchema = z.object({
    exportedAt: z.string().optional(), // Date of export (ignored by importer)
    questions: z.array(dbExportQuestion),
});

/**
 * TypeScript type inferred from the Zod schema
 */
export type DatabaseExport = z.infer<typeof databaseExportSchema>;
