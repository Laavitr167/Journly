import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';
import { Itinerary } from '../types/itinerary';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Define the JSON schema for the itinerary
const itinerarySchema = {
  type: 'object',
  properties: {
    destination: { type: 'string' },
    days: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'integer' },
          theme: { type: 'string' },
          activities: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                type: {
                  type: 'string',
                  enum: ['sightseeing', 'food', 'activity'],
                },
              },
              required: ['time', 'title', 'description', 'type'],
            },
          },
        },
        required: ['day', 'theme', 'activities'],
      },
    },
  },
  required: ['destination', 'days'],
};

export async function generateItinerary(input: {
  destination: string;
  budget: 'budget' | 'mid' | 'luxury';
  days: number;
  pace: 'relaxed' | 'packed';
  interests: string[];
}): Promise<Itinerary> {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  // Build the prompt
  const prompt = `
You are an expert travel planner. Generate a realistic, well-structured travel itinerary for the given destination.

Constraints:
- Destination: ${input.destination}
- Trip length: ${input.days} days
- Budget level: ${input.budget} (budget/mid/luxury)
- Pace: ${input.pace} (relaxed/packed)
- Interests: ${input.interests.join(', ')}

Requirements:
1. Return ONLY valid JSON matching the provided schema. No markdown, no commentary, no extra text.
2. For each day, suggest a theme and a list of activities with time, title, description, and type.
3. Activities should be realistic, well-known spots and food places appropriate for the destination.
4. Balance activity density according to pace: relaxed means fewer activities per day with more downtime; packed means more activities.
5. Respect the budget tier when suggesting food and activities (e.g., budget suggests affordable options, luxury suggests high-end experiences).
6. Ensure the JSON is strictly valid and can be parsed directly.

Schema:
destination: string
days: array of objects with:
  day: number (starting at 1)
  theme: string (short description of the day's focus)
  activities: array of objects with:
    time: string (suggested time, e.g., "9:00 AM")
    title: string
    description: string
    type: one of "sightseeing", "food", "activity"
`;

  const generationConfig: GenerationConfig = {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
    responseSchema: itinerarySchema,
    // Reduce reasoning overhead for structured output
    thinkingConfig: { thinkingLevel: 'low' },
  };

  let attempts = 0;
  const maxAttempts = 2;
  let lastError: unknown;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = result.response;
      // Check for truncation before parsing
      if (response.candidates?.[0]?.finishReason && response.candidates[0].finishReason !== 'STOP') {
        const finishReason = response.candidates[0].finishReason;
        throw new Error(`Generation stopped due to ${finishReason}. Consider increasing maxOutputTokens.`);
      }

      const text = response.text();

      // Parse the JSON; if invalid, throw to trigger retry
      const parsed = JSON.parse(text) as Itinerary;
      // Additional validation: ensure required fields exist (though schema should enforce)
      if (!parsed.destination || !Array.isArray(parsed.days)) {
        throw new Error('Invalid itinerary structure');
      }
      return parsed;
    } catch (err) {
      lastError = err;
      // If parsing fails, we may want to log and retry
      console.warn(`Attempt ${attempts} failed to generate valid itinerary:`, err);
      // If this was the last attempt, break and throw
      if (attempts >= maxAttempts) {
        break;
      }
      // Optional: wait a bit before retry? Not needed for now.
    }
  }

  // If we get here, all attempts failed
  throw new Error(
    `Failed to generate valid itinerary after ${maxAttempts} attempts. Last error: ${lastError}`
  );
}