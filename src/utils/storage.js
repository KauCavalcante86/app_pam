import AsyncStorage from "@react-native-async-storage/async-storage";

// Pega usuário do AsyncStorage
export const getUserStorage = async () => {
  try {
    const data = await AsyncStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Erro ao ler usuário do AsyncStorage:", e);
    return null;
  }
};

// Salva usuário no AsyncStorage
export const setUserStorage = async (usuario) => {
  try {
    const jsonValue = JSON.stringify(usuario);
    await AsyncStorage.setItem("usuario", jsonValue);
    console.log("Usuário salvo no storege");
  } catch (e) {
    console.error("Erro ao salvar usuário no AsyncStorage:", e);
  }
};

// Remove usuário do AsyncStorage
export const removeUserStorage = async () => {
  try {
    await AsyncStorage.removeItem("usuario");
    console.log("Usuário removido do storege");
  } catch (e) {
    console.error("Erro ao remover usuário do AsyncStorage:", e);
  }
};