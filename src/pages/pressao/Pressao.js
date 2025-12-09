import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

import { styles, Cores } from "./style";
import { getRegistros, criarRegistro } from "../../../services/saudeService";

const safeNumber = (value) => {
  const num = Number(value);
  return isFinite(num) ? num : 0;
};

export default function SaudeInterativa() {
  const navigation = useNavigation();

  const [dadosHistorico, setDadosHistorico] = useState({
    datas: [],
    pressaoAlta: [],
    pressaoBaixa: [],
    batimentos: [],
  });

  const [inputAlta, setInputAlta] = useState("");
  const [inputBaixa, setInputBaixa] = useState("");
  const [inputBatimentos, setInputBatimentos] = useState("");
  const [inputData, setInputData] = useState("");

  const screenWidth = Dimensions.get("window").width - 48;

  useEffect(() => {
    carregarRegistros();
  }, []);

  async function carregarRegistros() {
    try {
      const registros = await getRegistros();

      setDadosHistorico({
        datas: registros.map((r) => r.data || ""),
        pressaoAlta: registros.map((r) => safeNumber(r.pressao_alta)),
        pressaoBaixa: registros.map((r) => safeNumber(r.pressao_baixa)),
        batimentos: registros.map((r) => safeNumber(r.batimentos)),
      });
    } catch (error) {
      console.log("Erro ao carregar registros:", error);
    }
  }

  async function adicionarRegistro() {
    if (!inputAlta || !inputBaixa || !inputBatimentos || !inputData) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    const alta = safeNumber(inputAlta);
    const baixa = safeNumber(inputBaixa);
    const bat = safeNumber(inputBatimentos);

    if (alta > 140 || baixa > 90 || bat > 100 || alta < 90 || baixa < 60 || bat < 50) {
      Alert.alert("Atenção", "Valores fora do normal!");
    }

    try {
      await criarRegistro({
        data: inputData,
        pressao_alta: alta,
        pressao_baixa: baixa,
        batimentos: bat,
      });

      setInputAlta("");
      setInputBaixa("");
      setInputBatimentos("");
      setInputData("");

      carregarRegistros();
    } catch (error) {
      console.log("Erro ao salvar registro:", error);
    }
  }

  const chartWidthPressao = Math.max(screenWidth, dadosHistorico.datas.length * 60);
  const chartWidthBatimentos = Math.max(screenWidth, dadosHistorico.datas.length * 60);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* BOTÃO VOLTAR */}
        <View style={styles.buttonVoltarContainer}>
          <Pressable style={styles.buttonVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonVoltarIcon}>{"<"}</Text>
          </Pressable>
        </View>

        <Text style={styles.titulo}>Saúde do Coração</Text>

        {/* CARD DE ADIÇÃO */}
        <View style={styles.card}>
          <Text style={styles.subtitulo}>Adicionar Novo Registro</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Data (YYYY-MM-DD)"
              placeholderTextColor={Cores.textoSecundario}
              value={inputData}
              onChangeText={setInputData}
            />

            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Pressão Sistólica (Alta)"
                placeholderTextColor={Cores.textoSecundario}
                keyboardType="numeric"
                value={inputAlta}
                onChangeText={setInputAlta}
              />

              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Pressão Diastólica (Baixa)"
                placeholderTextColor={Cores.textoSecundario}
                keyboardType="numeric"
                value={inputBaixa}
                onChangeText={setInputBaixa}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Batimentos por Minuto"
              placeholderTextColor={Cores.textoSecundario}
              keyboardType="numeric"
              value={inputBatimentos}
              onChangeText={setInputBatimentos}
            />

            <TouchableOpacity style={styles.botao} onPress={adicionarRegistro}>
              <Text style={styles.botaoTexto}>Salvar Registro</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* GRÁFICO DE PRESSÃO */}
        <Text style={styles.subtitulo}>Tendência da Pressão Arterial</Text>

        {dadosHistorico.datas.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: dadosHistorico.datas,
                datasets: [
                  { data: dadosHistorico.pressaoAlta, color: () => "#FF6B6B", strokeWidth: 3 },
                  { data: dadosHistorico.pressaoBaixa, color: () => "#00CC66", strokeWidth: 3 },
                ],
                legend: ["Alta (Sistólica)", "Baixa (Diastólica)"],
              }}
              width={chartWidthPressao}
              height={250}
              chartConfig={{
                backgroundColor: Cores.cardFundo,
                backgroundGradientFrom: "#F7F7F7",
                backgroundGradientTo: Cores.cardFundo,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(28, 28, 30, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(28, 28, 30, ${opacity})`,
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#fff",
                },
              }}
              style={styles.chartStyle}
            />
          </ScrollView>
        ) : (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemTexto}>
              Nenhum dado de pressão encontrado. Adicione um registro acima!
            </Text>
          </View>
        )}

        {/* GRÁFICO DE BATIMENTOS */}
        <Text style={styles.subtitulo}>Batimentos Cardíacos por Minuto</Text>

        {dadosHistorico.datas.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: dadosHistorico.datas,
                datasets: [
                  {
                    data: dadosHistorico.batimentos,
                    color: () => Cores.principal,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={chartWidthBatimentos}
              height={250}
              chartConfig={{
                backgroundColor: Cores.cardFundo,
                backgroundGradientFrom: "#F7F7F7",
                backgroundGradientTo: Cores.cardFundo,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(28, 28, 30, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(28, 28, 30, ${opacity})`,
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#fff",
                },
              }}
              style={styles.chartStyle}
            />
          </ScrollView>
        ) : (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemTexto}>
              Nenhum dado de batimentos encontrado. Adicione um registro acima!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
