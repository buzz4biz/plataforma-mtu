import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AutoSaveTextarea from "@/components/AutoSaveTextarea";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Clock,
  Target,
  Lightbulb,
  ArrowLeft,
  Download,
  Loader2
} from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Module content data
const moduleContent: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    content: string;
    exercise?: {
      title: string;
      description: string;
      type: "checklist" | "textarea" | "reflection";
      items?: string[];
    };
  }[];
}> = {
  "1": {
    title: "Diagnóstico de Invisibilidade",
    subtitle: "Módulo 1",
    description: "Identifique exatamente por que sua comunicação está falhando",
    duration: "45 min",
    lessons: [
      {
        id: "intro",
        title: "Bem-Vinda ao Módulo 1",
        content: `## Bem-Vinda ao Módulo 1

Antes de criar seu Mecanismo Terapêutico Único, você precisa entender exatamente onde sua comunicação está falhando agora.

Este módulo é seu **diagnóstico completo**. Ao final dele, você saberá:

* Em qual nível de sofisticação seu mercado está
* Por que sua mensagem atual não funciona
* Quais erros específicos você está cometendo
* O que seus concorrentes estão fazendo (e deixando de fazer)
* Exatamente o que precisa mudar

### ⚠️ IMPORTANTE

**Não pule este módulo.** Sem um diagnóstico preciso, você pode criar um mecanismo único que não resolve o problema real.

### O Que Você Vai Descobrir

Este módulo está dividido em 5 partes essenciais:

1. **Os 5 Níveis de Sofisticação de Mercado** - Entenda onde seu mercado está
2. **Diagnóstico da Sua Comunicação** - Analise sua mensagem atual
3. **Os 7 Erros Fatais** - Identifique o que você está fazendo errado
4. **Análise de Concorrência** - Mapeie oportunidades
5. **Seu Diagnóstico Completo** - Consolide tudo e crie seu plano

> **Dica:** Tenha papel e caneta em mãos. Este módulo tem exercícios práticos que exigem reflexão profunda.`,
      },
      {
        id: "niveis",
        title: "Os 5 Níveis de Sofisticação de Mercado",
        content: `## Os 5 Níveis de Sofisticação de Mercado

Para entender por que você é invisível, primeiro precisa entender onde seu mercado está na escala de sofisticação.

Eugene Schwartz, no livro **Breakthrough Advertising (1966)**, descobriu que mercados evoluem em 5 níveis distintos — e o que funciona em um nível para de funcionar no próximo.

### Nível 1: Oceano Azul (Mercado Virgem)

**Características:**
* Zero ou pouquíssima competição
* Prospects nunca viram nada parecido
* Novidade por si só é suficiente
* Ceticismo = zero

**Como vender:** Seja direto e simples. Apenas anuncie o benefício principal.

**Exemplo:** "Terapia online - Atendimento psicológico pela internet"

**Realidade para terapeutas:** Você NÃO está neste nível. Terapia existe há décadas.

---

### Nível 2: Competição Inicial (Amplifique Promessas)

**Características:**
* Alguns competidores apareceram
* Prospects sabem que o serviço existe
* Começam a comparar opções
* Promessa direta ainda funciona, mas precisa ser maior

**Como vender:** Amplifique suas promessas. Seja mais específico. Adicione números.

**Exemplo:** "Reduza ansiedade em 8 semanas - Primeira sessão grátis - Atendimento 24h"

**Realidade para terapeutas:** Você provavelmente passou por este nível há anos. O mercado evoluiu.

---

### Nível 3: Ceticismo (Entre o Mecanismo Único) ⭐

**Características:**
* Mercado saturado de competidores
* Prospects já tentaram e falharam antes
* Promessas maiores só geram mais ceticismo
* Foco muda do QUE para o COMO

**Como vender:** Introduza um mecanismo único. Explique COMO você entrega o resultado de forma diferente.

**Exemplo:** "Protocolo de 3 Fases que reprograma respostas automáticas de ansiedade: (1) Mapeamento de gatilhos, (2) Recalibração somática, (3) Instalação de novos padrões"

### 💡 ESTE É O SEU NÍVEL

**O mercado de terapia está solidamente no nível 3, caminhando para o 4.**

#### Por que você precisa de um mecanismo único:

* Seu prospect já ouviu "terapia para ansiedade" mil vezes
* Ele precisa de uma razão para acreditar que desta vez será diferente
* Explicar COMO você trabalha cria esperança renovada e lógica
* Você para de competir - cria uma categoria mental onde você é único

---

### Nível 4 & 5: Guerra de Mecanismos e Hiper-Saturação

Estes níveis existem em mercados extremamente maduros (perda de peso, make money online, etc.).

A maioria dos terapeutas não precisa se preocupar com eles ainda. **Seu foco deve estar em dominar o nível 3.**`,
      },
      {
        id: "diagnostico",
        title: "Diagnóstico da Sua Comunicação Atual",
        content: `## Diagnóstico da Sua Comunicação Atual

Agora vamos diagnosticar exatamente onde sua comunicação está falhando.

### Exercício 1: Análise da Sua Mensagem Atual

Pegue seu perfil do Instagram, seu site, ou qualquer material de divulgação que você usa. Responda honestamente:

---

#### 1. O QUE você diz que faz?

*(Ex: "Psicóloga especializada em ansiedade", "Terapia de casal", etc.)*

**Sua resposta:** _________________________________________________

---

#### 2. COMO você explica que faz isso de forma diferente?

*(A maioria não tem essa resposta - e é aí que está o problema)*

**Sua resposta:** _________________________________________________

---

#### 3. Você lista principalmente credenciais ou explica seu processo?

Marque uma opção:
* ☐ Credenciais
* ☐ Processo
* ☐ Ambos
* ☐ Nenhum

---

#### 4. Um prospect consegue visualizar como será o trabalho com você?

*(Honestamente: ele sabe o que vai acontecer nas sessões?)*

**Sua resposta:** _________________________________________________

---

#### 5. Sua mensagem é igual ou diferente de outros 10 terapeutas?

*(Vá no Instagram agora e compare com 3 concorrentes)*

**Sua resposta:** _________________________________________________

---

### 🎯 INTERPRETAÇÃO

Se você respondeu principalmente com credenciais, não explica processo, e sua mensagem parece igual aos outros - **você está invisível por falta de mecanismo único.**

> **Use o Assistente IA:** Peça para ele analisar sua comunicação atual e identificar pontos de melhoria.`,
        exercise: {
          title: "Análise da Sua Comunicação",
          description: "Complete o exercício acima refletindo sobre sua mensagem atual. Use o Assistente IA para aprofundar.",
          type: "reflection"
        }
      },
      {
        id: "erros",
        title: "Os 7 Erros Fatais de Comunicação",
        content: `## Os 7 Erros Fatais de Comunicação

Identifique quais destes erros você está cometendo (seja brutalmente honesta):

---

### ❌ ERRO #1: Listar Credenciais Como Diferencial

**O que você faz:** "CRP 00/00000, Especialização em TCC pela USP, 10 anos de experiência"

**Por que não funciona:** Seu cliente não sabe avaliar se sua especialização é melhor que outra. Todos têm CRP. Todos têm experiência.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #2: Usar Jargão Técnico

**O que você faz:** "Trabalho com regulação emocional e reestruturação cognitiva"

**Por que não funciona:** Seu cliente não sabe o que é "regulação emocional". Soa vago e intimidante.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #3: Promessas Genéricas

**O que você faz:** "Ajudo você a superar a ansiedade e viver melhor"

**Por que não funciona:** Todos dizem isso. Seu cliente já ouviu mil vezes. Ele pensa: "Sim, mas COMO?"

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #4: Foco em Acolhimento Sem Processo

**O que você faz:** "Espaço seguro de acolhimento e escuta"

**Por que não funciona:** Acolhimento é esperado. Não é diferencial. Seu cliente quer saber o que acontece DEPOIS do acolhimento.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #5: Competir por Preço ou Conveniência

**O que você faz:** "Primeira sessão grátis!", "Menores preços!", "Atendimento 24h!"

**Por que não funciona:** Quando você compete por preço, se posiciona como commodity. Atrai clientes errados.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #6: Copy Sem Personalidade

**O que você faz:** Textos genéricos que poderiam estar no perfil de qualquer terapeuta

**Por que não funciona:** Sem personalidade = sem conexão = sem memorabilidade.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### ❌ ERRO #7: Não Explicar o Processo

**O que você faz:** Nenhuma explicação de como o trabalho funciona, quantas sessões, o que acontece em cada fase

**Por que não funciona:** Seu cliente fica no escuro. Não consegue visualizar. Não confia.

**Você comete esse erro?** ☐ Sim  ☐ Não

---

### 📊 SCORE

**Quantos erros você marcou?**

* **5-7 erros** = 🔴 Urgente
* **3-4 erros** = 🟡 Crítico
* **1-2 erros** = 🟢 Precisa ajustar
* **0 erros** = ⭐ Você já tem algo único (mas pode melhorar)`,
        exercise: {
          title: "Autoavaliação de Erros",
          description: "Marque honestamente quantos dos 7 erros você comete:",
          type: "checklist",
          items: [
            "Listar credenciais como diferencial",
            "Usar jargão técnico",
            "Promessas genéricas",
            "Foco em acolhimento sem processo",
            "Competir por preço ou conveniência",
            "Copy sem personalidade",
            "Não explicar o processo"
          ]
        }
      },
      {
        id: "concorrencia",
        title: "Análise de Concorrência & Seu Diagnóstico Completo",
        content: `## Análise de Concorrência Estratégica

Você precisa saber o que seus concorrentes estão fazendo (e deixando de fazer) para identificar oportunidades.

### Exercício 2: Mapeamento de 5 Concorrentes

Encontre 5 terapeutas que atendem o mesmo público que você. Para cada um, analise:

| # | Nome | O que dizem | Tem mecanismo? | Diferencial | Notas |
|---|------|-------------|----------------|-------------|-------|
| 1 | _____ | __________ | ☐ Sim ☐ Não | __________ | _____ |
| 2 | _____ | __________ | ☐ Sim ☐ Não | __________ | _____ |
| 3 | _____ | __________ | ☐ Sim ☐ Não | __________ | _____ |
| 4 | _____ | __________ | ☐ Sim ☐ Não | __________ | _____ |
| 5 | _____ | __________ | ☐ Sim ☐ Não | __________ | _____ |

### Perguntas de Análise:

1. **Quantos dos 5 têm um mecanismo único claro?** _____

2. **Qual é a mensagem mais comum entre eles?** _________________________________

3. **Qual deles se destaca mais? Por quê?** _________________________________

4. **O que NENHUM deles está fazendo? (Oportunidade!)** _________________________________

5. **Sua mensagem atual é parecida com eles?** ☐ Sim  ☐ Não

### 💡 INSIGHT

Se 4 dos 5 não têm mecanismo único, você tem uma **oportunidade ENORME** de se diferenciar rapidamente.

---

## Seu Diagnóstico Completo

Com base em tudo que você mapeou até aqui, complete seu diagnóstico:

### Diagnóstico: Onde Você Está Agora

**1. Seu mercado está no nível de sofisticação:**
* ☐ Nível 1
* ☐ Nível 2
* ☐ Nível 3 ⭐ (Provavelmente este)
* ☐ Nível 4
* ☐ Nível 5

**2. Sua comunicação atual está no nível:**
* ☐ Nível 1
* ☐ Nível 2
* ☐ Nível 3
* ☐ Nível 4
* ☐ Nível 5

**3. O GAP (diferença entre onde o mercado está e onde você está):**

_____ níveis de diferença = _____ [Pequeno/Médio/CRÍTICO]

**4. Principais erros que você está cometendo:**

*(Liste os 3 erros mais graves)*

a) _________________________________________________

b) _________________________________________________

c) _________________________________________________

**5. O que seus concorrentes NÃO estão fazendo (sua oportunidade):**

_________________________________________________

---

## Seu Plano de Ação

Com base no diagnóstico, aqui está o que você precisa fazer:

✅ Evoluir sua comunicação do nível atual para o nível 3

✅ Criar um Mecanismo Terapêutico Único que explica COMO você trabalha

✅ Parar de listar credenciais como diferencial principal

✅ Eliminar jargão técnico e traduzir para linguagem clara

✅ Ocupar o espaço que seus concorrentes estão deixando vazio

✅ Reescrever todos os seus materiais com o novo mecanismo

---

## 🎯 PRÓXIMO PASSO

Agora que você sabe exatamente o que está errado, está pronta para o **Módulo 2** — onde você vai **CRIAR** seu Mecanismo Terapêutico Único.

---

## RESUMO DO MÓDULO 1

### O que você completou:

* ✅ Entendeu os 5 níveis de sofisticação de mercado
* ✅ Identificou que o mercado de terapia está no nível 3
* ✅ Diagnosticou sua comunicação atual
* ✅ Identificou os 7 erros fatais (e quais você comete)
* ✅ Analisou 5 concorrentes e encontrou oportunidades
* ✅ Criou seu diagnóstico completo e plano de ação

### Principais Insights:

1. Você não é invisível por falta de competência — você é invisível por **falta de diferenciação na comunicação**

2. O mercado está no nível 3 — **promessas e credenciais não funcionam mais**

3. Você precisa de um **mecanismo único** — explicar COMO você trabalha de forma diferente

4. Seus concorrentes provavelmente não têm isso — o que significa que sua **oportunidade é ENORME**

---

### ✅ PARABÉNS!

Você completou o Módulo 1. Agora você tem clareza total sobre o problema. 

No Módulo 2, você vai construir a solução: **seu Mecanismo Terapêutico Único**.

**→ Vá para o Módulo 2: Extração do Seu Mecanismo Único**`,
        exercise: {
          title: "Conclusão do Módulo 1",
          description: "Marque quando completar todas as análises:",
          type: "checklist",
          items: [
            "Analisei minha comunicação atual",
            "Identifiquei os erros que estou cometendo",
            "Mapeei 5 concorrentes",
            "Completei meu diagnóstico",
            "Entendi meu plano de ação",
            "Estou pronto(a) para criar meu MTU no Módulo 2"
          ]
        }
      }
    ]
  },
  "2": {
    title: "Extração do Mecanismo",
    subtitle: "Módulo 2",
    description: "As 7 Perguntas-Chave Para Criar Seu Mecanismo Único",
    duration: "120 min",
    lessons: [
      {
        id: "framework",
        title: "Framework de Extração: As 7 Perguntas",
        content: `## Framework de Extração do Mecanismo Terapêutico Único

Este framework vai te guiar para extrair o mecanismo único que você já usa — mas nunca nomeou ou comunicou claramente.

### 🎯 IMPORTANTE

Responda cada pergunta com **TOTAL honestidade e especificidade**. Respostas vagas geram mecanismos fracos. Seja cirúrgica.

### Como usar este framework:

1. Leia cada pergunta completamente antes de responder
2. Não pule perguntas - todas são essenciais
3. Use exemplos concretos da sua prática
4. Revise e refine suas respostas no final
5. Use as respostas para construir seu mecanismo

### 💡 Dica Importante

Use o **Assistente IA do Protocolo MTU** para responder essas perguntas de forma guiada. Ele vai te ajudar a extrair insights profundos e refinar suas respostas.

---

## PERGUNTA 1: Qual Problema Específico Você Resolve?

### O Que Esta Pergunta Revela

Seu mecanismo precisa estar ancorado em um problema específico e tangível. Não "ansiedade em geral" - mas qual tipo de ansiedade? Como ela se manifesta? O que ela impede?

### Como Responder Bem

❌ **RESPOSTA VAGA:**
> "Ajudo com ansiedade"

✅ **RESPOSTA ESPECÍFICA:**
> "Trabalho com ansiedade antecipatória que impede profissionais de tomar decisões importantes. Meus clientes sabem o que precisam fazer (mudar de emprego, terminar relacionamento, começar negócio), mas ficam paralisados pelo medo do que pode dar errado."

### Checklist de Especificidade:

* ☐ Você consegue visualizar uma pessoa real com esse problema?
* ☐ O problema tem contexto (quando acontece, onde, com quem)?
* ☐ Você usou palavras que o próprio cliente usaria?
* ☐ Está claro o que o problema impede/causa na vida da pessoa?

> **Use o Assistente IA:** Peça para ele te ajudar a tornar sua resposta mais específica e tangível.

---

## PERGUNTA 2: Por Que Esse Problema Existe? Qual a Causa Raiz?

### O Que Esta Pergunta Revela

Mecanismos fortes não tratam sintomas - tratam causas. Você precisa ter clareza sobre por que o problema persiste, não apenas o que é o problema.

### Como Responder Bem

❌ **RESPOSTA SUPERFICIAL:**
> "Porque a pessoa está ansiosa"

✅ **RESPOSTA PROFUNDA:**
> "Porque o cérebro dela aprendeu a associar 'mudança' com 'perigo'. Experiências passadas (fracassos, críticas, traumas) criaram um padrão automático: sempre que ela pensa em fazer algo novo, o sistema nervoso dispara alerta máximo como se fosse uma ameaça real à sobrevivência."

### Pense em Camadas:

**Camada 1 (Superficial):** O que a pessoa sente/faz

**Camada 2 (Processo):** Como isso funciona (padrões, gatilhos)

**Camada 3 (Raiz):** Por que isso se instalou (origem, aprendizado)

### 💡 DICA

Use linguagem que conecta o problema a um **MECANISMO** (sistema nervoso, padrão cognitivo, resposta automática, memória, etc.). Isso já começa a criar seu mecanismo único.

> **Use o Assistente IA:** Peça para ele te ajudar a identificar as camadas do problema.

---

## PERGUNTA 3: Qual Seu Processo? Quais as Fases/Etapas do Seu Trabalho?

### O Que Esta Pergunta Revela

**Esta é a pergunta mais importante.** Seu mecanismo único está escondido no seu processo. Você precisa tornar visível o que hoje é invisível.

### Como Responder Bem

❌ **RESPOSTA GENÉRICA:**
> "Faço terapia cognitivo-comportamental"

✅ **RESPOSTA ESTRUTURADA:**
> "Trabalho em 3 fases distintas:
>
> **FASE 1 - Mapeamento de Gatilhos (2-3 sessões):** Identificamos todas as situações, pensamentos e sensações que disparam sua ansiedade antecipatória. Você mantém um diário estruturado entre sessões.
>
> **FASE 2 - Recalibração do Sistema de Alerta (4-6 sessões):** Usamos técnicas somáticas para dessensibilizar seu sistema nervoso aos gatilhos identificados. Você aprende a regular a resposta antes que ela se torne ansiedade paralisante.
>
> **FASE 3 - Instalação de Novos Padrões (3-4 sessões):** Criamos e praticamos novos padrões de resposta para situações de mudança. Em vez de 'mudança = perigo', instalamos 'mudança = oportunidade gerenciável'."

### Elementos de um Processo Forte:

* ✓ Número específico de fases (2-5 é ideal)
* ✓ Cada fase tem nome claro e descritivo
* ✓ Ordem lógica e sequencial (não pode pular etapas)
* ✓ O que acontece em cada fase está explicado
* ✓ Há transformação progressiva (fase 1 → fase 2 → fase 3 = mudança)

### ⚠️ CRÍTICO

Se você não tem um processo estruturado agora, **CRIE um** baseado no que você já faz. Todo terapeuta tem um processo - você só nunca o nomeou.

> **Use o Assistente IA:** Peça para ele te ajudar a estruturar e nomear cada fase do seu processo.

---

## PERGUNTA 4: O Que Torna Seu Processo Diferente do Que Outros Fazem?

### O Que Esta Pergunta Revela

Aqui você identifica seu diferencial específico. Não precisa ser revolucionário - pode ser uma combinação única, uma ênfase diferente, ou uma ordem específica que você descobriu que funciona melhor.

### Como Responder Bem

❌ **RESPOSTA FRACA:**
> "Sou mais experiente / Tenho mais formações / Sou mais empática"

✅ **RESPOSTA FORTE:**
> "A maioria dos terapeutas trabalha ansiedade conversando sobre os pensamentos ansiosos. Eu adiciono uma camada que a maioria ignora: o trabalho somático de recalibração do sistema nervoso. Porque descobri que quando o corpo ainda está em alerta, os novos pensamentos não 'grudam'. É como tentar programar um computador que está superaquecido."

### Ângulos Possíveis de Diferenciação:

**Ordem das etapas:** "Começo pelo corpo, não pelos pensamentos"

**Combinação única:** "Junto TCC com técnicas somáticas"

**Ênfase específica:** "Foco em gatilhos inconscientes, não sintomas conscientes"

**Ferramenta exclusiva:** "Uso diário estruturado entre sessões"

**Abordagem contra-intuitiva:** "Não luto contra a ansiedade, ensino a usá-la como sinal"

> **Use o Assistente IA:** Peça para ele te ajudar a identificar e articular seu diferencial único.

---

## PERGUNTA 5: Qual a Transformação Que Acontece? (Do Estado A para o Estado B)

### O Que Esta Pergunta Revela

Mecanismos fortes mostram transformação clara. De onde a pessoa sai e onde ela chega? Quanto mais específico você for sobre o antes e depois, mais tangível seu mecanismo se torna.

### Como Responder Bem

❌ **TRANSFORMAÇÃO VAGA:**
> "De ansiosa para calma"

✅ **TRANSFORMAÇÃO ESPECÍFICA:**

**ANTES:** "Cliente chega paralisada por ansiedade antecipatória. Sabe que precisa tomar decisões importantes (mudar de emprego, terminar relacionamento), mas toda vez que pensa em agir, o corpo dispara resposta de alarme - coração acelerado, suor, pensamentos catastróficos. Resultado: ela adia indefinidamente e se frustra consigo mesma."

**DEPOIS:** "Cliente reconhece os gatilhos de ansiedade antes que se tornem paralisantes. Quando pensa em mudança, ainda sente algum desconforto (isso é normal), mas agora tem ferramentas para regular a resposta do corpo. Ela consegue sentar, analisar racionalmente, e tomar decisões mesmo com medo presente - porque o medo não está mais no comando."

### Framework ANTES/DEPOIS:

**ANTES:** Como a pessoa pensa, sente, age

**DURANTE:** O que muda ao longo do processo

**DEPOIS:** Como a pessoa pensa, sente, age agora

> **Use o Assistente IA:** Peça para ele te ajudar a descrever a transformação de forma tangível e específica.

---

## PERGUNTA 6: Por Que Seu Processo Funciona? Qual a Lógica Por Trás?

### O Que Esta Pergunta Revela

Esta é a pergunta da **credibilidade**. Você precisa explicar a lógica/ciência/razão por trás do seu processo. Quando um cliente entende por que funciona, ele confia mais.

### Como Responder Bem

❌ **SEM LÓGICA:**
> "Funciona porque eu sou boa terapeuta"

✅ **COM LÓGICA CLARA:**
> "Funciona porque o cérebro não consegue processar mudança cognitiva quando o sistema nervoso está em modo de sobrevivência. É neurobiologia básica: cortisol alto = pré-frontal offline. Por isso começo regulando o corpo (baixar cortisol, ativar parassimpático) ANTES de trabalhar pensamentos. Uma vez que o sistema nervoso está regulado, os novos padrões cognitivos conseguem se consolidar."

### Tipos de Lógica Que Funcionam:

**Neurobiológica:** "Como o cérebro funciona"

**Psicológica:** "Como padrões são criados/desconstruídos"

**Sequencial:** "Por que essa ordem específica importa"

**Causa-efeito:** "Se X acontece, então Y muda"

**Metafórica:** "É como reprogramar software quando o hardware está estável"

### 💡 DICA

Use linguagem que seu cliente entenda, mas mantenha a sofisticação. Você quer soar científico SEM ser técnico demais.

> **Use o Assistente IA:** Peça para ele te ajudar a articular a lógica do seu processo de forma clara e científica.

---

## PERGUNTA 7: Como Você Nomearia Seu Método/Processo?

### O Que Esta Pergunta Revela

Dar um nome ao seu processo é **transformador**. Cria propriedade, memorabilidade, e diferenciação instantânea. Quando você nomeia algo, você o torna real na mente do cliente.

### Fórmulas de Nomenclatura:

**FÓRMULA 1: [Número] + [Conceito-Chave]**
* Protocolo de 3 Fases
* Método dos 4 Pilares
* Sistema de 5 Etapas

**FÓRMULA 2: [Ação] + [Resultado]**
* Terapia de Reprocessamento Acelerado
* Método de Recalibração Neural
* Protocolo de Regulação Somática

**FÓRMULA 3: [Metáfora] + [Técnica]**
* Método Raiz-e-Fruto (trabalha causa e sintoma)
* Terapia do Reset Neural
* Protocolo Âncora-e-Vela (estabiliza e libera)

**FÓRMULA 4: Nome Proprietário**
* Método [Seu Sobrenome]
* Sistema [Sigla Criativa]
* Protocolo [Palavra Única]

### Checklist de Nome Forte:

* ☐ Fácil de pronunciar e lembrar
* ☐ Sugere processo ou método (não é vago)
* ☐ Soa profissional e científico
* ☐ Único (você não ouviu isso antes)
* ☐ Pode ser abreviado (MTR, PSA, etc.)

> **Use o Assistente IA:** Peça para ele te ajudar a criar e refinar o nome do seu mecanismo.

---

## SÍNTESE: Monte Seu Mecanismo Único Completo

Agora que você respondeu as 7 perguntas, use esta fórmula para montar seu Mecanismo Terapêutico Único completo:

### Fórmula do Mecanismo Único

**[NOME DO MÉTODO]:** [Explicação de 1-2 frases do processo em 2-4 fases específicas]. [Diferencial único]. [Transformação antes/depois]. [Funciona porque...]

### Exemplo Completo:

**Protocolo de Recalibração Neural em 3 Fases:** Sistema para eliminar ansiedade antecipatória que paralisa decisões. (1) Mapeamento de Gatilhos - identificamos os disparadores inconscientes da resposta ansiosa, (2) Recalibração Somática - dessensibilizamos o sistema nervoso usando técnicas de regulação corporal, (3) Instalação de Novos Padrões - substituímos respostas automáticas de 'perigo' por 'oportunidade gerenciável'. 

Diferente da maioria dos terapeutas que trabalham apenas pensamentos, adiciono a camada de regulação do sistema nervoso ANTES da reestruturação cognitiva. 

Cliente sai de 'paralisada por medo' para 'capaz de decidir com medo presente'. 

Funciona porque o cérebro não processa mudança cognitiva quando está em modo de sobrevivência - preciso primeiro regular o corpo para depois reprogramar a mente.

---

### ✅ PARABÉNS!

Você acabou de criar seu **Mecanismo Terapêutico Único**. Agora você tem algo que NENHUM outro terapeuta tem.

### 🎯 Próximos Passos:

Continue para as próximas lições para:
* Ver exemplos de MTU em diferentes nichos
* Aprender fórmulas completas de nomenclatura
* Validar e refinar seu mecanismo

> **Use o Assistente IA:** Peça para ele te ajudar a refinar e validar seu mecanismo completo.`,
        exercise: {
          title: "Complete o Framework de 7 Perguntas",
          description: "Responda todas as perguntas abaixo para extrair seu Mecanismo Terapêutico Único. Use o Assistente IA para te ajudar a refinar suas respostas.",
          type: "textarea",
          items: []
        }
      },
      {
        id: "exemplos",
        title: "Banco de Exemplos por Nicho",
        content: `## Banco de Exemplos de Mecanismos Únicos por Nicho

Este banco contém exemplos reais e fictícios de Mecanismos Terapêuticos Únicos para inspirar a criação do seu.

### ⚠️ IMPORTANTE

**NÃO copie estes exemplos literalmente.** Use-os como inspiração para estruturar e nomear seu próprio mecanismo baseado no seu processo real.

---

### Como usar este banco:

1. ✓ Encontre exemplos do seu nicho ou similar
2. ✓ Observe a estrutura (fases, nomenclatura, lógica)
3. ✓ Adapte ao seu processo específico
4. ✓ Valide com o Checklist de Validação

---

### Padrões Que Funcionam

Todos estes exemplos compartilham elementos-chave:

* **Problema específico e tangível** (não genérico)
* **Processo em 3-5 fases/etapas** (não muitas, não poucas)
* **Cada fase tem nome e explicação** (cliente visualiza o caminho)
* **Diferencial claro** (o que outros não fazem)
* **Lógica científica/psicológica** (por que funciona)
* **Nome proprietário memorável** (Protocolo X, Método Y, Sistema Z)

---

### Nichos Cobertos:

1. **Ansiedade** - 3 exemplos
2. **Depressão** - 2 exemplos
3. **Relacionamentos / Terapia de Casal** - 2 exemplos
4. **Trauma / EMDR** - 2 exemplos
5. **Autoestima / Autoconfiança** - 2 exemplos
6. **Luto / Elaboração de Perdas** - 1 exemplo
7. **Burnout / Estresse Profissional** - 1 exemplo
8. **Procrastinação / Produtividade** - 1 exemplo

> **Dica:** Leia todos os nichos, não apenas o seu. Muitas vezes a inspiração vem de áreas diferentes da sua.

---

## NICHO 1: ANSIEDADE

### Exemplo 1: Protocolo de Recalibração Neural em 3 Fases

**Para quem:** Profissionais com ansiedade antecipatória que paralisa decisões importantes

**Problema específico:** Cliente sabe o que precisa fazer (mudar emprego, terminar relacionamento), mas fica paralisado pelo medo do que pode dar errado

**Processo:**

**FASE 1 - Mapeamento de Gatilhos (2-3 sessões):** Identificamos todas as situações, pensamentos e sensações que disparam ansiedade. Cliente mantém diário estruturado entre sessões.

**FASE 2 - Recalibração Somática (4-6 sessões):** Técnicas de regulação do sistema nervoso para dessensibilizar aos gatilhos. Cliente aprende a regular resposta antes que se torne paralisante.

**FASE 3 - Instalação de Novos Padrões (3-4 sessões):** Criamos e praticamos novas respostas automáticas. 'Mudança = perigo' vira 'mudança = oportunidade gerenciável'.

**Diferencial:** Maioria trabalha só pensamentos. Eu adiciono regulação do sistema nervoso ANTES da reestruturação cognitiva.

**Por que funciona:** Cérebro não processa mudança cognitiva em modo sobrevivência. Preciso regular corpo primeiro.

---

### Exemplo 2: Método de Exposição Progressiva Guiada

**Para quem:** Pessoas com ansiedade social que evitam situações específicas

**Problema específico:** Cliente quer participar de eventos, falar em público, fazer networking, mas evita por medo de julgamento

**Processo:**

**ETAPA 1 - Hierarquia de Exposições:** Criamos escala de 0-100 de situações sociais, do menos ao mais ansioso. Identificamos 10-15 situações específicas.

**ETAPA 2 - Prática Imaginária Controlada:** Cliente visualiza situações começando pela menos ansiosa, enquanto pratica técnicas de ancoragem. Repetimos até ansiedade cair 50%.

**ETAPA 3 - Exposições Reais Estruturadas:** Cliente enfrenta situações reais na ordem da hierarquia, com plano específico antes e debriefing depois. Não avançamos até dominar o nível atual.

**ETAPA 4 - Generalização e Manutenção:** Expandimos para situações não-treinadas e criamos plano de manutenção para recaídas.

**Diferencial:** Não jogo cliente no fundo da piscina. Construo escada personalizada onde cada degrau é dominável.

**Por que funciona:** Exposição gradual permite sistema nervoso aprender 'seguro' sem sobrecarga. Sucesso em nível baixo cria confiança para próximo.

---

### Exemplo 3: Sistema de Âncoras de Calma (SAC)

**Para quem:** Pessoas com ataques de pânico recorrentes

**Problema específico:** Cliente tem ataques de pânico inesperados que geram medo do próximo ataque, criando ciclo de ansiedade

**Processo:**

**FASE 1 - Construção de Âncoras:** Criamos 3 âncoras sensoriais (respiração 4-7-8, objeto tátil, palavra-chave) e treinamos em estado calmo até serem automáticas.

**FASE 2 - Prática em Ansiedade Baixa:** Cliente usa âncoras em situações levemente ansiosas. Testamos eficácia antes de ir para pânico real.

**FASE 3 - Protocolo de Emergência:** Criamos sequência específica para ataques reais: reconhecer sinais, ativar âncora #1, se não funcionar → âncora #2, se não funcionar → âncora #3 + ligação de suporte.

**Diferencial:** Não trabalho só o ataque. Crio sistema de prevenção e interrupção com múltiplas camadas de segurança.

**Por que funciona:** Âncoras criadas em estado calmo podem ser ativadas em pânico. Ter plano reduz 'medo do medo'.

---

## NICHO 2: DEPRESSÃO

### Exemplo 1: Protocolo de Reativação Comportamental Progressiva

**Para quem:** Pessoas com depressão que perderam prazer/motivação em atividades

**Problema específico:** Cliente não sente vontade de fazer nada, isolou-se socialmente, abandonou hobbies, ciclo de inatividade piora humor

**Processo:**

**ETAPA 1 - Mapeamento de Vida Pré-Depressão:** Identificamos atividades que antes traziam prazer, propósito ou conexão. Categorizamos por tipo de reforço (social, realização, sensorial).

**ETAPA 2 - Micro-Ativações Diárias:** Começamos com 1 atividade de 5-10 minutos por dia. Não esperamos sentir vontade - agimos primeiro, motivação vem depois.

**ETAPA 3 - Escalonamento Semanal:** Aumentamos 10% por semana: duração, frequência ou complexidade. Sempre dentro do 'possível desconfortável', nunca do impossível.

**ETAPA 4 - Ancoragem de Rotina:** Transformamos ativações em hábitos fixos, menos dependentes de força de vontade.

**Diferencial:** Não espero cliente 'se sentir melhor para fazer'. Estruturo ação que gera sentimento, não o oposto.

**Por que funciona:** Depressão mantém ciclo inatividade → piora humor → mais inatividade. Quebrar com ação pequena consistente reconecta cérebro com reforço.

---

### Exemplo 2: Método de Reestruturação de Narrativa Pessoal

**Para quem:** Pessoas com depressão crônica e narrativa autodepreciativa

**Problema específico:** Cliente tem história interna de 'sou fracasso', 'nunca dá certo para mim', filtra só evidências negativas

**Processo:**

**FASE 1 - Externalização da Narrativa Atual:** Cliente escreve história de vida em 3ª pessoa. Identificamos padrões de interpretação e pontos de virada.

**FASE 2 - Busca de Evidências Contrárias:** Para cada crença negativa, encontramos 5 momentos que contradizem. Não invalidamos o negativo - expandimos narrativa.

**FASE 3 - Reescrita com Complexidade:** Cliente reescreve história incluindo evidências positivas. Narrativa passa de 'sempre falho' para 'já falhei E já consegui'.

**FASE 4 - Ancoragem Diária:** Exercício diário: 'Onde hoje minha nova narrativa se confirmou?' Cérebro aprende a notar o que antes filtrava.

**Diferencial:** Não luto contra pensamentos negativos. Expando narrativa para incluir complexidade que depressão apaga.

**Por que funciona:** Depressão cria viés de confirmação negativo. Forçar busca de evidências contrárias treina cérebro a ver quadro completo.

---

## NICHO 3: RELACIONAMENTOS / TERAPIA DE CASAL

### Exemplo 1: Método dos 4 Pilares Relacionais

**Para quem:** Casais em crise que não sabem 'onde está o problema'

**Problema específico:** Casal sabe que algo está errado mas não consegue nomear. Brigam por sintomas, não pela causa.

**Processo:**

**SESSÃO 1-2 - Diagnóstico dos 4 Pilares:** Avalio qual pilar está quebrado: (1) Comunicação, (2) Intimidade, (3) Confiança, (4) Propósito Compartilhado. Raramente é tudo - geralmente 1-2 pilares estão danificados.

**SESSÃO 3-8 - Reconstrução Focal:** Trabalhamos APENAS o(s) pilar(es) quebrado(s). Se é Comunicação: técnicas específicas de escuta/expressão. Se é Intimidade: reconexão emocional/física. Não perdemos tempo no que funciona.

**SESSÃO 9-10 - Integração e Manutenção:** Praticamos pilar reconstruído em situações reais. Criamos plano de manutenção para cada pilar.

**Diferencial:** Não trabalho 'relacionamento em geral'. Faço diagnóstico preciso e cirurgia focal no que está quebrado.

**Por que funciona:** Casais gastam energia no problema errado. Identificar pilar específico permite foco que gera resultado rápido.

---

### Exemplo 2: Protocolo de Desescalada de Conflitos (PDC)

**Para quem:** Casais presos em ciclo de brigas que escalam rapidamente

**Problema específico:** Casal inicia conversas que viram explosões. Gatilhos específicos sempre levam ao mesmo padrão destrutivo.

**Processo:**

**FASE 1 - Mapeamento do Ciclo:** Identificamos gatilho → resposta pessoa A → reação pessoa B → escalada. Casal precisa ver padrão completo em 3ª pessoa.

**FASE 2 - Pontos de Interrupção:** Definimos 3 momentos onde ciclo pode ser interrompido. Cada pessoa escolhe sinais de 'estou entrando no padrão'.

**FASE 3 - Scripts de Desescalada:** Criamos frases e ações específicas para cada ponto de interrupção. Praticamos exaustivamente em sessão.

**FASE 4 - Implementação Gradual:** Começamos aplicando em conflitos pequenos. Sucesso gera confiança para situações maiores.

**Diferencial:** Não ensino 'comunicação não-violenta genérica'. Crio protocolo específico para o ciclo destrutivo DESSE casal.

**Por que funciona:** Ciclos são automáticos - impossível parar no meio. Treinar interrupção precoce com scripts específicos cria nova automação.

---

## NICHO 4: TRAUMA / EMDR

### Exemplo 1: Terapia de Reprocessamento Acelerado (TRA)

**Para quem:** Pessoas com trauma que revivem emocionalmente eventos passados

**Problema específico:** Cliente tem memórias traumáticas que ficaram 'congeladas'. Cada vez que lembra, revive emoção como se fosse agora.

**Processo:**

**FASE 1 - Identificação e Estabilização (2-3 sessões):** Mapeamos memórias-alvo e criamos recursos de estabilização antes de acessar trauma. Cliente precisa ter 'chão' antes de revisitar.

**FASE 2 - Reprocessamento com Estimulação Bilateral (4-8 sessões):** Acessamos memória traumática enquanto fazemos estimulação bilateral (movimento olhos, tapping). Cérebro 'descongela' memória e a reprocessa como evento passado.

**FASE 3 - Integração e Ressignificação (1-2 sessões):** Memória agora é 'só uma memória'. Não esquece o que aconteceu, mas para de reviver emocionalmente. Instalamos cognição positiva no lugar da negativa.

**Diferencial:** Não fico anos falando sobre trauma. Uso protocolo específico que acelera processamento que cérebro não fez sozinho.

**Por que funciona:** Trauma acontece quando cérebro não processa experiência adequadamente. Estimulação bilateral reativa processamento natural que ficou travado.

---

### Exemplo 2: Método de Dessensibilização Progressiva de Gatilhos

**Para quem:** Pessoas com TEPT que evitam gatilhos específicos

**Problema específico:** Cliente tem gatilhos sensoriais (cheiros, sons, lugares) que disparam flashbacks ou pânico. Vive evitando.

**Processo:**

**ETAPA 1 - Catalogação de Gatilhos:** Listamos todos gatilhos conhecidos e classificamos por intensidade (0-10). Criamos hierarquia de exposição.

**ETAPA 2 - Exposição Imaginária Controlada:** Cliente imagina gatilho mais fraco enquanto usa técnicas de ancoragem. Repetimos até ansiedade cair 50%+.

**ETAPA 3 - Exposição Real Graduada:** Enfrentamos gatilhos reais começando do mais fraco. Cada exposição é planejada, controlada e seguida de processamento.

**ETAPA 4 - Generalização:** Cliente aprende que dominar um gatilho transfere para similares. Recupera autonomia de circular sem medo constante.

**Diferencial:** Não forço enfrentamento prematuro. Construo confiança com sucessos pequenos que permitem grandes.

**Por que funciona:** Evitação mantém medo. Exposição controlada ensina sistema nervoso que gatilho não é ameaça real.

---

## NICHO 5: AUTOESTIMA / AUTOCONFIANÇA

### Protocolo de Reconstrução de Autoimagem em 4 Camadas

**Para quem:** Pessoas com baixa autoestima crônica e autocrítica severa

**Processo:**
* **CAMADA 1** - Externalização do Crítico Interno
* **CAMADA 2** - Inventário de Evidências Reais
* **CAMADA 3** - Diálogo Compassivo Treinado
* **CAMADA 4** - Experimentos Comportamentais

**Diferencial:** Não tento 'pensar positivo'. Construo autoestima realista baseada em evidências e compaixão.

---

## NICHO 6: LUTO / ELABORAÇÃO DE PERDAS

### Método de Integração de Perda em 5 Fases

**Para quem:** Pessoas que perderam alguém e estão presas no luto

**Processo:**
* **FASE 1** - Validação da Dor
* **FASE 2** - Narrativa da Relação
* **FASE 3** - Processamento de Não-Ditos
* **FASE 4** - Reorganização de Identidade
* **FASE 5** - Vínculo Contínuo Saudável

**Diferencial:** Não forço 'seguir em frente'. Ajudo integrar perda na história de vida.

---

## NICHO 7: BURNOUT / ESTRESSE PROFISSIONAL

### Protocolo de Recalibração de Limites Profissionais

**Para quem:** Profissionais em burnout que não conseguem dizer 'não'

**Processo:**
* **ETAPA 1** - Auditoria de Energia
* **ETAPA 2** - Definição de Não-Negociáveis
* **ETAPA 3** - Scripts de Limite
* **ETAPA 4** - Implementação Gradual
* **ETAPA 5** - Tolerância à Culpa

**Diferencial:** Não digo 'coloque limites' sem ensinar COMO.

---

## NICHO 8: PROCRASTINAÇÃO / PRODUTIVIDADE

### Método de Desativação de Bloqueios de Ação

**Para quem:** Pessoas que procrastinam cronicamente em áreas importantes

**Processo:**
* **ETAPA 1** - Diagnóstico de Bloqueio
* **ETAPA 2** - Intervenção Específica
* **ETAPA 3** - Protocolo de Iniciação
* **ETAPA 4** - Sistema de Recompensa Imediata

**Diferencial:** Não trato 'preguiça'. Faço diagnóstico do bloqueio emocional específico.

---

## COMO USAR ESTES EXEMPLOS

### ⚠️ AVISO CRÍTICO

Estes exemplos **NÃO são para copiar**. São para **INSPIRAR** a estrutura e nomenclatura do seu próprio mecanismo.

### Checklist de Adaptação

Ao criar seu mecanismo inspirado nestes exemplos:

* ☐ Identifique o exemplo mais próximo do seu nicho
* ☐ Observe a estrutura: número de fases, tipo de nomenclatura, como explica diferencial
* ☐ Adapte ao SEU processo real: não invente fases que você não faz
* ☐ Use suas próprias palavras: precisa soar autêntico para você
* ☐ Valide com o Checklist de Validação

### Padrões Que Funcionam

✓ **Problema específico e tangível** (não genérico)

✓ **Processo em 3-5 fases/etapas** (não muitas, não poucas)

✓ **Cada fase tem nome e explicação** (cliente visualiza o caminho)

✓ **Diferencial claro** (o que outros não fazem)

✓ **Lógica científica/psicológica** (por que funciona)

✓ **Nome proprietário memorável** (Protocolo X, Método Y, Sistema Z)`,
        exercise: {
          title: "Refine Seu MTU com Base nos Exemplos",
          description: "Marque quando completar:",
          type: "checklist",
          items: [
            "Li exemplos do meu nicho ou similar",
            "Identifiquei padrões de estrutura que funcionam",
            "Adaptei elementos ao meu processo real",
            "Mantive autenticidade - não copiei",
            "Estou pronto para nomear meu MTU"
          ]
        }
      },
      {
        id: "nomenclatura",
        title: "Fórmulas de Nomenclatura Proprietária",
        content: `## Fórmulas de Nomenclatura: Como Nomear Seu MTU

Dar um nome ao seu processo não é superficial — é **transformador**. 

### Um nome certo:

* ✓ Torna seu mecanismo real e tangível na mente do cliente
* ✓ Cria propriedade intelectual instantânea (ninguém mais tem isso)
* ✓ Aumenta memorabilidade (cliente lembra e recomenda)
* ✓ Gera curiosidade ("O que é esse método?")
* ✓ Justifica preço premium (método proprietário = valor percebido)

---

### 🎯 REGRA DE OURO

Seu nome precisa soar **profissional, científico e proprietário** — mas não rebuscado ou confuso.

---

## FÓRMULA 1: Número + Conceito-Chave

**Estrutura:** [Palavra-Ação] de/em/dos [Número] [Conceitos/Fases/Etapas/Pilares]

### Por que funciona:

Números criam estrutura mental. Cliente visualiza um processo passo a passo. Transmite organização e completude.

### Estrutura Detalhada

**PARTE 1 - Palavra de Ação:**
* Protocolo | Método | Sistema | Terapia | Processo | Abordagem

**PARTE 2 - Preposição:**
* de | em | dos | das | para

**PARTE 3 - Número:**
* 3 | 4 | 5 | 7 (evite 2 = muito simples, evite 6+ = muito complexo)

**PARTE 4 - Conceito Estrutural:**
* Fases | Etapas | Pilares | Camadas | Níveis | Ciclos | Dimensões

### Exemplos Prontos

✓ **Protocolo de 3 Fases**

✓ **Método dos 4 Pilares**

✓ **Sistema de 5 Etapas**

✓ **Terapia em 3 Camadas**

✓ **Abordagem dos 4 Ciclos**

---

## FÓRMULA 2: Ação + Resultado/Alvo

**Estrutura:** [Ação Terapêutica] de [Resultado/Processo Desejado]

### Por que funciona:

Comunica o que você faz de forma direta. Cliente entende imediatamente o benefício. Soa científico e específico.

### Estrutura Detalhada

**PARTE 1 - Ação Terapêutica:**
* Recalibração | Reprocessamento | Reestruturação
* Reprogramação | Reintegração
* Dessensibilização | Regulação | Modulação
* Transformação | Integração
* Reconstrução | Reorganização | Restauração

**PARTE 2 - Resultado/Alvo:**
* Neural | Cognitiva | Emocional | Comportamental | Somática
* de Trauma | de Ansiedade | de Padrões | de Limites | de Conflitos
* Progressiva | Acelerada | Profunda | Focal | Integrativa

### Exemplos Prontos

✓ **Recalibração Neural Progressiva**

✓ **Reprocessamento Acelerado de Trauma**

✓ **Reestruturação Cognitiva Profunda**

✓ **Regulação Somática Integrativa**

✓ **Transformação de Padrões Relacionais**

---

## FÓRMULA 3: Metáfora + Técnica

**Estrutura:** [Metáfora Evocativa] [Palavra Técnica]

### Por que funciona:

Metáforas criam imagem mental poderosa. Cliente visualiza e conecta emocionalmente. Diferenciação máxima — ninguém terá um nome parecido.

### Metáforas Que Funcionam:

**Natureza/Crescimento:**
* Raiz, Semente, Árvore, Ciclo, Florescer, Podar

**Estrutural:**
* Fundação, Alicerce, Ponte, Mapa, Bússola, Âncora

**Movimento:**
* Travessia, Jornada, Caminho, Passagem, Transformação, Reset

**Estados:**
* Calma, Equilíbrio, Clareza, Fluxo, Harmonia, Sintonia

**Palavra Técnica:**
* Protocolo | Método | Terapia | Sistema | Abordagem

### Exemplos Prontos

✓ **Método Raiz-e-Fruto** (trabalha causa e sintoma)

✓ **Protocolo Âncora-e-Vela** (estabiliza e libera)

✓ **Terapia do Reset Neural** (reinicia padrões)

✓ **Sistema de Equilíbrio Emocional**

✓ **Método da Ponte Cognitiva**

---

## FÓRMULA 4: Nome Proprietário Único

**Estrutura:** [Método/Sistema/Protocolo] [Nome Criado/Sigla]

### Por que funciona:

Propriedade total e absoluta. Ninguém mais pode usar. Máxima diferenciação. Perfeito para branding de longo prazo.

### Opção A: Seu Sobrenome

✓ **Método Silva** | **Sistema Oliveira** | **Protocolo Costa**

**Quando usar:** Se você quer construir marca pessoal forte e seu sobrenome é fácil de pronunciar/lembrar.

### Opção B: Sigla Criativa

Crie sigla de 2-4 letras que represente seu processo:

✓ **Método RAP** (Recalibração, Ancoragem, Prática)

✓ **Sistema CORE** (Conexão, Organização, Regulação, Expansão)

✓ **Protocolo REAL** (Reconhecimento, Expressão, Ancoragem, Libertação)

✓ **Terapia VIVA** (Validação, Integração, Vínculo, Autonomia)

**Quando usar:** Se você quer algo memorável que pode virar marca registrada.

### Opção C: Palavra Única Inventada

✓ **Método Renovare** (renovar + cuidar)

✓ **Sistema Integralis** (integração + íntegro)

✓ **Protocolo Transite** (transição + site/lugar)

**Quando usar:** Se você quer algo único que soa profissional mas não existe em português. Funciona bem com raízes latinas.

---

## FÓRMULA 5: Descritivo + Especificador

**Estrutura:** [Conceito Descritivo] [Especificador de Público/Problema]

### Por que funciona:

Comunica simultaneamente o que é e para quem é. Cliente ideal se reconhece imediatamente no nome.

### Estrutura Detalhada

**Conceito Descritivo:**
* Terapia | Método | Sistema | Protocolo | Abordagem

**Especificador por público:**
* para Casais | para Profissionais | para Mães | para Empreendedores

**Especificador por problema:**
* de Ansiedade | de Trauma | de Burnout | de Conflitos

### Exemplos Prontos

✓ **Terapia Focal para Ansiedade de Decisão**

✓ **Método Acelerado para Casais em Crise**

✓ **Sistema Preventivo de Burnout Profissional**

✓ **Protocolo Integrativo para Trauma Complexo**

---

## Matriz de Decisão: Como Escolher a Melhor Fórmula?

### Critérios de Avaliação

Para cada nome que você criou, avalie de 1-5:

| Critério | Pergunta |
|----------|----------|
| **Memorabilidade** | Fácil de lembrar e pronunciar? |
| **Profissionalismo** | Soa científico e sério? |
| **Diferenciação** | Claramente único? Ninguém mais usa? |
| **Clareza** | Cliente entende o que é? |
| **Conexão Emocional** | Cria imagem mental/sentimento? |
| **Escalabilidade** | Funciona em materiais, site, workshops? |

---

## CHECKLIST FINAL DE VALIDAÇÃO

Antes de finalizar, seu nome precisa passar por estes testes:

### ✓ Teste de Pronúncia

Fale em voz alta 5 vezes seguidas. Trava? Soa estranho? Se sim, simplifique.

### ✓ Teste de Explicação

Alguém que não conhece você consegue entender o básico só pelo nome?

### ✓ Teste de Google

Pesquise seu nome no Google. Já existe? Se sim, você precisa algo mais único.

### ✓ Teste de Autenticidade

Quando você fala o nome, soa como você? Ou parece forçado?

### ✓ Teste de Longo Prazo

Você consegue se ver usando esse nome daqui a 5 anos? Em um livro? Em palestras?

---

### ✅ SE PASSOU EM TODOS OS TESTES

Você tem seu Mecanismo Terapêutico Único nomeado!

---

### 🎯 PRÓXIMO PASSO

Agora que você tem seu MTU completo e nomeado, é hora de comunicá-lo!

**→ Vá para: Módulo 3 - Scripts de Comunicação Prontos**`,
        exercise: {
          title: "Finalize o Nome do Seu MTU",
          description: "Complete todos os testes de validação:",
          type: "checklist",
          items: [
            "Criei 3 opções de nome usando as fórmulas",
            "Avaliei cada nome com os 6 critérios",
            "Passei pelos 5 testes de validação",
            "Escolhi meu nome final",
            "Estou confiante e empolgado com o nome"
          ]
        }
      }
    ]
  },
  "3": {
    title: "Scripts de Comunicação",
    subtitle: "Módulo 3",
    description: "Templates editáveis para implementação imediata do seu MTU.",
    duration: "90 min",
    lessons: [
      {
        id: "bio",
        title: "Bio de Instagram/LinkedIn",
        content: `## Bio de Instagram/LinkedIn Otimizada

Sua bio é seu anúncio de 150 caracteres. Precisa comunicar: **(1) Para quem você é, (2) O que você faz, (3) Como é diferente.**

---

### 📝 COMO USAR

Todos os templates têm marcações **[PREENCHA]**. Substitua com informações do seu mecanismo específico. **Não invente** - use o que você criou no Módulo 2.

---

## Template 1: Fórmula Problema + Mecanismo

**[Use este template se seu mecanismo tem nome forte]**

\`\`\`
Psicóloga [CRP]
Especialista em [PROBLEMA ESPECÍFICO]
[NOME DO SEU MECANISMO]™
[DIFERENCIAL EM 5-8 PALAVRAS]
📍 [Cidade] | 💬 [Online/Presencial]
\`\`\`

### Exemplo Preenchido:

\`\`\`
Psicóloga CRP 06/12345
Especialista em Ansiedade que Paralisa Decisões
Protocolo de Recalibração Neural™
Corpo primeiro, pensamentos depois
📍 São Paulo | 💬 Online
\`\`\`

---

## Template 2: Fórmula Para Quem + Processo

**[Use este template se quer enfatizar público específico]**

\`\`\`
Psicóloga [CRP] | [ABORDAGEM]
Ajudo [PÚBLICO] com [PROBLEMA]
Através de [PROCESSO EM 1 FRASE]
[RESULTADO OU DIFERENCIAL]
\`\`\`

### Exemplo Preenchido:

\`\`\`
Psicóloga CRP 06/12345 | Terapia de Casal
Ajudo casais em crise a reconstruir conexão
Através do Método dos 4 Pilares Relacionais
Cirurgia focal no que está quebrado, não remendo geral
\`\`\`

---

## Template 3: Fórmula Transformação

**[Use este template se sua transformação é muito clara]**

\`\`\`
Psicóloga especializada em [PROBLEMA]
De [ESTADO ANTES] para [ESTADO DEPOIS]
[NOME DO MECANISMO] | [NÚMERO] sessões
📍 [Local] | Link 👇
\`\`\`

### Exemplo Preenchido:

\`\`\`
Psicóloga especializada em Burnout Profissional
De 'não consigo dizer não' para 'tenho limites claros'
Protocolo de Recalibração de Limites | 8-12 sessões
📍 Online | Link 👇
\`\`\`

---

### 💡 DICA PRÁTICA

Teste os 3 templates e peça feedback de 3 pessoas. Escolha o que gera mais perguntas curiosas ('Como funciona isso?').

> **Use o Assistente IA:** Peça para ele te ajudar a preencher e refinar cada template.`,
        exercise: {
          title: "Crie Suas 3 Versões de Bio",
          description: "Preencha os 3 templates e escolha o melhor para usar.",
          type: "checklist",
          items: [
            "Preenchi Template 1 com meus dados",
            "Preenchi Template 2 com meus dados",
            "Preenchi Template 3 com meus dados",
            "Pedi feedback de 3 pessoas",
            "Escolhi a melhor versão e atualizei minhas redes"
          ]
        }
      },
      {
        id: "site",
        title: "Estrutura de Site",
        content: `## Estrutura Completa de Site

Seu site precisa de 3 páginas essenciais. Aqui estão os scripts completos para cada uma.

---

## PÁGINA 1: HOME

### Seção 1: Hero (Acima da Dobra)

**[Esta é a primeira coisa que visitante vê]**

**HEADLINE:**
\`\`\`
[PROBLEMA ESPECÍFICO]? [NOME DO MECANISMO] pode ajudar.
\`\`\`

**SUBHEADLINE:**
\`\`\`
Sistema em [NÚMERO] fases para [TRANSFORMAÇÃO ESPECÍFICA]. 
[DIFERENCIAL EM 1 FRASE].
\`\`\`

**CTA BUTTON:**
\`\`\`
Agendar Conversa Inicial | Saiba Como Funciona
\`\`\`

---

### Seção 2: Para Quem É

**TÍTULO:** Este trabalho é para você se:

* [SINTOMA/SITUAÇÃO 1 ESPECÍFICA]
* [SINTOMA/SITUAÇÃO 2 ESPECÍFICA]
* [SINTOMA/SITUAÇÃO 3 ESPECÍFICA]
* [SINTOMA/SITUAÇÃO 4 ESPECÍFICA]

**Se você se reconheceu em 2 ou mais itens, podemos trabalhar juntos.**

---

### Seção 3: Como Funciona (Resumo)

**TÍTULO:** Como Funciona o [NOME DO MECANISMO]

**Parágrafo introdutório:** [EXPLICAÇÃO DE 2-3 FRASES DO SEU MECANISMO]

**FASE 1 - [NOME]:** [Explicação em 1-2 frases do que acontece]

**FASE 2 - [NOME]:** [Explicação em 1-2 frases do que acontece]

**FASE 3 - [NOME]:** [Explicação em 1-2 frases do que acontece]

**CTA:** [LINK PARA PÁGINA 'COMO FUNCIONA' COMPLETA]

---

### Seção 4: Sobre Mim (Resumo)

**TÍTULO:** Sobre [SEU NOME]

**[FOTO PROFISSIONAL]**

**Parágrafo 1:** Sou [NOME], psicóloga CRP [NÚMERO], especializada em [PROBLEMA]. Criei o [NOME DO MECANISMO] porque percebi que [RAZÃO/INSIGHT QUE TE LEVOU A CRIAR].

**Parágrafo 2:** [CREDENCIAIS PRINCIPAIS + ANOS DE EXPERIÊNCIA]. Atuo especificamente com [PÚBLICO] que [SITUAÇÃO].

**CTA:** [LINK PARA PÁGINA 'SOBRE' COMPLETA]

---

### Seção 5: CTA Final

**TÍTULO:** Pronto Para Começar?

Na primeira conversa, vamos entender se o [NOME DO MECANISMO] é adequado para o seu caso. Sem compromisso.

**BUTTON:** Agendar Conversa Inicial (Gratuita)

---

## PÁGINA 2: SOBRE

**TÍTULO DA PÁGINA:** Sobre Mim

**[FOTO PROFISSIONAL DE QUALIDADE]**

**PARÁGRAFO 1 - Quem Sou:**
Sou [NOME COMPLETO], psicóloga com registro CRP [NÚMERO]. Tenho [X] anos de experiência clínica, com especialização em [ÁREA]. Atendo [PÚBLICO ESPECÍFICO] que enfrentam [PROBLEMA].

**PARÁGRAFO 2 - Por Que Criei Meu Mecanismo:**
Criei o [NOME DO MECANISMO] porque percebi que [INSIGHT/PROBLEMA QUE VOCÊ VIU]. Vi que a abordagem tradicional de [O QUE OUTROS FAZEM] não estava [RESULTADO]. Então desenvolvi um sistema que [SEU DIFERENCIAL].

**PARÁGRAFO 3 - Formação:**
* Graduação em Psicologia - [INSTITUIÇÃO, ANO]
* [ESPECIALIZAÇÕES/PÓS-GRADUAÇÕES RELEVANTES]
* [FORMAÇÕES COMPLEMENTARES QUE IMPORTAM PARA SEU MECANISMO]

**PARÁGRAFO 4 - Minha Abordagem:**
Meu trabalho é focado, estruturado e orientado a resultados tangíveis. Não acredito em terapia que se estende indefinidamente sem direção clara. O [NOME DO MECANISMO] tem começo, meio e fim definidos, com objetivos mensuráveis em cada fase.

**PARÁGRAFO 5 - Com Quem Trabalho:**
Trabalho especificamente com [PÚBLICO] que [SITUAÇÃO ESPECÍFICA]. Se você está buscando [TIPO DE RESULTADO], podemos trabalhar juntos.

**CTA FINAL:**
Quer saber se o [NOME DO MECANISMO] é adequado para você? Agende uma conversa inicial gratuita. [LINK]

---

## PÁGINA 3: COMO FUNCIONA

**TÍTULO DA PÁGINA:** Como Funciona o [NOME DO MECANISMO]

### INTRODUÇÃO:

O [NOME DO MECANISMO] é um sistema estruturado em [NÚMERO] fases para [TRANSFORMAÇÃO]. Foi desenvolvido especificamente para [PROBLEMA], baseado em [LÓGICA/CIÊNCIA].

Diferente da maioria das abordagens que [O QUE OUTROS FAZEM], o [NOME DO MECANISMO] [SEU DIFERENCIAL].

---

### AS [NÚMERO] FASES:

**FASE 1: [NOME DA FASE]**

**Duração:** [X-Y] sessões

**O que fazemos:** [EXPLICAÇÃO DETALHADA DE 3-4 FRASES]

**Objetivo:** Ao final desta fase, você terá [RESULTADO ESPECÍFICO].

---

**FASE 2: [NOME DA FASE]**

**Duração:** [X-Y] sessões

**O que fazemos:** [EXPLICAÇÃO DETALHADA DE 3-4 FRASES]

**Objetivo:** Ao final desta fase, você terá [RESULTADO ESPECÍFICO].

---

**FASE 3: [NOME DA FASE]**

**Duração:** [X-Y] sessões

**O que fazemos:** [EXPLICAÇÃO DETALHADA DE 3-4 FRASES]

**Objetivo:** Ao final desta fase, você terá [RESULTADO ESPECÍFICO].

---

### POR QUE FUNCIONA:

[EXPLICAÇÃO DA LÓGICA/CIÊNCIA EM 2-3 PARÁGRAFOS - Use sua resposta da Pergunta 6 do Framework]

---

### DURAÇÃO TOTAL E INVESTIMENTO:

**Duração típica:** [X-Y] sessões ao longo de [X-Y] meses

**Formato:** [Sessões semanais/quinzenais de X minutos]

**Investimento:** [Valor por sessão ou pacote - ou 'Consulte na primeira conversa']

**CTA FINAL:**
Pronto para começar? Agende sua conversa inicial gratuita para avaliarmos se este é o caminho certo para você. [LINK]

> **Use o Assistente IA:** Peça para ele te ajudar a preencher cada seção do site com base no seu MTU.`,
        exercise: {
          title: "Preencha Estrutura do Site",
          description: "Complete os scripts das 3 páginas essenciais do seu site.",
          type: "checklist",
          items: [
            "Preencheu todas as seções da Home",
            "Preencheu a página Sobre",
            "Preencheu a página Como Funciona",
            "Revisou todo o conteúdo",
            "Atualizou ou criou o site"
          ]
        }
      },
      {
        id: "primeira-conversa",
        title: "Script de Primeira Conversa",
        content: `## Script: Primeira Conversa com Potencial Cliente

Esta conversa inicial (15-30 min) tem **3 objetivos**: 
1. Entender se você pode ajudar
2. Explicar seu mecanismo
3. Fechar ou não o atendimento

---

### 💡 IMPORTANTE

Esta conversa **NÃO é terapia**. É **triagem + explicação do método**. Seja profissional, não tente 'vender'. Se não for fit, seja honesto.

---

## ROTEIRO COMPLETO

### 1. ABERTURA (2 min)

"Olá **[NOME]**, prazer em te conhecer. Obrigada por agendar esta conversa. Tenho **[15/30]** minutos agora - vou fazer algumas perguntas para entender sua situação e depois vou explicar como funciona o meu trabalho. Se fizer sentido para ambos, a gente marca as sessões. Ok?"

---

### 2. PERGUNTAS DE TRIAGEM (5-8 min)

**Pergunta 1:** "Me conta: o que te trouxe aqui? O que está acontecendo?"

_[Deixe pessoa falar. Escute ativamente. Anote palavras-chave.]_

**Pergunta 2:** "Há quanto tempo isso está acontecendo?"

_[Entenda se é situacional ou crônico]_

**Pergunta 3:** "Como isso está impactando sua vida? [Trabalho/Relacionamentos/Saúde]"

_[Avalie gravidade e motivação]_

**Pergunta 4:** "Você já fez terapia antes? Se sim, como foi?"

_[Importante: entenda o que não funcionou antes e por quê]_

**Pergunta 5:** "O que seria um resultado bom para você? Como você saberia que a terapia funcionou?"

_[Expectativas realistas? Alinhamento possível?]_

---

### 3. DECISÃO INTERNA (30 seg - mental)

_[Baseado nas respostas: você PODE ajudar? Problema está no seu escopo?]_
* **Se NÃO → Referir**
* **Se SIM → Explicar mecanismo**

---

### 4A. SE NÃO É FIT - REFERIR COM CUIDADO (2 min)

"**[NOME]**, pelo que você me contou, o que você precisa está fora da minha especialidade. Eu trabalho especificamente com **[SEU NICHO]**, e no seu caso seria mais adequado **[TIPO DE PROFISSIONAL]**. Posso te indicar **[NOME/LUGAR]** se quiser."

---

### 4B. SE É FIT - EXPLICAR MECANISMO (8-10 min)

"Ok, **[NOME]**. Pelo que você me contou, eu acho que posso te ajudar. Deixa eu te explicar como eu trabalho, porque é diferente da maioria das terapias."

#### EXPLICAÇÃO DO MECANISMO:

"Eu uso o que eu chamo de **[NOME DO MECANISMO]**. É um processo estruturado em **[NÚMERO]** fases que foi criado especificamente para **[PROBLEMA]**."

"A diferença do que você já tentou antes é **[SEU DIFERENCIAL]**. Isso funciona porque **[LÓGICA EM 1-2 FRASES]**."

#### AS FASES RESUMIDAS:

"Na **Fase 1**, a gente vai **[RESUMO DE 1 FRASE]**. Isso leva **[X-Y]** sessões."

"Na **Fase 2**, a gente vai **[RESUMO DE 1 FRASE]**. Isso leva **[X-Y]** sessões."

"Na **Fase 3**, a gente vai **[RESUMO DE 1 FRASE]**. Isso leva **[X-Y]** sessões."

"No total, a gente está falando de **[X-Y] sessões** ao longo de **[X-Y] meses**. E o investimento é **[VALOR]** por sessão **[OU PACOTE]**."

---

### 5. ESPAÇO PARA PERGUNTAS (3 min)

"Faz sentido para você? Tem alguma dúvida?"

_[Responda objeções - veja próxima lição]_

---

### 6. FECHAMENTO (2 min)

"Você quer marcar a primeira sessão ou precisa pensar?"

**SE SIM:** "Ótimo. Vou te mandar **[LINK AGENDAMENTO / DISPONIBILIDADE]**. Nos vemos **[DATA]**."

**SE PRECISA PENSAR:** "Tranquilo. Te mando os detalhes por email/WhatsApp e você me avisa. Sem pressão."

---

### 🎯 DICA DE OURO

Pratique este script **5 vezes** (sozinha ou com colega) antes de usar com clientes reais. A fluência vem da prática.

> **Use o Assistente IA:** Peça para ele simular ser um potencial cliente para você praticar.`,
        exercise: {
          title: "Pratique o Script de Primeira Conversa",
          description: "Adapte o script ao seu MTU e pratique até ficar natural.",
          type: "checklist",
          items: [
            "Personalizei o script com meu MTU",
            "Pratiquei sozinha pelo menos 3 vezes",
            "Pratiquei com colega ou IA pelo menos 2 vezes",
            "Me sinto confiante para usar com clientes",
            "Salvei o script em lugar de fácil acesso"
          ]
        }
      },
      {
        id: "objecoes",
        title: "Respostas para Objeções Comuns",
        content: `## Respostas para Objeções Comuns

Estas são as **7 objeções mais comuns** e como respondê-las com naturalidade.

---

### 💡 PRINCÍPIO

**Nunca argumente.** Valide a objeção, depois reframe com informação adicional.

---

## OBJEÇÃO 1: "Está caro"

### RESPOSTA:

"Entendo. Deixa eu te dar um contexto: o **[NOME DO MECANISMO]** é um processo estruturado com começo, meio e fim. A gente não fica **[X]** anos em terapia sem direção. São **[X-Y]** sessões e você tem um resultado tangível. Quando você divide o investimento pelo número de sessões e pelo resultado que você busca **[RESULTADO]**, acaba sendo um investimento que se paga. Mas entendo se não couber no orçamento agora."

_[Se realmente não couber: ofereça indicação de serviço mais acessível ou diga que você entende]_

---

## OBJEÇÃO 2: "Já fiz terapia e não funcionou"

### RESPOSTA:

"Entendo completamente. Me conta: como era essa terapia anterior? O que não funcionou?" 

_[ESCUTE]_ 

"Ok, faz sentido. A diferença do **[NOME DO MECANISMO]** é **[SEU DIFERENCIAL ESPECÍFICO]**. A gente não vai repetir o que você já tentou. Se você está disposta a tentar uma abordagem diferente, eu acho que vale a pena. Mas se você sente que terapia simplesmente não é para você, tudo bem também."

---

## OBJEÇÃO 3: "Preciso pensar / Falar com [parceiro/família]"

### RESPOSTA:

"Claro, sem problema. Você quer que eu te mande as informações por email/WhatsApp para você ter tudo certinho?" 

_[SIM]_ 

"Ok, vou mandar. Quanto tempo você acha que precisa para decidir?" 

_[RESPOSTA]_ 

"Perfeito. Me avisa até **[DATA]** e se tiver qualquer dúvida, pode me chamar."

_[Não pressione. Dê espaço. Follow-up educado depois da data combinada.]_

---

## OBJEÇÃO 4: "Não tenho certeza se é isso que eu preciso"

### RESPOSTA:

"Entendo a dúvida. Me diz: qual parte você acha que não se encaixa?" 

_[ESCUTE]_ 

"Ok. Olha, o **[NOME DO MECANISMO]** funciona especificamente para **[PROBLEMA]**. Se o que você está vivendo é **[REPETE PROBLEMA DELE]**, então se encaixa. Mas se você não tem certeza, podemos marcar a primeira sessão e nas primeiras 2-3 sessões a gente consegue ter mais clareza se é o caminho certo. Se não for, eu te falo honestamente e te indico outra abordagem. Ok?"

---

## OBJEÇÃO 5: "Quantas sessões vou precisar? Não quero ficar anos"

### RESPOSTA:

"Ótima pergunta. É exatamente por isso que eu criei o **[NOME DO MECANISMO]**. Eu também não acredito em terapia sem fim. O processo tem **[X-Y]** sessões, divididas em **[NÚMERO]** fases. Você sabe exatamente onde está, o que falta e quando termina. Claro que cada pessoa tem seu tempo, mas a estrutura é essa. Nada de 'vamos ver no que dá'."

---

## OBJEÇÃO 6: "Não tenho tempo agora"

### RESPOSTA:

"Entendo. Só para você saber: as sessões são **[X minutos]**, **[FREQUÊNCIA]**. Eu trabalho com horários flexíveis e **[ONLINE/PRESENCIAL]**, então a gente pode encaixar no que funciona para você. Mas se realmente agora não é a hora, sem problema. Quando você tiver disponibilidade, pode me procurar."

---

## OBJEÇÃO 7: "Como sei que vai funcionar comigo?"

### RESPOSTA:

"Honestamente? Você não sabe. E eu também não posso garantir sem trabalhar com você. O que eu posso te dizer é: o **[NOME DO MECANISMO]** foi desenvolvido para **[PROBLEMA]** e funciona quando a pessoa **[CONDIÇÕES: está comprometida, faz as práticas, etc]**. Se você se encaixa nisso e está disposta a tentar, eu acredito que funciona. Mas terapia é sempre uma aposta de duas pessoas - eu coloco meu método, você coloca seu esforço. Faz sentido?"

---

### 🎯 COMO USAR

1. Leia cada resposta várias vezes
2. Personalize com seu MTU específico
3. Pratique falar naturalmente (não memorize palavra por palavra)
4. Mantenha o tom empático e profissional

> **Use o Assistente IA:** Peça para ele simular objeções para você praticar suas respostas.`,
        exercise: {
          title: "Prepare Suas Respostas para Objeções",
          description: "Personalize cada resposta com informações do seu MTU.",
          type: "checklist",
          items: [
            "Personalizei resposta para 'Está caro'",
            "Personalizei resposta para 'Já fiz terapia'",
            "Personalizei resposta para 'Preciso pensar'",
            "Personalizei resposta para 'Não tenho certeza'",
            "Personalizei as 3 últimas objeções",
            "Pratiquei todas as respostas",
            "Salvei em documento acessível"
          ]
        }
      },
      {
        id: "posts",
        title: "Estrutura de Posts Educativos",
        content: `## Estrutura de Posts Educativos

Posts educativos **posicionam você como autoridade** E **vendem indiretamente**. 

Aqui estão **5 fórmulas** que funcionam.

---

### 💡 PRINCÍPIO

**Eduque generosamente**, mencione seu mecanismo naturalmente, **não force CTA**. Confiança vende mais que insistência.

---

## FÓRMULA 1: Mito vs. Verdade

### ESTRUTURA:

❌ **MITO:** [Crença comum errada sobre seu nicho]

✅ **VERDADE:** [O que realmente funciona]

**POR QUE ISSO IMPORTA:** [Explicação]

**MENÇÃO NATURAL:** É por isso que no [NOME DO MECANISMO] eu [O QUE VOCÊ FAZ DIFERENTE].

### Exemplo:

❌ **MITO:** Ansiedade se resolve 'pensando positivo'

✅ **VERDADE:** Quando seu sistema nervoso está em alerta máximo, pensamento positivo não cola. É como tentar instalar software novo em computador superaquecido.

**POR QUE ISSO IMPORTA:** Se você só trabalha pensamentos, ignora o corpo que está gritando 'PERIGO'. Por isso muita gente fala 'sei que é irracional mas não consigo parar'.

É por isso que no **Protocolo de Recalibração Neural** eu começo regulando o sistema nervoso ANTES de mexer nos pensamentos. Corpo calmo → mente receptiva.

---

## FÓRMULA 2: Sinais de Alerta

### ESTRUTURA:

**X sinais de que [PROBLEMA] está [PIORANDO/ACONTECENDO]:**

1. [Sinal específico]
2. [Sinal específico]
3. [Sinal específico]

Se você se reconheceu em 2+, vale buscar ajuda.

**MENÇÃO NATURAL:** Se ressoou, me manda DM que te explico como o [NOME DO MECANISMO] pode ajudar.

---

## FÓRMULA 3: Por Que X Não Funciona

### ESTRUTURA:

**Por que [SOLUÇÃO COMUM] não funciona para [PROBLEMA]:**

**PROBLEMA:** [Explicação do problema]

**SOLUÇÃO COMUM:** [O que a maioria faz]

**POR QUE FALHA:** [Lógica clara]

**O QUE FUNCIONA:** [Seu diferencial]

**MENÇÃO NATURAL:** É essa lógica que guia o [NOME DO MECANISMO].

---

## FÓRMULA 4: Bastidores do Processo

### ESTRUTURA:

**Como funciona [UMA FASE DO SEU MECANISMO]:**

[Explicação educativa da fase com exemplo concreto]

**POR QUE FAZEMOS ISSO:** [Lógica]

**MENÇÃO NATURAL:** Esta é a Fase 1 do [NOME DO MECANISMO]. Depois disso, partimos para [PRÓXIMA FASE].

---

## FÓRMULA 5: História de Transformação

### ESTRUTURA:

**Cliente chegou:** [Estado ANTES]

**O que fizemos:** [Resumo do processo - SEM detalhes pessoais]

**Resultado:** [Estado DEPOIS]

**O que fez diferença:** [Insight sobre seu mecanismo]

**MENÇÃO NATURAL:** Se você está vivendo algo parecido, o [NOME DO MECANISMO] pode ajudar. Link na bio.

---

### ⚠️ ÉTICA IMPORTANTE

**Sempre use histórias compostas** (mix de vários clientes) **OU peça autorização explícita**. 

**NUNCA exponha clientes sem permissão.**

---

### 🎯 PLANO DE AÇÃO

**Semana 1:** Crie 1 post usando Fórmula 1

**Semana 2:** Crie 1 post usando Fórmula 2

**Semana 3:** Crie 1 post usando Fórmula 3

**Semana 4:** Crie 1 post usando Fórmula 4

A partir daí, **alterne entre as 5 fórmulas** criando 1-2 posts por semana.

---

### 💡 DICA DE OURO

**Cada post deve:**
* ✓ Educar genuinamente (não ser só propaganda)
* ✓ Ser específico (exemplos concretos, não genérico)
* ✓ Mencionar seu mecanismo naturalmente (não forçado)
* ✓ Ter valor mesmo para quem não vai te contratar

> **Use o Assistente IA:** Peça para ele te ajudar a criar posts usando cada uma das 5 fórmulas com base no seu MTU.`,
        exercise: {
          title: "Crie Seu Banco de Posts",
          description: "Crie pelo menos 1 post usando cada fórmula para começar.",
          type: "checklist",
          items: [
            "Criei post usando Fórmula 1 (Mito vs. Verdade)",
            "Criei post usando Fórmula 2 (Sinais de Alerta)",
            "Criei post usando Fórmula 3 (Por Que X Não Funciona)",
            "Criei post usando Fórmula 4 (Bastidores)",
            "Criei post usando Fórmula 5 (Transformação)",
            "Salvei todos em documento organizado",
            "Agendei publicação dos 4 primeiros posts"
          ]
        }
      }
    ]
  },
  "4": {
    title: "Plano de Implementação 90 Dias",
    subtitle: "Módulo 4",
    description: "Cronograma exato 30-60-90 dias para implementar seu MTU.",
    duration: "120 min",
    lessons: [
      {
        id: "fundacao",
        title: "FASE 1: Dias 1-30 - Fundação",
        content: `## FASE 1: DIAS 1-30 - FUNDAÇÃO

**OBJETIVO:** Implementar seu mecanismo em todos os pontos de comunicação e fazer primeiros testes com clientes reais.

---

### ⚠️ REGRA DOS 30 DIAS

**Não mude nada no seu mecanismo neste período.** Implemente como está, colete dados, só então refine.

---

### 🎯 PRINCÍPIO FUNDAMENTAL

**Implementação vence planejamento perfeito.** Feito > Perfeito. Teste rápido > Preparação infinita.

---

## SEMANA 1: Atualização de Materiais

### Segunda-feira (Dia 1)

* Preencher todos os templates do Módulo 3
* Revisar e garantir consistência (mesmo mecanismo em todos)
* Criar documento mestre com todas as versões preenchidas

⏱ **Tempo estimado:** 3-4 horas

---

### Terça-feira (Dia 2)

* Atualizar bio do Instagram com novo template
* Atualizar bio do LinkedIn (se tiver)
* Fazer post de 'reposicionamento' anunciando mudança
* Fixar post no perfil

⏱ **Tempo estimado:** 2 horas

---

### Quarta-feira (Dia 3)

* Se tem site: começar atualização da página Home
* Se não tem site: decidir se vai criar (recomendado) ou usar link na bio
* Contratar ajuda técnica se necessário (desenvolvedor/designer)

⏱ **Tempo estimado:** 2-3 horas (planejamento)

---

### Quinta-feira (Dia 4)

* Atualizar/criar página 'Sobre' do site
* Atualizar/criar página 'Como Funciona'

⏱ **Tempo estimado:** 3-4 horas

---

### Sexta-feira (Dia 5)

* Revisar site completo em dispositivos diferentes
* Testar todos os links e CTAs
* Publicar site atualizado

⏱ **Tempo estimado:** 2 horas

---

### ✅ CHECKPOINT SEMANA 1

Você tem comunicação atualizada em **bio + site**. Agora precisa testar com pessoas reais.

---

## SEMANA 2: Prática e Primeiros Testes

### Segunda-feira (Dia 8)

* Ler script de primeira conversa 3 vezes em voz alta
* Gravar você explicando seu mecanismo (áudio ou vídeo)
* Assistir/ouvir e anotar onde trava ou soa artificial

⏱ **Tempo estimado:** 1-2 horas

---

### Terça-feira (Dia 9)

* Role-play de primeira conversa com colega/amigo
* Pedir feedback: ficou claro? Soou natural?
* Ajustar script com base no feedback

⏱ **Tempo estimado:** 1 hora

---

### Quarta-feira (Dia 10)

* Fazer 1º post educativo usando Fórmula 1 (Mito vs. Verdade)
* Monitorar engajamento (salva, comenta, compartilha)

⏱ **Tempo estimado:** 1 hora | 📊 **Meta:** 10+ interações

---

### Quinta-feira (Dia 11)

* Contatar 3 clientes atuais e explicar novo mecanismo
* Pedir feedback: fez sentido? Reconhecem no trabalho?
* Anotar perguntas e confusões para refinar explicação

⏱ **Tempo estimado:** 2 horas

---

### Sexta-feira (Dia 12)

* Oferecer conversa inicial gratuita para 5 pessoas da lista de espera/rede
* Objetivo: testar script, não necessariamente fechar

📊 **Meta:** Agendar pelo menos 3 conversas para Semana 3

---

### ✅ CHECKPOINT SEMANA 2

Você praticou script e tem **conversas agendadas** para testar na prática.

---

## SEMANA 3: Primeiras Conversas Reais

### Segunda a Sexta (Dias 15-19)

* Realizar **3-5 conversas iniciais** usando script
* **Após cada conversa:** anotar imediatamente
  * O que funcionou bem?
  * Onde travou?
  * Quais perguntas surgiram?
  * Qual objeção não estava no script?
* Fazer 2º post educativo (Fórmula 2: Sinais de Alerta)

📊 **Meta:** 2+ conversas convertidas em agendamento

---

### 💡 IMPORTANTE

Não refine o mecanismo ainda. **Só anote feedback.** Você precisa de mais dados.

---

## SEMANA 4: Análise e Ajustes Iniciais

### Segunda-feira (Dia 22)

* Revisar todas as anotações das conversas
* Identificar padrões: quais perguntas se repetem?
* Listar ajustes necessários no script (não no mecanismo)

⏱ **Tempo estimado:** 2 horas

---

### Terça-feira (Dia 23)

* Atualizar script de primeira conversa com aprendizados
* Adicionar perguntas que faltaram / remover redundâncias

⏱ **Tempo estimado:** 1 hora

---

### Quarta-feira (Dia 24)

* Fazer 3º post educativo (Fórmula 3: Por Que X Não Funciona)
* Responder TODOS os comentários (engajamento = alcance)

📊 **Meta:** 15+ interações

---

### Quinta-feira (Dia 25)

* Analisar métricas de Instagram da última semana
  * Quantas pessoas visitaram perfil?
  * Quantas clicaram no link?
  * Quais posts tiveram mais salvamentos?
* Decidir: o que replicar, o que descartar

⏱ **Tempo estimado:** 1 hora

---

### Sexta-feira (Dia 26)

#### REVISÃO DOS 30 DIAS

Preencher planilha de resultados:

* Quantas conversas iniciais realizadas? **_____**
* Quantas convertidas em agendamento? **_____**
* Taxa de conversão? **_____ %**
* Objeção mais comum? **_____________________**
* Parte do script que precisa melhorar? **_____**

**Decisão:** Mecanismo precisa ajuste ou só comunicação?

---

### ✅ CHECKPOINT 30 DIAS

Você implementou, testou e tem **dados reais**. Agora está pronta para refinar e ganhar tração.

> **Use o Assistente IA:** Peça para ele te ajudar a analisar os resultados dos 30 dias e identificar ajustes necessários.`,
        exercise: {
          title: "Complete os Primeiros 30 Dias",
          description: "Siga o cronograma semana a semana e documente seus resultados.",
          type: "checklist",
          items: [
            "SEMANA 1: Atualizei todos os materiais (bio + site)",
            "SEMANA 2: Pratiquei script e agendei conversas",
            "SEMANA 3: Realizei 3-5 conversas iniciais reais",
            "SEMANA 4: Analisei resultados e ajustei script",
            "Preenchi planilha de métricas dos 30 dias",
            "Decidi se mecanismo precisa ajuste ou não"
          ]
        }
      },
      {
        id: "tracao",
        title: "FASE 2: Dias 31-60 - Tração",
        content: `## FASE 2: DIAS 31-60 - TRAÇÃO

**OBJETIVO:** Ganhar tração consistente, refinar baseado em dados reais, e começar a escalar aquisição de clientes.

---

### 🎯 FOCO DA FASE 2

**Consistência > Volume.** Melhor 1 post/semana de qualidade que 5 genéricos.

---

## SEMANA 5: Refinamento do Mecanismo

### Segunda-feira (Dia 29)

* Revisar feedback dos primeiros 30 dias
* **DECIDIR:** Mecanismo está claro ou precisa simplificar?
* Se precisa ajustar: voltar ao Checklist de Validação

⏱ **Tempo estimado:** 2 horas

---

### Terça-feira (Dia 30)

* Se ajustou mecanismo: atualizar TODOS os materiais
* Se não ajustou: criar versão 'resumida em 30 segundos'

⏱ **Tempo estimado:** 2-3 horas

---

### Quarta-feira (Dia 31)

* Fazer post anunciando 'aprimoramento' se mudou algo
* Ou fazer 4º post educativo (Fórmula 4: Bastidores)

📊 **Meta:** 20+ interações

---

### Quinta-feira (Dia 32)

* Criar 'FAQ do Mecanismo' baseado em perguntas reais
* Adicionar seção FAQ no site

⏱ **Tempo estimado:** 2 horas

---

### Sexta-feira (Dia 33)

* Gravar vídeo de 60-90 segundos explicando mecanismo
* Postar como Reels/Stories (teste de formato)

📊 **Meta:** 100+ visualizações

---

## SEMANA 6: Aquisição Consistente

### Segunda-feira (Dia 36)

* Criar sistema de agendamento automatizado (Calendly/similar)
* Adicionar link em bio + site + assinatura de email

⏱ **Tempo estimado:** 1 hora

---

### Terça-feira (Dia 37)

* Fazer post de 'social proof' (resultados sem identificação)
* Usar Fórmula 5: História de Transformação

📊 **Meta:** 25+ salvamentos

---

### Quarta-feira (Dia 38)

* Alcançar 10 pessoas da sua rede: 'Você conhece alguém que...'
* Objetivo: referências orgânicas

📊 **Meta:** 2+ indicações

---

### Quinta-feira (Dia 39)

* Realizar 3-5 conversas iniciais desta semana
* Anotar taxa de conversão (melhorou vs. Semana 3?)

📊 **Meta:** Taxa conversão > 60%

---

### Sexta-feira (Dia 40)

* Fazer post educativo da semana
* Experimentar horário diferente de postagem

📊 Comparar engajamento com posts anteriores

---

## SEMANAS 7-8: Ritmo e Consistência

### ROTINA SEMANAL ESTABELECIDA:

* **Segundas:** Planejar conteúdo da semana + revisar métricas
* **Terças/Quartas:** 1 post educativo de qualidade
* **Quintas/Sextas:** Conversas iniciais agendadas
* **Diariamente:** 30 min respondendo DMs/comentários

---

### MÉTRICAS A ACOMPANHAR:

* Conversas iniciais por semana: **_____** (Meta: 5+)
* Taxa de conversão: **_____ %** (Meta: 60%+)
* Novos clientes iniciados: **_____** (Meta: 2+)
* Engajamento médio por post: **_____** (Meta: crescimento constante)

---

### ✅ CHECKPOINT 60 DIAS

Você tem **rotina estabelecida**, conversões consistentes e **autoridade crescente**.

> **Use o Assistente IA:** Peça para ele te ajudar a criar um banco de posts para as próximas semanas usando as 5 fórmulas.`,
        exercise: {
          title: "Complete os Dias 31-60",
          description: "Estabeleça rotina consistente e ganhe tração.",
          type: "checklist",
          items: [
            "SEMANA 5: Refinei mecanismo baseado em dados reais",
            "SEMANA 6: Configurei sistema de agendamento automático",
            "SEMANAS 7-8: Mantive rotina semanal consistente",
            "Acompanhei todas as métricas semanalmente",
            "Taxa de conversão melhorou vs. primeiros 30 dias",
            "Tenho pelo menos 2 novos clientes iniciados"
          ]
        }
      },
      {
        id: "escala",
        title: "FASE 3: Dias 61-90 - Escala e Autoridade",
        content: `## FASE 3: DIAS 61-90 - ESCALA E AUTORIDADE

**OBJETIVO:** Estabelecer autoridade no nicho, sistematizar processos e escalar resultados sem aumentar proporcionalmente o esforço.

---

### 🎯 FOCO DA FASE 3

**Autoridade + Sistematização.** Você não é mais 'mais uma terapeuta' - você é **A ESPECIALISTA** em [SEU MECANISMO].

---

## SEMANA 9: Posicionamento de Autoridade

### Segunda-feira (Dia 57)

* Criar **'Manifesto do [NOME DO MECANISMO]'**
  * 3-5 parágrafos sobre por que você criou
  * O que você acredita que está errado na abordagem tradicional
  * Sua visão para o futuro do tratamento de [PROBLEMA]
* Postar como carrossel ou artigo

📊 **Meta:** 50+ salvamentos

---

### Terça-feira (Dia 58)

* Buscar oportunidade de colaboração/guest post/podcast
* Alcançar 3-5 perfis/podcasts do seu nicho

📊 **Meta:** 1+ resposta positiva

---

### Quarta-feira (Dia 59)

* Criar **'Guia Gratuito'** sobre [TEMA RELACIONADO AO MECANISMO]
  * PDF de 5-10 páginas
  * Conteúdo educativo valioso
  * Menção ao mecanismo como solução completa
* Adicionar CTA no final para agendar conversa

⏱ **Tempo estimado:** 3-4 horas

---

### Quinta-feira (Dia 60)

* Anunciar guia gratuito em post + stories
* Coletar emails de interessados

📊 **Meta:** 20+ downloads

---

### Sexta-feira (Dia 61)

* Fazer post **'AMA'** (Ask Me Anything) sobre o mecanismo
* Responder TODAS as perguntas em comentários ou DM

📊 **Meta:** 15+ perguntas

---

## SEMANA 10: Sistematização

### Segunda-feira (Dia 64)

* Criar banco de respostas prontas para DMs recorrentes
* Organizar em documento acessível

⏱ **Tempo estimado:** 2 horas | **Economiza:** 5+ horas/mês

---

### Terça-feira (Dia 65)

* Criar template de acompanhamento pós-conversa inicial
* Automatizar envio (email ou WhatsApp)

💡 **Aumenta conversão em 15-20%**

---

### Quarta-feira (Dia 66)

* Gravar série de 3-5 vídeos curtos sobre mecanismo
* Banco de conteúdo para próximas semanas

⏱ **Tempo estimado:** 2 horas | **Resultado:** Conteúdo para 3-5 semanas

---

### Quinta-feira (Dia 67)

* Analisar pipeline completo: da primeira visita ao agendamento
  * Onde as pessoas travam?
  * Qual etapa tem mais 'vazamento'?
* Definir 1-2 ajustes prioritários

⏱ **Tempo estimado:** 2 horas

---

### Sexta-feira (Dia 68)

* Implementar ajustes identificados
* Fazer post da semana (use conteúdo do banco)

---

## SEMANAS 11-12: Consolidação e Planejamento Futuro

### ATIVIDADES PRINCIPAIS:

* Manter ritmo de 1 post educativo/semana
* Realizar conversas iniciais consistentemente
* Responder todas as interações em até 24h
* Coletar depoimentos de clientes (com autorização)

---

## REVISÃO COMPLETA DOS 90 DIAS (Dia 90)

### 📊 MÉTRICAS FINAIS:

* Total de conversas iniciais: **_____**
* Total de novos clientes: **_____**
* Taxa conversão final: **_____ %**
* Crescimento de seguidores: **_____**
* Engajamento médio: **_____**

---

### 💭 REFLEXÕES:

* O que funcionou melhor que esperado?
* O que precisa mais trabalho?
* Você se sente confiante explicando seu mecanismo?
* Clientes reconhecem seu diferencial?

---

### ✅ CHECKPOINT 90 DIAS

Se você seguiu este plano, você agora tem:

* ✅ Comunicação consistente em todos os canais
* ✅ Mecanismo testado e refinado com dados reais
* ✅ Pipeline de aquisição funcionando
* ✅ Autoridade crescente no nicho
* ✅ Sistemas automatizados economizando tempo

> **Use o Assistente IA:** Peça para ele te ajudar a analisar seus 90 dias completos e planejar os próximos passos.`,
        exercise: {
          title: "Reflexão Completa dos 90 Dias",
          description: "Escreva uma reflexão profunda sobre sua jornada completa nos últimos 90 dias. O que mudou? O que você aprendeu? Quais foram os maiores desafios e conquistas? Como você se sente em relação ao seu MTU agora?",
          type: "textarea",
          items: []
        }
      },
      {
        id: "proximo-nivel",
        title: "Após os 90 Dias: Próximo Nível",
        content: `## APÓS OS 90 DIAS: MANUTENÇÃO E CRESCIMENTO

Se você seguiu este plano, você completou uma **transformação completa**.

---

## TRANSFORMAÇÃO COMPLETA

### ANTES:
* Invisível
* Competindo por preço
* Sem diferencial claro
* Comunicação genérica

### DEPOIS:
* Posicionada como especialista única
* Mecanismo proprietário
* Comunicação consistente
* Autoridade crescente

---

## PRÓXIMOS PASSOS (DIA 91+)

Escolha **UMA** opção e commit por mais 90 dias. **Consistência > Mudança constante.**

---

## OPÇÃO A: Manutenção Estável

**Se sua agenda está cheia e você quer manter estabilidade:**

* Continue 1 post/semana de qualidade
* Mantenha conversas iniciais para lista de espera
* Foque em excelência com clientes atuais

### Para Quem:
Terapeutas que preferem estabilidade e qualidade ao crescimento agressivo.

---

## OPÇÃO B: Escala Agressiva

**Se quer crescer significativamente:**

* Aumentar frequência de posts (2-3x/semana)
* Investir em tráfego pago (anúncios)
* Criar produto digital (curso/grupo) baseado no mecanismo
* Buscar parcerias estratégicas
* Contratar assistente/VA para tarefas administrativas

### Para Quem:
Terapeutas que querem expandir significativamente a base de clientes.

---

## OPÇÃO C: Autoridade e Premium

**Se quer se posicionar como referência máxima:**

* Escrever artigos em publicações relevantes
* Participar de podcasts/lives como especialista
* Ministrar workshops/palestras sobre o mecanismo
* Aumentar preços (autoridade = valor)
* Focar em nicho ainda mais específico

### Para Quem:
Terapeutas que querem ser reconhecidos como autoridade máxima no nicho.

---

## LEMBRETE FINAL

### ✅ Este protocolo funciona.

Mas **só se você IMPLEMENTAR**. 

Conhecimento sem ação = zero.

---

### 🔄 Volte a Este Documento

Sempre que precisar recalibrar, volte:
* Ao Módulo 1 para lembrar por que você estava invisível
* Ao Módulo 2 para refinar seu mecanismo
* Ao Módulo 3 para atualizar seus scripts
* Ao Módulo 4 para recomeçar um ciclo de 90 dias

---

## PARABÉNS! 🎉

Você não é mais **'mais uma terapeuta'**. 

Você é **A TERAPEUTA** com [NOME DO SEU MECANISMO].

Isso é **propriedade intelectual real** que ninguém pode copiar.

---

### 📊 Mantenha as Métricas

Continue acompanhando trimestralmente:
* Taxa de conversão de conversas
* Número de novos clientes/mês
* Engajamento médio nas redes
* Crescimento de autoridade (seguidores, convites)

---

### 🎯 Estabeleça Novos Ciclos

Depois dos primeiros 90 dias, estabeleça novos ciclos:
* **90 dias de manutenção** (consolidar)
* **90 dias de expansão** (novos canais)
* **90 dias de autoridade** (conteúdo premium)

---

### 💡 Continue Inovando

Seu mecanismo não é estático. A cada 6-12 meses:
* Revise baseado em novos aprendizados
* Adicione elementos que funcionaram
* Retire o que não ressoa
* Mantenha a essência, refine a execução

---

## CONCLUSÃO DO PROTOCOLO MTU™

Você completou o **Protocolo MTU™** - Mecanismo Terapêutico Único.

**Você agora tem:**
1. ✅ Diagnóstico completo da sua invisibilidade (Módulo 1)
2. ✅ Mecanismo único validado e nomeado (Módulo 2)
3. ✅ Scripts para todos os pontos de contato (Módulo 3)
4. ✅ Plano de 90 dias implementado (Módulo 4)

---

### 🚀 Boa Sorte!

Este é apenas o começo. **Implementação consistente** é o que separa quem tem sucesso de quem apenas sabe a teoria.

Você tem as ferramentas. Agora é **executar**.

> **Use o Assistente IA sempre que precisar:** Ele está aqui para te apoiar em cada etapa da jornada.

**Sucesso! 🎉**`,
        exercise: {
          title: "Planeje Seus Próximos 90 Dias",
          description: "Escolha sua estratégia e planeje o próximo ciclo.",
          type: "checklist",
          items: [
            "Revisei minha transformação completa (ANTES/DEPOIS)",
            "Escolhi minha opção (A: Manutenção / B: Escala / C: Autoridade)",
            "Defini métricas para acompanhar trimestralmente",
            "Planejei meu próximo ciclo de 90 dias",
            "Salvei este protocolo para consultas futuras",
            "Estou comprometida com implementação consistente"
          ]
        }
      }
    ]
  },
  "bonus-1": {
    title: "Análise de Concorrência",
    subtitle: "Bônus 1",
    description: "Identifique o que seus competidores estão fazendo (e deixando de fazer).",
    duration: "60 min",
    lessons: [
      {
        id: "selecao",
        title: "Seleção de Concorrentes",
        content: `## Planilha de Análise de Concorrência

A análise de concorrência **não é para copiar** - é para **diferenciar-se estrategicamente**.

Este framework revela padrões do mercado, gaps de comunicação e oportunidades de posicionamento único que seus concorrentes deixaram abertas.

---

### 🎯 OBJETIVO

Ao final desta análise, você saberá exatamente **onde o mercado é igual** (e como ser diferente).

---

### Como Usar Esta Planilha:

1. ✓ Selecione 5 concorrentes diretos (mesmo nicho + público)
2. ✓ Preencha cada seção da análise com honestidade
3. ✓ Identifique padrões: onde todos são iguais?
4. ✓ Encontre seu espaço de diferenciação

---

## PARTE 1: SELEÇÃO DE CONCORRENTES

Antes de analisar, escolha os concorrentes certos. Não pegue qualquer terapeuta - pegue quem **compete diretamente** pelo mesmo cliente que você quer.

---

### Critérios de Seleção

* ✓ **Mesmo nicho:** Se você atende ansiedade, não analise terapeuta de casal
* ✓ **Mesmo público:** Se atende mulheres 30-45 anos, foque nesse perfil
* ✓ **Mesmo formato:** Online vs. presencial (ou ambos)
* ✓ **Presença ativa:** Tem site/Instagram ativos (não inativos há 6 meses)

---

### Tipos de Concorrentes para Incluir

* **2 competidores diretos locais** (mesma cidade/região)
* **2 competidores online conhecidos** (bom posicionamento digital)
* **1 referência aspiracional** (quem você gostaria de ser em 2 anos)

---

## Seus 5 Concorrentes

Preencha abaixo:

### Concorrente 1
* **Nome/Perfil:** _________________________________
* **Nicho/Problema:** _________________________________
* **Por que escolhi:** _________________________________

### Concorrente 2
* **Nome/Perfil:** _________________________________
* **Nicho/Problema:** _________________________________
* **Por que escolhi:** _________________________________

### Concorrente 3
* **Nome/Perfil:** _________________________________
* **Nicho/Problema:** _________________________________
* **Por que escolhi:** _________________________________

### Concorrente 4
* **Nome/Perfil:** _________________________________
* **Nicho/Problema:** _________________________________
* **Por que escolhi:** _________________________________

### Concorrente 5
* **Nome/Perfil:** _________________________________
* **Nicho/Problema:** _________________________________
* **Por que escolhi:** _________________________________

---

### ✅ Próximo Passo

Depois de selecionar seus 5 concorrentes, vá para a próxima lição para analisar a comunicação deles.

> **Use o Assistente IA:** Peça para ele te ajudar a identificar concorrentes relevantes no seu nicho.`,
        exercise: {
          title: "Selecione Seus 5 Concorrentes",
          description: "Liste os 5 concorrentes que você vai analisar.",
          type: "checklist",
          items: [
            "Identifiquei 2 competidores diretos locais",
            "Identifiquei 2 competidores online conhecidos",
            "Identifiquei 1 referência aspiracional",
            "Verifiquei que todos têm presença ativa",
            "Anotei nome, nicho e motivo de cada um"
          ]
        }
      },
      {
        id: "comunicacao",
        title: "Análise de Comunicação",
        content: `## Análise de Comunicação

Como cada concorrente se apresenta? O que eles dizem (e não dizem) sobre si mesmos?

---

## 2.1 - Bio/Apresentação

Para cada concorrente, copie **exatamente** como eles se apresentam na bio do Instagram/LinkedIn/Site.

---

### Concorrente 1
* **Bio/Apresentação Exata:**
  _________________________________________________________________________
* **O que comunicam?**
  _________________________________________________________________________

### Concorrente 2
* **Bio/Apresentação Exata:**
  _________________________________________________________________________
* **O que comunicam?**
  _________________________________________________________________________

### Concorrente 3
* **Bio/Apresentação Exata:**
  _________________________________________________________________________
* **O que comunicam?**
  _________________________________________________________________________

### Concorrente 4
* **Bio/Apresentação Exata:**
  _________________________________________________________________________
* **O que comunicam?**
  _________________________________________________________________________

### Concorrente 5
* **Bio/Apresentação Exata:**
  _________________________________________________________________________
* **O que comunicam?**
  _________________________________________________________________________

---

## ANÁLISE DE PADRÕES - Bio

Responda:

* Todos mencionam credenciais (CRP, anos de experiência)? ☐ Sim  ☐ Não
* Todos falam do problema que resolvem? ☐ Sim  ☐ Não
* Alguém explica COMO trabalha (método/processo)? ☐ Sim  ☐ Não
* Alguém tem nome proprietário do método? ☐ Sim  ☐ Não

**Principal palavra/frase repetida por todos:** _________________________________

---

### 💡 INSIGHT

Se todos usam as mesmas palavras/estrutura, essa é sua **oportunidade de diferenciação**.

---

## 2.2 - Estrutura de Site

Visite o site de cada concorrente (se tiverem) e mapeie a estrutura.

---

### Concorrente 1
* **Tem Site?** ☐ Sim  ☐ Não
* **Páginas Principais:** _________________________________
* **Headline Principal:** _________________________________

### Concorrente 2
* **Tem Site?** ☐ Sim  ☐ Não
* **Páginas Principais:** _________________________________
* **Headline Principal:** _________________________________

### Concorrente 3
* **Tem Site?** ☐ Sim  ☐ Não
* **Páginas Principais:** _________________________________
* **Headline Principal:** _________________________________

### Concorrente 4
* **Tem Site?** ☐ Sim  ☐ Não
* **Páginas Principais:** _________________________________
* **Headline Principal:** _________________________________

### Concorrente 5
* **Tem Site?** ☐ Sim  ☐ Não
* **Páginas Principais:** _________________________________
* **Headline Principal:** _________________________________

---

## ANÁLISE DE PADRÕES - Site

* Quantos têm site profissional? **_____ de 5**
* Quantos têm página 'Como Funciona' ou similar? **_____ de 5**
* Quantos explicam processo/método no site? **_____ de 5**
* Estrutura de headline mais comum: **_________________________________**

---

### 💡 INSIGHT

Maioria não tem site OU tem site genérico = **oportunidade de profissionalismo superior**.

> **Use o Assistente IA:** Peça para ele te ajudar a analisar e categorizar os padrões que você identificou.`,
        exercise: {
          title: "Complete a Análise de Comunicação",
          description: "Analise como cada concorrente se comunica.",
          type: "checklist",
          items: [
            "Copiei as bios dos 5 concorrentes",
            "Identifiquei padrões nas bios",
            "Analisei estrutura de sites (quando existem)",
            "Identifiquei headlines mais comuns",
            "Anotei insights sobre oportunidades de diferenciação"
          ]
        }
      },
      {
        id: "posicionamento",
        title: "Análise de Posicionamento",
        content: `## Análise de Posicionamento

O posicionamento é **COMO** o concorrente se diferencia (ou tenta se diferenciar) no mercado.

---

## 3.1 - Promessas e Resultados

O que cada concorrente promete ou comunica como resultado?

---

### Concorrente 1
* **Promessa Principal:** _________________________________
* **É Específico ou Vago?** ☐ Específico  ☐ Vago

### Concorrente 2
* **Promessa Principal:** _________________________________
* **É Específico ou Vago?** ☐ Específico  ☐ Vago

### Concorrente 3
* **Promessa Principal:** _________________________________
* **É Específico ou Vago?** ☐ Específico  ☐ Vago

### Concorrente 4
* **Promessa Principal:** _________________________________
* **É Específico ou Vago?** ☐ Específico  ☐ Vago

### Concorrente 5
* **Promessa Principal:** _________________________________
* **É Específico ou Vago?** ☐ Específico  ☐ Vago

---

## ANÁLISE DE PADRÕES - Promessas

**Promessas mais comuns** (ex: 'superar ansiedade', 'viver melhor', etc.):

1. _________________________________
2. _________________________________
3. _________________________________

* Quantos fazem promessas **específicas e mensuráveis**? **_____ de 5**
* Quantos fazem promessas **vagas/genéricas**? **_____ de 5**

---

## 3.2 - Diferenciação Declarada

Como cada um diz ser diferente? (se é que dizem)

---

### Concorrente 1
* **Como dizem ser diferentes?** _________________________________
* **Tipo de diferencial:** ☐ Credencial  ☐ Experiência  ☐ Método  ☐ Nada

### Concorrente 2
* **Como dizem ser diferentes?** _________________________________
* **Tipo de diferencial:** ☐ Credencial  ☐ Experiência  ☐ Método  ☐ Nada

### Concorrente 3
* **Como dizem ser diferentes?** _________________________________
* **Tipo de diferencial:** ☐ Credencial  ☐ Experiência  ☐ Método  ☐ Nada

### Concorrente 4
* **Como dizem ser diferentes?** _________________________________
* **Tipo de diferencial:** ☐ Credencial  ☐ Experiência  ☐ Método  ☐ Nada

### Concorrente 5
* **Como dizem ser diferentes?** _________________________________
* **Tipo de diferencial:** ☐ Credencial  ☐ Experiência  ☐ Método  ☐ Nada

---

## ANÁLISE DE PADRÕES - Diferenciação

* Quantos mencionam **anos de experiência** como diferencial? **_____ de 5**
* Quantos mencionam **certificações/formações**? **_____ de 5**
* Quantos explicam um **MÉTODO ou PROCESSO** específico? **_____ de 5**
* Quantos **não mencionam nenhum diferencial** claro? **_____ de 5**

**Principal GAP identificado:**
_________________________________________________________________________
_________________________________________________________________________

---

### 💡 INSIGHT CRÍTICO

Se ninguém explica COMO trabalha, você tem **oportunidade de ouro** ao comunicar seu mecanismo.

> **Use o Assistente IA:** Peça para ele te ajudar a identificar gaps de posicionamento únicos.`,
        exercise: {
          title: "Analise Posicionamento dos Concorrentes",
          description: "Identifique como cada um se posiciona e se diferencia.",
          type: "checklist",
          items: [
            "Identifiquei promessas de cada concorrente",
            "Classifiquei como específicas ou vagas",
            "Identifiquei tipos de diferenciação usados",
            "Contei quantos usam método vs. credenciais",
            "Identifiquei principal GAP de posicionamento"
          ]
        }
      },
      {
        id: "mecanismo",
        title: "Análise de Mecanismo e Conteúdo",
        content: `## Análise de Mecanismo

Esta é a seção **mais importante**. Você vai descobrir se algum concorrente tem mecanismo único (e como é).

---

## 5.1 - Mecanismo Comunicado

### Concorrente 1
* **Tem Mecanismo Específico?** ☐ Sim  ☐ Não  ☐ Vago
* **Se Sim, Como é Chamado?** _________________________________

### Concorrente 2
* **Tem Mecanismo Específico?** ☐ Sim  ☐ Não  ☐ Vago
* **Se Sim, Como é Chamado?** _________________________________

### Concorrente 3
* **Tem Mecanismo Específico?** ☐ Sim  ☐ Não  ☐ Vago
* **Se Sim, Como é Chamado?** _________________________________

### Concorrente 4
* **Tem Mecanismo Específico?** ☐ Sim  ☐ Não  ☐ Vago
* **Se Sim, Como é Chamado?** _________________________________

### Concorrente 5
* **Tem Mecanismo Específico?** ☐ Sim  ☐ Não  ☐ Vago
* **Se Sim, Como é Chamado?** _________________________________

---

## 5.2 - Detalhamento do Mecanismo

**Para cada concorrente que TEM mecanismo, responda:**

### Detalhamento (Concorrente ___)

* **Nome do mecanismo:** _________________________________
* **Tem fases/etapas?** ☐ Sim  ☐ Não  | **Quantas?** _____
* **Explica o diferencial?** ☐ Sim  ☐ Não

**Como funciona (resumo):**
_________________________________________________________________________
_________________________________________________________________________

---

## ANÁLISE FINAL DE MECANISMOS

* Quantos têm mecanismo **claro e nomeado**? **_____ de 5**
* Se algum tem, é **realmente diferente** ou genérico? _________________________
* Você pode criar algo mais específico/claro? ☐ Sim  ☐ Não

---

### 🎯 VERDADE

Se **menos de 2 de 5** têm mecanismo claro, você tem **vantagem competitiva ENORME** ao criar o seu.

---

## Análise de Conteúdo

Que tipo de conteúdo cada concorrente produz? Frequência? Qualidade?

---

### Concorrente 1
* **Seguidores:** _______
* **Frequência Posts:** ☐ Diário  ☐ Semanal  ☐ Raro
* **Tipo de Conteúdo:** ☐ Educativo  ☐ Pessoal  ☐ Motivacional
* **Engajamento:** ☐ Alto  ☐ Médio  ☐ Baixo

### Concorrente 2
* **Seguidores:** _______
* **Frequência Posts:** ☐ Diário  ☐ Semanal  ☐ Raro
* **Tipo de Conteúdo:** ☐ Educativo  ☐ Pessoal  ☐ Motivacional
* **Engajamento:** ☐ Alto  ☐ Médio  ☐ Baixo

### Concorrente 3
* **Seguidores:** _______
* **Frequência Posts:** ☐ Diário  ☐ Semanal  ☐ Raro
* **Tipo de Conteúdo:** ☐ Educativo  ☐ Pessoal  ☐ Motivacional
* **Engajamento:** ☐ Alto  ☐ Médio  ☐ Baixo

### Concorrente 4
* **Seguidores:** _______
* **Frequência Posts:** ☐ Diário  ☐ Semanal  ☐ Raro
* **Tipo de Conteúdo:** ☐ Educativo  ☐ Pessoal  ☐ Motivacional
* **Engajamento:** ☐ Alto  ☐ Médio  ☐ Baixo

### Concorrente 5
* **Seguidores:** _______
* **Frequência Posts:** ☐ Diário  ☐ Semanal  ☐ Raro
* **Tipo de Conteúdo:** ☐ Educativo  ☐ Pessoal  ☐ Motivacional
* **Engajamento:** ☐ Alto  ☐ Médio  ☐ Baixo

---

## ANÁLISE DE PADRÕES - Conteúdo

**Temas mais comuns nos posts:**

1. _________________________________
2. _________________________________
3. _________________________________

* Quantos postam consistentemente (3+ vezes/semana)? **_____ de 5**
* Quantos produzem conteúdo educativo de qualidade? **_____ de 5**
* Quantos têm engajamento alto (comments/saves)? **_____ de 5**

**Maior oportunidade de conteúdo não explorada:**
_________________________________________________________________________

> **Use o Assistente IA:** Peça para ele te ajudar a identificar oportunidades de conteúdo que seus concorrentes não estão explorando.`,
        exercise: {
          title: "Analise Mecanismos e Conteúdo",
          description: "Identifique se concorrentes têm mecanismos únicos e como produzem conteúdo.",
          type: "checklist",
          items: [
            "Identifiquei quais têm mecanismo específico",
            "Analisei detalhamento dos mecanismos existentes",
            "Contei quantos têm mecanismo claro",
            "Analisei frequência e tipo de conteúdo",
            "Identifiquei oportunidades de conteúdo não exploradas"
          ]
        }
      },
      {
        id: "sintese",
        title: "Síntese Estratégica",
        content: `## Síntese Estratégica

Agora que você analisou tudo, é hora de sintetizar **insights acionáveis**.

---

## Preços e Posicionamento de Valor

Como cada concorrente comunica valor? Preços são visíveis ou ocultos?

---

### Concorrente 1
* **Preço Visível?** ☐ Sim  ☐ Não  ☐ Consulte
* **Valor Aproximado:** R$ _______
* **Como Justifica Preço?** ☐ Experiência  ☐ Resultado  ☐ Nada

### Concorrente 2
* **Preço Visível?** ☐ Sim  ☐ Não  ☐ Consulte
* **Valor Aproximado:** R$ _______
* **Como Justifica Preço?** ☐ Experiência  ☐ Resultado  ☐ Nada

### Concorrente 3
* **Preço Visível?** ☐ Sim  ☐ Não  ☐ Consulte
* **Valor Aproximado:** R$ _______
* **Como Justifica Preço?** ☐ Experiência  ☐ Resultado  ☐ Nada

### Concorrente 4
* **Preço Visível?** ☐ Sim  ☐ Não  ☐ Consulte
* **Valor Aproximado:** R$ _______
* **Como Justifica Preço?** ☐ Experiência  ☐ Resultado  ☐ Nada

### Concorrente 5
* **Preço Visível?** ☐ Sim  ☐ Não  ☐ Consulte
* **Valor Aproximado:** R$ _______
* **Como Justifica Preço?** ☐ Experiência  ☐ Resultado  ☐ Nada

---

## ANÁLISE DE PADRÕES - Preços

* Quantos mostram preços abertamente? **_____ de 5**
* Faixa de preço mais comum: **R$ _______ a R$ _______**
* Alguém justifica preço com mecanismo único? ☐ Sim  ☐ Não
* Maioria compete por: ☐ Preço  ☐ Valor

---

### 💡 INSIGHT

Se maioria não justifica preço com diferencial, **mecanismo único permite cobrar mais** sem resistência.

---

## 7.1 - O Que Todos Fazem Igual

**(Estas são as armadilhas de commoditização - EVITE)**

1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________

---

## 7.2 - O Que Ninguém Faz (GAPS)

**(Estas são suas oportunidades de ouro - EXPLORE)**

1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________

---

## 7.3 - Seu Espaço de Diferenciação

Baseado na análise acima, onde você pode ser **ÚNICA**?

**Meu diferencial será:**
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________

**Por que isso me diferencia:**
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________

---

## 7.4 - Plano de Ação Baseado na Análise

Com base nos insights, o que você vai fazer **DIFERENTE**?

* **Na comunicação:** _________________________________________________
* **No posicionamento:** _________________________________________________
* **No conteúdo:** _________________________________________________
* **No mecanismo:** _________________________________________________

---

## ✅ PARABÉNS!

Você agora tem **visão cristalina do mercado** e sabe exatamente onde se posicionar para ser ÚNICA.

Use estes insights ao criar/refinar seu Mecanismo Terapêutico Único.

> **Use o Assistente IA:** Peça para ele te ajudar a sintetizar todos os insights e criar seu plano de diferenciação estratégico.`,
        exercise: {
          title: "Complete a Síntese Estratégica",
          description: "Transforme toda a análise em insights acionáveis.",
          type: "checklist",
          items: [
            "Analisei preços e justificativas de valor",
            "Listei o que todos fazem igual (evitar)",
            "Listei gaps que ninguém explora (oportunidades)",
            "Defini meu espaço único de diferenciação",
            "Criei plano de ação para cada área",
            "Documentei todos os insights para usar no meu MTU"
          ]
        }
      }
    ]
  }
};

export default function Module() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const moduleId = params.id || "1";
  const module = moduleContent[moduleId];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // API hooks
  const utils = trpc.useUtils();
  const { data: user } = trpc.auth.getCurrentUser.useQuery();
  const { data: progressData, refetch: refetchProgress } = trpc.progress.getByModule.useQuery(
    { moduleId: `modulo-${moduleId}` },
    { enabled: !!user }
  );
  const completeLessonMutation = trpc.progress.completeLesson.useMutation();
  const completeModuleMutation = trpc.progress.completeModule.useMutation();
  const saveExerciseMutation = trpc.exercises.save.useMutation();

  // Load progress from database
  useEffect(() => {
    if (progressData) {
      const completed = progressData
        .filter(p => p.completed === 1 && p.lessonId !== "_module_complete")
        .map(p => p.lessonId)
        .filter((id): id is string => id !== null);
      setCompletedLessons(completed);
    }
  }, [progressData]);

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  if (!module) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Módulo não encontrado</CardTitle>
            <CardDescription>
              O módulo "{moduleId}" não existe.
              <br />
              Módulos disponíveis: {Object.keys(moduleContent).join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCompleteModule = async () => {
    // Mark last lesson as complete if not already
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
      if (user) {
        try {
          await completeLessonMutation.mutateAsync({
            moduleId: `modulo-${moduleId}`,
            lessonId: currentLesson.id,
          });
        } catch (error) {
          console.error("Error saving lesson progress:", error);
        }
      }
    }

    // Mark module as complete
    if (user) {
      try {
        await completeModuleMutation.mutateAsync({
          moduleId: `modulo-${moduleId}`,
        });

        // Force refetch progress and invalidate all progress queries
        await refetchProgress();
        await utils.progress.getAll.invalidate();
        await utils.progress.getStats.invalidate();

        toast.success("Módulo concluído com sucesso!");

        // Navigate using wouter to preserve cache
        setTimeout(() => {
          setLocation("/dashboard");
        }, 300);
      } catch (error) {
        console.error("Error completing module:", error);
        toast.error("Erro ao salvar progresso do módulo");
      }
    } else {
      setLocation("/dashboard");
    }
  };

  const currentLesson = module.lessons[currentLessonIndex];
  const progress = Math.round((completedLessons.length / module.lessons.length) * 100);

  const handleNextLesson = async () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);

      // Save to database if logged in
      if (user) {
        try {
          await completeLessonMutation.mutateAsync({
            moduleId: `modulo-${moduleId}`,
            lessonId: currentLesson.id,
          });
          refetchProgress();
        } catch (error) {
          console.error("Error saving progress:", error);
        }
      }
    }
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const toggleCheckItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar ao Dashboard
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium text-primary">{module.subtitle}</span>
              <h1 className="text-3xl font-display font-bold mt-1">{module.title}</h1>
              <p className="text-muted-foreground mt-2">{module.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {module.duration}
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso do módulo</span>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Lesson Navigation */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Lições</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50 ${index === currentLessonIndex ? 'bg-primary/10 text-primary' : ''
                      }`}
                  >
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                    )}
                    <span className="line-clamp-2">{lesson.title}</span>
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <BookOpen className="h-4 w-4" />
                  Lição {currentLessonIndex + 1} de {module.lessons.length}
                </div>
                <CardTitle className="font-display text-xl">{currentLesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-neutral max-w-none">
                  <Streamdown>{currentLesson.content}</Streamdown>
                </div>
              </CardContent>
            </Card>

            {/* Exercise */}
            {currentLesson.exercise && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <CardTitle className="font-display text-lg">{currentLesson.exercise.title}</CardTitle>
                  </div>
                  <CardDescription>{currentLesson.exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {currentLesson.exercise.type === "checklist" && currentLesson.exercise.items && (
                    <div className="space-y-3">
                      {currentLesson.exercise.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Checkbox
                            id={`item-${index}`}
                            checked={checkedItems[item] || false}
                            onCheckedChange={() => toggleCheckItem(item)}
                          />
                          <label
                            htmlFor={`item-${index}`}
                            className="text-sm cursor-pointer"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentLesson.exercise.type === "reflection" && (
                    <p className="text-sm text-muted-foreground italic">
                      Reserve um momento para refletir sobre esta questão antes de continuar.
                    </p>
                  )}
                  {currentLesson.exercise.type === "textarea" && (
                    <AutoSaveTextarea
                      moduleId={moduleId}
                      exerciseId={currentLesson.id}
                      placeholder={currentLesson.exercise.description || "Digite sua resposta aqui..."}
                      minHeight="200px"
                      label={currentLesson.exercise.title}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevLesson}
                disabled={currentLessonIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>

              {currentLessonIndex === module.lessons.length - 1 ? (
                <Button
                  onClick={handleCompleteModule}
                  className="bg-primary hover:bg-primary/90"
                  disabled={completeModuleMutation.isPending}
                >
                  {completeModuleMutation.isPending ? "Salvando..." : "Concluir Módulo"}
                  <CheckCircle2 className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleNextLesson} className="bg-primary hover:bg-primary/90">
                  Próxima Lição
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
