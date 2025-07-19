import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-people-fill me-2"></i>
                    Gerenciamento de Usuários
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <i className="bi bi-house me-1"></i>
                                        Início
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">
                                        <i className="bi bi-list-ul me-1"></i>
                                        Lista de Usuários
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users/new">
                                        <i className="bi bi-person-plus me-1"></i>
                                        Novo Usuário
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle" 
                                    href="#" 
                                    role="button" 
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-person-circle me-1"></i>
                                    {user?.name || 'Usuário'}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={handleLogout}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
                                            Sair
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="bi bi-box-arrow-in-right me-1"></i>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
