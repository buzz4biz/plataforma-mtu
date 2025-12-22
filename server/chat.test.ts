import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock do invokeGroq
vi.mock("./_core/groq", () => ({
  invokeGroq: vi.fn(),
}));

import { invokeGroq } from "./_core/groq";

const mockedInvokeGroq = vi.mocked(invokeGroq);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.sendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return assistant message on successful Groq call", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockResolvedValueOnce({
      id: "test-id",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Olá! Sou o Assistente MTU™. No que posso te ajudar hoje?",
          },
          finish_reason: "stop",
        },
      ],
    });

    const result = await caller.chat.sendMessage({
      messages: [{ role: "user", content: "Olá" }],
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Olá! Sou o Assistente MTU™. No que posso te ajudar hoje?");
    expect(mockedInvokeGroq).toHaveBeenCalledTimes(1);
  });

  it("should handle string content from Groq response", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockResolvedValueOnce({
      id: "test-id",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Resposta completa do Groq",
          },
          finish_reason: "stop",
        },
      ],
    });

    const result = await caller.chat.sendMessage({
      messages: [{ role: "user", content: "Teste" }],
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Resposta completa do Groq");
  });

  it("should return error message on Groq failure", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockRejectedValueOnce(new Error("Groq API error"));

    const result = await caller.chat.sendMessage({
      messages: [{ role: "user", content: "Olá" }],
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.");
  });

  it("should include system prompt with MTU knowledge base in Groq call", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockResolvedValueOnce({
      id: "test-id",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Resposta do assistente",
          },
          finish_reason: "stop",
        },
      ],
    });

    await caller.chat.sendMessage({
      messages: [{ role: "user", content: "Quero extrair meu mecanismo" }],
    });

    expect(mockedInvokeGroq).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: "system",
            content: expect.stringContaining("Assistente MTU™"),
          }),
          expect.objectContaining({
            role: "user",
            content: "Quero extrair meu mecanismo",
          }),
        ]),
      })
    );
  });

  it("should preserve conversation history in Groq call", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockResolvedValueOnce({
      id: "test-id",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Continuando nossa conversa...",
          },
          finish_reason: "stop",
        },
      ],
    });

    await caller.chat.sendMessage({
      messages: [
        { role: "user", content: "Primeira mensagem" },
        { role: "assistant", content: "Primeira resposta" },
        { role: "user", content: "Segunda mensagem" },
      ],
    });

    const callArgs = mockedInvokeGroq.mock.calls[0][0];
    const messages = callArgs.messages;

    // Should have system message + 3 conversation messages
    expect(messages).toHaveLength(4);
    expect(messages[0].role).toBe("system");
    expect(messages[1]).toEqual({ role: "user", content: "Primeira mensagem" });
    expect(messages[2]).toEqual({ role: "assistant", content: "Primeira resposta" });
    expect(messages[3]).toEqual({ role: "user", content: "Segunda mensagem" });
  });

  it("should handle empty response from Groq", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    mockedInvokeGroq.mockResolvedValueOnce({
      id: "test-id",
      choices: [],
    });

    const result = await caller.chat.sendMessage({
      messages: [{ role: "user", content: "Olá" }],
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.");
  });
});
