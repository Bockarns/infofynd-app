//TODO: Ska här skapa seed data för att skapa en superAdmin samt ett par 3 posts
// och kanske en medlem
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlFilePath = path.join(__dirname, "seed", "seed.sql");

try {
  console.log("🌱 Startar seedning av databasen...");

  const sql = fs.readFileSync(sqlFilePath, "utf8");

  db.exec(sql);

  console.log(
    "✅ Databasen har seedats framgångsrikt med standarddata och konton!",
  );
} catch (error) {
  console.error("❌ Fel vid seedning av databasen:", error);
}
