
import api from "./api";


export const getUsuario = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const atualizarFoto = async (id, base64) => {
  const response = await api.post(`/usuarios/${id}/foto`, {
    foto: base64
  });
  return response.data;
};


export const atualizarCampoUsuario = async (id, campo, valor) => {
  try {
    const payload = {};
    payload[campo] = campo === "altura" || campo === "peso" ? parseFloat(valor) : valor;

    const response = await api.put(`/usuarios/${id}`, payload);
    return response.data.usuario;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const response = await api.post(
      "/login",
      { email, senha },
      { headers: { Accept: "application/json" } }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "E-mail ou senha inválidos.",
    };
  }
};

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await api.post(
      "/CriarUser",
      dados,
      { headers: { Accept: "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error.response?.data || error.message);
    throw error;
  }
};
