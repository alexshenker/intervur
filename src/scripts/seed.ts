import { readFileSync } from "fs";
import { join } from "path";
import { importDatabase } from "../lib/importDatabase";

async function seed() {
    try {
        // Read the seed.json file from project root
        const seedPath = join(process.cwd(), "seed.json");
        const jsonString = readFileSync(seedPath, "utf-8");

        console.log("Starting database seed...");

        // Import using the importDatabase function
        const result = await importDatabase(jsonString);

        if (result.success) {
            console.log(
                `✓ Seed completed: ${result.questionsAdded} questions added, ${result.questionsSkipped} skipped`
            );
        } else {
            console.error(`✗ Seed failed: ${result.error}`);
            if (result.validationErrors) {
                console.error("Validation errors:");
                result.validationErrors.forEach((err) => console.error(`  - ${err}`));
            }
            process.exit(1);
        }
    } catch (error) {
        console.error("✗ Seed failed:", error);
        process.exit(1);
    }
}

seed();
