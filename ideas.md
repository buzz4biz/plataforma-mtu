# Ideas de Design - Assistente MTU™

## Contexto do Projeto
O Assistente MTU™ é um agente de IA especializado em ajudar terapeutas a descobrir, nomear e comunicar seu Mecanismo Terapêutico Único. A interface precisa transmitir profissionalismo, confiança e clareza - valores essenciais para terapeutas que buscam diferenciação no mercado.

---

<response>
## Ideia 1: Neo-Brutalism Terapêutico
<probability>0.06</probability>

### Design Movement
Neo-Brutalism com toques de warmth - combinando formas geométricas ousadas com cores quentes e acolhedoras.

### Core Principles
1. **Contraste Intencional**: Bordas duras com cores suaves
2. **Tipografia Bold**: Títulos impactantes que comunicam autoridade
3. **Espaços Definidos**: Blocos claros de conteúdo sem ambiguidade
4. **Autenticidade Visual**: Design que não tenta ser "bonito demais"

### Color Philosophy
- **Primária**: Terracota profundo (#C45C26) - calor, terra, fundação
- **Secundária**: Creme quente (#F5F0E8) - acolhimento, papel
- **Acento**: Verde musgo (#4A5D4C) - crescimento, natureza
- **Neutro**: Grafite (#2D2D2D) - profissionalismo

### Layout Paradigm
Blocos assimétricos empilhados com bordas grossas (3-4px). Cards com sombras offset (box-shadow: 4px 4px 0px). Chat centralizado com sidebar de navegação à esquerda.

### Signature Elements
1. Bordas pretas grossas em elementos interativos
2. Ícones desenhados à mão para humanização
3. Backgrounds com textura de papel sutil

### Interaction Philosophy
Transições rápidas e "snappy" (150ms). Hover states com mudança de cor de fundo instantânea. Feedback tátil através de mudanças de sombra.

### Animation
- Entrada de mensagens: slide-in lateral com bounce sutil
- Botões: scale(0.98) no click
- Loading: três pontos pulsando em sequência

### Typography System
- Display: **Space Grotesk** (700) para títulos
- Body: **Inter** (400, 500) para texto corrido
- Hierarquia: 32px → 24px → 18px → 16px → 14px
</response>

---

<response>
## Ideia 2: Organic Minimalism Clínico
<probability>0.08</probability>

### Design Movement
Organic Minimalism - inspirado em espaços de saúde premium escandinavos, com formas suaves e paleta natural.

### Core Principles
1. **Respiração Visual**: Muito espaço em branco intencional
2. **Formas Orgânicas**: Cantos arredondados, bordas suaves
3. **Hierarquia Sutil**: Diferenciação através de peso, não cor
4. **Calma Digital**: Interface que reduz ansiedade visual

### Color Philosophy
- **Primária**: Verde salvia (#7D9D8C) - calma, natureza, saúde
- **Secundária**: Off-white (#FAFAF8) - pureza, clareza
- **Acento**: Dourado suave (#C9A962) - valor, premium
- **Texto**: Cinza carvão (#3D3D3D) - legibilidade sem dureza

### Layout Paradigm
Layout centralizado com máximo 720px de largura para chat. Sidebar colapsável com ícones minimalistas. Muito padding (24px-48px). Grid de 8px para consistência.

### Signature Elements
1. Gradientes sutis de verde para criar profundidade
2. Ilustrações line-art de plantas/natureza
3. Micro-animações de "respiração" em elementos de loading

### Interaction Philosophy
Transições lentas e suaves (300-400ms ease-out). Estados hover com opacidade e blur sutil. Feedback gentil, nunca abrupto.

### Animation
- Mensagens: fade-in + translate-y suave
- Typing indicator: ondas suaves como respiração
- Transições de página: crossfade elegante

### Typography System
- Display: **Fraunces** (600) para títulos - serifa orgânica
- Body: **DM Sans** (400, 500) para texto
- Hierarquia: 28px → 22px → 18px → 16px → 14px
</response>

---

<response>
## Ideia 3: Professional Gradient Moderno
<probability>0.07</probability>

### Design Movement
Modern Professional - inspirado em SaaS premium como Linear e Notion, com gradientes sofisticados e glassmorphism sutil.

### Core Principles
1. **Profundidade Dimensional**: Camadas visuais claras
2. **Gradientes Propositais**: Cor como guia de atenção
3. **Clareza Funcional**: Cada elemento tem propósito óbvio
4. **Premium Acessível**: Sofisticado mas não intimidador

### Color Philosophy
- **Primária**: Índigo profundo (#4F46E5) - confiança, expertise
- **Gradiente Hero**: Índigo → Violeta (#7C3AED) - dinamismo
- **Secundária**: Slate (#F8FAFC) - neutralidade moderna
- **Acento**: Âmbar (#F59E0B) - energia, ação
- **Texto**: Slate 900 (#0F172A) - máxima legibilidade

### Layout Paradigm
Layout de duas colunas: sidebar fixa (280px) + área de chat fluida. Header sticky com breadcrumbs. Cards com glassmorphism (backdrop-blur + transparência).

### Signature Elements
1. Gradiente mesh no header/hero
2. Glow effects sutis em botões primários
3. Ícones com preenchimento gradiente

### Interaction Philosophy
Transições médias (200-250ms). Hover com glow e elevação. Estados de foco com ring colorido. Feedback imediato em ações.

### Animation
- Mensagens: slide-up com fade
- Botões: glow pulse no hover
- Loading: shimmer effect elegante
- Sidebar: collapse/expand com spring physics

### Typography System
- Display: **Plus Jakarta Sans** (700) para títulos
- Body: **Inter** (400, 500, 600) para texto
- Mono: **JetBrains Mono** para código/exemplos
- Hierarquia: 30px → 24px → 20px → 16px → 14px
</response>

---

## Decisão Final

**Escolhida: Ideia 2 - Organic Minimalism Clínico**

### Justificativa
Para um assistente que ajuda terapeutas, a abordagem Organic Minimalism é a mais adequada porque:

1. **Alinhamento com o público**: Terapeutas valorizam ambientes calmos e acolhedores
2. **Redução de ansiedade**: Interface que não sobrecarrega visualmente
3. **Profissionalismo sutil**: Transmite competência sem ser corporativo demais
4. **Diferenciação**: Evita o visual "tech startup" comum em chatbots
5. **Legibilidade**: Prioriza a leitura de textos longos (scripts, exemplos)

### Implementação
- Tema claro como padrão (terapeutas trabalham em ambientes iluminados)
- Verde salvia como cor principal (calma, saúde)
- Tipografia Fraunces + DM Sans para equilíbrio entre personalidade e legibilidade
- Animações suaves que não distraem
- Layout focado no chat com sidebar minimalista
