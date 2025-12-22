# Dashboard Administrativo - Plataforma MTU™

## Visão Geral

O Dashboard Administrativo é uma área restrita da plataforma MTU™ que permite à administradora visualizar e analisar todos os dados dos usuários, incluindo cadastros, respostas aos exercícios e métricas de progresso.

## Acesso

### URL
`https://seu-dominio.com/admin`

### Requisitos
- Apenas usuários com role `admin` podem acessar
- Usuários não-admin serão redirecionados automaticamente para o dashboard normal

### Como se tornar Admin

Para promover um usuário a administrador, execute o seguinte comando no servidor:

```bash
node scripts/make-admin.js seu-email@exemplo.com
```

## Funcionalidades

### 1. Estatísticas Gerais (Cards no Topo)

- **Total de Usuários**: Número total de usuários cadastrados na plataforma
- **Usuários Ativos**: Usuários que já responderam pelo menos um exercício
- **Total de Respostas**: Quantidade total de respostas salvas
- **Módulos Completos**: Número total de módulos completados por todos os usuários
- **Progresso Médio**: Porcentagem média de conclusão dos módulos

### 2. Lista de Usuários

Tabela completa com todos os usuários cadastrados, mostrando:
- Nome e avatar
- Email
- Método de login (Email/Senha ou OAuth)
- Data de cadastro
- Último acesso
- Badge de "Admin" para administradores

**Funcionalidades:**
- **Busca**: Campo de busca para filtrar usuários por nome ou email
- **Ver Respostas**: Botão para expandir e ver todas as respostas de um usuário específico

### 3. Visualização de Respostas

Seção que mostra todas as respostas dos usuários aos exercícios:

**Filtros:**
- Filtrar por módulo específico ou ver todos
- Dropdown com todos os módulos disponíveis

**Informações exibidas:**
- Nome e email do usuário
- Módulo e ID do exercício
- Conteúdo da resposta
- Data de última atualização

### 4. Exportação de Dados

**Botão "Exportar CSV"**: Gera um arquivo CSV com todas as respostas, incluindo:
- Nome do usuário
- Email
- Módulo
- Exercício
- Resposta completa
- Data de atualização

O arquivo é baixado automaticamente com o nome: `mtu-respostas-YYYY-MM-DD.csv`

## Segurança

### Proteção de Rotas
- Todas as rotas administrativas no backend usam `adminProcedure`
- Verifica automaticamente se o usuário tem `role === 'admin'`
- Retorna erro 403 (FORBIDDEN) se o usuário não for admin

### Proteção no Frontend
- Componente verifica o role do usuário atual
- Redireciona automaticamente para `/dashboard` se não for admin
- Queries só são executadas se o usuário for admin (`enabled: currentUser?.role === "admin"`)

## Rotas da API (tRPC)

### `admin.getAllUsers`
- **Tipo**: Query
- **Proteção**: Admin only
- **Retorna**: Lista de todos os usuários com informações básicas

### `admin.getUserDetails`
- **Tipo**: Query
- **Input**: `{ userId: number }`
- **Proteção**: Admin only
- **Retorna**: Detalhes completos de um usuário, incluindo progresso e respostas

### `admin.getAllResponses`
- **Tipo**: Query
- **Proteção**: Admin only
- **Retorna**: Todas as respostas de todos os usuários com join de dados do usuário

### `admin.getPlatformStats`
- **Tipo**: Query
- **Proteção**: Admin only
- **Retorna**: Estatísticas agregadas da plataforma

### `admin.getResponsesByModule`
- **Tipo**: Query
- **Input**: `{ moduleId: string }`
- **Proteção**: Admin only
- **Retorna**: Respostas filtradas por módulo específico

## Acesso Rápido

No dashboard principal, usuários admin verão um botão adicional "Dashboard Admin" ao lado do botão "Continuar de onde parou".

## Análise de Dados

### Métricas Disponíveis

1. **Taxa de Ativação**: `(Usuários Ativos / Total de Usuários) * 100`
2. **Média de Respostas por Usuário**: `Total de Respostas / Usuários Ativos`
3. **Taxa de Conclusão**: `(Módulos Completos / (Total Usuários * 7)) * 100`
4. **Progresso Médio**: Calculado automaticamente

### Insights Possíveis

- Identificar usuários mais engajados
- Ver quais módulos têm mais ou menos respostas
- Analisar padrões nas respostas dos usuários
- Identificar pontos de abandono na jornada

## Manutenção

### Adicionar Novos Módulos ao Filtro

Edite o arquivo `client/src/pages/AdminDashboard.tsx` e adicione a opção no select:

```tsx
<option value="novo-modulo">Novo Módulo</option>
```

### Adicionar Novas Métricas

1. Adicione a query no backend (`server/routers.ts`)
2. Consuma a query no frontend
3. Adicione um novo card na seção de estatísticas

## Troubleshooting

### "Acesso negado" ao tentar acessar /admin
- Verifique se seu usuário tem `role: 'admin'` no banco de dados
- Execute o script `make-admin.js` com seu email
- Faça logout e login novamente

### Dados não aparecem
- Verifique o console do navegador para erros
- Confirme que o banco de dados está acessível
- Verifique se há usuários e respostas cadastradas

### Exportação CSV não funciona
- Verifique se há respostas para exportar
- Teste em um navegador diferente
- Verifique permissões de download do navegador

## Próximos Passos

Possíveis melhorias futuras:
- Gráficos e visualizações de dados
- Filtros avançados (por data, por progresso, etc.)
- Exportação em outros formatos (Excel, PDF)
- Envio de emails para usuários
- Gestão de usuários (editar, deletar, etc.)
- Dashboard de analytics em tempo real
