import { Router } from "express";
import {
  verifyToken,
  requireSuperAdmin,
} from "../middlewares/authMiddleware.js";
import * as adminService from "../services/adminService.js";

const router = Router();

router.use(verifyToken, requireSuperAdmin);

router.get("/", async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta administratörer." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, superAdmin } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "Obligatoriska fält saknas." });
    }

    const newAdmin = await adminService.createAdmin({
      firstName,
      lastName,
      email,
      password,
      superAdmin,
    });
    res.status(201).json({ message: "Administratör skapad!", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Kunde inte skapa administratören (kanske e-posten redan finns?).",
    });
  }
});

export default router;
