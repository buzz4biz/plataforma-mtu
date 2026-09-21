import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronDown } from "lucide-react";
import { Link } from "wouter";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "O que é o Protocolo MTU™?",
    answer: "O Protocolo MTU™ (Mecanismo Terapêutico Único) é um sistema estratégico que ajuda terapeutas a descobrir, nomear e comunicar seu diferencial único no mercado. É um framework prático com 4 módulos que guiam você desde o diagnóstico de invisibilidade até a implementação de uma estratégia de 90 dias.",
  },
  {
    question: "Por que preciso de um Mecanismo Terapêutico Único?",
    answer: "Terapeutas invisíveis ganham pouco, mesmo sendo bons. O MTU™ resolve isso deixando claro qual é seu diferencial. Quando você comunica seu mecanismo único, atrai clientes que valorizam sua abordagem e pagam mais por ela.",
  },
  {
    question: "Como funciona o Framework de 7 Passos?",
    answer: "O Framework de 7 Passos é uma estrutura prática para extrair seu mecanismo único. Os sete passos são Contexto Básico, Processo Único, Resultados, Gatilhos e Padrões, Nomeação, Validação e Comunicação. Cada passo constrói sobre o anterior para revelar e organizar seu diferencial.",
  },
  {
    question: "Quanto tempo leva para extrair meu mecanismo?",
    answer: "O processo completo leva cerca de 2-4 semanas, dependendo de quanto tempo você dedica. O Assistente MTU™ pode acelerar isso significativamente, pois ele guia você através de cada passo de forma estruturada.",
  },
  {
    question: "Posso usar o Assistente MTU™ para revisar minha comunicação atual?",
    answer: "Sim! O assistente pode analisar sua bio, site, posts e outros materiais de comunicação. Ele identifica erros fatais de invisibilidade e sugere melhorias baseadas no Protocolo MTU™.",
  },
  {
    question: "O que são Gatilhos Mentais Éticos?",
    answer: "São técnicas psicológicas éticas (escassez, urgência, prova social, autoridade, reciprocidade, consistência) que você pode usar para comunicar seu mecanismo de forma mais persuasiva e aumentar conversões.",
  },
  {
    question: "Como funciona a Precificação Estratégica?",
    answer: "Um mecanismo único justifica preço premium. A ideia é que você não compete por preço, mas por diferencial. Quanto melhor você comunica seu mecanismo, mais clientes dispostos a pagar mais.",
  },
  {
    question: "Qual é o Plano de Implementação de 90 Dias?",
    answer: "É um roadmap prático que divide a implementação em 12 semanas: extração (1-2), nomeação (3-4), criação de comunicação (5-6), implementação (7-8), validação (9-10) e otimização (11-12).",
  },
  {
    question: "Posso usar o Assistente MTU™ para criar minha bio de Instagram?",
    answer: "Sim! O assistente tem scripts prontos para bio, headline de site, posts e emails. Ele adapta esses scripts para seu mecanismo específico, criando comunicação personalizada e diferenciada.",
  },
  {
    question: "O Assistente MTU™ substitui o Protocolo completo?",
    answer: "Não. O Assistente é uma ferramenta que acelera a implementação do Protocolo. Para aprofundamento, estude os 4 módulos e 3 bônus. O assistente é seu guia prático no dia a dia.",
  },
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Protocolo MTU™
                </h1>
                <p className="text-sm text-muted-foreground">Perguntas Frequentes</p>
              </div>
            </div>
            <Link href="/assistente">
              <Button variant="outline" size="sm" className="rounded-lg">
                Voltar ao Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Entenda o Protocolo MTU™
            </h2>
            <p className="text-muted-foreground">
              Respostas para as perguntas mais comuns sobre o Protocolo MTU™ e como o Assistente pode ajudar você.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border/50 cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-foreground text-sm flex-1">{item.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {expandedIndex === index && (
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <h3 className="font-semibold text-foreground mb-2">Pronto para começar?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use o Assistente MTU™ para percorrer os 7 passos e extrair o nome do seu mecanismo.
            </p>
            <Link href="/assistente">
              <Button className="rounded-lg">Ir para o Chat</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
