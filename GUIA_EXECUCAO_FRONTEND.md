# 🚀 Guia de Execução - Frontend

## Como executar o frontend da aplicação

### 1. Navegue até o diretório do frontend
```bash
cd frontend/projeto-atlantico
```

### 2. Instale as dependências (se necessário)
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### 4. Acesse a aplicação
Abra seu navegador e acesse: `http://localhost:5173`

## 🔧 Configuração do Backend

Certifique-se de que o backend esteja rodando na porta 3000:

```bash
cd backend
npm start
```

## 📋 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Tela de login com email e senha
- Contexto de autenticação React
- Persistência de sessão no localStorage
- Redirecionamento automático

### ✅ Gerenciamento de Usuários
- **Lista de Usuários**: Tabela responsiva com todos os dados
- **Cadastro**: Formulário completo com validação
- **Edição**: Atualização de dados permitidos (nome, email, telefone)
- **Exclusão**: Modal de confirmação antes de deletar

### ✅ Interface Bootstrap
- Design responsivo e moderno
- Ícones Bootstrap Icons
- Animações e transições suaves
- Feedback visual para ações do usuário

### ✅ Componentes Reutilizáveis
- `Loading`: Indicador de carregamento
- `ErrorMessage`: Exibição de erros com retry
- `Navbar`: Navegação principal
- Modais de confirmação

## 🎨 Características da Interface

### Cores e Temas
- **Primária**: Bootstrap Blue (#0d6efd)
- **Navbar**: Tema escuro
- **Cards**: Sombras e efeitos hover
- **Badges**: Cores semânticas (success, secondary)

### Layout Responsivo
- **Desktop**: Layout completo com sidebar
- **Tablet**: Adaptação de botões e espaçamentos
- **Mobile**: Navegação hamburger, tabelas scrolláveis

### Estados Visuais
- **Loading**: Spinners durante operações
- **Sucesso**: Alertas verdes com ícones
- **Erro**: Alertas vermelhos com opção de retry
- **Confirmação**: Modais para ações destrutivas

## 🔗 Estrutura de Rotas

```
/login           → Tela de autenticação
/                → Lista de usuários (home)
/users           → Lista de usuários
/users/new       → Cadastro de novo usuário
/users/edit/:id  → Edição de usuário específico
```

## 📊 Dados Exibidos

### Lista de Usuários
- Avatar (com fallback)
- Nome completo
- Email
- Telefone
- Data de nascimento
- Status de administrador
- Ações (editar/excluir)

### Formulário de Cadastro
- Nome completo *
- Email *
- Senha *
- Confirmação de senha *
- Telefone *
- Data de nascimento *
- Endereço *
- URL do avatar (opcional)
- Checkbox para administrador

### Formulário de Edição
- Nome completo *
- Email *
- Telefone *
- Campos bloqueados: data nascimento, endereço, avatar, admin

## 🛡️ Segurança

- Token JWT armazenado no localStorage
- Interceptador Axios para incluir token nas requisições
- Redirecionamento automático em caso de token inválido
- Logout limpa dados de autenticação

## 🚨 Tratamento de Erros

- Validação de formulários em tempo real
- Mensagens de erro específicas da API
- Fallbacks para erros de rede
- Estados de loading para feedback visual

## 💡 Dicas de Uso

1. **Primeiro Acesso**: Crie um usuário pelo formulário de cadastro
2. **Login**: Use email e senha do usuário criado
3. **Edição**: Apenas alguns campos podem ser editados por segurança
4. **Exclusão**: Sempre há confirmação antes de deletar
5. **Responsivo**: Teste em diferentes tamanhos de tela
