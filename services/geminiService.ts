import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set
const ai = new GoogleGenAI({ apiKey });

const MODEL_FLASH = 'gemini-2.5-flash';

export const analyzeSongMetadata = async (title: string, artist: string) => {
  if (!apiKey) return { genre: 'Unknown', mood: 'Unknown', tags: [] };

  try {
    const prompt = `Analyze the song title "${title}" by "${artist}". 
    Provide a likely JSON object with keys: genre (string), mood (string), instrumentation (string), bpm (number estimate), and tags (array of strings). 
    Do not include markdown formatting. Just the JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { genre: 'Pop', mood: 'Upbeat', tags: ['Energetic'] };
  }
};

export const generateSyncPitch = async (song: any) => {
  if (!apiKey) return "Please configure API Key to generate pitch.";

  try {
    const prompt = `Write a 2-sentence sync licensing pitch for a song with these details:
    Title: ${song.title}
    Genre: ${song.genre}
    Mood: ${song.mood}
    Instrumentation: ${song.instrumentation}
    
    Also suggest 3 specific use cases (e.g. "Car Commercial", "Romantic Comedy Scene").`;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "Error generating pitch.";
  }
};

export const askTaxAssistant = async (question: string) => {
  if (!apiKey) return "I cannot answer without an API Key.";

  try {
    const prompt = `You are a helpful music business tax assistant for independent artists. 
    Answer the following question concisely and professionally. Disclaimer: Not legal advice.
    Question: ${question}`;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "Sorry, I am having trouble connecting to the brain.";
  }
};

export const analyzeDocument = async (docTitle: string) => {
  if (!apiKey) return "API Key missing.";
  
  try {
    const prompt = `Simulate an analysis of a music royalty statement document titled "${docTitle}".
    Extract: 
    1. Estimated Total Earnings
    2. Top Revenue Source
    3. Period Covered
    4. One potential anomaly or warning.
    Return as a JSON object.`;
    
     const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
}