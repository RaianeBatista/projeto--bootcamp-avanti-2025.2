import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { userAPI } from "../services/api";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const UserEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    avatarUrl: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadUser();
  }, [id, isAuthenticated, navigate]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUser(id);
      const user = response.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        address: user.address || "",
        avatarUrl: user.avatarUrl || "",
        isAdmin: user.isAdmin || false,
      });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setErrors({ general: "Erro ao carregar dados do usuário" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatarUrl: formData.avatarUrl,
      };

      await userAPI.updateUser(id, userData);
      setSuccess("Usuário atualizado com sucesso!");

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else {
        setErrors({ general: "Erro ao atualizar usuário. Tente novamente." });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Carregando dados do usuário..." />;
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="bi bi-pencil me-2"></i>
                Editar Usuário
              </h4>
            </div>
            <div className="card-body">
              {success && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </div>
              )}

              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      <i className="bi bi-person me-1"></i>
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Digite o nome completo"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope me-1"></i>
                      Email *
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite o email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-telephone me-1"></i>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="birthDate" className="form-label">
                      <i className="bi bi-calendar me-1"></i>
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      disabled
                      title="Data de nascimento não pode ser alterada"
                    />
                    <div className="form-text">
                      <i className="bi bi-info-circle me-1"></i>A data de
                      nascimento não pode ser alterada
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <i className="bi bi-geo-alt me-1"></i>
                    Endereço
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    disabled
                    title="Endereço não pode ser alterado"
                    placeholder="Endereço não pode ser alterado"
                  ></textarea>
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>O endereço não
                    pode ser alterado
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="avatarUrl" className="form-label">
                    <i className="bi bi-image me-1"></i>
                    URL do Avatar
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    placeholder="Cole aqui a URL da imagem do avatar"
                  />
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Você pode adicionar ou alterar a imagem do avatar (URL).
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isAdmin"
                      name="isAdmin"
                      checked={formData.isAdmin}
                      disabled
                      title="Permissão de admin não pode ser alterada"
                    />
                    <label className="form-check-label" htmlFor="isAdmin">
                      <i className="bi bi-shield-check me-1"></i>
                      Usuário Administrador
                    </label>
                  </div>
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    As permissões de administrador não podem ser alteradas
                  </div>
                </div>

                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Nota:</strong> Por questões de segurança, apenas nome,
                  email e telefone podem ser editados.
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => navigate("/users")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
