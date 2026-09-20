# 🚀 Deploy da Plataforma MTU no Render

## Por que Render?
✅ **Totalmente gratuito** para começar (750h/mês no tier free)
✅ **Zero configuração** de servidor
✅ **Deploy automático** via Git
✅ **SSL/HTTPS** incluído
✅ **Suporta SQLite** com disco persistente

---

## 📋 Pré-requisitos

1. **Conta no GitHub** (gratuita)
2. **Conta no Render** (gratuita - https://render.com)
3. **Chave da API OpenRouter** (https://openrouter.ai/keys)

---

## 🎯 Passo a Passo

### 1️⃣ Preparar o Repositório Git

```bash
# Inicializar repositório Git (se ainda não fez)
git init

# Adicionar .gitignore
echo "node_modules
.env
*.db
*.db-shm
*.db-wal
dist
.DS_Store" > .gitignore

# Fazer commit inicial
git add .
git commit -m "Initial commit - Plataforma MTU"

# Criar repositório no GitHub e conectar
# Vá em: https://github.com/new
# Depois execute:
git remote add origin https://github.com/SEU_USUARIO/plataforma-mtu.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy no Render

1. Acesse https://render.com e faça login
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório do GitHub
4. O Render vai detectar automaticamente o `render.yaml`
5. Clique em **"Apply"**

### 3️⃣ Configurar Variáveis de Ambiente

No dashboard do Render, vá em **Environment**:

```
OPENROUTER_API_KEY = sua-chave-da-api-openrouter
OPENROUTER_MODEL = z-ai/glm-5.3-flashx
```

*Nota: As outras variáveis já estão no render.yaml*

### 4️⃣ Inicializar o Banco de Dados

Após o primeiro deploy, execute no **Shell** do Render:

```bash
pnpm drizzle-kit push
```

---

## 🎉 Pronto!

Sua plataforma estará disponível em:
```
https://plataforma-mtu.onrender.com
```

O Render faz **deploy automático** toda vez que você fizer push para a branch `main`.

---

## 🔧 Atualizações Futuras

Para atualizar a plataforma:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render vai detectar automaticamente e fazer o deploy! 🚀

---

## ⚠️ Limitações do Tier Gratuito

- **Sleep após 15min de inatividade** (primeiro acesso demora ~30s)
- **750 horas/mês** (suficiente para 1 serviço 24/7)
- **Banco SQLite** limitado a 1GB (ampliável com plano pago)

**Dica**: Para evitar o sleep, use um serviço como **UptimeRobot** (gratuito) para fazer ping a cada 5 minutos.

---

## 🆙 Upgrade (Opcional)

Se quiser eliminar o sleep e ter mais recursos:
- **Render Pro**: $7/mês
- **Banco PostgreSQL**: Mais robusto que SQLite
- **Turso (SQLite serverless)**: Alternativa moderna

---

## 🐛 Troubleshooting

### Build falha
```bash
# Limpar cache do Render
# Settings → Clear build cache & deploy
```

### Banco não persiste
```bash
# Verificar se o disk está montado em /opt/render/project/data
# Ver logs em: Logs → Build Logs
```

### Erro ao conectar
```bash
# Verificar variáveis de ambiente
# Environment → Check all variables
```

---

## 📞 Suporte

- **Docs Render**: https://render.com/docs
- **Status**: https://status.render.com
- **Community**: https://community.render.com

---

**Desenvolvido com ❤️ usando Manus**
