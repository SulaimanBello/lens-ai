import { GoogleGenAI } from "@google/genai";
import { SummaryResult } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const generateSummary = async (query: string): Promise<SummaryResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for better reasoning/summarization capabilities
      contents: `Perform a deep search and summarize the following website or topic: "${query}". 
      
      Structure the response in Markdown:
      1. **Executive Summary**: A concise high-level overview (2-3 sentences).
      2. **Key Features/Offerings**: Bullet points of what they provide.
      3. **Target Audience**: Who is this for?
      4. **Value Proposition**: Why does it exist?
      
      Keep the tone professional yet accessible.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No summary could be generated.";
    
    // Extract sources from grounding chunks
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri)
      .map((web: any) => ({
        title: web.title || new URL(web.uri).hostname,
        uri: web.uri
      })) || [];

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map((item: any) => [item.uri, item])).values());

    return {
      text,
      sources: uniqueSources as any[],
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate summary");
  }
};