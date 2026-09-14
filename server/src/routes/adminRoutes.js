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

router.delete("/:id", (req, res) => {
  try {
    const adminId = req.params.id;

    if (parseInt(adminId) === req.admin.id) {
      return res
        .status(400)
        .json({ error: "Du kan inte radera ditt eget superadmin-konto." });
    }

    const result = adminService.deleteAdmin(adminId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Administratören hittades inte." });
    }

    res.status(200).json({ message: "Administratören har raderats." });
  } catch (error) {
    res.status(500).json({ error: "Ett serverfel uppstod." });
  }
});

router.patch("/:id/suspend", (req, res) => {
  try {
    const adminId = req.params.id;

    if (parseInt(adminId) === req.admin.id) {
      return res
        .status(400)
        .json({ error: "Du kan inte stänga av dig själv." });
    }

    const newStatus = adminService.toggleSuspendAdmin(adminId);

    if (newStatus === null) {
      return res.status(404).json({ error: "Admin hittades inte." });
    }

    res.status(200).json({
      message: "Kontots status har uppdaterats.",
      suspendedAccount: newStatus,
    });
  } catch (error) {
    res.status(500).json({ error: "Ett serverfel uppstod." });
  }
});

export default router;
