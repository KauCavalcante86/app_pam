import api from "./api"; // sua instância axios

export const getRegistros = async () => {
  const res = await api.get("/saude");
  return res.data;
};

export const criarRegistro = async (data) => {
  const res = await api.post("/saude", data);
  return res.data;
};
