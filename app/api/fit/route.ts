import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { getFitSystemPrompt } from "@/lib/prompts/fit-system";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription } = body as { jobDescription: string };

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const systemPrompt = getFitSystemPrompt();

    const assessment = await chatCompletion([
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Please assess fit for this job description:\n\n${jobDescription}`,
      },
    ]);

    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Fit API error:", error);
    return NextResponse.json(
      { error: "Failed to process fit assessment" },
      { status: 500 }
    );
  }
}
