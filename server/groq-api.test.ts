import { describe, expect, it } from "vitest";
import { invokeGroq } from "./_core/groq";

describe("Groq API Integration", () => {
  it("should successfully call Groq API with valid credentials", async () => {
    // Este teste valida que a chave GROQ_API_KEY está configurada corretamente
    // Faz uma chamada simples à API do Groq
    
    const result = await invokeGroq({
      messages: [
        {
          role: "system",
          content: "Você é um assistente de teste. Responda com uma mensagem curta.",
        },
        {
          role: "user",
          content: "Olá, você está funcionando?",
        },
      ],
      maxTokens: 100,
    });

    // Validar que a resposta foi bem-sucedida
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.choices).toBeDefined();
    expect(result.choices.length).toBeGreaterThan(0);
    
    const firstChoice = result.choices[0];
    expect(firstChoice).toBeDefined();
    expect(firstChoice.message).toBeDefined();
    expect(firstChoice.message.role).toBe("assistant");
    expect(firstChoice.message.content).toBeDefined();
    expect(firstChoice.message.content.length).toBeGreaterThan(0);
    
    // Validar que temos informações de uso
    if (result.usage) {
      expect(result.usage.prompt_tokens).toBeGreaterThan(0);
      expect(result.usage.completion_tokens).toBeGreaterThan(0);
      expect(result.usage.total_tokens).toBeGreaterThan(0);
    }

    console.log("✅ Groq API está funcionando corretamente!");
    console.log(`Resposta: ${firstChoice.message.content}`);
  }, 30000); // Timeout de 30 segundos para chamada à API
});
