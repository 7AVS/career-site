// API security guards — input validation, rate limiting, origin checking.
// Shared by /api/chat and /api/fit routes.

import { NextRequest, NextResponse } from "next/server";

// ── Constants ──

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;
const CHAT_MAX_MESSAGE_LENGTH = 1000;
const CHAT_MAX_MESSAGES = 20;
const FIT_MAX_JD_LENGTH = 5000;

// ── Rate Limiter (in-memory, per IP) ──

const requestLog = new Map<string, number[]>();

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];

  // Remove entries older than the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return false; // rate limited
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return true; // allowed
}

// Periodic cleanup to prevent memory leaks (runs on each request, cheap)
function cleanupStaleEntries() {
  const now = Date.now();
  for (const [ip, timestamps] of requestLog) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      requestLog.delete(ip);
    } else {
      requestLog.set(ip, recent);
    }
  }
}

// ── Origin Validation ──

function checkOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Allow requests with no origin (e.g., same-origin fetch in some browsers)
  // But if origin IS present, it must match
  const source = origin || (referer ? new URL(referer).origin : null);

  if (!source) {
    // No origin header — block (prevents direct cURL/Postman abuse)
    return false;
  }

  // Dev mode: allow localhost
  if (process.env.NODE_ENV === "development") {
    if (source.includes("localhost") || source.includes("127.0.0.1")) {
      return true;
    }
  }

  // Prod: allow configured site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    const allowed = new URL(siteUrl).origin;
    if (source === allowed) return true;
  }

  // Also allow Vercel preview deployments
  if (source.endsWith(".vercel.app")) return true;

  return false;
}

// ── Input Validation ──

type ChatMessage = { role: string; content: string };

export function validateChatInput(
  messages: unknown
): { valid: true; messages: Array<{ role: "user" | "assistant"; content: string }> } | { valid: false; error: string } {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: "Messages are required" };
  }

  if (messages.length > CHAT_MAX_MESSAGES) {
    return { valid: false, error: `Too many messages (max ${CHAT_MAX_MESSAGES})` };
  }

  // Filter to only user/assistant roles (strips any injected "system" messages)
  const sanitized = (messages as ChatMessage[])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: typeof m.content === "string" ? m.content : "",
    }));

  if (sanitized.length === 0) {
    return { valid: false, error: "No valid messages provided" };
  }

  // Check user message lengths (assistant messages can be longer — they're AI-generated)
  for (const msg of sanitized) {
    if (msg.role === "user" && msg.content.length > CHAT_MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long (max ${CHAT_MAX_MESSAGE_LENGTH} characters)` };
    }
    if (msg.role === "user" && !msg.content.trim()) {
      return { valid: false, error: "Empty messages are not allowed" };
    }
  }

  return { valid: true, messages: sanitized };
}

export function validateFitInput(
  jobDescription: unknown
): { valid: true; jobDescription: string } | { valid: false; error: string } {
  if (!jobDescription || typeof jobDescription !== "string") {
    return { valid: false, error: "Job description is required" };
  }

  if (!jobDescription.trim()) {
    return { valid: false, error: "Job description cannot be empty" };
  }

  if (jobDescription.length > FIT_MAX_JD_LENGTH) {
    return { valid: false, error: `Job description too long (max ${FIT_MAX_JD_LENGTH} characters)` };
  }

  return { valid: true, jobDescription: jobDescription.trim() };
}

// ── Combined Guard ──

export function runGuards(req: NextRequest): NextResponse | null {
  // 1. Origin check
  if (!checkOrigin(req)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // 2. Rate limit
  cleanupStaleEntries();
  const ip = getClientIP(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  // Passed all guards
  return null;
}
