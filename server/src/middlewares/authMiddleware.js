import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "din_hemliga_nyckel_byt_ut_den";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Ingen behörighet. Token saknas." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Ogiltig eller utgången token." });
  }
};
