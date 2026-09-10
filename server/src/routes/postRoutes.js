import { Router } from "express";
import {
  getActivePosts,
  getArchivedPosts,
  getPostById,
  createPost,
  updatePost,
  archivePost,
  unarchivePost,
  deletePost,
} from "../services/postService.js";

const router = Router();

// GET /api/posts
router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = getActivePosts(page, limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta aktiva inlägg." });
  }
});

// GET /api/posts/archived
router.get("/archived", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = getArchivedPosts(page, limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta arkiverade inlägg." });
  }
});

// GET /api/posts/:id
router.get("/admin/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ogiltigt ID." });
    }

    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Inlägget hittades inte." });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Ett serverfel uppstod." });
  }
});
router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ogiltigt ID." });
    }

    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Inlägget hittades inte." });
    }

    if (post.archived === 0) {
      post.description = post.censoredDescription;
      delete post.discountCode;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Ett serverfel uppstod." });
  }
});

// POST /api/posts
router.post("/", (req, res) => {
  try {
    const { title, type, description } = req.body;
    if (!title || !type || !description) {
      return res
        .status(400)
        .json({ error: "Titel, typ och beskrivning är obligatoriska fält." });
    }

    const newPost = createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte skapa inlägget." });
  }
});

// PUT /api/posts/:id
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = updatePost(id, req.body);

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Inlägget kunde inte hittas eller uppdateras." });
    }

    res.status(200).json({ message: "Inlägget har uppdaterats." });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte uppdatera inlägget." });
  }
});

// PATCH /api/posts/:id/archive
router.patch("/:id/archive", (req, res) => {
  try {
    const id = Number(req.params.id);
    const archived = archivePost(id);

    if (!archived) {
      return res.status(404).json({ error: "Inlägget hittades inte." });
    }

    res.status(200).json({ message: "Inlägget har arkiverats." });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte arkivera inlägget." });
  }
});

// PATCH /api/posts/:id/unarchive
router.patch("/:id/unarchive", (req, res) => {
  try {
    const id = Number(req.params.id);
    const unarchived = unarchivePost(id);

    if (!unarchived) {
      return res.status(404).json({ error: "Inlägget hittades inte." });
    }

    res.status(200).json({ message: "Inlägget har återaktiverats." });
  } catch (error) {
    console.error("FEL VID ÅTERAKTIVERING:", error); // <--- Lägg till denna rad
    res.status(500).json({ error: error.message }); // <--- Skicka med det riktiga meddelandet till frontend
  }
});

// DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = deletePost(id);

    if (!deleted) {
      return res.status(404).json({ error: "Inlägget hittades inte." });
    }

    res.status(200).json({ message: "Inlägget har raderats." });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte radera inlägget." });
  }
});

export default router;
