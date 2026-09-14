import db from "../data/db.js";
import bcrypt from "bcrypt";

export function getAllAdmins() {
  const stmt = db.prepare(
    "SELECT id, firstName, lastName, email, superAdmin, suspendedAccount, isDemo FROM admins",
  );
  return stmt.all();
}

export function getAdminById(id) {
  const stmt = db.prepare(
    "SELECT id, firstName, lastName, email, superAdmin, suspendedAccount, isDemo FROM admins WHERE id = ?",
  );
  return stmt.get(id);
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
    INSERT INTO admins (firstName, lastName, email, password, superAdmin, suspendedAccount, isDemo)
    VALUES (?, ?, ?, ?, ?, 0, 0)
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

export function toggleSuspendAdmin(id) {
  const admin = getAdminById(id);
  if (!admin) return null;

  const newStatus = admin.suspendedAccount === 1 ? 0 : 1;
  const stmt = db.prepare(
    "UPDATE admins SET suspendedAccount = ? WHERE id = ?",
  );
  stmt.run(newStatus, id);

  return newStatus;
}

export function deleteAdmin(id) {
  const stmt = db.prepare("DELETE FROM admins WHERE id = ?");
  return stmt.run(id);
}
