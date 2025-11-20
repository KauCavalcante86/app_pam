import { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import styles from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserStorage } from "../../utils/storege";
import { getUsuario, atualizarFoto } from "../../../services/usuario";


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Home() {
  const navigation = useNavigation();
const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });


useFocusEffect(
    useCallback(() => {
      const carregarUsuario = async () => {
        const userStorage = await getUserStorage();
        if (!userStorage) {
          setLoading(false);
          return;
        }
        const userAtualizadoDoStorage = await getUserStorage(); 
        setUsuario(userAtualizadoDoStorage); 
        setLoading(false);
      };
      carregarUsuario();
    }, []) 
  );

  async function logout() {
    await AsyncStorage.removeItem("usuario");
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }
if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }
  const nomeUsuario = usuario?.nome ?? "Fulano";
  const primeiroNome = nomeUsuario.split(" ")[0];

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btnHeader}>

          {/* FOTO DO PERFIL */}
          <Pressable
            style={styles.perfil}
            onPress={() => navigation.navigate("Perfil")}
          >
                 <Image
           source={{
            uri: usuario?.foto_url
            ? (usuario.foto_url.startsWith("http") ? usuario.foto_url : `http://192.168.15.4:8000/${usuario.foto_url}`)
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

           }}
           style={{
             width: '100%',
             height: '100%',
             borderRadius: 100,
             backgroundColor: "#646464ff",
           }}/>

          </Pressable>

        </View>

        <Text style={[styles.nomeUser, { fontFamily: "Poppins_400Regular" }]}>
          Olá, {primeiroNome}
        </Text>
      </View>

      <View style={styles.app}>
        <Pressable
          style={styles.box1}
          onPress={() => navigation.navigate("geo")}
        >
          <Text style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}>
            Hospitais e UBS
          </Text>
          <Image
            style={styles.locali}
            source={require("../../../assets/locali.png")}
          />
        </Pressable>

        <View style={styles.box2}>
          <Pressable
            style={styles.btnRetan}
            onPress={() => navigation.navigate("Agua")}
          >
            <Text
              style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}
            >
              Água
            </Text>
            <Image
              style={styles.agua}
              source={require("../../../assets/agua.png")}
            />
          </Pressable>

          <View style={styles.campoRetan}>
            <View style={styles.opBody1}>
              <Text
                style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}
              >
                Sangue
              </Text>
              <Image
                style={styles.sangue}
                source={require("../../../assets/sangue.png")}
              />
            </View>

            <Pressable
              style={styles.opBody2}
              onPress={() => navigation.navigate("calorias")}
            >
              <Text
                style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}
              >
                Alimentação
              </Text>
              <Image
                style={styles.alimentacao}
                source={require("../../../assets/alimentacao.png")}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.box3}>
          <View style={styles.op1}>
            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Imc")}
            >
              <Text style={styles.nomeQuadrado}>IMC</Text>
              <Image
                style={styles.imc}
                source={require("../../../assets/imc.png")}
              />
            </Pressable>

           <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Sons")}
            >
              <Text style={styles.nomeQuadrado}>IMC</Text>
            </Pressable>

            <View style={styles.op}></View>
          </View>

          <View style={styles.op1}>
            <View style={styles.op}></View>
            <View style={styles.op}></View>
            <View style={styles.op}></View>
          </View>
        </View>
      </View>
    </View>
  );
}
