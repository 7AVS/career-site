import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { getChatSystemPrompt } from "@/lib/prompts/chat-system";
import { getMockChatResponse } from "@/lib/mock-responses";
import { runGuards, validateChatInput } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  // 1. Origin + rate limit checks
  const guardResult = runGuards(req);
  if (guardResult) return guardResult;

  try {
    const body = await req.json();

    // 2. Validate and sanitize messages
    const validation = validateChatInput(body.messages);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    const { messages } = validation;

    // 3. Mock mode: no API key → use pre-written responses
    if (!process.env.OPENROUTER_API_KEY) {
      const response = await getMockChatResponse(messages);
      return NextResponse.json({ response });
    }

    // 4. Real mode: call OpenRouter with validated input
    const systemPrompt = getChatSystemPrompt();
    const response = await chatCompletion([
      { role: "system", content: systemPrompt },
      ...messages,
    ]);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
