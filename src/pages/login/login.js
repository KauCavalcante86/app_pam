import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { getUserStorage, setUserStorage } from '../../utils/storage';

import styles from './style';

export default function Login({ setUsuarioLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const logarUsuario = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://10.171.237.192:8000/api/login", {
        email,
        senha
      }, { headers: { "Accept": "application/json" } });

      if (response.data.success) {
        const usuario = response.data.usuario;

        // Salva no AsyncStorage
        await setUserStorage(usuario);

        // Atualiza estado global → App.js renderiza AppStack
        setUsuarioLogin(usuario);

        Alert.alert("Sucesso", "Login realizado!");
      } else {
        Alert.alert("Erro", "Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Erro no login:", error.response ? error.response.data : error.message);
      Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/backLogin.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.textFaça}>FAÇA SEU LOGIN</Text>

        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.btnFazerCadastro}>Não tem conta? Cadastre-se</Text>
        </Pressable>

        <View style={styles.form}>
          <TextInput
            style={styles.buttonCadastro}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.buttonCadastro}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Pressable style={styles.btn} onPress={logarUsuario} disabled={loading}>
            <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
