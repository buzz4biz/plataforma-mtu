# 🎓 Plataforma MTU - Método de Transformação Única

Plataforma educacional completa para ensinar empreendedores a criar e vender seus próprios métodos proprietários.

## 🚀 Deploy Rápido

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

→ **[Guia Completo de Deploy](DEPLOY.md)**

## 📦 Recursos

- ✅ 4 Módulos completos + 3 Bônus
- ✅ Sistema de autenticação seguro
- ✅ Chat com IA (OpenRouter/GLM 5.3 FlashX)
- ✅ Exercícios interativos com auto-save
- ✅ Sistema de progresso e conquistas
- ✅ Exportação de conteúdo em PDF
- ✅ Design responsivo e moderno
- ✅ Backup automático de dados

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite + TailwindCSS
- **Backend**: Node.js + Express + tRPC
- **Banco de Dados**: SQLite + Drizzle ORM
- **IA**: OpenRouter (Z.ai GLM 5.3 FlashX)
- **Auth**: Express Session + bcrypt

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Configurar banco de dados
pnpm drizzle-kit push

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse: http://localhost:3000

## 📝 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
DATABASE_URL=file:./dev.db
SESSION_SECRET=sua-chave-secreta-aqui
OPENROUTER_API_KEY=sua-chave-openrouter-aqui
OPENROUTER_MODEL=z-ai/glm-5.3-flashx
NODE_ENV=development
```

## 🌐 Deploy em Produção

Veja o guia completo: **[DEPLOY.md](DEPLOY.md)**

Opções suportadas:
- **Render** (recomendado - grátis)
- Railway
- Fly.io
- VPS próprio

## 📚 Estrutura do Projeto

```
plataforma-mtu/
├── client/          # Frontend React
│   ├── src/
│   │   ├── pages/   # Páginas
│   │   └── components/  # Componentes reutilizáveis
├── server/          # Backend Node.js
│   ├── _core/       # Configuração do servidor
│   └── *.router.ts  # Rotas tRPC
├── drizzle/         # Schema do banco
└── shared/          # Código compartilhado
```

## 🔐 Segurança

- ✅ Senhas criptografadas (bcrypt)
- ✅ Sessões seguras (express-session)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL injection protection (Drizzle ORM)

## 📄 Licença

MIT © 2025

## 🤝 Suporte

Para dúvidas sobre deploy ou configuração, consulte [DEPLOY.md](DEPLOY.md)

---

**Desenvolvido com ❤️ usando Manus**
