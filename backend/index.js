import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const openaiKey = process.env.OPENAI_API_KEY;
if (!openaiKey) {
  console.warn("WARNING: OPENAI_API_KEY not set. Put your key in backend/.env");
}
const client = new OpenAI({ apiKey: openaiKey });

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, sketchDataUrl, source } = req.body || {};
    const sketchNote = sketchDataUrl ? "The sketch image should be included as an <img> with the provided data URL." : "";
    const userPrompt = `
You are an assistant that writes complete, responsive, and secure HTML+CSS documents only.
Generate a full HTML document (<html>...</html>) for this design request:
"${prompt || 'A simple landing page'}".
${sketchNote}
Return only the HTML document string in the response.
Do not include explanations or extra JSON.
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: userPrompt,
      max_output_tokens: 2000,
      temperature: 0.2,
    });

    // response.output_text is a convenience in some SDK versions
    const html = response.output_text || (response.output && response.output[0] && response.output[0].content && response.output[0].content[0] && response.output[0].content[0].text) || '';

    res.json({ html });
  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: (err.message || err.toString()) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
