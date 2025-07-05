# 👥 Sistema de Gerenciamento de Usuários

> Projeto Individual DFS-2025.2 - Desenvolvimento Full Stack Básico

## 📋 Descrição do Projeto

Sistema web completo para cadastro e gerenciamento de usuários, desenvolvido como projeto individual do curso de Desenvolvimento Full Stack Básico. A aplicação permite realizar operações CRUD (Create, Read, Update, Delete) sobre usuários, com sistema de autenticação JWT e controle de acesso baseado em roles.

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- **Login JWT**: Autenticação segura com tokens
- **Controle de Acesso**: Sistema de roles (admin/usuário comum)
- **Middleware de Segurança**: Proteção de rotas sensíveis

### 👤 Gerenciamento de Usuários
- **Cadastro**: Formulário completo com validações
- **Listagem**: Visualização de todos os usuários (apenas admins)
- **Edição**: Atualização de dados pessoais
- **Exclusão**: Remoção de usuários do sistema

### 🛡️ Segurança
- **Hash de Senhas**: Criptografia com bcryptjs
- **Validação de Email**: Verificação de unicidade
- **Tratamento de Erros**: Mensagens específicas e códigos HTTP adequados

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Object-Relational Mapping
- **PostgreSQL** - Banco de dados
- **JWT** - JSON Web Tokens para autenticação
- **bcryptjs** - Hash de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente

### Ferramentas de Desenvolvimento
- **Nodemon** - Auto-reload do servidor
- **Prisma Migrate** - Gerenciamento de migrações

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma           # Schema do banco de dados
│   └── migrations/             # Histórico de migrações
├── src/
│   ├── controllers/
│   │   ├── userController.js   # Controlador de usuários
│   │   └── LoginController.js  # Controlador de autenticação
│   ├── database/
│   │   └── PrismaClient.js     # Cliente do Prisma
│   ├── middlewares/
│   │   ├── authenticate.js     # Middleware de autenticação
│   │   └── authorization.js    # Middleware de autorização
│   ├── routers/
│   │   └── index.js            # Definição das rotas
│   └── server.js               # Servidor principal
├── .env                        # Variáveis de ambiente
└── package.json               # Dependências e scripts
```

## 🗄️ Modelo de Dados

### Entidade: User
```prisma
model User {
  id        String   @id @default(cuid())
  name      String   @db.VarChar(100)      // Nome completo
  email     String   @unique @db.VarChar(100) // Email único
  password  String   @db.VarChar(100)      // Senha criptografada
  isAdmin   Boolean  @default(false)       // Permissão de administrador
  phone     String   @db.VarChar(20)       // Telefone
  birthDate DateTime                       // Data de nascimento
  address   String                         // Endereço completo
  avatarUrl String?  @db.VarChar(255)      // URL do avatar (opcional)
  createdAt DateTime @default(now())       // Data de criação
}
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL
- Git

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd projeto-bootcamp
```

### 2. Configuração do Backend

#### Instalar Dependências
```bash
cd backend
npm install
```

#### Configurar Variáveis de Ambiente
Crie o arquivo `.env` na pasta `backend`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
SECRET_JWT="seu_secret_jwt_super_secreto_aqui"
```

#### Configurar Banco de Dados
```bash
# Executar migrações
npx prisma migrate dev

# (Opcional) Visualizar banco no Prisma Studio
npx prisma studio
```

#### Executar o Servidor
```bash
npm start
```

O servidor estará disponível em: `http://localhost:8080`

## 📡 API Endpoints

### 🔓 Rotas Públicas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios` | Cadastrar novo usuário |
| `POST` | `/login` | Fazer login |

### 🔒 Rotas Protegidas (Requer Token)

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| `GET` | `/usuarios` | Listar usuários | Admin |
| `PUT` | `/usuario/:id` | Atualizar usuário | Autenticado |
| `DELETE` | `/usuario/:id` | Excluir usuário | Autenticado |

### 📝 Exemplos de Uso

#### Cadastrar Usuário
```bash
POST /usuarios
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "isAdmin": false,
  "phone": "(11) 99999-9999",
  "birthDate": "1990-05-15",
  "address": "Rua das Flores, 123, São Paulo, SP",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

#### Fazer Login
```bash
POST /login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Listar Usuários (Admin)
```bash
GET /usuarios
Authorization: Bearer <seu_token_jwt>
```

## 🔧 Scripts Disponíveis

```bash
# Executar servidor em modo desenvolvimento
npm start

# Executar migrações do banco
npx prisma migrate dev

# Resetar banco de dados
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio

# Verificar status das migrações
npx prisma migrate status
```

## 🧪 Testando com Postman

### 1. Cadastrar um usuário admin
- Método: `POST`
- URL: `http://localhost:8080/usuarios`
- Body: JSON com `"isAdmin": true`

### 2. Fazer login
- Método: `POST`
- URL: `http://localhost:8080/login`
- Copiar o token retornado

### 3. Listar usuários
- Método: `GET`
- URL: `http://localhost:8080/usuarios`
- Header: `Authorization: Bearer <token>`

## 🔒 Segurança Implementada

- **Autenticação JWT**: Tokens seguros com expiração de 4 horas
- **Hash de Senhas**: bcryptjs com salt rounds = 10
- **Validação de Entrada**: Campos obrigatórios e formato de email
- **Controle de Acesso**: Middleware de autorização por roles
- **Tratamento de Erros**: Mensagens padronizadas sem vazamento de dados




## 👩‍💻 Desenvolvedora Raiane Batista Silva Chaves

**Projeto Individual** - Curso Desenvolvimento Full Stack Básico  
**Instituição**: Atlântico Avanti  
**Período**: 2025.2

---

⭐ **Se este projeto foi útil, considere dar uma estrela no repositório!**
