import Database from "better-sqlite3";

const db = new Database("src/data/infofynd.db");

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    superAdmin INTEGER NOT NULL DEFAULT 0,
    suspendedAccount INTEGER NOT NULL DEFAULT 0,
    isDemo INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('news', 'offer')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    censoredDescription TEXT,
    imageUrl TEXT,
    discountCode TEXT,
    discountAmount REAL,
    discountType TEXT,
    archived INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER,
    FOREIGN KEY (createdBy) REFERENCES admins(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    approveGDPR INTEGER NOT NULL DEFAULT 1,
    gdprConsentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'denied')),
    gdprRequest TEXT NOT NULL DEFAULT 'none' CHECK(gdprRequest IN ('none', 'export', 'delete')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    approvedBy INTEGER,
    FOREIGN KEY (approvedBy) REFERENCES admins(id) ON DELETE SET NULL
  );
`);

export default db;
