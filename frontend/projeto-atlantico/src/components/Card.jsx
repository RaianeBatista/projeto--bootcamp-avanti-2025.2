import { useState, useEffect } from "react";
import axios from "axios";

export function UserCard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:8080/usuarios", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(data);
        } catch (err) {
            setError("Erro ao carregar usuários: " + err.message);
            console.error("Erro:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button className="btn btn-primary" onClick={getUsers}>
                    Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Usuários ({users.length})</h4>
                <button
                    className="btn btn-success"
                    onClick={() => window.location.reload()}
                >
                    Atualizar
                </button>
            </div>

            <div className="row">
                {users.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            Nenhum usuário encontrado
                        </div>
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="col-md-4 col-lg-3 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> {user.email}
                                        <br />
                                        <strong>Telefone:</strong> {user.phone}
                                        <br />
                                        <strong>Admin:</strong>{" "}
                                        {user.isAdmin ? "Sim" : "Não"}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary btn-sm flex-fill">
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm flex-fill">
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
