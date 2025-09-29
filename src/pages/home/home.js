import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

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
      routes: [{ name: "login" }],
    });
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <View style={styles.perfil}>

         </View>
         <Pressable onPress={logout} style={styles.logout}>

         </Pressable>
        <Text style={styles.nomeUser}>Olá, Fulano</Text>
      </View>

      <View style={styles.app}>

        <View style={styles.box1}>

        </View>

        <View style={styles.box2}>
            <View style={styles.btnRetan}></View>

            <View style={styles.campoRetan}>
                 <View style={styles.opBody}></View>
                 <View style={styles.opBody}></View>
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

