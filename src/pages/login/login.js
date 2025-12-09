import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

import { getUserStorage, setUserStorage } from "../../utils/storage";

import emailIcon from "../../../assets/email.png";
import padlockIcon from "../../../assets/padlock.png";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Login({ setUsuarioLogin }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const logarUsuario = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.0.109:8000/api/login",
        {
          email,
          senha,
        },
        { headers: { Accept: "application/json" } }
      );

      if (response.data.success) {
        const usuario = response.data.usuario;

        await setUserStorage(usuario);

        setUsuarioLogin(usuario);

        Alert.alert("Sucesso", "Login realizado!");
      } else {
        Alert.alert("Erro", "Credenciais inválidas!");
      }
    } catch (error) {
      console.error(
        "Erro no login:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* BOTÃO VOLTAR */}
      <View style={styles.buttonVoltarContainer}>
        <Pressable style={styles.buttonVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonVoltarIcon}>{"<"}</Text>
        </Pressable>
      </View>

      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Bem-vindo de volta</Text>
          <Text style={styles.tituloCadastre}>Faça seu login</Text>
        </View>
      </View>

      {/* ÁREA AZUL - FORMULÁRIO */}
      <View style={styles.infosPrincipais}>

        {/* Email */}
        <Text style={styles.nomeButton}>Email</Text>
        <View style={styles.inputIconContainer}>
          <Image source={emailIcon} style={styles.iconStyle} />
          <TextInput
            style={styles.inputComIcon}
            placeholder="exemplo@email.com"
            placeholderTextColor="black"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Senha */}
        <Text style={styles.nomeButtonS}>Senha:</Text>
        <View style={styles.inputIconContainer}>
          <Image source={padlockIcon} style={styles.iconStyle} />
          <TextInput
            style={styles.inputComIcon}
            placeholder="Sua Senha"
            secureTextEntry
            placeholderTextColor="black"
            onChangeText={setSenha}
            value={senha}
          />
        </View>

        {/* BOTÃO LOGIN */}
        <Pressable style={styles.btn} onPress={logarUsuario} disabled={loading}>
          <Text style={styles.btnTexto}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </Pressable>

        {/* IR PARA CADASTRO */}
        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.btnFazerCadastro}>
            Não tem conta? Cadastre-se
          </Text>
        </Pressable>

      </View>
    </View>
  );
}
