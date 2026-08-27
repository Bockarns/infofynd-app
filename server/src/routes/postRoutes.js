import { Router } from "express";
import {
  getActivePosts,
  getArchivedPosts,
  getPostById,
  createPost,
  updatePost,
  archivePost,
  deletePost,
} from "../services/postService.js";

const router = Router();

// GET /api/posts
router.get("/", (req, res) => {
  try {
    const posts = getActivePosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta aktiva inlägg." });
  }
});

// GET /api/posts/archived
router.get("/archived", (req, res) => {
  try {
    const posts = getArchivedPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta arkiverade inlägg." });
  }
});

// GET /api/posts/:id
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

    // Om inlägget är aktivt döljs rabattkoden och bara censurerad text skickas
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
