import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize 
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function getAnswers(question) {
    try {
        const chat =await model.startChat(); // use chat mode
        const result = await chat.sendMessage(question);
        const response = result.response;
        const text = response.text();
        return text;
      } catch (error) {
        console.error("Gemini error:", error);
        return "Sorry, something went wrong.";
      }
  }
