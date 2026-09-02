import db from "../data/db.js";

export function getAllMembers() {
  const stmt = db.prepare(`SELECT * FROM members ORDER BY createdAt DESC`);
  return stmt.all();
}

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

export function updateMemberStatus(id, status) {
  const stmt = db.prepare(`
    UPDATE members 
    SET status = ? 
    WHERE id = ?
  `);

  const result = stmt.run(status, id);
  return result.changes > 0;
}
