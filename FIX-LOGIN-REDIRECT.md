# Correção de Problema de Login/Redirecionamento em Produção

## Problema Identificado
O site no Render aceitava credenciais corretas mas não redirecionava o usuário para o dashboard, mantendo-o na página de login.

## Causa Raiz
O problema estava relacionado à configuração de cookies de sessão em produção:

1. **sameSite incorreto**: O cookie estava configurado como `sameSite: "lax"` em produção, o que pode causar problemas de autenticação em contextos cross-site ou com redirecionamentos
2. **Falta de CORS**: Não havia configuração de CORS com `credentials: true`, necessária para que os cookies sejam enviados corretamente em requisições
3. **clearCookie incompleto**: O logout não limpava o cookie com as mesmas opções usadas para criá-lo

## Alterações Implementadas

### 1. Configuração de Cookie de Sessão ([server/_core/index.ts](server/_core/index.ts))
```typescript
cookie: {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
}
```
- **Mudança**: `sameSite: "lax"` → `sameSite: "none"` em produção
- **Motivo**: `sameSite: "none"` com `secure: true` permite que cookies sejam enviados em contextos cross-site no HTTPS

### 2. Adição de CORS ([server/_core/index.ts](server/_core/index.ts))
```typescript
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
```
- **Motivo**: Permite que o navegador envie cookies em requisições cross-origin

### 3. Correção do Logout ([server/auth.router.ts](server/auth.router.ts))
```typescript
ctx.res.clearCookie("connect.sid", {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
```
- **Motivo**: O cookie deve ser limpo com as mesmas opções usadas para criá-lo

## Variáveis de Ambiente Necessárias no Render

Certifique-se de que as seguintes variáveis estão configuradas no Render:

- `NODE_ENV=production` (já deve estar configurado)
- `SESSION_SECRET=<um-segredo-forte-aleatório>` (obrigatório!)
- `CLIENT_URL=https://seu-dominio.onrender.com` (opcional, mas recomendado)

## Como Testar

1. **Aguarde o Deploy**: O Render detectará as mudanças automaticamente e fará o redeploy
2. **Limpe os Cookies**: No navegador, limpe os cookies do site (F12 > Application > Cookies > Delete All)
3. **Teste o Login**: 
   - Acesse a página de login
   - Entre com credenciais válidas
   - Verifique se é redirecionado para o dashboard
4. **Teste a Persistência**: 
   - Recarregue a página (F5)
   - Verifique se continua autenticado

## Troubleshooting

Se o problema persistir:

### 1. Verifique os Cookies no Navegador
- Abra DevTools (F12) > Application > Cookies
- Procure por `connect.sid`
- Verifique se:
  - `Secure` está marcado como `true`
  - `SameSite` está como `None`
  - `HttpOnly` está marcado como `true`

### 2. Verifique os Headers da Resposta
- DevTools (F12) > Network > Clique na requisição de login
- Na aba "Response Headers", procure por `Set-Cookie`
- Deve conter algo como: `connect.sid=...; Path=/; HttpOnly; Secure; SameSite=None`

### 3. Verifique Logs do Render
- Acesse o dashboard do Render
- Vá em "Logs" do seu serviço
- Procure por erros relacionados a sessão ou autenticação

### 4. Teste a API Diretamente
No console do navegador (F12 > Console), teste:
```javascript
// Após fazer login bem-sucedido
fetch('https://seu-dominio.onrender.com/api/trpc/auth.getCurrentUser', {
  credentials: 'include'
}).then(r => r.json()).then(console.log)
```
- Deve retornar seus dados de usuário
- Se retornar `null`, o cookie não está sendo enviado

## Commit
As alterações foram commitadas e enviadas para o repositório:
```
commit 10d9185
Fix session cookie configuration for production (sameSite: none, secure: true, CORS with credentials)
```

## Referências
- [MDN: SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [CORS with credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials)
- [Express Session Configuration](https://github.com/expressjs/session#cookie)
