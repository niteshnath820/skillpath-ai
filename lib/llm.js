// Builds the prompt sent to the LLM and parses its JSON response.
// Swap the fetch URL/model below if you want to use a different provider
// (e.g. Anthropic's /v1/messages) — the JSON contract expected back stays the same.

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
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY. Add it to .env.local (see .env.example) or your deployment's environment variables."
    );
  }

  const prompt = buildPrompt({ skills, targetRole });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM returned an empty response.");
  }

  return JSON.parse(content);
                    }
