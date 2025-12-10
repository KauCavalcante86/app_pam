import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import styles from './style'

import {
  getAlergias,
  criarAlergia,
  atualizarAlergia,
  deletarAlergia,
} from "../../../services/alergiaService";

// Responsividade
const { width } = Dimensions.get("window");
const scale = width / 375;
function normalize(size) {
  return Math.round(size * scale);
}

export default function AlergiasInterativa() {
  const navigation = useNavigation();

  const [alergias, setAlergias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlergia, setCurrentAlergia] = useState(null);
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("Leve");

  // ------------------------------------------------------------
  // CARREGAR DADOS
  // ------------------------------------------------------------
  useEffect(() => {
    carregarAlergias();
  }, []);

  async function carregarAlergias() {
    try {
      const data = await getAlergias();
      setAlergias(data);
    } catch (error) {
      console.log("Erro ao carregar alergias:", error);
    }
  }

  // ------------------------------------------------------------
  // MODAL
  // ------------------------------------------------------------
  function abrirModal(alergia = null) {
    setCurrentAlergia(alergia);
    setNome(alergia ? alergia.nome : "");
    setNivel(alergia ? alergia.nivel : "Leve");
    setModalVisible(true);
  }

  async function salvarAlergia() {
    if (!nome) return;

    try {
      if (currentAlergia) {
        await atualizarAlergia(currentAlergia.id, { nome, nivel });
      } else {
        await criarAlergia({ nome, nivel });
      }
      setModalVisible(false);
      carregarAlergias();
    } catch (error) {
      console.log("Erro ao salvar alergia:", error);
    }
  }

  async function deletarAlergiaHandler(id) {
    try {
      await deletarAlergia(id);
      carregarAlergias();
    } catch (error) {
      console.log("Erro ao deletar alergia:", error);
    }
  }

  return (
    <View style={styles.container}>
      {/* BOTÃO VOLTAR */}
      <View style={styles.buttonVoltarContainer}>
        <Pressable
                  style={styles.btnVoltar}
                  onPress={() => navigation.goBack()}
                >
                  <Image style={styles.imgVoltar} source={require('../../../assets/btnVoltar.png')} />
                </Pressable>
      </View>

      {/* TÍTULO */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Minhas Alergias</Text>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.conteudoPrincipal}>
        <FlatList
          data={alergias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.nivelMarker,
                    item.nivel === "Leve" && { backgroundColor: "green" },
                    item.nivel === "Moderada" && { backgroundColor: "orange" },
                    item.nivel === "Grave" && { backgroundColor: "red" },
                  ]}
                />
                <Text style={styles.textoAlergia}>{item.nome}</Text>
              </View>

              <View style={styles.acoes}>
                <TouchableOpacity onPress={() => abrirModal(item)}>
                  <Icon name="pencil" size={26} color="#4CAF50" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletarAlergiaHandler(item.id)}>
                  <Icon
                    name="trash-can"
                    size={26}
                    color="#D32F2F"
                    style={{ marginLeft: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* BOTÃO ADICIONAR */}
      <TouchableOpacity style={styles.btnAdd} onPress={() => abrirModal()}>
        <Icon name="plus" size={26} color="#FFF" />
        <Text style={styles.txtAdd}>Adicionar</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentAlergia ? "Editar Alergia" : "Nova Alergia"}
            </Text>

            <TextInput
              placeholder="Nome da alergia"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />

            <Text style={styles.labelNivel}>Nível</Text>

            <View style={styles.nivelContainer}>
              {["Leve", "Moderada", "Grave"].map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[
                    styles.nivelButton,
                    nivel === n && styles.nivelSelected,
                  ]}
                  onPress={() => setNivel(n)}
                >
                  <Text
                    style={
                      nivel === n ? styles.nivelTextSelected : styles.nivelText
                    }
                  >
                    {n}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#777" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={salvarAlergia}>
                <Text style={styles.modalBtnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
