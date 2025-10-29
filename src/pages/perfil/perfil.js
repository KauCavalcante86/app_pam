import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, Alert, TextInput, ScrollView, Image, useWindowDimensions } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { responsiveStyles } from "./style";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [campoAtual, setCampoAtual] = useState(""); // <- controla qual campo está sendo editado
  const [valorNovo, setValorNovo] = useState("");

  const navigation = useNavigation();

      const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { width: width, height: height } = useWindowDimensions();

  const styles = responsiveStyles (width, height) 

  // Carregar usuário salvo
  useEffect(() => {
    async function carregarUsuario() {
      const data = await AsyncStorage.getItem("usuario");
      if (data) setUsuario(JSON.parse(data));
    }
    carregarUsuario();
  }, []);

  const abrirModal = (campo, valorAtual) => {
    setCampoAtual(campo);
    setValorNovo(valorAtual ? valorAtual.toString() : "");
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCampoAtual("");
    setValorNovo("");
  };

  // Atualizar campo específico
  async function atualizarCampo() {
    if (!usuario) return Alert.alert("Erro", "Usuário não encontrado!");

   const camposPermitidos = [
    "nome", "email", "senha", "genero", "altura", "peso", "tipoSangue",
    "cep", "rua", "bairro", "cidade", "uf" // ✅ adicionados
  ];


    if (!camposPermitidos.includes(campoAtual))
      return Alert.alert("Erro", "Campo inválido!");

    try {
      const payload = { [campoAtual]: campoAtual === "altura" || campoAtual === "peso" ? parseFloat(valorNovo) : valorNovo };

      const response = await axios.put(
        `http://10.67.5.97:8000/api/usuarios/${usuario.id}`,
        payload,
        { headers: { Accept: "application/json" } }
      );

      await AsyncStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      setUsuario(response.data.usuario);

      Alert.alert("Sucesso", `${campoAtual} atualizado com sucesso!`);
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível atualizar o campo.");
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("usuario");
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Perfil</Text>
          <Pressable onPress={logout} style={styles.logout}>
            <Text style={{ color: "white" }}>Logout</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.app} scrollEnabled>
          <View style={styles.areaFoto}>
            <View style={styles.foto} />
          </View>

          <Text style={styles.titulo}>Conta</Text>
          <View style={styles.areaInfo}>
            {[
              { label: "Nome", key: "nome" },
              { label: "Email", key: "email" },
              { label: "Senha", key: "senha", texto: "Alterar senha" },
            ].map((item, i) => (
              <View style={styles.campo} key={i}>
                <Text style={styles.labelInfo}>{item.label}</Text>
                <View style={styles.atualizaCampo}>
                    <Pressable
                    style={styles.btnAtualizar}
                      onPress={() => abrirModal(item.key, usuario?.[item.key])}
                    >
                  <Text style={styles.txt}>
                    {item.key === "senha"
                      ? item.texto
                      : usuario?.[item.key] || `(Sem ${item.label})`}
                  </Text>
                    <Image
                      style={styles.imgAtualizar}
                      source={require("../../../assets/atualizar.png")}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.titulo}>Ficha</Text>
          <View style={styles.areaFicha}>
            {[
              { label: "Gênero", key: "genero" },
              { label: "Altura", key: "altura", sufixo: " m" },
              { label: "Peso", key: "peso", sufixo: " Kg" },
              { label: "Tipo Sanguíneo", key: "tipoSangue" },
            ].map((item, i) => (
              <View style={styles.campoFicha} key={i}>
                <Text style={styles.labelInfo}>{item.label}</Text>
                <View style={styles.atualizaCampo}>
                    <Pressable
                      style={styles.btnAtualizar}
                      onPress={() => abrirModal(item.key, usuario?.[item.key])}
                    >
                  <Text style={styles.txt}>
                    {usuario?.[item.key]
                      ? `${usuario[item.key]}${item.sufixo || ""}`
                      : `(Sem ${item.label})`}
                  </Text>
                    <Image
                      style={styles.imgAtualizar}
                      source={require("../../../assets/atualizar.png")}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
         <Text style={styles.titulo}>Endereço</Text>
          <View style={[styles.areaFicha,{marginBottom:60,}]}>
            {[
              { label: "CEP", key: "cep" },
              { label: "Rua", key: "rua" },
              { label: "Bairro", key: "bairro" },
              { label: "Cidade", key: "cidade" },
              { label: "UF", key: "uf" },
            ].map((item, i) => (
              <View style={styles.campoFicha} key={i}>
                <Text style={styles.labelInfo}>{item.label}</Text>
                <View style={styles.atualizaCampo}>
                  <Pressable
                    style={styles.btnAtualizar}
                    onPress={() => abrirModal(item.key, usuario?.[item.key])}
                  >
                    <Text style={styles.txt}>
                      {usuario?.[item.key] ? usuario[item.key] : `(Sem ${item.label})`}
                    </Text>
                    <Image
                      style={styles.imgAtualizar}
                      source={require("../../../assets/atualizar.png")}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>


          {/* Modal dinâmico */}
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalBackground}>
              <View style={styles.conteudoModal}>
                <Text style={styles.tituloModal}>
                  Atualizar {campoAtual === "senha" ? "Senha" : campoAtual.charAt(0).toUpperCase() + campoAtual.slice(1)}
                </Text>

                <TextInput
                  style={styles.campoAtualizar}
                  placeholder={`Novo ${campoAtual}`}
                  value={valorNovo}
                  onChangeText={setValorNovo}
                  secureTextEntry={campoAtual === "senha"}
                  keyboardType={
                    campoAtual === "altura" || campoAtual === "peso"
                      ? "numeric"
                      : "default"
                  }
                />
                <View style={styles.campoBtnModal}>
                  <Pressable style={styles.enviar} onPress={atualizarCampo}>
                    <Text style={styles.txtBtn}>Salvar</Text>
                  </Pressable>

                  <Pressable style={[styles.btnClose, { backgroundColor: '#d75252ff' }]} onPress={fecharModal}>
                    <Text style={styles.txtBtn}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
  );
}
