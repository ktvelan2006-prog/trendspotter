import { GoogleGenAI } from "@google/genai";
import { NewsResponse, NewsItem, GroundingSource } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchTrendingNews = async (topic: string = "latest technology and science news"): Promise<NewsResponse> => {
  try {
    const model = "gemini-2.5-flash";
    
    // We prompt the model to use Google Search explicitly to get the latest information.
    // The output format is requested as JSON inside a Markdown block.
    const prompt = `
      Using the Google Search tool, find 4 top trending and recent news stories specifically about: "${topic}".
      
      For each story, provide:
      1. A catchy Headline.
      2. A concise Article Summary (about 2-3 sentences).
      3. An "Application Remark" (appRemark): This should be a casual, witty, or slightly opinionated comment from the perspective of a tech-savvy AI assistant.
      4. A list of 2-3 short tags (e.g., "Tech", "Space", "Politics").

      Output the result STRICTLY as a JSON array inside a markdown code block like this:
      \`\`\`json
      [
        {
          "headline": "...",
          "articleBody": "...",
          "appRemark": "...",
          "tags": ["...", "..."]
        }
      ]
      \`\`\`
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType is NOT set to 'application/json' to ensure Search Grounding works correctly.
      },
    });

    // 1. Extract JSON from text
    const text = response.text || "";
    // Regex to match JSON inside markdown code blocks or just raw JSON
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    
    let items: NewsItem[] = [];
    if (jsonMatch && jsonMatch[1]) {
      try {
        items = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from AI response", e);
      }
    } else {
        // Attempt to parse raw text if no code blocks found
        try {
            const cleanText = text.replace(/```/g, ''); // Basic cleanup
            items = JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse raw text as JSON", e);
        }
    }

    // 2. Extract Grounding Sources (URLs)
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Source Link",
            uri: chunk.web.uri,
          });
        }
      });
    }

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return {
      items,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};