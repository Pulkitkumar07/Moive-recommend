import { GoogleGenAI } from "@google/genai";


export async function aiResponse(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
  const Finalprompt = `
${prompt}

STRICT RULES:
- Respond ONLY in valid JSON
- No explanation
- No description
- No markdown
- Short response only

Required format:
{
  "movies": [
    { "title": "", "platform": "" }
  ]
}
`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",

    contents: Finalprompt,
  });

  return response.text;
}
