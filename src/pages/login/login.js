import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { loginUsuario } from "../../../services/usuario";
import { getUserStorage, setUserStorage } from "../../utils/storage";
import { LinearGradient } from 'expo-linear-gradient';
import emailIcon from "../../../assets/email.png";
import padlockIcon from "../../../assets/padlock.png";
import Popup from "../../components/Popup";

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

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const showPopup = (title, message, type = "error") => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
  };

  const logarUsuario = async () => {
  if (!email || !senha) {
      showPopup("Atenção", "Preencha todos os campos!", "warning");
    return;
  }

  setLoading(true);

  try {
    const response = await loginUsuario(email, senha);

    if (response.success) {
  const usuario = response.usuario;

  showPopup("Sucesso", "Login realizado com sucesso!", "success");

  setTimeout(async () => {
    await setUserStorage(usuario);
    setUsuarioLogin(usuario);
  }, 1500);

    } else {
      showPopup("Erro", "Credenciais inválidas!", "error");    }
  } catch (error) {
      showPopup(
        "Erro",
        error.response?.data?.message || "Não foi possível fazer login."
      );
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
     <LinearGradient
      colors={[
        '#9EC8FF',
        '#C4DCFF',
        '#E7F1FF',
        '#FFFFFF',
      ]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
    <View style={styles.container}>

      <View style={{width: "100%", height: 28, flexDirection: "row", alignItems: "center", marginTop: 48, gap: 10, paddingHorizontal: 10 }}>
        <Image source={require('../../../assets/logoBrancaCora.png')} style={{ height: 48, width: 42 }} />
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: "white" }}>CORA</Text>
      </View>
      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <View style={styles.textos}>
          <Text style={[styles.titulo, { fontFamily: "Poppins_400Regular", color: "white" }]}>Seu agente de saúde na palma da sua mão.</Text>
        </View>
      </View>

        {/* Email */}
        <View style={styles.inputIconContainer}>
          <Image source={require('../../../assets/emailIcon.png')} style={styles.iconStyleEmail} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail"
            placeholderTextColor="#8d8c8c"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Senha */}
        <View style={styles.senhaContainer}>
          <View style={styles.inputIconContainer}>
            <Image source={require('../../../assets/senhaIcon.png')} style={styles.iconStyleSenha} />
            <TextInput
              style={styles.input}
              placeholder="Digite sua Senha"
              secureTextEntry={!mostrarSenha}
              placeholderTextColor="#8d8c8c"
              onChangeText={setSenha}
              value={senha}
            />
              <Pressable
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  padding: 10,
                  marginRight: 5,
                }}
              >
                <Image
                  source={
                    mostrarSenha
                      ? require("../../../assets/passOpen.png")
                      : require("../../../assets/passClose.png")
                  }
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: "rgb(117, 116, 116)",
                  }}
                />
              </Pressable>
          </View>
          <Text style={styles.btnEsqueciSenha}> Esqueceu sua senha? </Text>
        </View>
        {/* BOTÃO LOGIN */}
        <Pressable style={styles.btn} onPress={logarUsuario} disabled={loading}>
          
          <LinearGradient
            colors={['#4DAFFF', '#008CFF', '#0077FF']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height:'100%',
              width:'100%',
              borderRadius: 64,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Text style={[styles.btnTexto, { fontFamily: "Poppins_400Regular" }]}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
              <Image style={{ width: 12, height: 22, marginRight: 18 }} source={require('../../../assets/Arrow.png')} />
            </LinearGradient>
        </Pressable>

        {/* IR PARA CADASTRO */}

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 32, gap: 18, }}>
            <Image source={require('../../../assets/Line.png')} style={styles.Line} />
            <Text style={{fontFamily: "Poppins_400Regular", color: "#00000057"}}>ou</Text>
            <Image source={require('../../../assets/Line.png')} style={styles.Line} />
        </View>
        <View style={styles.boxCadContainer}>
          <View style={styles.boxCad}>
            <Image source={require('../../../assets/Google.png')} style={styles.iconGoogle} />   
          </View>
          <View style={styles.boxCad}>
            <Image source={require('../../../assets/Apple.png')} style={styles.iconApple} />   
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.btnFazerCadastro}> Novo por aqui? Crie sua conta. </Text>
        </Pressable>
      </View>
        <Popup
            visible={popupVisible}
            title={popupTitle}
            message={popupMessage}
            type={popupType}
            onClose={() => setPopupVisible(false)}
          />
      </LinearGradient> 
  );
}
