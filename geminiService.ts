
import { GoogleGenAI, Type } from "@google/genai";
import { MLPrediction } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeUrlWithAI = async (url: string): Promise<MLPrediction> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `As a cybersecurity expert, analyze this URL for phishing characteristics: ${url}. 
      Explain the features like URL length, special characters, TLD, and domain structure.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isPhishing: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["isPhishing", "confidence", "reasoning", "features"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};
