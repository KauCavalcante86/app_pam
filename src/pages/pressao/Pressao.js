import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, Alert, SafeAreaView 
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getRegistros, criarRegistro } from "../../../services/saudeService";

const Cores = {
    principal: '#007AFF',
    acao: '#34C759',
    fundo: '#F2F2F7',
    cardFundo: '#FFFFFF',
    textoTitulo: '#1C1C1E',
    textoSecundario: '#6B7280',
    sombra: 'rgba(0, 0, 0, 0.08)',
};

const safeNumber = (value) => {
    const num = Number(value);
    return isFinite(num) ? num : 0; 
};


export default function SaudeInterativa() {
  const [dadosHistorico, setDadosHistorico] = useState({ datas: [], pressaoAlta: [], pressaoBaixa: [], batimentos: [] });
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
        datas: registros.map(r => r.data || ""),
        pressaoAlta: registros.map(r => safeNumber(r.pressao_alta)),
        pressaoBaixa: registros.map(r => safeNumber(r.pressao_baixa)),
        batimentos: registros.map(r => safeNumber(r.batimentos)),
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
        batimentos: bat
      });
      setInputAlta(""); setInputBaixa(""); setInputBatimentos(""); setInputData("");
      carregarRegistros();
    } catch (error) {
      console.log("Erro ao salvar registro:", error);
    }
  }

  // Define a largura mínima para o gráfico rolável
  const chartWidthPressao = Math.max(screenWidth, dadosHistorico.datas.length * 60); 

  // Define a largura mínima para o gráfico rolável
  const chartWidthBatimentos = Math.max(screenWidth, dadosHistorico.datas.length * 60); 


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Cores.fundo }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Saúde do Coração</Text>

        <View style={styles.card}>
            <Text style={styles.subtitulo}>Adicionar Novo Registro</Text>
            {/* ... Formulário (Mantido) ... */}
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

        <Text style={styles.subtitulo}>Tendência da Pressão Arterial</Text>
        
        {/* 🔑 CORREÇÃO APLICADA: Renderização Condicional */}
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
                      propsForDots: { r: "5", strokeWidth: "2", stroke: "#fff" }
                  }}
                  style={styles.chartStyle}
              />
          </ScrollView>
        ) : (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemTexto}>Nenhum dado de pressão encontrado. Adicione um registro acima!</Text>
          </View>
        )}
        
        <Text style={styles.subtitulo}>Batimentos Cardíacos por Minuto</Text>
        
        {/* 🔑 CORREÇÃO APLICADA: Renderização Condicional */}
        {dadosHistorico.datas.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                  data={{
                    labels: dadosHistorico.datas,
                    datasets: [
                      { data: dadosHistorico.batimentos, color: () => Cores.principal, strokeWidth: 3 },
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
                      propsForDots: { r: "5", strokeWidth: "2", stroke: "#fff" }
                  }}
                  style={styles.chartStyle}
              />
          </ScrollView>
        ) : (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemTexto}>Nenhum dado de batimentos encontrado. Adicione um registro acima!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ... Estilos Adicionais

const styles = StyleSheet.create({
  // ... (Estilos existentes)

  // 🚨 NOVOS ESTILOS PARA MENSAGEM DE ERRO/VAZIO
  mensagemContainer: {
    backgroundColor: Cores.cardFundo,
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  mensagemTexto: {
    color: Cores.textoSecundario,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // ... (Restante dos estilos)
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 20, 
    paddingBottom: 40, 
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: "900", 
    marginBottom: 25, 
    color: Cores.textoTitulo,
  },
  subtitulo: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginTop: 20, 
    marginBottom: 15, 
    color: Cores.textoTitulo 
  },
  card: {
    backgroundColor: Cores.cardFundo,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  form: { marginBottom: 10 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  inputHalf: { width: '48%', marginHorizontal: 0 },
  input: {
    backgroundColor: Cores.fundo,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: Cores.textoTitulo,
  },
  botao: {
    backgroundColor: Cores.acao, 
    paddingVertical: 14,
    borderRadius: 30, 
    alignItems: "center",
    marginTop: 10,
    shadowColor: Cores.acao,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  botaoTexto: { color: Cores.cardFundo, fontWeight: "800", fontSize: 18 },
  chartStyle: { 
    marginVertical: 10, 
    borderRadius: 15,
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginHorizontal: 0, 
    paddingRight: 0, 
  },
});