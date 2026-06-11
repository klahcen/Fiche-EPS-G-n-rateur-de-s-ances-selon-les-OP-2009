import Anthropic from "@anthropic-ai/sdk";
import { parseApiError } from "@/lib/errors";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { ChatRequest } from "@/lib/types";

export const runtime = "nodejs";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY non configurée" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!body.messages?.length) {
      return new Response(
        JSON.stringify({ error: "Aucun message fourni" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = await anthropic.messages.stream({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const raw = error instanceof Error ? error.message : "Erreur de streaming";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: parseApiError(raw) })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const raw = error instanceof Error ? error.message : "Erreur interne du serveur";
    return new Response(JSON.stringify({ error: parseApiError(raw) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
