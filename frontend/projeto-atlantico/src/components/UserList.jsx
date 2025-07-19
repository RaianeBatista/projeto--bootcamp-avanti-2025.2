import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        loadUsers();
    }, [isAuthenticated, navigate]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await userAPI.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            setError('Erro ao carregar a lista de usuários');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await userAPI.deleteUser(userId);
            setUsers(users.filter(u => u.id !== userId));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            setError('Erro ao deletar usuário');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    if (loading) {
        return <Loading message="Carregando usuários..." />;
    }

    return (
        <div className="container mt-4 fade-in">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>
                            <i className="bi bi-people-fill me-2"></i>
                            Lista de Usuários
                        </h2>
                        <Link to="/users/new" className="btn btn-primary">
                            <i className="bi bi-person-plus me-2"></i>
                            Novo Usuário
                        </Link>
                    </div>

                    {error && (
                        <ErrorMessage 
                            message={error} 
                            onRetry={loadUsers}
                        />
                    )}

                    {users.length === 0 && !loading && !error ? (
                        <div className="card">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-people display-1 text-muted"></i>
                                <h4 className="mt-3">Nenhum usuário encontrado</h4>
                                <p className="text-muted">Clique no botão acima para adicionar o primeiro usuário.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    <i className="bi bi-table me-2"></i>
                                    Total: {users.length} usuário(s)
                                </h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Avatar</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Telefone</th>
                                            <th>Data de Nascimento</th>
                                            <th>Admin</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((userItem) => (
                                            <tr key={userItem.id}>
                                                <td>
                                                    {userItem.avatarUrl ? (
                                                        <img 
                                                            src={userItem.avatarUrl} 
                                                            alt={userItem.name}
                                                            className="rounded-circle"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div 
                                                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white avatar-placeholder"
                                                            style={{ width: '40px', height: '40px' }}
                                                        >
                                                            <i className="bi bi-person"></i>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <strong>{userItem.name}</strong>
                                                </td>
                                                <td>{userItem.email}</td>
                                                <td>{userItem.phone}</td>
                                                <td>{formatDate(userItem.birthDate)}</td>
                                                <td>
                                                    {userItem.isAdmin ? (
                                                        <span className="badge bg-success">
                                                            <i className="bi bi-check-circle me-1"></i>
                                                            Sim
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-secondary">
                                                            <i className="bi bi-x-circle me-1"></i>
                                                            Não
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <Link 
                                                            to={`/users/edit/${userItem.id}`}
                                                            className="btn btn-sm btn-outline-primary"
                                                            title="Editar"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => setDeleteConfirm(userItem.id)}
                                                            title="Excluir"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmação de exclusão */}
            {deleteConfirm && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Confirmar Exclusão
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close"
                                    onClick={() => setDeleteConfirm(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Tem certeza que deseja excluir este usuário?</p>
                                <p className="text-muted">Esta ação não pode ser desfeita.</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setDeleteConfirm(null)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(deleteConfirm)}
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
