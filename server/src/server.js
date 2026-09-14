import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./data/db.js";
import postRoutes from "./routes/postRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
