// server.mjs
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const OPENAI_API_KEY = "your-openai-api-key";

app.use(bodyParser.json());
app.use(express.static("public")); // Serve the front-end files

app.get("/assistants", async (req, res) => {
  res.json([
    { botName: "Bot1", assistantId: "123", systemPrompt: "Sample Prompt 1" },
  ]);
});

app.post("/assistants", async (req, res) => {
  const { botName, prompt } = req.body;
  res.json({ message: "Assistant created", assistantId: "new_id" });
});

app.put("/assistants/:id", async (req, res) => {
  const { prompt } = req.body;
  res.json({ message: "Assistant updated" });
});

app.delete("/assistants/:id", async (req, res) => {
  res.json({ message: "Assistant deleted" });
});

app.get("/threads/:assistantId", async (req, res) => {
  res.json({ threads: [{ content: "Thread message example" }] });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
