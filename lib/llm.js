// Builds the prompt sent to the LLM and parses its JSON response.
// Uses Google's Gemini API.

export function buildPrompt({ skills, targetRole }) {
  return `You are a career-readiness advisor for Indian college students.

Student's current skills / resume text:
"""
${skills}
"""

Target role or domain the student is aiming for: "${targetRole}"

Analyze the gap between the student's current skills and what the target role
typically requires today. Respond with ONLY valid JSON (no markdown, no prose
outside the JSON) matching exactly this shape:

{
  "jobFitScore": <integer 0-100>,
  "matchedSkills": [<string>, ...],
  "missingSkills": [
    { "skill": <string>, "why": <short string, <=15 words>, "priority": "High" | "Medium" | "Low" }
  ],
  "roadmap": [
    { "step": <integer starting at 1>, "skill": <string>, "resource": <string, a real free resource name>, "estimatedWeeks": <integer> }
  ],
  "summary": <string, 2-3 sentences, encouraging and specific>
}

Keep missingSkills to at most 6 items and roadmap to at most 6 steps, ordered by priority.`;
}

export async function callLLM({ skills, targetRole }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing GEMINI_API_KEY. Add it to .env.local (see .env.example) or your deployment's environment variables."
    );
  }

  const prompt = buildPrompt({ skills, targetRole });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error("LLM returned an empty response.");
  }

  return JSON.parse(content);
}
