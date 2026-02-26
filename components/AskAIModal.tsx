"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { careerData } from "@/lib/career-data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AskAIModalProps {
  open: boolean;
  onClose: () => void;
}

export function AskAIModal({ open, onClose }: AskAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setMessages([]);
      setInput("");
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
              {careerData.profile.initials}
            </div>
            <div>
              <h3 className="text-foreground font-semibold">
                Ask AI About {careerData.profile.name.split(" ")[0]}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Ready to answer your questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            // Welcome state with suggested questions
            <div className="flex flex-col items-center text-center py-8">
              <Sparkles className="w-10 h-10 text-teal mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                What would you like to know?
              </h4>
              <p className="text-sm text-muted-foreground mb-8 max-w-md">
                Ask specific questions about{" "}
                {careerData.profile.name.split(" ")[0]}&apos;s experience,
                skills, or fit for your role. Get honest, detailed answers.
              </p>
              <div className="w-full space-y-3 max-w-md">
                {careerData.suggestedQuestions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => sendMessage(q.text)}
                    className="w-full text-left p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-sm text-foreground hover:bg-[#222] transition-colors"
                  >
                    &quot;{q.text}&quot;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Conversation
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-teal text-[#0a0a0a]"
                        : "bg-[#1a1a1a] text-foreground border border-[#2a2a2a]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-teal" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-[#2a2a2a] flex gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-teal"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            size="icon"
            className="bg-teal hover:bg-teal-hover text-[#0a0a0a] rounded-xl h-[46px] w-[46px]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
