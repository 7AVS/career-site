import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { getChatSystemPrompt } from "@/lib/prompts/chat-system";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

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
