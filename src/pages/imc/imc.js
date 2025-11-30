import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TelaIMC() {

  const navigation = useNavigation();
  
  const [peso, setPeso] = useState(''); // em kg
  const [altura, setAltura] = useState(''); // em metros (ex: 1.75)
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    const p = parseFloat(peso.replace(',', '.'));
    const h = parseFloat(altura.replace(',', '.'));

    if (!p || !h || p <= 0 || h <= 0) {
      Alert.alert('Entrada inválida', 'Informe peso (kg) e altura (m) válidos.');
      return;
    }

    const imc = p / (h * h);
    const imcArredondado = Math.round(imc * 100) / 100;
    const categoria = classificarIMC(imc);

    setResultado({ imc: imcArredondado, categoria });
  };

  const classificarIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >

      <View style={styles.buttonVoltarContainer}>
          <Pressable
              style={styles.buttonVoltar}
              onPress={() => navigation.goBack()}
          >
              <Text style={styles.buttonVoltarIcon}>{'<'}</Text>
          </Pressable>
      </View>

      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          placeholder="Ex: 70.5"
          keyboardType="numeric"
          returnKeyType="done"
          accessibilityLabel="Peso em quilogramas"
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Altura (m)</Text>
        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
          returnKeyType="done"
          accessibilityLabel="Altura em metros"
        />

        <View style={styles.botoesRow}>
          <Pressable style={[styles.botao, styles.botaoCalc]} onPress={calcularIMC}>
            <Text style={styles.botaoTexto}>Calcular</Text>
          </Pressable>

          <Pressable style={[styles.botao, styles.botaoLimpar]} onPress={limpar}>
            <Text style={styles.botaoTexto}>Limpar</Text>
          </Pressable>
        </View>

        {resultado && (
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoTitulo}>Seu IMC</Text>
            <Text style={styles.imcValor}>{resultado.imc.toFixed(2)}</Text>
            <Text style={styles.categoria}>{resultado.categoria}</Text>
            <Text style={styles.obs}>
              O IMC é um indicador rápido — para avaliação completa procure um
              profissional de saúde.
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    justifyContent: 'flex-start',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
    color: '#0F172A',
    marginTop: "20%"
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#0F172A',
  },
  botoesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  botao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  botaoCalc: {
    backgroundColor: '#0EA5A4',
  },
  botaoLimpar: {
    backgroundColor: '#64748B',
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  resultadoBox: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E6EEF6',
  },
  resultadoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  imcValor: {
    fontSize: 36,
    fontWeight: '800',
    marginTop: 6,
    color: '#111827',
  },
  categoria: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: '600',
    color: '#0F172A',
  },
  obs: {
    fontSize: 12,
    color: '#475569',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

    buttonVoltarContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    buttonVoltar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonVoltarIcon: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});
