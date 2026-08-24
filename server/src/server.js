import express from "express";

const app = express();

app.use(express.json());

const port = 8000;

app.get("/api", (req, res) => {
  res.send("Hello World! how you doing?");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
