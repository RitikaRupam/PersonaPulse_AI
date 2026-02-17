import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

/* ============================= */
/* EXPRESS APP */
/* ============================= */

const app = express();

app.use(cors());
app.use(express.json());

/* ============================= */
/* GEMINI CLIENT */
/* ============================= */

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

/* ============================= */
/* PERSONA SYSTEM PROMPTS */
/* ============================= */

const PERSONA_PROMPTS = {
  riya: `
You are a amazing coding expert in all language specially in java. You are a really helful agent that gives technical clarification s, explainations and provide with the resources that needs to be don eto solve user doubts. If user asks about cooking then you should say to contct the cooking epert from the dashboard. 
Tone: friendly, happy, cute and confident.
`,
  priti: `
You are a home maker and a cooking expert in all the crusines. You are helpful in providing recepies  with step ans timings in a way that user feels you are really helful. You should also suggest some food ideas to user if the user gives the ingredient list to you. also, mention the significance of the recepies according to the state it belongs to.
Tone: motivational, enthusiatic, caring
`,
  rajesh: `
You are a All rounder agent, that have knowledge about the world and its different aspects. You will provide information on general knowledge, politics, Indian history specifcally and mythological characters from the Mahabharat and the Ramayana. 
Tone: Historic, storeyteller, mysterious.
`,
  sharangdhar: `
You the philoshpher, which provides life lessons to user if user comes with the problem, its your duty to provide solution to that. Motivate the user and make him understand by a real life story.
Tone: motivational, slow, understanding
`,
};

/* ============================= */
/* CHAT API WITH STREAMING */
/* ============================= */

app.post("/chat", async (req, res) => {
  try {
    const { personaId, message, stream } = req.body;

    // Safety Check: Make sure message exists
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const systemPrompt = PERSONA_PROMPTS[personaId];
    if (!systemPrompt) {
      return res.status(400).json({ error: "Invalid persona" });
    }

    // ✅ IF STREAMING IS REQUESTED
    if (stream) {
      console.log("🌊 Starting streaming response...");

      // Set headers for Server-Sent Events (SSE)
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      try {
        // Create streaming completion
        const streamResponse = await client.chat.completions.create({
          model: "gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          stream: true, // ✅ Enable streaming
        });

        // Stream each chunk to the client
        for await (const chunk of streamResponse) {
          const token = chunk.choices[0]?.delta?.content || "";

          if (token) {
            // Send as Server-Sent Event
            res.write(`data: ${JSON.stringify({ token })}\n\n`);
          }
        }

        // Signal completion
        res.write(`data: [DONE]\n\n`);
        res.end();

        console.log("✅ Streaming complete");
      } catch (streamError) {
        console.error("❌ Streaming error:", streamError);
        res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
        res.end();
      }
    }
    // ✅ NORMAL NON-STREAMING RESPONSE
    else {
      console.log("💬 Normal response (no streaming)...");

      const response = await client.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      });

      const aiReply = response.choices[0].message.content;
      res.json({ reply: aiReply });

      console.log("✅ Response sent");
    }
  } catch (err) {
    console.error("❌ Detailed Error:", err.message);

    // If headers already sent (streaming error), don't send JSON
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

/* ============================= */
/* START SERVER */
/* ============================= */

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
  console.log("✅ Streaming enabled");
});
