import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, Alert, TextInput, ScrollView, Image, useWindowDimensions, ActivityIndicator } from "react-native";
import { getUserStorage, setUserStorage } from "../../utils/storege";
import { getUsuario, atualizarFoto, atualizarCampoUsuario } from "../../../services/usuario";
import EditarFotoModal from "../../components/EditarFotoModal";
import styles from "./style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { responsiveStyles } from "./style";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [campoAtual, setCampoAtual] = useState(""); // <- controla qual campo está sendo editado
  const [valorNovo, setValorNovo] = useState("");

   const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { width: width, height: height } = useWindowDimensions();

  const styles = responsiveStyles (width, height) 

  // Carregar usuário salvo
  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    const userStorage = await getUserStorage();

    if (!userStorage) return;

    const dadosApi = await getUsuario(userStorage.id);

    setUsuario(dadosApi.usuario);
    setLoading(false);
  };

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




  async function logout() {
    await AsyncStorage.removeItem("usuario");
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }

  const atualizarCampo = async () => {
  if (!usuario) return Alert.alert("Erro", "Usuário não encontrado!");

  const camposPermitidos = [
    "nome","email","senha","genero","altura","peso","tipoSangue",
    "cep","rua","bairro","cidade","uf"
  ];

  if (!camposPermitidos.includes(campoAtual))
    return Alert.alert("Erro", "Campo inválido!");

  // Valida valor vazio
  if (!valorNovo) return Alert.alert("Erro", `Digite um valor para ${campoAtual}`);

  // Valida tipo
  let valorEnviado = valorNovo;
  if (campoAtual === "altura" || campoAtual === "peso") {
    valorEnviado = parseFloat(valorNovo);
    if (isNaN(valorEnviado)) {
      return Alert.alert("Erro", `Digite um número válido para ${campoAtual}`);
    }
  }

  if (campoAtual === "senha" && valorNovo.length < 6) {
    return Alert.alert("Erro", "Senha precisa ter no mínimo 6 caracteres.");
  }

  if (campoAtual === "email" && !/\S+@\S+\.\S+/.test(valorNovo)) {
    return Alert.alert("Erro", "Email inválido.");
  }

  try {
    const usuarioAtualizado = await atualizarCampoUsuario(usuario.id, campoAtual, valorEnviado);
    setUsuario(usuarioAtualizado);
    await setUserStorage(usuarioAtualizado);

    Alert.alert("Sucesso", `${campoAtual} atualizado com sucesso!`);
    fecharModal();
  } catch (error) {
    console.error("Erro ao atualizar campo:", error.response?.data || error.message);
    Alert.alert("Erro", "Não foi possível atualizar o campo.");
  }
};



  //////////////////////////// NÃO MEEXEEEEEEEEE TA FUNCIONANDOO

  

const enviarNovaFoto = async (imagem) => {
    try {
      const resposta = await atualizarFoto(usuario.id, imagem);

      const novoUsuario = {
        ...usuario, 
        foto_url: resposta.foto_url 
      };

  
      setUsuario(novoUsuario);

      await setUserStorage(novoUsuario);

      setModal(false);

    } catch (error) {
      console.error("ERRO AO ENVIAR FOTO:", error);
      // ...
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
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
                 <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
            source={{
              uri: usuario.foto_url
                ? (usuario.foto_url.startsWith("http")
                    ? usuario.foto_url
                    : `http://192.168.15.4:8000/${usuario.foto_url}`)
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              backgroundColor: "#646464ff",
            }}
          />
          <Pressable
            onPress={() => setModal(true)}
            style={{
              marginTop: 12,
              padding: 10,
              backgroundColor: "#0a84ff",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>Editar Foto</Text>
          </Pressable>
        </View>
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
        <EditarFotoModal
          visible={modal}
          onClose={() => setModal(false)}
          onSave={(foto) => enviarNovaFoto(foto)}
        />
    </View>
  );
}
