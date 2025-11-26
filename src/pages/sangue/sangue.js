import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getUserStorage } from "../storage/userStorage"; 
import { tiposQuePodeReceber } from "../utils/sangue"; 

export default function TipoSangue() {
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    async function carregar() {
      const user = await getUserStorage();
      setTipo(user?.tipoSanguineo || "A+"); // fallback
    }
    carregar();
  }, []);

  if (!tipo) {
    return (
      <View style={styles.container}>
        <Text>Carregando informações...</Text>
      </View>
    );
  }

  const podeReceber = tiposQuePodeReceber(tipo);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Tipo Sanguíneo</Text>

      <Text style={styles.tipo}>{tipo}</Text>

      <Text style={styles.subtitulo}>Você pode receber sangue de:</Text>

      <FlatList
        data={podeReceber}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTxt}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  titulo: { fontSize: 25, fontWeight: "bold", marginBottom: 20 },
  tipo: { fontSize: 55, fontWeight: "bold", color: "#007aff", marginBottom: 25 },
  subtitulo: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTxt: { fontSize: 20, fontWeight: "bold" },
});
