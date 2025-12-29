import Database from "better-sqlite3";

const DB_NAME = "intervur.db";

const db = new Database(DB_NAME);

db.pragma("foreign_keys = ON"); // Enable foreign key constraints because SQLite added foreign key support in 2009. To avoid breaking old databases and apps that were built before foreign keys existed, SQLite keeps them OFF by default.

/* 
  Default mode (without WAL):
  - Write operation → database file is LOCKED
  - No one can read while writing
  - Reads have to wait for writes to finish

  WAL mode:
  - Write operation → writes to separate .wal file first
  - Main database file stays unlocked
  - Reads can happen while writes are in progress
  - Later, changes from .wal get merged into main file

  Why it's better:
  - Reads and writes don't block each other
  - Faster writes
  - Better for Electron apps (renderer can read while writes happen)
  - More crash-resistant

  Trade-off:
  - Creates extra files (.db-wal, .db-shm)
  - Fine for local desktop apps, not great for network drives
*/
db.pragma("journal_mode = WAL"); // Use Write-Ahead Logging for better concurrency

export default db;
