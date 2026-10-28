import "server-only";

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";
import { sampleItems, type CampusItem, type ItemStatus } from "./items";

type ItemRow = {
  id: string;
  name: string;
  description: string | null;
  category: CampusItem["category"];
  location: string;
  reported_at: string;
  status: ItemStatus;
  art: CampusItem["art"];
};

const databasePath =
  process.env.CAMPUSFIND_DB_PATH ?? join(process.cwd(), "data", "campusfind.db");
let database: Database.Database | undefined;

function getDatabase() {
  if (database) return database;

  mkdirSync(dirname(databasePath), { recursive: true });
  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL CHECK (category IN (
        'Accessories',
        'Books & stationery',
        'Electronics',
        'ID & keys'
      )),
      location TEXT NOT NULL,
      reported_at TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Lost', 'Found', 'Claimed', 'Returned')),
      art TEXT NOT NULL CHECK (art IN ('blue', 'peach', 'lilac', 'yellow')),
      created_at INTEGER NOT NULL
    )
  `);

  const insertSample = database.prepare(`
    INSERT OR IGNORE INTO items
      (id, name, description, category, location, reported_at, status, art, created_at)
    VALUES
      (@id, @name, @description, @category, @location, @reportedAt, @status, @art, @createdAt)
  `);
  const seedSamples = database.transaction(() => {
    const seedTime = Date.now();
    sampleItems.forEach((item, index) => {
      insertSample.run({
        ...item,
        description: item.description ?? null,
        reportedAt: item.reportedAt,
        createdAt: seedTime - index,
      });
    });
  });
  seedSamples();

  return database;
}

function toCampusItem(row: ItemRow): CampusItem {
  let reportedAt = row.reported_at;
  if (/^\d{4}-\d{2}-\d{2}T/.test(reportedAt)) {
    const reportedDate = new Date(reportedAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (reportedDate.toDateString() === today.toDateString()) {
      reportedAt = "Today";
    } else if (reportedDate.toDateString() === yesterday.toDateString()) {
      reportedAt = "Yesterday";
    } else {
      reportedAt = reportedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    category: row.category,
    location: row.location,
    reportedAt,
    status: row.status,
    art: row.art,
  };
}

export function getItems(): CampusItem[] {
  const rows = getDatabase()
    .prepare<[], ItemRow>(
      "SELECT * FROM items ORDER BY created_at DESC, rowid DESC",
    )
    .all();

  return rows.map(toCampusItem);
}

export function getItemById(id: string): CampusItem | undefined {
  const row = getDatabase()
    .prepare<[string], ItemRow>("SELECT * FROM items WHERE id = ?")
    .get(id);

  return row ? toCampusItem(row) : undefined;
}

export function createItem(
  item: Omit<CampusItem, "reportedAt">,
): CampusItem {
  const reportedAt = new Date().toISOString();
  getDatabase()
    .prepare(`
      INSERT INTO items
        (id, name, description, category, location, reported_at, status, art, created_at)
      VALUES
        (@id, @name, @description, @category, @location, @reportedAt, @status, @art, @createdAt)
    `)
    .run({
      ...item,
      description: item.description ?? null,
      reportedAt,
      createdAt: Date.now(),
    });

  return { ...item, reportedAt: "Today" };
}

export function resolveItem(id: string): boolean {
  const result = getDatabase()
    .prepare(`
      UPDATE items
      SET status = CASE status
        WHEN 'Found' THEN 'Claimed'
        WHEN 'Lost' THEN 'Returned'
      END
      WHERE id = ? AND status IN ('Found', 'Lost')
    `)
    .run(id);

  return result.changes === 1;
}
