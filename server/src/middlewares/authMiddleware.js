import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Bälte_och_Livrem_är_bra";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Ingen behörighet. Token saknas." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.admin = decoded;

    const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(
      req.method,
    );
    if (decoded.isDemo === 1 && isWriteMethod) {
      return res.status(403).json({
        error:
          "Demokontot har endast behörighet att läsa och kan inte utföra denna åtgärd.",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: "Ogiltig eller utgången token." });
  }
};

export function requireSuperAdmin(req, res, next) {
  if (!req.admin || req.admin.superAdmin !== 1) {
    return res
      .status(403)
      .json({ error: "Åtkomst nekad. Kräver behörighet som Super Admin." });
  }
  next();
}
