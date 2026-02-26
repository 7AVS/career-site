// OpenRouter API client
// Sends chat completions through OpenRouter using Andre's API key.

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function chatCompletion(
  messages: Message[],
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Andre Dantas Career Site",
      },
      body: JSON.stringify({
        model: options?.model || "anthropic/claude-haiku",
        messages,
        max_tokens: options?.maxTokens || 1024,
        temperature: options?.temperature ?? 0.7,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} — ${error}`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  return data.choices[0]?.message?.content || "No response generated.";
}
