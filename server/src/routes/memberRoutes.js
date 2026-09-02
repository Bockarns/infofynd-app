import { Router } from "express";
import { createMember, getAllMembers } from "../services/memberService.js";

const router = Router();

// GET
router.get("/", (req, res) => {
  try {
    const members = getAllMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta medlemmar." });
  }
});

// POST
router.post("/", (req, res) => {
  try {
    const { firstName, lastName, email, approveGDPR } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Alla fält måste vara ifyllda." });
    }

    if (!approveGDPR) {
      return res
        .status(400)
        .json({ error: "Du måste godkänna GDPR-villkoren." });
    }

    const newMember = createMember(req.body);
    res.status(201).json({
      message: "Din medlemsansökan har skickats och väntar på godkännande.",
      member: newMember,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res
        .status(400)
        .json({ error: "E-postadressen är redan registrerad." });
    }
    res.status(500).json({ error: "Kunde inte registrera medlemskap." });
  }
});

export default router;
