import db from "../data/db.js";

export function createMember(memberData) {
  const stmt = db.prepare(`
    INSERT INTO members (firstName, lastName, email, approveGDPR)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    memberData.firstName,
    memberData.lastName,
    memberData.email,
    memberData.approveGDPR ? 1 : 0,
  );

  return {
    id: result.lastInsertRowid,
    ...memberData,
    status: "pending",
  };
}

export function getAllMembers() {
  const stmt = db.prepare(`SELECT * FROM members ORDER BY createdAt DESC`);
  return stmt.all();
}
