import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, Alert } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TextInput } from "react-native";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [modalVisibleSenha, setModalVisibleSenha] = useState(false);

  const navigation = useNavigation();

  
  const abrirModalNome = () => setModalVisibleNome(true);
  const fecharModalNome = () => setModalVisibleNome(false);
  
  const abrirModalEmail = () => setModalVisibleEmail(true);
  const fecharModalEmail = () => setModalVisibleEmail(false);
  
  const abrirModalSenha = () => setModalVisibleSenha(true);
  const fecharModalSenha = () => setModalVisibleSenha(false);


  useEffect(() => {
    async function carregarUsuario() {
      const data = await AsyncStorage.getItem("usuario");
      const usuarioSalvo = JSON.parse(data);
      setUsuario(usuarioSalvo);
    }
    carregarUsuario();
  }, []);

  async function atualizarUsuario(dadosAtualizados) {
    if (!usuario) return Alert.alert("Erro", "Usuário não encontrado!");
  
    const dados = {};
  
    if (dadosAtualizados.nome && dadosAtualizados.nome.trim()) {
      dados.nome = dadosAtualizados.nome.trim();
    }
    if (dadosAtualizados.email && dadosAtualizados.email.trim()) {
      dados.email = dadosAtualizados.email.trim();
    }
    if (dadosAtualizados.senha && dadosAtualizados.senha.trim()) {
      dados.senha = dadosAtualizados.senha.trim();
    }
  
    if (Object.keys(dados).length === 0) {
      return Alert.alert("Aviso", "Nenhum dado foi alterado.");
    }
  
    try {
      const response = await axios.put(
        `http://10.67.5.20:8000/api/usuarios/${usuario.id}`,
        dados,
        { headers: { Accept: "application/json" } }
      );
  
      await AsyncStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      setUsuario(response.data.usuario);
  
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setNovoNome("");
      setNovoEmail("");
      setNovaSenha("");
    } catch (error) {
      console.error("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  }
  

  

  const nomeUsuario = usuario?.nome || "Fulano";

  // Correção do useState
  const [updates, setUpdates] = useState([
    {
      alteracao: "nome",
      title: "Alterar seu nome.",
    },
  ]);

  const [mudancas, setMudancas] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.btnHeader} onPress={() => {}} />
        <Text>Perfil</Text>
      </View>

      <View style={styles.app}>
        <View style={styles.areaFoto}>
          <View style={styles.foto} />
        </View>

        <View style={styles.areaInfo}>
          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Nome: </Text>
            <Pressable onPress={abrirModalNome}>
              <Text>{nomeUsuario}</Text>
            </Pressable>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Email: </Text>
            <Text>{usuario?.email || "(Email não disponível)"}</Text>
          </View>

          <View style={styles.senha}>
            <Text style={styles.labelInfo}>Senha: </Text>
            <Pressable onPress={abrirModalSenha}><Text>Alterar Senha</Text></Pressable>
          </View>
        </View>

        <View style={styles.areaInfo}>
          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Gênero</Text>
            <Text>{usuario?.genero || "(Gênero não disponível)"}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Altura</Text>
            <Text>{usuario?.altura || "(Altura não disponível)"}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Peso</Text>
            <Text>{usuario?.peso || "(Peso não disponível)"}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.labelInfo}>Tipo Sanguíneo</Text>
            <Text>{usuario?.tipoSanguineo || "(Tipo Sanguíneo não disponível)"}</Text>
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisibleNome}>
          <View style={styles.modalBackground}>
            <View style={styles.conteudoModal}>
              <Text>Conteúdo do Modal nome</Text>
              <Pressable style={styles.btnClose} onPress={fecharModalNome}>
                <Text>Fechar</Text>
              </Pressable>

              <Text>Alterar Nome</Text>
              <TextInput
                placeholder="Novo Nome"
                value={novoNome}
                onChangeText={setNovoNome}
                autoCapitalize="none"
              />

              <Pressable style={styles.btnSalvarNome} onPress={async () => {
                await atualizarUsuario({ nome: novoNome});
                fecharModalNome();
              }}>
                  <Text>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisibleSenha}>
          <View style={styles.modalBackground}>
            <View style={styles.conteudoModal}>
              <Text>Conteúdo do Modal senha</Text>
              <Pressable style={styles.btnClose} onPress={fecharModalSenha}>
                <Text>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
