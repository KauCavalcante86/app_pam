import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAlergias, criarAlergia, atualizarAlergia, deletarAlergia } from "../../../services/alergiaService";

export default function AlergiasInterativa() {
  const [alergias, setAlergias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlergia, setCurrentAlergia] = useState(null);
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("Leve");

  // Carregar alergias do backend
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
      <Text style={styles.titulo}>Minhas Alergias</Text>

      <FlatList
        data={alergias}
        keyExtractor={(item) => String(item.id)}
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
                <Icon name="trash-can" size={26} color="#D32F2F" style={{ marginLeft: 15 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btnAdd} onPress={() => abrirModal()}>
        <Icon name="plus" size={24} color="#FFF" />
        <Text style={styles.txtAdd}>Adicionar</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentAlergia ? "Editar Alergia" : "Nova Alergia"}</Text>

            <TextInput
              placeholder="Alergia"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />

            <Text>Nível</Text>
            <View style={styles.nivelContainer}>
              {["Leve", "Moderada", "Grave"].map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[
                    styles.nivelButton,
                    nivel === n && styles.nivelSelected
                  ]}
                  onPress={() => setNivel(n)}
                >
                  <Text style={nivel === n ? styles.nivelTextSelected : styles.nivelText}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#FFF" }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtn} onPress={salvarAlergia}>
                <Text style={{ color: "#FFF" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Mantive o mesmo StyleSheet do seu código original
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAFAFA" },
  titulo: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  textoAlergia: { fontSize: 18, fontWeight: "600" },
  acoes: { flexDirection: "row", alignItems: "center" },
  btnAdd: {
    backgroundColor: "#0288D1",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  txtAdd: { color: "#FFF", fontSize: 18, marginLeft: 8 },
  nivelMarker: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "90%", backgroundColor: "#FFF", borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#DDD", borderRadius: 8, padding: 10, marginBottom: 15 },
  nivelContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  nivelButton: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#0288D1", minWidth: 80, alignItems: "center" },
  nivelSelected: { backgroundColor: "#0288D1" },
  nivelText: { color: "#0288D1" },
  nivelTextSelected: { color: "#FFF", fontWeight: "700" },
  modalBtn: { backgroundColor: "#0288D1", padding: 12, borderRadius: 8, flex: 1, alignItems: "center", marginHorizontal: 5 },
});
