import { Router } from "express";
import db from "../data/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "Bälte_och_Livrem_är_bra";

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-post och lösenord krävs." });
    }

    const stmt = db.prepare("SELECT * FROM admins WHERE email = ?");
    const admin = stmt.get(email);

    if (!admin) {
      return res.status(401).json({ error: "Felaktig e-post eller lösenord." });
    }

    if (admin.suspendedAccount === 1) {
      return res
        .status(403)
        .json({ error: "Detta konto har blivit avstängt." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Felaktig e-post eller lösenord." });
    }

    const tokenPayload = {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      superAdmin: admin.superAdmin,
      isDemo: admin.isDemo,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "8h" });

    res.status(200).json({
      message: "Inloggningen lyckades!",
      token,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        superAdmin: admin.superAdmin,
        isDemo: admin.isDemo,
      },
    });
  } catch (error) {
    console.error("Inloggningsfel:", error);
    res.status(500).json({ error: "Ett serverfel uppstod vid inloggning." });
  }
});

export default router;
