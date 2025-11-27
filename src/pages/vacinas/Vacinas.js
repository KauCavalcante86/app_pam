import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
// IMPORTAR ÍCONES (Assumindo react-native-vector-icons ou Expo Icons)
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

const { width } = Dimensions.get('window');

// 🎨 PALETA DE CORES DEFINIDA
const Cores = {
  primaria: '#007AFF', // Azul forte para destaque (como o azul padrão de apps iOS/Android)
  secundaria: '#34C759', // Verde para o tema de saúde
  fundo: '#F2F2F7', // Fundo iOS/Moderno
  cardFundo: '#FFFFFF', // Fundo do Cartão
  textoPrimario: '#1C1C1E',
  textoSecundario: '#8E8E93',
};

// 🗺️ ÍCONES PARA CADA CATEGORIA
const CategoriaIcones = {
    criancas: 'baby-face-outline',
    adultos: 'human-male-female',
    gestantes: 'mother-heart'
};


export default function VacinasScreen() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("criancas"); // Definir um padrão
  const [idadeSelecionada, setIdadeSelecionada] = useState(null);

  const categorias = {
    criancas: {
      titulo: "Crianças e Adolescentes",
      idades: {
        "0 a 1 ano": ["BCG", "Hepatite B", "Pentavalente", "Poliomielite", "Rotavírus"],
        "1 a 4 anos": ["Tríplice Viral", "Pneumocócica", "Meningocócica C"],
        "9 a 14 anos": ["HPV"]
      }
    },
    adultos: {
      titulo: "Adultos",
      idades: {
        "19 a 49 anos": ["Tríplice Viral", "Hepatite B", "dT", "Varicela"],
        "50 a 60 anos": ["Influenza", "Pneumocócica se comorbidade"],
        "60 a 64 anos": ["Pneumocócica", "Influenza"]
      }
    },
    gestantes: {
      titulo: "Gestantes",
      idades: {
        "1º mês": ["Avaliação de histórico vacinal"],
        "2º mês": ["Avaliação de histórico vacinal"],
        "3º mês": ["Avaliação de histórico vacinal"],
        "4º mês": ["Hepatite B (se necessário)", "Influenza (durante campanha)"] ,
        "5º mês": ["dTpa (recomendado a partir da 20ª semana)", "Hepatite B (se necessário)"] ,
        "6º mês": ["dTpa (caso não tenha tomado)", "Influenza"] ,
        "7º mês": ["Reforço conforme avaliação médica"] ,
        "8º mês": ["Acompanhamento e reforços se pendentes"] ,
        "9º mês": ["Finalização de doses pendentes (exceto vacinas proibidas)"]
      }
    }
  };

  const selecionarCategoria = (cat) => {
    setCategoriaSelecionada(cat);
    // Limpar a idade selecionada ao mudar a categoria
    setIdadeSelecionada(null); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Calendário de Vacinação</Text>

        {/* Abas das categorias (Horizontal) */}
        <View style={styles.abasContainer}>
          {Object.keys(categorias).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.aba,
                categoriaSelecionada === key && styles.abaAtiva,
              ]}
              onPress={() => selecionarCategoria(key)}
            >
                <Icon 
                    name={CategoriaIcones[key]} 
                    size={20} 
                    color={categoriaSelecionada === key ? Cores.cardFundo : Cores.textoPrimario} 
                />
              <Text 
                    style={[
                        styles.abaTexto, 
                        categoriaSelecionada === key && styles.abaTextoAtivo
                    ]}
                >
                    {categorias[key].titulo}
                </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção de Faixas Etárias (Listagem) */}
        <Text style={styles.secaoTitulo}>
            {categorias[categoriaSelecionada]?.titulo || "Selecione uma Categoria"}
        </Text>

        {categoriaSelecionada && (
          <View style={styles.faixasEtariasContainer}>
            {Object.keys(categorias[categoriaSelecionada].idades).map((idade) => {
                const isActive = idadeSelecionada === idade;
                return (
              <TouchableOpacity
                key={idade}
                style={[styles.idadeCard, isActive && styles.idadeCardAtivo]}
                onPress={() => setIdadeSelecionada(isActive ? null : idade)}
              >
                <Text style={[styles.idadeTexto, isActive && styles.idadeTextoAtivo]}>
                    {idade}
                </Text>
                <Icon 
                    name={isActive ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color={isActive ? Cores.cardFundo : Cores.textoSecundario} 
                />
              </TouchableOpacity>
            )})}
          </View>
        )}

        {/* Detalhes das Vacinas */}
        {idadeSelecionada && (
          <View style={styles.vacinasBox}>
                <Text style={styles.vacinasHeader}>Vacinas Recomendadas ({idadeSelecionada}):</Text>
            {categorias[categoriaSelecionada].idades[idadeSelecionada].map((v) => (
              <View key={v} style={styles.vacinaItem}>
                {/* Ícone de bullet point/check */}
                <Icon name="shield-plus" size={18} color={Cores.primaria} style={{ marginRight: 8 }} />
                <Text style={styles.vacinaTexto}>{v}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop:60, backgroundColor: Cores.fund },
  scrollContent: { padding: 16, paddingBottom: 30 },
  
  // Título
  titulo: { 
    fontSize: 28, 
    fontWeight: "800", 
    textAlign: "center", 
    marginBottom: 25, 
    color: Cores.textoPrimario 
},

  // Abas
  abasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: Cores.cardFundo,
    borderRadius: 14,
    padding: 6,
    // Sombra sutil para destacar a área de navegação
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  aba: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
  abaAtiva: { backgroundColor: Cores.primaria },
  abaTexto: { color: Cores.textoPrimario, fontWeight: "600", fontSize: 13, marginLeft: 5 },
  abaTextoAtivo: { color: Cores.cardFundo },

  // Seção de Faixas Etárias
  secaoTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: Cores.textoPrimario,
    marginTop: 10,
    marginBottom: 15,
  },
  faixasEtariasContainer: {
    marginBottom: 20,
  },
  idadeCard: {
    backgroundColor: Cores.cardFundo,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: Cores.primaria, // Cor de destaque
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  idadeCardAtivo: { 
    backgroundColor: Cores.primaria, // Fundo azul escuro quando ativo
    borderLeftColor: Cores.primaria,
},
  idadeTexto: { fontSize: 17, fontWeight: "600", color: Cores.textoPrimario },
  idadeTextoAtivo: { color: Cores.cardFundo }, // Texto branco quando ativo

  // Detalhes das Vacinas
  vacinasBox: { 
    backgroundColor: Cores.cardFundo, 
    padding: 20, 
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, 
},
  vacinasHeader: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: Cores.textoPrimario },
  vacinaItem: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vacinaTexto: { fontSize: 16, color: Cores.textoPrimario }
});