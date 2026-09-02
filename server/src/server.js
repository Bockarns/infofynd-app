import express from "express";
import postRoutes from "./routes/postRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import db from "./data/db.js";

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/members", memberRoutes);

const port = 8000;

app.get("/api", (req, res) => {
  res.send("Hello World! how you doing?");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
