import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { ImageBackground } from 'react-native';

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
      const response = await axios.post("http://10.21.145.6:8000/api/login",dados,config);

      if (response.data.success) {
        const usuario = response.data.usuario; 

        await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'AppStack' }],
        });

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
    <ImageBackground source={require('../../../assets/backLogin.png')} style={styles.background}> 

      <View style={styles.container}>

        <Text style={styles.textFaça}>FAÇA SEU LOGIN </Text>

        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.btnFazerCadastro}>Não tem conta? Cadastre-se</Text>
        </Pressable>

        <View style={styles.form}>
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
            <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>Entrar</Text>
          </Pressable>
        </View>



    </View>
    </ImageBackground>
  );
}
