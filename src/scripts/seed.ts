import { importDatabase } from "../lib/importDatabase";
import { seedData } from "../seed/seed";

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
