import express from "express";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import fetch from "node-fetch";

dotenvConfig(); // This loads the environment variables from .env file

const app = express();
const PORT = 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve the front-end files

// Fetch the list of assistants
app.get("/assistants", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/assistants", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching assistants:", error);
    res.status(500).json({ error: "Failed to fetch assistants" });
  }
});

// Create a new assistant
app.post("/assistants", async (req, res) => {
  const { botName, prompt } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/assistants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4", // Assuming gpt-4 is available and latest
        description: botName,
        metadata: JSON.stringify({ botName }),
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error creating assistant:", error);
    res.status(500).json({ error: "Failed to create assistant" });
  }
});

// Update an existing assistant
app.put("/assistants/:id", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch(
      `https://api.openai.com/v1/assistants/${req.params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error updating assistant:", error);
    res.status(500).json({ error: "Failed to update assistant" });
  }
});

// Delete an assistant
app.delete("/assistants/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openai.com/v1/assistants/${req.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error deleting assistant:", error);
    res.status(500).json({ error: "Failed to delete assistant" });
  }
});

// Fetch threads for an assistant
app.get("/threads/:assistantId", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openai.com/v1/assistants/${req.params.assistantId}/threads`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
