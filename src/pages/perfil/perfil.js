import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, Alert, TextInput, ScrollView, Image } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  // Estados para edição
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novoGenero, setNovoGenero] = useState("");
  const [novaAltura, setNovaAltura] = useState("");
  const [novoPeso, setNovoPeso] = useState("");
  const [novoTipoSangue, setNovoTipoSangue] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Carregar usuário do AsyncStorage
  useEffect(() => {
    async function carregarUsuario() {
      const data = await AsyncStorage.getItem("usuario");
      if (data) {
        const usuarioSalvo = JSON.parse(data);
        setUsuario(usuarioSalvo);
      }
    }
    carregarUsuario();
  }, []);

  const abrirModal = () => {
    // Preencher os campos do modal com os valores atuais
    setNovoNome(usuario?.nome || "");
    setNovoEmail(usuario?.email || "");
    setNovaSenha(""); // senha em branco por segurança
    setNovoGenero(usuario?.genero || "");
    setNovaAltura(usuario?.altura?.toString() || "");
    setNovoPeso(usuario?.peso?.toString() || "");
    setNovoTipoSangue(usuario?.tipoSangue || "");

    setModalVisible(true);
  };

  const fecharModal = () => setModalVisible(false);

  // Atualizar usuário no backend
  async function atualizarUsuario() {
    if (!usuario) return Alert.alert("Erro", "Usuário não encontrado!");

    try {
      const response = await axios.put(
        `http://10.124.127.198:8000/api/usuarios/${usuario.id}`,
        {
          nome: novoNome || usuario.nome,
          email: novoEmail || usuario.email,
          senha: novaSenha || undefined, // se não preencher, não envia
          genero: novoGenero || usuario.genero,
          altura: parseFloat(novaAltura) || usuario.altura,
          peso: parseFloat(novoPeso) || usuario.peso,
          tipoSangue: novoTipoSangue || usuario.tipoSangue,
        },
        { headers: { Accept: "application/json" } }
      );

      // Salvar usuário atualizado no AsyncStorage
      await AsyncStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      setUsuario(response.data.usuario);

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  }

  // Logout
  async function logout() {
    await AsyncStorage.removeItem("usuario");
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }

  const nomeUsuario = usuario?.nome || "Fulano";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
        <Pressable onPress={logout} style={styles.logout}>
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.app}>
        <View style={styles.areaFoto}>
          <View style={styles.foto} />
        </View>

        <Text style={styles.titulo}>Conta</Text>

        <View style={styles.areaInfo}>
          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Nome</Text>
            <View style={styles.atualizaCampo}>
              <Text style={styles.txt}>{nomeUsuario}</Text>
              <Pressable onPress={abrirModal}>
                  <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
              </Pressable>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Email</Text>
            <View style={styles.atualizaCampo}>
              <Text style={styles.txt}>{usuario?.email || "(Email não disponível)"}</Text>
              <Pressable onPress={abrirModal}>
                  <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
              </Pressable>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Senha</Text>
            <View style={styles.atualizaCampo}>
              <Text style={styles.txt}>Alterar senha</Text>
              <Pressable onPress={abrirModal}>
                  <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
              </Pressable>
            </View>
          </View>
        </View>

        <Text style={styles.titulo}>Ficha</Text>
        
        <View style={styles.areaFicha}>
          <View style={styles.campoFicha}>
            <Text style={styles.labelInfo}>Gênero</Text>
            <View style={styles.atualizaCampo}>
              <Text style={styles.txt}>{usuario?.genero || "(Gênero não disponível)"}</Text>
              <Pressable onPress={abrirModal}>
                  <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
              </Pressable>
            </View>
          </View>
          <View style={styles.campoFicha}>
            <Text style={styles.labelInfo}>Altura</Text>
            <View style={styles.atualizaCampo}>
              <Text style={styles.txt}>{usuario?.altura || "(Altura não disponível)"} m</Text>
              <Pressable onPress={abrirModal}>
                  <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
              </Pressable>
            </View>
          </View>

          <View style={styles.campoFicha}>
            <Text style={styles.labelInfo}>Peso</Text>
             <View style={styles.atualizaCampo}>
                <Text style={styles.txt}>{usuario?.peso || "(Peso não disponível)"} Kg</Text>
                <Pressable onPress={abrirModal}>
                    <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
                </Pressable>
            </View>
          </View>

          <View style={styles.campoFicha}>
            <Text style={styles.labelInfo}>Tipo Sanguíneo</Text>
              <View style={styles.atualizaCampo}>
                <Text style={styles.txt}>{usuario?.tipoSangue || "(Tipo Sanguíneo não disponível)"}</Text>
                <Pressable onPress={abrirModal}>
                    <Image style={styles.imgAtualizar} source={require('../../../assets/atualizar.png')} />
                </Pressable>
            </View>
          </View>
        </View>

        {/* Modal para atualizar usuário */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.conteudoModal}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Atualizar informações</Text>

              <TextInput
                style={styles.campoAtualizar}
                placeholder="Nome"
                value={novoNome}
                onChangeText={setNovoNome}
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Email"
                value={novoEmail}
                onChangeText={setNovoEmail}
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Gênero"
                value={novoGenero}
                onChangeText={setNovoGenero}
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Altura"
                value={novaAltura}
                onChangeText={setNovaAltura}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Peso"
                value={novoPeso}
                onChangeText={setNovoPeso}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.campoAtualizar}
                placeholder="Tipo Sanguíneo"
                value={novoTipoSangue}
                onChangeText={setNovoTipoSangue}
              />

              <Pressable style={styles.enviar} onPress={atualizarUsuario}>
                <Text style={{ color: "white", textAlign: "center" }}>Atualizar</Text>
              </Pressable>

              <Pressable style={styles.btnClose} onPress={fecharModal}>
                <Text style={{ textAlign: "center" }}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
