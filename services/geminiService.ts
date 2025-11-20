import { GoogleGenAI } from "@google/genai";

// Helper to get the AI client safely
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTerminalResponse = async (userInput: string): Promise<string> => {
  const ai = getAiClient();
  
  // Fallback if no API key is present
  if (!ai) {
    console.warn("No API Key found in process.env.API_KEY");
    return "Protocol Error: Interview Engine Offline. Please use manual override: 'hire' or 'resume' to proceed.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userInput,
      config: {
        systemInstruction: `You are a "Candidate Interview Assistant" for Nithin, an AI Growth Marketer. 
        Your goal is to help a recruiter or hiring manager understand why Nithin is the perfect hire.
        
        Nithin's Profile:
        - Role: Senior Growth Engineer / AI Marketer.
        - Value Prop: Automates manual marketing work using Python & LLMs. Scales revenue without scaling headcount.
        - Status: OPEN TO WORK. Immediate availability.
        - Location: Bangalore (Open to Remote/Relocation).
        
        Tone: Professional, confident, high-tech, concise. 
        
        Instructions:
        - If they ask about "Salary", say: "Open to market rates for Senior roles. Focus is on equity + base mix."
        - If they ask about "Experience", summarize his projects (SEO agents, Predictive PLG, etc).
        - If they ask to "Contact", tell them to type 'hire' or 'email'.
        - Always end with a call to action like "Would you like to schedule an interview?"
        
        Formatting:
        - Keep it short. No long essays.
        - Use terms like "Operational Efficiency", "Revenue Uplift", "Automation".
        `,
      }
    });
    
    return response.text || "System Warning: Empty response from candidate database.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Critical: Connection interrupted. Please proceed to 'hire' command manually.";
  }
};