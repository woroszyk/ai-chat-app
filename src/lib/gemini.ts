import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicjalizacja Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Tworzenie modelu
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Funkcja do generowania odpowiedzi
export async function generateResponse(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}