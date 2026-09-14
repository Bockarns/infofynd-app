import db from "../data/db.js";

export function getActivePosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const stmt = db.prepare(`
    SELECT 
      posts.id,
      posts.type,
      posts.title,
      posts.censoredDescription AS description,
      posts.imageUrl,
      posts.discountType,
      posts.archived,
      posts.createdAt,
      admins.firstName || ' ' || admins.lastName AS authorName
    FROM posts
    LEFT JOIN admins ON posts.createdBy = admins.id
    WHERE posts.archived = 0
    ORDER BY posts.createdAt DESC
    LIMIT ? OFFSET ?
  `);

  return stmt.all(limit, offset);
}

export function getArchivedPosts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const stmt = db.prepare(`
    SELECT 
      posts.id,
      posts.type,
      posts.title,
      posts.description AS description,
      posts.imageUrl,
      posts.discountAmount,
      posts.discountType,
      posts.archived,
      posts.createdAt,
      admins.firstName || ' ' || admins.lastName AS authorName
    FROM posts
    LEFT JOIN admins ON posts.createdBy = admins.id
    WHERE posts.archived = 1
    ORDER BY posts.createdAt DESC
    LIMIT ? OFFSET ?
  `);

  return stmt.all(limit, offset);
}

export function getPostById(id) {
  const stmt = db.prepare(`
    SELECT 
      posts.id,
      posts.type,
      posts.title,
      posts.description, 
      posts.censoredDescription, 
      posts.imageUrl,
      posts.discountCode,
      posts.discountAmount,
      posts.discountType,
      posts.archived,
      posts.createdAt,
      admins.firstName || ' ' || admins.lastName AS authorName
    FROM posts
    LEFT JOIN admins ON posts.createdBy = admins.id
    WHERE posts.id = ?
  `);

  return stmt.get(id) || null;
}

export function createPost(postData, authorId = 1) {
  const stmt = db.prepare(`
    INSERT INTO posts (
      type, title, description, censoredDescription, 
      imageUrl, discountCode, discountAmount, discountType, createdBy
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    postData.type,
    postData.title,
    postData.description,
    postData.censoredDescription || null,
    postData.imageUrl || null,
    postData.discountCode || null,
    postData.discountAmount || null,
    postData.discountType || null,
    authorId,
  );

  // Hämta författarens namn från admins-tabellen
  const author = db
    .prepare(
      `SELECT firstName || ' ' || lastName AS name FROM admins WHERE id = ?`,
    )
    .get(authorId);

  // Hämta godkända medlemmar för utskickssimulering
  const members = db
    .prepare(`SELECT email FROM members WHERE status = 'approved'`)
    .all();

  console.log("------------------------------------------");
  console.log("📧 SIMULERAT MAILUTSKICK TILL MEDLEMMAR:");
  console.log(`Ämne: Nytt inlägg på InfoFynd - ${postData.title}`);
  console.log(
    `Mottagare (${members.length} st):`,
    members.map((m) => m.email).join(", "),
  );
  console.log("------------------------------------------");

  return {
    id: result.lastInsertRowid,
    ...postData,
    simulatedMail: {
      recipientsCount: members.length,
      subject: postData.title,
      body: postData.description,
      discountCode: postData.discountCode || null,
      discountAmount: postData.discountAmount || null,
      discountType: postData.discountType || null,
      authorName: author ? author.name : "Admin", // <--- Skickar med rätt namn dynamiskt!
    },
  };
}

export function updatePost(id, postData) {
  const stmt = db.prepare(`
    UPDATE posts
    SET 
      type = ?,
      title = ?,
      description = ?,
      censoredDescription = ?,
      imageUrl = ?,
      discountCode = ?,
      discountAmount = ?,
      discountType = ?
    WHERE id = ?
  `);

  const result = stmt.run(
    postData.type,
    postData.title,
    postData.description,
    postData.censoredDescription || null,
    postData.imageUrl || null,
    postData.discountCode || null,
    postData.discountAmount || null,
    postData.discountType || null,
    id,
  );

  return result.changes > 0;
}

export function archivePost(id) {
  const stmt = db.prepare(`UPDATE posts SET archived = 1 WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export function deletePost(id) {
  const stmt = db.prepare(`DELETE FROM posts WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export function unarchivePost(id) {
  const stmt = db.prepare("UPDATE posts SET archived = 0 WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}
