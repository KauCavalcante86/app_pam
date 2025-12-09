import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";

const CoresCategorias = {
  criancas: "#4BA3FF",
  adultos: "#34C759",
  gestantes: "#FF6B9A",
};

const CategoriaIcones = {
  criancas: "baby-face-outline",
  adultos: "human-male-female",
  gestantes: "mother-heart",
};

export default function VacinasScreen() {
  const navigation = useNavigation();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("criancas");
  const [idadeSelecionada, setIdadeSelecionada] = useState(null);

  const categorias = {
    criancas: {
      titulo: "Crianças e Adolescentes",
      idades: {
        "0 a 1 ano": ["BCG", "Hepatite B", "Pentavalente", "Poliomielite", "Rotavírus"],
        "1 a 4 anos": ["Tríplice Viral", "Pneumocócica", "Meningocócica C"],
        "9 a 14 anos": ["HPV"],
      },
    },
    adultos: {
      titulo: "Adultos",
      idades: {
        "19 a 49 anos": ["Tríplice Viral", "Hepatite B", "dT", "Varicela"],
        "50 a 60 anos": ["Influenza", "Pneumocócica se comorbidade"],
        "60 a 64 anos": ["Pneumocócica", "Influenza"],
      },
    },
    gestantes: {
      titulo: "Gestantes",
      idades: {
        "1º mês": ["Avaliação de histórico vacinal"],
        "2º mês": ["Avaliação de histórico vacinal"],
        "3º mês": ["Avaliação de histórico vacinal"],
        "4º mês": ["Hepatite B (se necessário)", "Influenza (durante campanha)"],
        "5º mês": ["dTpa (a partir da 20ª semana)", "Hepatite B (se necessário)"],
        "6º mês": ["dTpa (se não tomou)", "Influenza"],
        "7º mês": ["Reforços conforme necessidade médica"],
        "8º mês": ["Acompanhamento de doses pendentes"],
        "9º mês": ["Finalização de doses permitidas"],
      },
    },
  };

  const selecionarCategoria = (cat) => {
    setCategoriaSelecionada(cat);
    setIdadeSelecionada(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Botão Voltar */}
        <View style={styles.buttonVoltarContainer}>
          <Pressable style={styles.buttonVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonVoltarIcon}>{"<"}</Text>
          </Pressable>
        </View>

        {/* Título */}
        <Text style={styles.titulo}>Calendário de Vacinação</Text>

        {/* Conteúdo Principal */}
        <View style={styles.conteudoPrincipal}>
          
          {/* Abas */}
          <View style={styles.abasContainer}>
            {Object.keys(categorias).map((key) => {
              const ativo = categoriaSelecionada === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.aba,
                    ativo && { backgroundColor: CoresCategorias[key] },
                  ]}
                  onPress={() => selecionarCategoria(key)}
                >
                  <Icon
                    name={CategoriaIcones[key]}
                    size={20}
                    color={ativo ? "white" : "black"}
                  />
                  <Text style={[styles.abaTexto, ativo && styles.abaTextoAtivo]}>
                    {categorias[key].titulo}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Título da seção */}
          <Text style={styles.secaoTitulo}>{categorias[categoriaSelecionada].titulo}</Text>

          {/* Faixas Etárias */}
          {Object.keys(categorias[categoriaSelecionada].idades).map((idade) => {
            const ativo = idadeSelecionada === idade;

            return (
              <TouchableOpacity
                key={idade}
                style={[
                  styles.idadeCard,
                  ativo && {
                    backgroundColor: CoresCategorias[categoriaSelecionada],
                    borderLeftColor: CoresCategorias[categoriaSelecionada],
                  },
                ]}
                onPress={() => setIdadeSelecionada(ativo ? null : idade)}
              >
                <Text style={[styles.idadeTexto, ativo && styles.idadeTextoAtivo]}>
                  {idade}
                </Text>

                <Icon
                  name={ativo ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={ativo ? "white" : "#8E8E93"}
                />
              </TouchableOpacity>
            );
          })}

          {/* Lista de Vacinas */}
          {idadeSelecionada && (
            <View style={styles.vacinasBox}>
              <Text style={styles.vacinasHeader}>
                Vacinas Recomendadas ({idadeSelecionada}):
              </Text>

              {categorias[categoriaSelecionada].idades[idadeSelecionada].map((v) => (
                <View key={v} style={styles.vacinaItem}>
                  <Icon
                    name="shield-plus"
                    size={18}
                    color={CoresCategorias[categoriaSelecionada]}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.vacinaTexto}>{v}</Text>
                </View>
              ))}
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
