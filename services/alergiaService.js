// services/alergiaService.js
import api from "./api"; // <-- aqui você importa seu arquivo de configuração

export const getAlergias = async () => {
  const res = await api.get("/alergias");
  return res.data;
};

export const criarAlergia = async (data) => {
  const res = await api.post("/alergias", data);
  return res.data;
};

export const atualizarAlergia = async (id, data) => {
  const res = await api.put(`/alergias/${id}`, data);
  return res.data;
};

export const deletarAlergia = async (id) => {
  const res = await api.delete(`/alergias/${id}`);
  return res.data;
};
