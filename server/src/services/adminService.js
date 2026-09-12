import db from "../data/db.js";
import bcrypt from "bcrypt";

export function getAllAdmins() {
  const stmt = db.prepare(
    "SELECT id, firstName, lastName, email, superAdmin, suspendedAccount FROM admins",
  );
  return stmt.all();
}

export async function createAdmin({
  firstName,
  lastName,
  email,
  password,
  superAdmin,
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO admins (firstName, lastName, email, password, superAdmin, suspendedAccount)
    VALUES (?, ?, ?, ?, ?, 0)
  `);

  const result = stmt.run(
    firstName,
    lastName,
    email,
    hashedPassword,
    superAdmin ? 1 : 0,
  );
  return { id: result.lastInsertRowid, firstName, lastName, email, superAdmin };
}

export function deleteAdmin(id) {
  const stmt = db.prepare("DELETE FROM admins WHERE id = ?");
  return stmt.run(id);
}
