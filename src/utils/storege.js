import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserStorage = async () => {
  const data = await AsyncStorage.getItem("usuario");
  return data ? JSON.parse(data) : null;
};

export const setUserStorage = async (usuario) => {
  try {
    const jsonValue = JSON.stringify(usuario);
    await AsyncStorage.setItem("usuario", jsonValue);
    console.log("salvo no storege");
  } catch (e) {
    console.error("Erro ao salvar usuário no AsyncStorage:", e);
  }
};
