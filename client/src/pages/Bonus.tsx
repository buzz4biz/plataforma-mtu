import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Gift,
  Download,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Streamdown } from "streamdown";

const bonusContent: Record<string, {
  title: string;
  description: string;
  content: string;
}> = {
  "1": {
    title: "Planilha de Análise de Concorrência",
    description: "Analise seus concorrentes e encontre seu diferencial único no mercado.",
    content: `## Planilha de Análise de Concorrência

Esta ferramenta vai te ajudar a mapear o mercado e identificar oportunidades de diferenciação.

### Por Que Analisar a Concorrência?

Conhecer seus concorrentes não é para copiá-los, mas para **encontrar lacunas** que você pode preencher com seu MTU.

### Como Usar Esta Planilha

#### Passo 1: Liste seus 5 principais concorrentes
Identifique profissionais que:
- Atendem o mesmo público que você
- Oferecem serviços similares
- Estão na mesma faixa de preço

#### Passo 2: Analise cada um nos seguintes critérios

| Critério | O que observar |
|----------|----------------|
| **Posicionamento** | Como eles se descrevem? Qual é a promessa principal? |
| **Público-alvo** | Para quem eles falam? Qual é o perfil do cliente ideal? |
| **Diferencial** | O que eles dizem que fazem de diferente? |
| **Preço** | Qual é a faixa de preço dos serviços? |
| **Comunicação** | Como é o tom de voz? Formal, informal, técnico? |
| **Canais** | Onde eles estão presentes? Instagram, YouTube, LinkedIn? |
| **Pontos fortes** | O que eles fazem muito bem? |
| **Pontos fracos** | Onde eles deixam a desejar? |

#### Passo 3: Identifique padrões

Depois de analisar todos, responda:
- O que **todos** fazem igual?
- O que **ninguém** está fazendo?
- Onde está a **oportunidade** para você se diferenciar?

### Template de Análise

Para cada concorrente, preencha:

\`\`\`
Nome: _______________
Site/Instagram: _______________

Posicionamento: _______________
Público-alvo: _______________
Diferencial declarado: _______________
Faixa de preço: _______________
Pontos fortes: _______________
Pontos fracos: _______________
Oportunidade para mim: _______________
\`\`\`

### Conclusão da Análise

Após analisar todos os concorrentes, defina:

1. **Minha oportunidade única:** O que posso oferecer que ninguém mais oferece?
2. **Meu público específico:** Quem está mal atendido pelos concorrentes?
3. **Meu diferencial:** Como meu MTU preenche essa lacuna?

> **Dica:** Use o Assistente IA para ajudar a identificar padrões e oportunidades na sua análise.`
  },
  "2": {
    title: "Biblioteca de Gatilhos Mentais Éticos",
    description: "27 gatilhos psicológicos validados para comunicação terapêutica ética.",
    content: `## Biblioteca de Gatilhos Mentais Éticos
### 27 Gatilhos Psicológicos Validados Para Comunicação Terapêutica

**Gatilhos mentais não são manipulação** - são comunicação baseada em como o cérebro humano funciona.

Esta biblioteca contém 27 gatilhos validados pela psicologia e neurociência, adaptados eticamente para comunicação terapêutica. Use-os para ser compreendido, não para enganar.

> ⚠️ **PRINCÍPIO ÉTICO:** Gatilhos amplificam verdades, não criam mentiras. Use apenas para comunicar algo que você realmente entrega.

### Como Usar Esta Biblioteca

- Cada gatilho tem: definição + por que funciona + como usar + exemplos
- Combine 2-3 gatilhos por peça de comunicação (não 10 de uma vez)
- Adapte exemplos ao seu nicho e mecanismo
- Teste e veja o que ressoa com sua audiência

---

## CATEGORIA 1: Credibilidade e Confiança

### 1. AUTORIDADE

**Definição:** Pessoas obedecem e confiam em figuras de autoridade reconhecida.

**Por que funciona:** Atalho mental: 'Se é especialista, provavelmente está certo.' Economiza energia cognitiva.

**Como usar eticamente:** Demonstre expertise com credenciais reais, anos de prática, casos tratados, formações relevantes.

**Exemplos:**
- ❌ RUIM: 'Sou a melhor terapeuta de ansiedade' (vago, arrogante)
- ✅ BOM: 'Especialista em ansiedade há 8 anos, CRP 06/12345, pós-graduação em TCC'
- ✅ MELHOR: 'Nos últimos 8 anos, ajudei 200+ pessoas com ansiedade através do [MECANISMO]'

### 2. PROVA SOCIAL

**Definição:** Se outros fizeram, é mais seguro eu fazer também.

**Por que funciona:** Reduz risco percebido. 'Se funcionou para eles, pode funcionar para mim.'

**Como usar eticamente:** Compartilhe resultados anônimos, número de pessoas atendidas, depoimentos com autorização.

**Exemplos:**
- ❌ RUIM: 'Todos os meus clientes melhoram 100%' (mentira)
- ✅ BOM: 'Mais de 150 pessoas já passaram pelo [MECANISMO]'
- ✅ MELHOR: 'Cliente recente: de 8 crises/mês para 1-2, em 12 sessões' (específico, real)

### 3. CONSISTÊNCIA

**Definição:** Pessoas querem ser consistentes com compromissos anteriores e autoimagem.

**Por que funciona:** Incoerência gera desconforto psicológico (dissonância cognitiva).

**Como usar eticamente:** Faça pessoa se identificar com problema/solução, depois ofereça consistência através do seu trabalho.

**Exemplos:**
- ❌ RUIM: 'Você já disse que quer mudar, então tem que me contratar' (pressão)
- ✅ BOM: 'Se você acredita que ansiedade não deve controlar sua vida...'
- ✅ MELHOR: 'Você disse que quer tomar decisões sem paralisar. O [MECANISMO] te dá exatamente isso.'

### 4. RECIPROCIDADE

**Definição:** Quando alguém nos dá algo, sentimos obrigação de retribuir.

**Por que funciona:** Norma social profunda. Dívida psicológica gera desconforto até ser 'paga'.

**Como usar eticamente:** Dê valor genuíno ANTES de pedir algo. Posts educativos, guias gratuitos, insights valiosos.

**Exemplos:**
- ❌ RUIM: Dar 'brinde' inútil só para criar obrigação
- ✅ BOM: Compartilhar técnica gratuita de regulação emocional em post
- ✅ MELHOR: 'Guia gratuito de 10 páginas sobre [PROBLEMA] - depois, se quiser ir mais fundo, me procure'

### 5. SIMPATIA

**Definição:** Dizemos sim mais facilmente para pessoas que gostamos.

**Por que funciona:** Similaridade, elogios genuínos e cooperação geram conexão emocional.

**Como usar eticamente:** Seja autêntico, compartilhe vulnerabilidade apropriada, mostre valores similares, trate com empatia.

**Exemplos:**
- ❌ RUIM: Fingir histórias falsas para parecer 'igual'
- ✅ BOM: 'Também passei por ansiedade na faculdade'
- ✅ MELHOR: 'Criei este método porque vi que abordagem tradicional não funcionava comigo - talvez você se identifique'

---

## CATEGORIA 2: Urgência e Escassez

### 6. ESCASSEZ

**Definição:** Valorizamos mais o que é raro ou limitado.

**Por que funciona:** Medo de perder oportunidade (loss aversion). Raridade = valor.

**Como usar eticamente:** Comunique escassez REAL (agenda limitada, método específico, não atende todo perfil).

**Exemplos:**
- ❌ RUIM: 'Só 2 vagas' (mentira - sempre tem 2 vagas)
- ✅ BOM: 'Atendo máximo 15 clientes simultaneamente para manter qualidade'
- ✅ MELHOR: 'O [MECANISMO] funciona para ansiedade antecipatória, não para outros tipos - precisa fazer sentido para você'

### 7. URGÊNCIA

**Definição:** Tempo limitado motiva ação imediata.

**Por que funciona:** Procrastinação é default. Deadline real quebra inércia.

**Como usar eticamente:** Crie urgência REAL (problema piora, janela de mudança fecha, você tem agenda limitada).

**Exemplos:**
- ❌ RUIM: 'Promoção acaba HOJE' (toda semana)
- ✅ BOM: 'Agenda de janeiro já 70% preenchida'
- ✅ MELHOR: 'Ansiedade não tratada tende a piorar com tempo - quanto antes começar, mais fácil'

### 8. FOMO (Medo de Ficar de Fora)

**Definição:** Medo de perder experiência que outros estão tendo.

**Por que funciona:** Humanos são sociais. Ver outros progredindo enquanto ficamos parados dói.

**Como usar eticamente:** Mostre transformação real de outros sem criar inveja, mas inspiração.

**Exemplos:**
- ❌ RUIM: 'Todo mundo está melhorando menos você'
- ✅ BOM: 'Enquanto muitos adiam, alguns já estão na Fase 2 do processo'
- ✅ MELHOR: 'Imagine daqui 6 meses: você continua igual OU você está do outro lado, com ferramentas que funcionam?'

---

## CATEGORIA 3: Emoção e Conexão

### 9. NARRATIVA (Storytelling)

**Definição:** Cérebro processa histórias 22x melhor que fatos isolados.

**Por que funciona:** Histórias ativam emoção + memória. Dados convencem, histórias convertem.

**Como usar eticamente:** Conte jornadas reais (anônimas), use estrutura ANTES → PROCESSO → DEPOIS.

**Exemplos:**
- ❌ RUIM: 'Terapia funciona' (sem história)
- ✅ BOM: 'Cliente X chegou paralisada, hoje toma decisões com confiança'
- ✅ MELHOR: 'M., 34 anos, evitava reuniões há 2 anos. Primeira sessão: mapeamos gatilhos. Sessão 8: apresentou projeto para 30 pessoas. Não sem medo, mas com ferramentas.'

### 10. EMPATIA

**Definição:** Demonstrar compreensão profunda da dor/situação do outro.

**Por que funciona:** 'Essa pessoa me entende' desativa defesas, cria abertura.

**Como usar eticamente:** Descreva experiência interna específica, não generalizada. Mostre que você SABE como é.

**Exemplos:**
- ❌ RUIM: 'Sei que é difícil' (vago)
- ✅ BOM: 'Você acorda já cansada de pensar, né?'
- ✅ MELHOR: 'Aquele momento em que você precisa decidir algo simples e seu corpo congela, a respiração prende, e você adia mais uma vez - eu conheço esse ciclo.'

### 11. PERTENCIMENTO

**Definição:** Necessidade humana fundamental de fazer parte de grupo.

**Por que funciona:** Isolamento dói. 'Tem gente como eu' traz alívio.

**Como usar eticamente:** Crie identificação com perfil específico. 'Se você é X, este trabalho é para você.'

**Exemplos:**
- ❌ RUIM: 'Para todo mundo' (não gera pertencimento)
- ✅ BOM: 'Para mulheres 30-45 com burnout profissional'
- ✅ MELHOR: 'Se você é a pessoa que cuida de todos mas esquece de si, que diz sim quando queria dizer não, que está exausta de ser forte - você está no lugar certo.'

### 12. ESPERANÇA

**Definição:** Futuro melhor é possível E existe caminho claro.

**Por que funciona:** Desespero paralisa. Esperança + caminho ativa ação.

**Como usar eticamente:** Mostre transformação REALISTA + processo claro. Não prometa cura mágica.

**Exemplos:**
- ❌ RUIM: 'Você vai ser 100% feliz sempre' (mentira)
- ✅ BOM: 'Você pode aprender a regular ansiedade'
- ✅ MELHOR: 'Ansiedade não desaparece, mas deixa de te controlar. Você aprende a reconhecer, regular e agir mesmo com ela presente.'

---

## CATEGORIA 4: Lógica e Razão

### 13. RAZÃO CLARA (Reason Why)

**Definição:** Pessoas aceitam pedidos mais facilmente quando há razão explicada.

**Por que funciona:** Cérebro busca causalidade. 'Porque...' satisfaz essa necessidade.

**Como usar eticamente:** Explique LÓGICA do seu mecanismo. Por que funciona? Qual a ciência?

**Exemplos:**
- ❌ RUIM: 'Funciona porque sim'
- ✅ BOM: 'Começo pelo corpo porque sistema nervoso desregulado bloqueia mudança cognitiva'
- ✅ MELHOR: 'O [MECANISMO] funciona porque cérebro em modo sobrevivência não processa terapia tradicional - então primeiro regulamos sistema nervoso, depois reestruturamos pensamentos.'

### 14. ESPECIFICIDADE

**Definição:** Detalhes específicos aumentam credibilidade dramaticamente.

**Por que funciona:** Vago = genérico = não confiável. Específico = real = confiável.

**Como usar eticamente:** Use números reais, exemplos concretos, detalhes tangíveis.

**Exemplos:**
- ❌ RUIM: 'Várias pessoas melhoraram muito'
- ✅ BOM: '8-12 sessões em média, 73% relatam redução significativa'
- ✅ MELHOR: 'Cliente típico: começa com 6-8 crises/mês, após 10 sessões: 1-2 crises, com ferramentas para lidar'

### 15. CONTRASTE

**Definição:** Percepção muda baseado em comparação com referência anterior.

**Por que funciona:** Cérebro julga por contraste, não absolutos.

**Como usar eticamente:** Mostre ANTES vs. DEPOIS real. Ou: 'Maioria faz X, eu faço Y.'

**Exemplos:**
- ❌ RUIM: 'Meu jeito é melhor' (sem mostrar diferença)
- ✅ BOM: 'Maioria começa por pensamentos. Eu começo por corpo.'
- ✅ MELHOR: 'Abordagem tradicional: 2 anos de terapia sem direção clara. [MECANISMO]: 3 fases definidas, 12-16 sessões, objetivos mensuráveis.'

### 16. AVERSÃO À PERDA

**Definição:** Dor de perder é 2x mais forte que prazer de ganhar.

**Por que funciona:** Mecanismo evolutivo de proteção.

**Como usar eticamente:** Mostre custo REAL de não agir (tempo perdido, oportunidades, piora do problema).

**Exemplos:**
- ❌ RUIM: 'Você vai se arrepender para sempre' (dramático demais)
- ✅ BOM: 'Cada mês adiado é um mês a mais convivendo com isso'
- ✅ MELHOR: 'Enquanto adia, ansiedade cria mais padrões de evitação. Quanto antes começar, menos 'desmonta' você precisa fazer depois.'

---

## CATEGORIA 5: Identidade e Transformação

### 17. IDENTIDADE

**Definição:** Pessoas agem consistente com identidade percebida.

**Por que funciona:** 'Sou tipo de pessoa que...' é mais forte que 'Quero fazer...'.

**Como usar eticamente:** Ajude pessoa ver-se como alguém que age, que cuida de si, que busca mudança.

**Exemplos:**
- ❌ RUIM: 'Seja outra pessoa'
- ✅ BOM: 'Pessoas que buscam mudança agem, não apenas pensam'
- ✅ MELHOR: 'Se você é alguém que está lendo isso, você já é alguém que busca soluções. [MECANISMO] é para gente assim.'

### 18. PROMESSA DE TRANSFORMAÇÃO

**Definição:** Visão clara de estado futuro melhor.

**Por que funciona:** Cérebro visualiza futuro e quer alcançá-lo.

**Como usar eticamente:** Descreva transformação REALISTA e específica, não utopia.

**Exemplos:**
- ❌ RUIM: 'Vida perfeita sem problemas'
- ✅ BOM: 'De paralisada por decisões para capaz de escolher com clareza'
- ✅ MELHOR: 'Imagine: reunião importante, ansiedade surge, você reconhece, respira fundo, e continua. Não sem medo, mas sem paralisar. É isso que [MECANISMO] constrói.'

### 19. JORNADA DO HERÓI

**Definição:** Estrutura narrativa universal: desafio → guia → transformação.

**Por que funciona:** Arquétipo que ressoa profundamente. Pessoa = herói, você = guia.

**Como usar eticamente:** Posicione cliente como protagonista da própria história, você como mentor.

**Exemplos:**
- ❌ RUIM: 'Eu te salvo'
- ✅ BOM: 'Você enfrenta o desafio, eu te dou as ferramentas'
- ✅ MELHOR: 'Você chegou no ponto em que não aguenta mais viver assim (conflito). O [MECANISMO] te dá mapa e ferramentas (ajuda do mentor). Você faz a jornada, eu guio.'

---

## CATEGORIA 6: Mecanismos de Comunicação

### 20. METÁFORA

**Definição:** Explicar abstrato através de concreto familiar.

**Por que funciona:** Cérebro compreende melhor quando ancora novo no conhecido.

**Como usar eticamente:** Use metáforas precisas, não forçadas. Que realmente esclareçam.

**Exemplos:**
- ❌ RUIM: Metáfora confusa que não esclarece
- ✅ BOM: 'Ansiedade é como alarme de incêndio quebrado'
- ✅ MELHOR: 'Sistema nervoso desregulado é como carro com sensor de óleo quebrado - motor tá ok mas luz vermelha não apaga. [MECANISMO] recalibra o sensor.'

### 21. QUEBRA DE PADRÃO

**Definição:** Romper expectativa para capturar atenção.

**Por que funciona:** Cérebro ignora padrões repetidos, nota novidades.

**Como usar eticamente:** Diga algo contraintuitivo mas verdadeiro. Desafie senso comum com lógica.

**Exemplos:**
- ❌ RUIM: Ser polêmico só por atenção
- ✅ BOM: 'Ansiedade não é problema. Regulação desativada é.'
- ✅ MELHOR: 'Se você já tentou terapia e não funcionou, pode não ser culpa sua - pode ser que método estava errado para seu tipo de ansiedade.'

### 22. GAP DE CURIOSIDADE

**Definição:** Criar pergunta que mente PRECISA responder.

**Por que funciona:** Informação incompleta gera tensão. Cérebro busca fechamento.

**Como usar eticamente:** Faça pergunta intrigante, então responda. Não deixe no ar para sempre.

**Exemplos:**
- ❌ RUIM: 'Tenho um segredo incrível...' [nunca revela]
- ✅ BOM: 'Por que algumas pessoas superam ansiedade em meses e outras levam anos? [explica]'
- ✅ MELHOR: 'Post: O que 99% dos terapeutas fazem errado com ansiedade?' [corpo do post explica com lógica clara]

### 23. SIMPLICIDADE

**Definição:** Mensagem clara, uma ideia central, fácil de entender.

**Por que funciona:** Confusão = resistência. Clareza = ação.

**Como usar eticamente:** Corte jargão. Uma mensagem por post. Estrutura clara de 3 fases.

**Exemplos:**
- ❌ RUIM: 'Utilizo abordagem integrativa somático-cognitiva com foco...' [continua por 5 linhas]
- ✅ BOM: 'Corpo primeiro. Pensamentos depois. Nessa ordem.'
- ✅ MELHOR: '[MECANISMO] em 3 fases: 1) Você reconhece gatilhos. 2) Regula corpo. 3) Toma decisões com clareza. Simples assim.'

---

## CATEGORIA 7: Facilitação de Decisão

### 24. REVERSÃO DE RISCO

**Definição:** Remover ou reduzir risco percebido na decisão.

**Por que funciona:** Medo de errar paralisa. Garantia libera decisão.

**Como usar eticamente:** Ofereça primeira conversa gratuita, explique que pode não ser fit e tudo bem.

**Exemplos:**
- ❌ RUIM: 'Pague já ou perde vaga'
- ✅ BOM: 'Primeira conversa é gratuita e sem compromisso'
- ✅ MELHOR: 'Na primeira conversa, vamos ver se o [MECANISMO] faz sentido para você. Se não fizer, eu te falo honestamente. Prefiro não atender que atender errado.'

### 25. PRIMEIRO PASSO FÁCIL

**Definição:** Reduzir comprometimento inicial a algo pequeno e simples.

**Por que funciona:** Inércia é forte. Passo minúsculo é mais fácil que salto grande.

**Como usar eticamente:** CTA de baixa fricção: agendar conversa (não 'compre já'), seguir perfil, baixar guia.

**Exemplos:**
- ❌ RUIM: 'Invista R$ 5.000 no pacote completo agora'
- ✅ BOM: 'Clica no link e agenda 15 minutos de conversa'
- ✅ MELHOR: '1º passo: Baixa guia gratuito. 2º passo: Se fizer sentido, agenda conversa. 3º passo: Decidimos juntos se trabalhar.'

### 26. PERMISSÃO SOCIAL

**Definição:** Dar permissão explícita para pessoa fazer algo que quer mas sente culpa.

**Por que funciona:** Muita gente quer cuidar de si mas sente egoísmo. Permissão libera.

**Como usar eticamente:** Normalize buscar ajuda, investir em si, priorizar saúde mental.

**Exemplos:**
- ❌ RUIM: 'Você DEVE buscar ajuda' (obrigação)
- ✅ BOM: 'Tá tudo bem pedir ajuda. Você não precisa dar conta sozinha.'
- ✅ MELHOR: 'Se você sente culpa por investir tempo e dinheiro em você mesma, lembre: você cuidar de você não é egoísmo. É pré-requisito para cuidar bem dos outros.'

### 27. PROJEÇÃO DE FUTURO

**Definição:** Fazer pessoa visualizar futuro com e sem sua solução.

**Por que funciona:** Visualização concreta de futuro ativa motivação.

**Como usar eticamente:** Descreva dois caminhos realistas: com mudança vs. sem mudança.

**Exemplos:**
- ❌ RUIM: 'Sem mim você vai morrer sozinha' (catastrófico)
- ✅ BOM: 'Daqui 6 meses, você quer estar no mesmo lugar ou com ferramentas novas?'
- ✅ MELHOR: 'Cenário A: Daqui 1 ano, ansiedade continua mandando. Você evita decisões, oportunidades passam. Cenário B: Você tem [MECANISMO], reconhece gatilhos, regula, age. Qual você prefere?'

---

## Guia de Uso Prático

### Regra de Combinação

Para cada peça de comunicação, combine **2-3 gatilhos:**

- **Bio/Apresentação:** Autoridade + Especificidade + Contraste
- **Post Educativo:** Empatia + Razão Clara + Curiosity Gap
- **Primeira Conversa:** Empatia + Esperança + Risk Reversal
- **CTA Final:** Easy First Step + Future Pacing + Social Permission

### Gatilhos Por Tipo de Conteúdo

| Tipo de Conteúdo | Gatilhos Recomendados |
|------------------|----------------------|
| Bio Instagram | Autoridade + Especificidade + Identidade |
| Site Home | Empatia + Transformation Promise + Social Proof |
| Post Educativo | Storytelling + Reason Why + Simplicity |
| Post Venda Suave | Loss Aversion + Scarcity + Easy First Step |
| Email Follow-up | Reciprocity + Consistency + Hope |
| Stories Diário | Belonging + Liking + Pattern Interrupt |

> ⚠️ **LEMBRETE FINAL:** Gatilhos amplificam verdade, não criam ficção. Use apenas para comunicar melhor o que você realmente entrega.

---

**Use com sabedoria, comunique com integridade.**

#### 3. Escassez
Crie senso de urgência legítimo.
> "Atendo apenas 10 novos clientes por mês para garantir qualidade..."

#### 4. Reciprocidade
Dê valor antes de pedir algo.
> "Baixe gratuitamente meu guia de 10 páginas sobre..."

#### 5. Compromisso e Consistência
Peça pequenos compromissos primeiro.
> "Comece com uma sessão experimental de 30 minutos..."

#### 6. Afinidade
Mostre que você entende o cliente.
> "Eu sei como é se sentir invisível no mercado, porque já passei por isso..."

#### 7. Novidade
Apresente algo novo e diferente.
> "Conheça o primeiro método que combina X com Y..."

#### 8. Especificidade
Use números e detalhes específicos.
> "Em 21 dias, você vai eliminar 80% das crises de ansiedade..."

#### 9. Antecipação
Crie expectativa sobre o futuro.
> "Imagine como será sua vida quando você finalmente..."

#### 10. Curiosidade
Desperte o desejo de saber mais.
> "Existe um erro que 90% dos terapeutas cometem sem saber..."

#### 11. História
Conte histórias que conectam.
> "Maria chegou no meu consultório sem esperança. 3 meses depois..."

#### 12. Contraste
Compare o antes e depois.
> "Antes: invisível e competindo por preço. Depois: referência no mercado..."

#### 13. Razão
Explique o porquê.
> "Este método funciona porque atua diretamente na causa raiz..."

#### 14. Simplicidade
Mostre que é fácil começar.
> "Em apenas 3 passos simples, você vai..."

#### 15. Exclusividade
Faça o cliente se sentir especial.
> "Este programa é apenas para profissionais comprometidos..."

#### 16. Garantia
Reduza o risco percebido.
> "Se em 30 dias você não ver resultados, devolvemos seu investimento..."

#### 17. Comunidade
Mostre que ele não está sozinho.
> "Junte-se a uma comunidade de 200 terapeutas que..."

#### 18. Transformação
Foque na mudança de identidade.
> "Você vai deixar de ser 'mais um terapeuta' para se tornar 'O especialista em X'..."

#### 19. Urgência
Crie senso de tempo.
> "Quanto mais você espera, mais clientes você perde para concorrentes..."

#### 20. Visualização
Ajude a imaginar o resultado.
> "Feche os olhos e imagine seu consultório lotado de clientes ideais..."

### Como Usar Eticamente

1. **Seja verdadeiro** - Nunca exagere ou minta
2. **Pense no cliente** - O gatilho deve ajudá-lo a tomar uma boa decisão
3. **Combine gatilhos** - Use 2-3 gatilhos juntos para mais impacto
4. **Teste e ajuste** - Veja o que funciona melhor para seu público`
  },
  "3": {
    title: "Guia de Precificação Estratégica",
    description: "Como cobrar o que você vale quando você é único.",
    content: `## Guia de Precificação Estratégica
### Como Cobrar O Que Você Vale Quando Você É Único

**A verdade inconveniente:** Terapeutas genéricos competem por preço. Terapeutas únicos definem o preço.

Este guia mostra como precificar baseado em **VALOR** (o que você entrega) e não em **HORA** (commodity). Quando você tem Mecanismo Terapêutico Único, as regras mudam.

> 💎 **PRINCÍPIO FUNDAMENTAL:** Preço não é sobre quanto CUSTA sua hora. É sobre quanto VALE a transformação que você entrega.

### O que você vai aprender:

- Por que cobrar por hora te mantém pobre
- 3 modelos de precificação para mecanismo único
- Como calcular seu preço mínimo viável
- Estratégias de ancoragem e posicionamento
- Como comunicar preço sem desculpas
- Quando e como aumentar preços

---

## PARTE 1: O Problema da Precificação Por Hora

### Por Que 'R$ X Por Sessão' Te Prende

O modelo 'R$ por hora' tem **5 problemas fatais:**

#### 1. Teto de Ganho Fixo
Você tem máximo 40 horas/semana. Se cobra R$ 200/sessão, seu teto é R$ 32.000/mês (impossível manter). Para ganhar mais, precisa trabalhar mais horas (não escalável). **Você vende TEMPO, não RESULTADO.**

#### 2. Commoditização
Quando todos cobram 'R$ por sessão', cliente compara apenas preço. 'Fulana cobra R$ 180, você cobra R$ 250 - por que mais caro?' Você compete com 10.000 terapeutas pelo menor preço.

#### 3. Síndrome do Impostor Amplificada
'Será que minha hora vale R$ 300?' é pergunta errada. A pergunta certa é: 'Quanto vale para alguém parar de ter crises de ansiedade?' Mas você nunca faz essa pergunta porque está presa no modelo 'hora'.

#### 4. Desvalorização de Expertise
Você estudou 5+ anos, tem especializações, criou método próprio. Mas cobra igual a recém-formado porque ambos vendem '1 hora de terapia'. Expertise não se reflete no preço.

#### 5. Cliente Compra Sessões Infinitas
'Quantas sessões vou precisar?' 'Depende...' Cliente não sabe investimento total. Você não sabe receita previsível. Ninguém ganha. É modelo sem fim e sem clareza.

> 🎯 **INSIGHT:** Enquanto você vende HORA, está competindo com milhares. Quando vende TRANSFORMAÇÃO via mecanismo único, competição some.

---

## PARTE 2: 3 Modelos de Precificação Para Mecanismo Único

### MODELO 1: Precificação Por Sessão Premium

**O que é:** Ainda cobra por sessão, MAS com preço premium justificado pelo mecanismo único.

**Quando usar:** Começando com mecanismo, quer testar mercado, cliente prefere pagar sessão a sessão.

**Vantagem:** Baixa resistência inicial. Cliente paga menos upfront.

**Desvantagem:** Ainda está vendendo tempo, não resultado completo. Receita menos previsível.

**Fórmula:** Preço Médio Local × 1.5 a 2.5

**Exemplo prático:**
- Mercado local: R$ 180-220/sessão (terapeutas genéricos)
- Você com mecanismo: R$ 300-400/sessão
- Justificativa: 'Não é terapia genérica. É [MECANISMO], processo estruturado em 3 fases para [RESULTADO ESPECÍFICO].'

**Script de comunicação:**
> "O investimento é R$ 350 por sessão. É mais caro que terapia tradicional porque não é terapia tradicional - é o [NOME DO MECANISMO], que tem estrutura definida, fases claras e objetivos mensuráveis. Você não fica anos sem saber onde está."

### MODELO 2: Pacote de Transformação Completa

**O que é:** Vender processo completo como pacote fechado. Cliente paga por RESULTADO, não por sessões.

**Quando usar:** Seu mecanismo tem duração típica (ex: 12-16 sessões). Quer receita previsível. Cliente ideal busca solução completa.

**Vantagem:** Cliente compra TRANSFORMAÇÃO. Você recebe mais upfront. Compromisso maior = resultados melhores.

**Desvantagem:** Resistência inicial maior (investimento maior). Precisa confiar no mecanismo.

**Fórmula:** (Sessões Típicas × Preço/Sessão) × 0.85-0.95

Por que multiplicar por 0.85-0.95? Desconto de 5-15% para fechar pacote vs. sessões avulsas. Cliente ganha desconto, você ganha compromisso.

**Exemplo prático:**
- Seu mecanismo: 14 sessões típicas
- Preço avulso: R$ 350/sessão
- Cálculo: 14 × R$ 350 = R$ 4.900
- Pacote (10% desconto): R$ 4.410
- Opção de parcelamento: 3× R$ 1.470 sem juros

**Script de comunicação:**
> "O [MECANISMO] completo são 14 sessões ao longo de 3-4 meses. O investimento total é R$ 4.410, que você pode parcelar em até 3x. Não é 'vamos fazer terapia e ver no que dá' - é processo estruturado com começo, meio e fim. Ao final, você terá [RESULTADO ESPECÍFICO]."

### MODELO 3: Precificação Por Valor/Resultado

**O que é:** Precificar baseado no VALOR que transformação gera na vida do cliente, não no tempo gasto.

**Quando usar:** Problema do cliente tem custo mensurável (burnout = perda de emprego, ansiedade = oportunidades perdidas). Você é autoridade estabelecida.

**Vantagem:** Preço premium justificado por ROI claro. Atrai clientes que valorizam resultado.

**Desvantagem:** Requer posicionamento forte. Não funciona sem diferenciação clara.

**Fórmula:** Quanto cliente PERDE por mês sem resolver ÷ 10

**Exemplo prático:**
- Cliente: Executiva com burnout, recusou promoção por exaustão
- Promoção perdida: +R$ 3.000/mês de salário
- Custo de continuar assim: R$ 3.000/mês indefinidamente
- Seu preço: R$ 3.000 ÷ 10 = R$ 300/sessão MÍNIMO
- Ou pacote de 12 sessões: R$ 6.000 (cliente 'recupera' investimento em 2 meses pós-transformação)

**Script de comunicação:**
> "Você me disse que recusou a promoção porque não aguenta mais responsabilidade. Essa promoção era +R$ 3.000/mês. O [MECANISMO] custa R$ 6.000 total. Se em 4 meses você está com ferramentas para aceitar a próxima promoção, o investimento se paga em 2 meses. Faz sentido?"

---

## PARTE 3: Calculando Seu Preço Mínimo Viável

### Fórmula do Piso Mínimo

Seu preço mínimo é o que você precisa cobrar para viver dignamente + investir no negócio. Abaixo disso, você está se auto-sabotando.

**PISO MÍNIMO = (Custos Mensais + Reserva) ÷ Sessões Reais/Mês**

### Passo a Passo do Cálculo

#### PASSO 1: Custos Mensais Reais

| Item | Valor Mensal (R$) |
|------|-------------------|
| Custo de vida pessoal (moradia, alimentação, etc.) | _____________ |
| Impostos/contribuições (aprox. 20-30% do faturamento) | _____________ |
| Custos do negócio (consultório, software, site, etc.) | _____________ |
| Formações/supervisões/desenvolvimento | _____________ |
| **TOTAL MENSAL:** | **R$ _____________** |

#### PASSO 2: Reserva de Segurança (20%)
Adicione 20% para imprevistos, férias, meses fracos.

Total Mensal × 1.2 = R$ _____________

#### PASSO 3: Sessões Reais Por Mês
NÃO use 40 sessões/mês (irreal). Use número REAL considerando: faltas, remarcações, meses fracos, férias.

- Iniciante: 12-20 sessões/mês
- Intermediário: 20-30 sessões/mês
- Agenda cheia: 30-40 sessões/mês

Minha média real: _____ sessões/mês

#### PASSO 4: Cálculo Final

**PISO MÍNIMO = R$ _____ (custos) ÷ _____ (sessões) = R$ _____**

> ⚠️ **ATENÇÃO:** Este é o MÍNIMO para sobreviver. Não é o que você DEVE cobrar. É o chão, não o teto.

**Exemplo real:**
- Custos mensais: R$ 8.000
- Com reserva (20%): R$ 9.600
- Sessões reais: 25/mês
- Piso mínimo: R$ 9.600 ÷ 25 = **R$ 384/sessão**

Qualquer preço abaixo de R$ 384 = você está trabalhando no prejuízo ou insustentavelmente.

---

## PARTE 4: Estratégias de Ancoragem e Posicionamento

### Estratégia 1: Ancoragem Por Contraste

**Conceito:** Primeiro número mencionado vira âncora mental. Tudo depois é julgado em relação a ele.

**Como usar:**
- Mostre opção mais cara PRIMEIRO
- Compare com custo de NÃO resolver
- Divida preço total em valores menores

**Exemplos:**

❌ **RUIM:** "Custa R$ 4.500" [silêncio]

✅ **BOM:** "Terapia sem estrutura pode levar anos, R$ 200/sessão × 100 sessões = R$ 20.000. O [MECANISMO] são 14 sessões, R$ 4.500 total - você economiza tempo e dinheiro."

### Estratégia 2: Tiered Pricing (3 Opções)

**Conceito:** Oferecer 3 opções faz a do meio parecer 'ideal'. Cliente raramente escolhe mais barata ou mais cara.

**Estrutura recomendada:**

| Opção | O que inclui | Preço |
|-------|--------------|-------|
| **ESSENCIAL** | Sessões avulsas, sem compromisso | R$ 400/sessão |
| **TRANSFORMAÇÃO** | Pacote 14 sessões + suporte WhatsApp + materiais | R$ 4.900 |
| **VIP** | Pacote + 3 meses follow-up + acesso prioritário | R$ 7.500 |

**Resultado:** 60-70% escolhem opção do meio ('melhor custo-benefício').

### Estratégia 3: Decoy Pricing

**Conceito:** Adicionar opção 'chamariz' que ninguém escolhe, mas faz outra opção parecer melhor.

**Exemplo:**
- Opção A: 10 sessões por R$ 3.500 (R$ 350/sessão)
- Opção B (DECOY): 12 sessões por R$ 4.400 (R$ 367/sessão) ← Ruim
- Opção C: 14 sessões por R$ 4.500 (R$ 321/sessão) ← Parece MUITO melhor

Opção B existe só para fazer C parecer barganha. 80% escolhem C.

### Estratégia 4: Framing Por Tempo

**Conceito:** R$ 4.500 parece muito. R$ 150/dia parece pouco. Mesmo preço, percepção diferente.

**Exemplos de framing:**
- "R$ 4.500 nos próximos 4 meses = R$ 1.125/mês = R$ 37/dia"
- "Menos que assinatura de streaming + delivery por semana"
- "Investimento de 1-2 salários para transformação que dura anos"

---

## PARTE 5: Como Comunicar Preço Sem Desculpas

### 5 Regras de Ouro

#### REGRA 1: Nunca Se Desculpe Pelo Preço

❌ 'Sei que é caro, mas...'

✅ 'O investimento é R$ X.' [pausa, silêncio, deixe cliente processar]

#### REGRA 2: Fale 'Investimento', Não 'Preço' ou 'Custo'

- Custo = perde dinheiro
- Preço = transação
- Investimento = retorno futuro

#### REGRA 3: Sempre Ancore ANTES de Falar Valor

Nunca solte número frio. Contextualize primeiro.

**Estrutura:** [Valor que entrega] + [Como funciona] + [Investimento]

**Exemplo completo:**
> "O [MECANISMO] te leva de [ESTADO ATUAL] para [ESTADO DESEJADO] em 14 sessões estruturadas ao longo de 3-4 meses. O investimento total é R$ 4.500, que pode ser parcelado em 3x de R$ 1.500 sem juros."

#### REGRA 4: Silencie Após Falar o Valor

Quem fala primeiro depois do preço, perde. Resista ao desconforto. Deixe cliente processar.

NÃO preencha silêncio com justificativas nervosas.

#### REGRA 5: Tenha Resposta Para 'Está Caro'

**Script pronto:**
> "Entendo. Deixa eu te dar contexto: não é terapia tradicional por sessão que pode levar anos. É processo estruturado com começo, meio e fim. Quando você divide pelo número de sessões (14), dá R$ 321 cada - e você não fica 3 anos sem saber se está progredindo. Mas se não couber no seu orçamento agora, sem problema."

---

## PARTE 6: Quando e Como Aumentar Preços

### 6 Sinais Que Está Na Hora de Aumentar

1. **Agenda 100% cheia há 2+ meses consecutivos** - Demanda > Oferta = sinal claro de subprecificação.

2. **Lista de espera de 5+ pessoas** - Você está deixando dinheiro na mesa.

3. **Taxa de conversão >80% nas conversas iniciais** - Quase todos dizem sim = preço muito baixo.

4. **Você tem mecanismo validado e resultados comprovados** - Diferenciação clara = justificativa para premium.

5. **Faz 12+ meses sem ajuste** - Inflação + crescimento profissional = ajuste necessário.

6. **Você se sente ressentida pelo preço atual** - Trabalhar com raiva do próprio preço é insustentável.

### Como Aumentar (3 Estratégias)

#### ESTRATÉGIA 1: Aumento Gradual Regular

10-15% ao ano, comunicado com 60 dias de antecedência.

**Script:** "A partir de [DATA], o investimento será R$ X. Clientes atuais mantêm valor atual por mais 3 meses."

#### ESTRATÉGIA 2: Grandfathering

Novos clientes pagam novo preço. Clientes antigos mantêm preço antigo (ou têm aumento menor).

**Vantagem:** Lealdade dos antigos, sem resistência. 

**Desvantagem:** Dois preços simultâneos.

#### ESTRATÉGIA 3: Aumento Por Valor Adicionado

Aumenta preço E adiciona algo novo (materiais, suporte WhatsApp, sessões follow-up).

Justificativa clara: 'Agora inclui X, por isso investimento é Y.'

### Quanto Aumentar De Cada Vez

**Aumentos pequenos e frequentes > Aumentos grandes e raros**

- ✅ BOM: +10-15% ao ano
- ⚠️ CUIDADO: +20-30% ao ano (pode gerar churn)
- ❌ EVITE: +50%+ de uma vez (a não ser que mude radicalmente o serviço)

---

## Plano de Ação: Defina Seu Preço AGORA

### Exercício de Decisão

**PASSO 1:** Qual seu piso mínimo?
(Use cálculo da Parte 3): R$ _____________

**PASSO 2:** Qual modelo você vai usar?
- Modelo 1: Sessão premium (R$ _____ /sessão)
- Modelo 2: Pacote transformação (R$ _____ / _____ sessões)
- Modelo 3: Valor/Resultado (R$ _____ baseado em ROI)

**PASSO 3:** Seu preço está acima do piso mínimo?
- [ ] Sim  
- [ ] Não (se não, ajuste IMEDIATAMENTE)

**PASSO 4:** Script de comunicação do seu preço:
(Use estrutura da Parte 5)

**PASSO 5:** Quando você vai implementar?
- Imediatamente (novos clientes já pagam novo preço)
- Em 30 dias (comunicar clientes atuais)
- Em _____ dias (data específica: ___/___/___)

---

### Lembrete Final

- ✅ Preço baixo não atrai mais clientes - atrai clientes errados
- ✅ Você não precisa de 40 clientes a R$ 150 - precisa de 15 clientes a R$ 400
- ✅ Mecanismo único justifica preço premium - USE isso
- ✅ Clientes que valorizam transformação pagam por ela
- ✅ Você cobrar o que vale é ÉTICO - te permite servir melhor

**Cobre o que você vale. Você merece.**

| Opção | Inclui | Preço |
|-------|--------|-------|
| Essencial | 4 sessões | R$ 1.200 |
| **Completo** | 8 sessões + materiais | **R$ 2.400** |
| Premium | 12 sessões + suporte VIP | R$ 4.800 |

A maioria escolhe a opção do meio (que é a que você quer vender).

### Comunicando Seu Preço

#### Antes do MTU:
> "A sessão custa R$ 200."

#### Depois do MTU:
> "O Programa Mente Serena é um investimento de R$ 2.400 para 8 semanas de transformação. Você terá acesso ao meu método exclusivo, materiais de apoio e suporte entre sessões. Ao final, você terá eliminado as crises de ansiedade que estão te impedindo de crescer na carreira."

### Objeções Comuns e Respostas

**"Está caro"**
> "Entendo. Deixa eu te perguntar: quanto está te custando continuar com esse problema? Quantas oportunidades você já perdeu?"

**"Vou pensar"**
> "Claro. Enquanto pensa, considere: cada dia que passa é mais um dia vivendo com esse problema. O que muda se você começar hoje?"

**"Outros cobram menos"**
> "Sim, existem opções mais baratas. A diferença é que eu ofereço o Método X, que foi desenvolvido especificamente para [resultado]. Você quer o mais barato ou o que realmente funciona?"

### Aumentando Preços com MTU

Com um MTU forte, você pode aumentar preços gradualmente:

1. **Mês 1-3:** Valide o MTU com preço atual
2. **Mês 4-6:** Aumente 20-30%
3. **Mês 7-12:** Aumente mais 20-30%
4. **Ano 2+:** Ajuste conforme demanda

> **Regra de ouro:** Se você não está perdendo pelo menos 20% dos interessados por preço, você está cobrando barato demais.`
  }
};

export default function Bonus() {
  const params = useParams();
  const bonusId = params.id || "1";
  const bonus = bonusContent[bonusId];

  if (!bonus) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Bônus não encontrado</p>
        </div>
      </DashboardLayout>
    );
  }

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
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Gift className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="text-sm font-medium text-primary">Bônus Exclusivo</span>
              <h1 className="text-3xl font-display font-bold mt-1">{bonus.title}</h1>
              <p className="text-muted-foreground mt-2">{bonus.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-neutral max-w-none">
              <Streamdown>{bonus.content}</Streamdown>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar ao Dashboard
            </Link>
          </Button>
          
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://plataforma-mtu.onrender.com/assistente" target="_blank" rel="noopener noreferrer">
              Usar com Assistente IA
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
