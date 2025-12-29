// Central export file for database
export * from "./constants";
export { db, sqlite } from "./database";
export * from "./queries";
export * from "./schema";

// Sync tags on startup (fire and forget)
import { syncTags } from "./queries";

syncTags().then((result) => {
    console.log(
        `[Database] Tags synced: ${result.inserted} inserted, ${result.deleted} deleted`
    );
});
