/**
 * Database seeding script for Intervur application
 *
 * This script populates the database with initial interview questions,
 * answers, and tags from the seed data files organized by category and level.
 *
 * Usage: npm run seed
 *
 * The seed data is organized hierarchically:
 * - Categories (frontend, backend, fullstack, etc.)
 * - Levels (junior, mid, senior, etc.)
 * - Questions with answers and tags
 *
 * Questions with duplicate text are automatically skipped to maintain data integrity.
 */

import { importDatabase } from "../lib/importDatabase";
import { seedData } from "../seed/seed";

/**
 * Seeds the database with interview questions from organized seed files
 *
 * Converts the typed seed data structure into JSON and imports it using
 * the database import function. Handles validation errors and provides
 * detailed console output about the seeding process.
 *
 * @throws {Error} Exits process with code 1 if seeding fails
 *
 * @example
 * ```bash
 * npm run seed
 * ```
 */
async function seed() {
    try {
        console.log("Starting database seed...");

        // Convert seed data to JSON string and import
        const jsonString = JSON.stringify(seedData);
        const result = await importDatabase(jsonString);

        if (result.success) {
            console.log(
                `✓ Seed completed: ${result.questionsAdded} questions added, ${result.questionsSkipped} skipped`
            );
        } else {
            console.error(`✗ Seed failed: ${result.error}`);
            if (result.validationErrors) {
                console.error("Validation errors:");
                result.validationErrors.forEach((err) =>
                    console.error(`  - ${err}`)
                );
            }
            process.exit(1);
        }
    } catch (error) {
        console.error("✗ Seed failed:", error);
        process.exit(1);
    }
}

seed();
