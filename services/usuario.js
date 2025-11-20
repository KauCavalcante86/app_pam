import api from "./api";

// Buscar perfil do usuário
export const getUsuario = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

// Atualizar foto do usuário
export const atualizarFoto = async (id, base64) => {
  const response = await api.post(`/usuarios/${id}/foto`, {
    foto: base64
  });
  return response.data;
};

// Atualizar qualquer campo do usuário
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
