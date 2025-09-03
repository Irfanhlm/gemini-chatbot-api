import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai"; // This is the correct import for your dependency

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-1.5-flash-latest"; // Using a more common and stable model name

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API CHAT
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        if (!Array.isArray(messages)) throw new Error('messages must be an array');

        const contents = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        const resp = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents
        });

        // The response from the new SDK has a simple .text accessor
        res.json({ result: resp.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
// This call is ignored by Vercel, but works for local development via `node index.js`
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

// Export the app for Vercel
export default app;
