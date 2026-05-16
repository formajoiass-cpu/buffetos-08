# BuffetOS - Sistema de Gestão de Eventos

## ⚡ Rodar Tudo Rápido

```bash
cd buffetos-06-main/Chronostek_BuffetOS-main/saas-multitenant

# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend (novo terminal)
npm install && npm run dev
```

✅ Frontend: **http://localhost:3001**  
✅ Backend: **http://localhost:3000**

---

## 🔐 Criar Usuário de Teste

**Importante:** Antes de testar, execute uma das opções abaixo para criar um usuário.

### Opção 1: Curl (Rápido)

```bash
curl -X POST http://localhost:3000/setup/create-test-user
```

### Opção 2: Abrir no Navegador

```
http://localhost:3000/setup/create-test-user
```

### Opção 3: Node Script

```bash
cd buffetos-06-main/Chronostek_BuffetOS-main/saas-multitenant/backend
node create-test-user-simple.js
```

**Credenciais (validas após executar uma das opções acima):**
- 📧 Email: `admin@teste.com`
- 🔑 Senha: `Teste123!`

---

## 📋 Próximos Passos

1. Criar usuário de teste (ver acima)
2. Acesse **http://localhost:3001/login**
3. Faça login com as credenciais
4. Navegue pelos módulos

---

## 📚 Documentação

- [SETUP.md](buffetos-06-main/Chronostek_BuffetOS-main/saas-multitenant/SETUP.md) - Guia de setup
- [DEVELOPMENT.md](buffetos-06-main/Chronostek_BuffetOS-main/saas-multitenant/DEVELOPMENT.md) - Arquitetura e estrutura

---

## ✅ Configuração

- **CSP**: ✅ Configurado para localhost
- **Frontend**: ✅ Reescreve `/api` para backend
- **Database**: ✅ Neon PostgreSQL
- **Ambiente**: ✅ Pronto para desenvolvimento

---

**Status**: 🚀 Pronto para desenvolvimento
