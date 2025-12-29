import { z } from "zod";
import { Category, Level, ValidTag } from "../db/constants";

/**
 * Zod schema for validating database import/export JSON
 */
export const databaseExportSchema = z.object({
    exportedAt: z.string().optional(), // Date of export (ignored by importer)
    questions: z.array(
        z.object({
            text: z.string().min(1, "Question text cannot be empty"),
            level: Level,
            category: Category,
            tags: z.array(ValidTag),
            answers: z.array(
                z.object({
                    text: z.string().min(1, "Answer text cannot be empty"),
                })
            ),
        })
    ),
});

/**
 * TypeScript type inferred from the Zod schema
 */
export type DatabaseExport = z.infer<typeof databaseExportSchema>;
