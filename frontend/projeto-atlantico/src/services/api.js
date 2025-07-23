import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const userAPI = {
  // Listar todos os usuários
  getUsers: () => api.get("/usuarios"),

  // Buscar usuário por ID
  getUser: (id) => api.get(`/usuario/${id}`),

  // Criar novo usuário
  createUser: (userData) => api.post("/usuarios", userData),

  // Atualizar usuário
  updateUser: (id, userData) => api.put(`/usuario/${id}`, userData),

  // Deletar usuário
  deleteUser: (id) => api.delete(`/usuario/${id}`),

  // Login
  login: (credentials) => api.post("/login", credentials),
};

export default api;
