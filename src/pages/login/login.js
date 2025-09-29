import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  async function logarUsuario() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

      const dados = {
      email:email,
      senha:senha,
    };

    const config = {
      headers: {"Accept": "application/json"}
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login",dados,config);

      if (response.data.success) {
        const usuario = response.data.usuario; // <- Laravel deve retornar o usuário

        await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
        navigation.navigate(AppStack)
        Alert.alert("Sucesso", "Login realizado!");
      } else {
        Alert.alert("Erro", "Credenciais inválidas!");
      }

    } catch (error) {
      console.error("Erro no login:", error.response ? error.response.data : error.message);
      Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
    }
  }

  return (
      <View style={styles.container}>
      <TextInput
        style={styles.buttonCadastro}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(txt) => setEmail(txt)}
      />

      <TextInput
        style={styles.buttonCadastro}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(txt) => setSenha(txt)}
      />

      <Pressable style={styles.btn} onPress={logarUsuario}>
        <Text style={{ color: "#fff" }}>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("cadastro")} on>
        <Text style={{ marginTop: 10, color: "blue" }}>
          Não tem conta? Cadastre-se
        </Text>
      </Pressable>
    </View>
  );
}
