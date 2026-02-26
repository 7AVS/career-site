import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { getFitSystemPrompt } from "@/lib/prompts/fit-system";
import { getMockFitAssessment } from "@/lib/mock-responses";
import { runGuards, validateFitInput } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  // 1. Origin + rate limit checks
  const guardResult = runGuards(req);
  if (guardResult) return guardResult;

  try {
    const body = await req.json();

    // 2. Validate job description
    const validation = validateFitInput(body.jobDescription);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    const { jobDescription } = validation;

    // 3. Mock mode: no API key → use pre-written responses
    if (!process.env.OPENROUTER_API_KEY) {
      const assessment = await getMockFitAssessment(jobDescription);
      return NextResponse.json({ assessment });
    }

    // 4. Real mode: call OpenRouter with validated input
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
