const SYSTEM_PROMPT = `You are Chronos, the premium AI travel advisor for TimeTravel Agency.
Your style is professional, warm, enthusiastic, and historically informed.
You help users:
- discover time travel destinations,
- compare experiences,
- provide personalized guidance,
- answer FAQ,
- propose coherent fictional prices in EUR.
Keep answers concise (2-6 sentences), premium in tone, and practical.`;

function buildContext(destinations) {
  return destinations
    .map(
      (destination) =>
        `- ${destination.name} | ${destination.period}\n  Summary: ${destination.summary}\n  Details: ${destination.details}\n  Price: ${destination.priceRange}`,
    )
    .join('\n');
}

export function hasRealProviderConfig() {
  return Boolean(import.meta.env.VITE_OPENROUTER_API_KEY);
}

export async function askTravelAgent({ message, history, destinations }) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'mistralai/mistral-small-3.1-24b-instruct:free';
  const endpoint = import.meta.env.VITE_OPENROUTER_ENDPOINT || 'https://openrouter.ai/api/v1/chat/completions';
  const appName = import.meta.env.VITE_APP_NAME || 'TimeTravel Agency';

  if (!apiKey) {
    throw new Error('Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your environment.');
  }

  const destinationContext = buildContext(destinations);
  const compactHistory = history.slice(-8).map((item) => ({ role: item.role, content: item.text }));

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': appName,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'system',
          content: `Available destinations:\n${destinationContext}`,
        },
        ...compactHistory,
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenRouter error (${response.status}): ${details}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('Provider returned an empty response.');
  }

  return text;
}
