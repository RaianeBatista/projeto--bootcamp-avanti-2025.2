# Frontend - Gerenciamento de Usuários

Este é o frontend da aplicação de gerenciamento de usuários, desenvolvido com React.js e Bootstrap.

## 🚀 Tecnologias Utilizadas

- **React.js** - Biblioteca para construção da interface
- **React Router DOM** - Roteamento entre páginas
- **Bootstrap 5** - Framework CSS para estilização
- **Bootstrap Icons** - Ícones
- **Axios** - Cliente HTTP para comunicação com a API
- **Vite** - Bundler e servidor de desenvolvimento

## 📋 Funcionalidades

- **Autenticação**: Login de usuários
- **Listagem**: Visualizar todos os usuários cadastrados
- **Cadastro**: Adicionar novos usuários
- **Edição**: Atualizar dados de usuários existentes
- **Exclusão**: Remover usuários do sistema
- **Interface Responsiva**: Adaptada para diferentes tamanhos de tela

## 🎨 Características da Interface

- **Design Moderno**: Interface limpa e profissional com Bootstrap
- **Responsividade**: Funciona bem em desktop, tablet e mobile
- **Ícones Intuitivos**: Bootstrap Icons para melhor UX
- **Validação de Formulários**: Feedback visual para campos obrigatórios
- **Estados de Loading**: Indicadores visuais durante operações
- **Modais de Confirmação**: Para ações destrutivas como exclusão
- **Tratamento de Erros**: Mensagens de erro amigáveis

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da aplicação rodando na porta 3000

### Instalação

1. Navegue até o diretório do frontend:
```bash
cd frontend/projeto-atlantico
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ErrorMessage.jsx  # Componente para exibir erros
│   ├── Loading.jsx       # Componente de carregamento
│   ├── Login.jsx         # Tela de login
│   ├── Navbar.jsx        # Barra de navegação
│   ├── UserEdit.jsx      # Formulário de edição
│   ├── UserForm.jsx      # Formulário de cadastro
│   └── UserList.jsx      # Lista de usuários
├── contexts/             # Contextos React
│   └── AuthContext.jsx   # Contexto de autenticação
├── services/             # Serviços e APIs
│   └── api.js           # Cliente HTTP e endpoints
├── styles/              # Estilos personalizados
│   └── custom.css       # CSS customizado
├── App.jsx              # Componente principal
└── main.jsx             # Ponto de entrada
```

## 🔗 Rotas da Aplicação

- `/login` - Tela de login
- `/` - Lista de usuários (página inicial)
- `/users` - Lista de usuários
- `/users/new` - Cadastro de novo usuário
- `/users/edit/:id` - Edição de usuário

## 🔧 Configuração da API

A aplicação está configurada para se conectar com o backend em `http://localhost:3000`. Se necessário, altere a URL base no arquivo `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000';
```

## 📱 Recursos da Interface

### Autenticação
- Login com email e senha
- Persistência da sessão no localStorage
- Redirecionamento automático para login quando não autenticado
- Logout com limpeza da sessão

### Lista de Usuários
- Tabela responsiva com dados dos usuários
- Avatars com fallback para ícone padrão
- Badges para indicar usuários administradores
- Ações de editar e excluir por usuário
- Modal de confirmação para exclusão

### Formulários
- Validação em tempo real
- Campos obrigatórios marcados com asterisco
- Feedback visual para erros
- Estados de loading durante submissão
- Máscara de entrada para campos específicos

### Design Responsivo
- Layout adaptável para mobile, tablet e desktop
- Tabelas com scroll horizontal em telas pequenas
- Botões e formulários otimizados para touch
- Navegação mobile-friendly

## 🎭 Temas e Estilos

A aplicação utiliza:
- **Cores principais**: Bootstrap Blue (#0d6efd)
- **Tema escuro**: Para navbar e cabeçalhos de tabela
- **Animações suaves**: Hover effects e transições
- **Iconografia consistente**: Bootstrap Icons

## 🚧 Próximas Melhorias

- [ ] Implementar upload de imagens para avatar
- [ ] Adicionar filtros e busca na lista de usuários
- [ ] Implementar paginação para grandes volumes de dados
- [ ] Adicionar dashboard com estatísticas
- [ ] Implementar notificações toast
- [ ] Adicionar tema escuro/claro
