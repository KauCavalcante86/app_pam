import { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { styles } from "./style";

export default function Porcentagem({ meta, agua, setAgua }) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [animatedValue] = useState(new Animated.Value(0));

  // 🔹 Função para marcar o dia como concluído
  const marcarMetaCumprida = async () => {
    const hoje = new Date();
    const dataKey = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;

    const dados = await AsyncStorage.getItem("@metas_cumpridas");
    const metas = dados ? JSON.parse(dados) : {};

    metas[dataKey] = true;
    await AsyncStorage.setItem("@metas_cumpridas", JSON.stringify(metas));

    console.log("✅ Meta marcada como cumprida:", dataKey);
  };

  // 🔹 Atualiza animação
  useEffect(() => {
    if (meta > 0) {
      Animated.timing(animatedValue, {
        toValue: (agua / meta) * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [agua, meta]);

  // 🔹 Verifica se atingiu a meta automaticamente
  useEffect(() => {
    if (meta > 0 && agua >= meta) {
      marcarMetaCumprida();
    }
  }, [agua]);

  const percentage = meta > 0 ? Math.min((agua / meta) * 100, 100) : 0;

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={320}
        width={12}
        fill={percentage}
        tintColor="#70a9efff"
        backgroundColor="#E0E4FF"
        rotation={0}
        lineCap="round"
      >
        {(fill) => (
          <View style={styles.circleContent}>
            <Text
              style={[
                styles.circlePercent,
                { fontFamily: "Poppins_500Medium" },
              ]}
            >
              {Math.round(fill)}%
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
