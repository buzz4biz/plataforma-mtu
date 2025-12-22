# Configuração da API Groq no Render

## Passo a Passo

1. **Acesse o Dashboard do Render**
   - Vá para https://dashboard.render.com/
   - Faça login na sua conta

2. **Selecione seu serviço**
   - Clique no serviço `plataforma-mtu`

3. **Configure a variável de ambiente**
   - No menu lateral, clique em **Environment**
   - Procure pela variável `GROQ_API_KEY`
   - Cole o valor da API key fornecida (não commitada no Git por segurança)
   - Clique em **Save Changes**

4. **Aguarde o redeploy**
   - O Render vai automaticamente fazer o redeploy do serviço
   - Aguarde alguns minutos até que o serviço esteja online novamente

5. **Teste o Assistente IA**
   - Acesse: https://plataforma-mtu.onrender.com/assistente
   - Teste uma conversa para verificar se está funcionando

## ✅ Alterações já implementadas no código:

- ✅ Todos os links do Assistente IA foram atualizados para: `https://plataforma-mtu.onrender.com/assistente`
- ✅ A configuração da API key já está preparada no código (server/_core/groq.ts)
- ✅ O render.yaml já tem a variável GROQ_API_KEY configurada

## 📝 Notas Importantes:

- A API key do Groq é gratuita mas tem limites de uso
- O modelo usado é o `llama-3.3-70b-versatile`
- Nunca compartilhe a API key publicamente (ela já está segura no .env)
