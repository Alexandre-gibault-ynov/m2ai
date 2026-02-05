const SYSTEM_PROMPT = `You are Chronos, the premium AI travel advisor for TimeTravel Agency.
Your style is professional, warm, enthusiastic, and historically informed.
You help users:
- discover time travel destinations,
- compare experiences,
- provide personalized guidance,
- answer FAQ,
- propose coherent fictional prices in EUR.
Keep answers concise (2-6 sentences), premium in tone, and practical.`;

const PLACEHOLDER_KEY = 'your_openrouter_api_key_here';

function buildContext(destinations) {
  return destinations
    .map(
      (destination) =>
        `- ${destination.name} | ${destination.period}\n  Summary: ${destination.summary}\n  Details: ${destination.details}\n  Price: ${destination.priceRange}`,
    )
    .join('\n');
}

function resolveApiKey() {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();
  if (!key || key === PLACEHOLDER_KEY) return null;
  return key;
}

export function hasRealProviderConfig() {
  return Boolean(resolveApiKey());
}

async function requestChatCompletion({ apiKey, endpoint, appName, model, payload }) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': appName,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(`OpenRouter error (${response.status}): ${details}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function askTravelAgent({ message, history, destinations }) {
  const apiKey = resolveApiKey();
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'mistralai/mistral-small-3.1-24b-instruct:free';
  const endpoint = import.meta.env.VITE_OPENROUTER_ENDPOINT || 'https://openrouter.ai/api/v1/chat/completions';
  const appName = import.meta.env.VITE_APP_NAME || 'TimeTravel Agency';

  if (!apiKey) {
    throw new Error('Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your environment.');
  }

  const destinationContext = buildContext(destinations);
  const compactHistory = history.slice(-8).map((item) => ({ role: item.role, content: item.text }));

  const payload = {
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
  };

  let data;
  try {
    data = await requestChatCompletion({ apiKey, endpoint, appName, model, payload });
  } catch (error) {
    if (error.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      data = await requestChatCompletion({ apiKey, endpoint, appName, model, payload });
    } else {
      throw error;
    }
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('Provider returned an empty response.');
  }

  return text;
}
