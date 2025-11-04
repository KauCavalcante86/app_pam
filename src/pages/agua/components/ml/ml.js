import { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function Ml({ meta, agua }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [animatedValue] = useState(new Animated.Value(0));

  // 🔹 Função que marca o dia como cumprido
  const marcarMetaCumprida = async () => {
    try {
      const hoje = new Date();
      const dataKey = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;

      const dados = await AsyncStorage.getItem("@metas_cumpridas");
      const metas = dados ? JSON.parse(dados) : {};

      if (!metas[dataKey]) {
        metas[dataKey] = true;
        await AsyncStorage.setItem("@metas_cumpridas", JSON.stringify(metas));
        console.log("✅ Meta marcada como cumprida:", dataKey);
      }
    } catch (error) {
      console.error("Erro ao marcar meta cumprida:", error);
    }
  };

  // 🔹 Atualiza a animação da garrafa
  useEffect(() => {
    if (meta > 0) {
      Animated.timing(animatedValue, {
        toValue: (agua / meta) * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [agua, meta]);

  // 🔹 Verifica se atingiu ou ultrapassou a meta e marca automaticamente
  useEffect(() => {
    if (meta > 0 && agua >= meta) {
      marcarMetaCumprida();
    }
  }, [agua]);

  const waterHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.bottleContainer}>
        <View style={styles.tampa}></View>
        <View style={styles.gargalo}></View>
        <View style={styles.bottle}>
          <Animated.View style={[styles.water, { height: waterHeight }]} />
          <Text
            style={[styles.waterText, { fontFamily: "Poppins_500Medium" }]}
          >
            {agua} ml
          </Text>
        </View>
      </View>
    </View>
  );
}
