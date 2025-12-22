import Groq from "groq-sdk";
import { ENV } from "./env";

export type Role = "system" | "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type InvokeParams = {
  messages: Message[];
  maxTokens?: number;
};

export type InvokeResult = {
  id: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

const getGroqApiKey = () => {
  const key = ENV.groqApiKey || process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  return key;
};

export async function invokeGroq(params: InvokeParams): Promise<InvokeResult> {
  const apiKey = getGroqApiKey();
  
  const client = new Groq({ apiKey });

  try {
    const response = await client.chat.completions.create({
      messages: params.messages,
      model: "llama-3.3-70b-versatile", // Modelo rápido e gratuito do Groq
      max_tokens: params.maxTokens || 2048,
      temperature: 0.7,
    });

    // Transformar resposta do Groq para formato esperado
    return {
    id: response.id,
    choices: response.choices.map((choice) => ({
      index: choice.index,
      message: {
        role: (choice.message.role as Role) || "assistant",
        content: choice.message.content || "",
      },
      finish_reason: choice.finish_reason,
    })),
      usage: response.usage
        ? {
            prompt_tokens: response.usage.prompt_tokens,
            completion_tokens: response.usage.completion_tokens,
            total_tokens: response.usage.total_tokens,
          }
        : undefined,
    };
  } catch (error) {
    console.error("[Groq] Erro ao chamar API:", error);
    throw error;
  }
}
