# Como se tornar Administradora

## Passo 1: Cadastre-se na plataforma

Se ainda não tem uma conta, acesse `/signup` e crie sua conta com seu email.

## Passo 2: Promova seu usuário a Admin

### Opção A: Via Script (Recomendado)

No servidor onde a aplicação está rodando, execute:

```bash
node scripts/make-admin.js seu-email@exemplo.com
```

### Opção B: Diretamente no Banco de Dados

Se tiver acesso direto ao banco de dados SQLite:

```sql
UPDATE users SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

### Opção C: Via Console do Navegador (Desenvolvimento Local)

1. Abra o console do navegador (F12)
2. Execute o seguinte código:

```javascript
// Isso só funciona em desenvolvimento local
fetch('/api/trpc/admin.makeAdmin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'seu-email@exemplo.com' })
})
```

## Passo 3: Faça Logout e Login Novamente

Para que as mudanças tenham efeito:
1. Clique em "Sair" no menu
2. Faça login novamente com suas credenciais

## Passo 4: Acesse o Dashboard Admin

Após fazer login como admin, você verá:
- Um botão "Dashboard Admin" no dashboard principal
- Ou acesse diretamente: `/admin`

## Verificação

Para verificar se você é admin:
1. Faça login
2. Vá para o dashboard
3. Se você vê o botão "Dashboard Admin", está tudo certo!

## Troubleshooting

### Não vejo o botão "Dashboard Admin"
- Verifique se executou o script corretamente
- Confirme que fez logout e login novamente
- Verifique no banco de dados se o campo `role` está como `'admin'`

### Erro ao acessar /admin
- Limpe o cache do navegador
- Tente em uma aba anônima
- Verifique os logs do servidor

## Segurança

⚠️ **IMPORTANTE**: 
- Mantenha suas credenciais de admin seguras
- Não compartilhe acesso ao dashboard admin
- O dashboard contém dados sensíveis de todos os usuários
