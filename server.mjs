import express from "express";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import OpenAI from "openai";

dotenvConfig(); // This loads the environment variables from .env file

const app = express();
const PORT = 3000;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required in the environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(express.static("public")); // Serve the front-end files

// Fetch the list of assistants
app.get("/assistants", async (req, res) => {
  try {
    const myAssistants = await openai.beta.assistants.list({
      order: "desc",
    });
    res.json(myAssistants.data);
  } catch (error) {
    console.error("Error fetching assistants:", error);
    res.status(500).json({ error: "Failed to fetch assistants" });
  }
});

// Create a new assistant
app.post("/assistants", async (req, res) => {
  const { botName, name, description, instructions } = req.body;
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: instructions,
      name: name,
      description: description,
      metadata: { botName },
      model: "gpt-4-turbo",
    });
    res.json(assistant);
  } catch (error) {
    console.error("Error creating assistant:", error);
    res.status(500).json({ error: "Failed to create assistant" });
  }
});

// Update an existing assistant
app.put("/assistants/:id", async (req, res) => {
  const { name, description, instructions } = req.body;
  try {
    const assistant = await openai.beta.assistants.update(req.params.id, {
      instructions: instructions,
      name: name,
      description: description,
    });
    res.json(assistant);
  } catch (error) {
    console.error("Error updating assistant:", error);
    res.status(500).json({ error: "Failed to update assistant" });
  }
});

// Delete an assistant
app.delete("/assistants/:id", async (req, res) => {
  try {
    const response = await openai.beta.assistants.del(req.params.id);
    res.json(response);
  } catch (error) {
    console.error("Error deleting assistant:", error);
    res.status(500).json({ error: "Failed to delete assistant" });
  }
});

// Fetch threads for an assistant
app.post("/threads/:assistantId", async (req, res) => {
  try {
    const response = await openai.beta.threads.create();
    res.json(response);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
