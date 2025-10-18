import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Home() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

    const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function carregarUsuario() {
      const data = await AsyncStorage.getItem("usuario");
      if (data) {
        setUsuario(JSON.parse(data));
      }
    }
    carregarUsuario();
  }, []);


  async function logout() {
    await AsyncStorage.removeItem("usuario");
      navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }




  const nomeUsuario = usuario?.nome
  const primeiroNome = nomeUsuario ? nomeUsuario.split(' ')[0] : "Fulano";

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btnHeader}>
          <Pressable style={styles.perfil} onPress={() => navigation.navigate("Perfil")}></Pressable>
          <Pressable onPress={logout} style={styles.logout}></Pressable>
        </View>

        <Text  style={[styles.nomeUser, { fontFamily: "Poppins_400Regular" }]}>
          Olá, {primeiroNome} 
          </Text>
      </View>

      <View style={styles.app}>

        <View style={styles.box1}>
            <Text style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}>Hospitais e UBS</Text>
        </View>

        <View style={styles.box2}>
            <View style={styles.btnRetan}><Text style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}>Água</Text></View>

            <View style={styles.campoRetan}>
                 <View style={styles.opBody}><Text style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}>Sangue</Text></View>
                 <View style={styles.opBody}><Text style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}>Alimentação</Text></View>
            </View>
        </View>

        <View style={styles.box3}>
            <View style={styles.op1}>
                <View style={styles.op}></View>
                <View style={styles.op}></View>
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

  )};

