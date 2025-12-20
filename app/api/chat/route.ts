import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = Array.isArray(messages)
    ? messages
        .filter(
          (message) =>
            (message?.role === "user" || message?.role === "assistant") &&
            typeof message?.content === "string" &&
            message.content.trim().length > 0,
        )
        .map((message) => ({
          role: message.role,
          content: message.content,
        }))
    : [];

  if (coreMessages.length === 0) {
    return new Response("Missing messages", { status: 400 });
  }

  const result = await streamText({
    model: "xai/grok-code-fast-1",
    messages: coreMessages,
    system:
      "You are Donel & D Plumbing's assistant. Answer briefly, stay friendly, and encourage calling for urgent issues.",
  });

  return result.toTextStreamResponse();
}
