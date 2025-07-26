import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Welcome = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-lg">
              <div className="card-body py-5">
                <i className="bi bi-people-fill display-1 text-primary mb-4"></i>
                <h1 className="card-title mb-3">
                  Bem-vindo ao Atlântico Control
                </h1>
                <p className="card-text lead text-muted mb-4">
                  Uma solução completa para gerenciar usuários com interface
                  moderna e intuitiva.
                </p>
                <div className="d-grid gap-2 d-md-block">
                  <Link to="/login" className="btn btn-primary btn-lg me-2">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Fazer Login
                  </Link>
                  <Link
                    to="/users/new"
                    className="btn btn-outline-primary btn-lg"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Criar Conta
                  </Link>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-person-check display-4 text-success mb-3"></i>
                    <h5 className="card-title">Cadastro Simples</h5>
                    <p className="card-text">
                      Interface intuitiva para cadastrar novos usuários com
                      validação em tempo real.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-list-ul display-4 text-info mb-3"></i>
                    <h5 className="card-title">Listagem Completa</h5>
                    <p className="card-text">
                      Visualize todos os usuários em uma tabela responsiva com
                      filtros e ações.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-shield-check display-4 text-warning mb-3"></i>
                    <h5 className="card-title">Segurança</h5>
                    <p className="card-text">
                      Sistema seguro com autenticação JWT e controle de acesso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-person-circle display-4"></i>
                </div>
                <div>
                  <h2 className="card-title mb-1">
                    Bem-vindo, {user?.name || "Usuário"}!
                  </h2>
                  <p className="card-text">
                    <i className="bi bi-shield-check me-1"></i>
                    {user?.isAdmin ? "Administrador" : "Usuário"} • Atlântico
                    Control
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
              <h5 className="card-title">Gerenciar Usuários</h5>
              <p className="card-text">
                Visualize, edite e gerencie todos os usuários do sistema.
              </p>
              <Link to="/users" className="btn btn-primary">
                <i className="bi bi-list-ul me-2"></i>
                Ver Lista de Usuários
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-person-plus-fill display-4 text-success mb-3"></i>
              <h5 className="card-title">Adicionar Usuário</h5>
              <p className="card-text">
                Cadastre novos usuários no sistema com informações completas.
              </p>
              <Link to="/users/new" className="btn btn-success">
                <i className="bi bi-person-plus me-2"></i>
                Cadastrar Novo Usuário
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Recursos do Sistema
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Cadastro completo de usuários
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Edição de informações pessoais
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Exclusão com confirmação
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Interface responsiva
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Validação de formulários
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Sistema de autenticação seguro
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
