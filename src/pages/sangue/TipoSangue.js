import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

import { getUserStorage } from "../../utils/storage";
import { tiposQuePodeReceber } from "../../utils/sangue";

export default function TipoSangue() {
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    async function carregar() {
      const user = await getUserStorage();
      setTipo(String(user?.tipoSangue || "n sei")); 
    }
    carregar();
  }, []);

  if (!tipo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Cores.primaria} />
        <Text style={{ marginTop: 10, color: Cores.textoSecundario }}>
          Carregando informações...
        </Text>
      </View>
    );
  }

  const podeReceber = (tiposQuePodeReceber(tipo) || []).map((v) => String(v));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Seu Tipo Sanguíneo</Text>
          </View>

          <View style={styles.tipoContainer}>
            <Text style={styles.tipo}>{String(tipo)}</Text>
          </View>
        </View>

        <View style={styles.separator} />
        
        {/* Subtítulo */}
        <View style={styles.subtituloWrapper}>
          <Icon 
            name="heart-plus-outline" 
            size={20} 
            color={Cores.textoPrimario} 
            style={{ marginRight: 8 }} 
          />
          <Text style={styles.subtitulo}>Você pode receber sangue de:</Text>
        </View>

        {/* Lista */}
        <FlatList
          data={podeReceber}
          keyExtractor={(item) => String(item)} 
          renderItem={({ item }) => (
            <View style={styles.card}> 
              <Text style={styles.cardTxt}>{String(item)}</Text> 
            </View>
          )}
          contentContainerStyle={styles.listContent} 
          showsVerticalScrollIndicator={false}
          scrollEnabled={podeReceber.length > 4}
        />
      </View>
    </SafeAreaView>
  );
}

const Cores = {
  primaria: '#D32F2F', 
  secundaria: '#FFCDD2', 
  fundo: '#FAFAFA', 
  cardFundo: '#FFFFFF', 
  borda: '#EEEEEE',
  textoPrimario: '#212121',
  textoSecundario: '#757575',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Cores.fundo,
    justifyContent:'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, 
    justifyContent: 'center', 
    paddingVertical:120,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.fundo,
  },

  header: {
    marginBottom: 64,
    alignItems: 'center',
  },

  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: Cores.textoPrimario,
  },

  tipoContainer: {
    backgroundColor: Cores.cardFundo,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Cores.primaria,
    elevation: 6,
    shadowColor: Cores.primaria,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  tipo: {
    fontSize: 70,
    fontWeight: "900",
    color: Cores.primaria,
  },

  separator: {
    height: 1,
    backgroundColor: Cores.borda,
    marginVertical: 10,
  },

  subtituloWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: Cores.textoPrimario,
  },

  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  card: {
    backgroundColor: Cores.cardFundo,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: Cores.primaria,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  cardTxt: {
    fontSize: 22,
    fontWeight: "600",
    color: Cores.textoPrimario,
  },
});
