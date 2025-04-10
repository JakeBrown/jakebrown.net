import m1 from "./0001_posts.sql";
import m2 from "./0002_tags.sql";
import m3 from "./0003_attachments.sql";

const migrationsList = [
  {
    name: "0001_posts",
    sql: m1,
  },
  {
    name: "0002_tags",
    sql: m2,
  },
  {
    name: "0003_attachments",
    sql: m3,
  },
];

export async function migrate(db: SqlStorage) {
  db.exec(`
			CREATE TABLE IF NOT EXISTS migrations (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL
			);
		`);
  for (const migration of migrationsList) {
    const exists = db
      .exec("SELECT * FROM migrations WHERE name = ?", migration.name)
      .toArray();
    console.log(exists);
    if (exists.length === 0) {
      console.log("running migration", migration.name);
      db.exec(migration.sql);
      db.exec("INSERT INTO migrations (name) VALUES (?)", migration.name);
    }
  }
}
