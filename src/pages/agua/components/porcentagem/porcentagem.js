import { useEffect, useState } from "react";
import { View, Text, Pressable, Animated, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular,  Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { styles } from "./style";


export default function Porcentagem({meta, agua}) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [animatedValue] = useState(new Animated.Value(0)); // animação da água

  useEffect(() => {
  const loadMeta = async () => {
    try {
      const savedMeta = await AsyncStorage.getItem("@meta_diaria");
      if (savedMeta !== null) {
        setMeta(parseInt(savedMeta));
      }
    } catch (error) {
      console.log("Erro ao carregar meta:", error);
    }
  };
  loadMeta();
}, []);



 useEffect(() => {
  if (meta > 0) {
    Animated.timing(animatedValue, {
      toValue: (agua / meta) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const saveWater = async () => {
    try {
      await AsyncStorage.setItem("@agua_diaria", agua.toString());
    } catch (error) {
      console.log("Erro ao salvar dados:", error);
    }
  };
  saveWater();
}, [agua, meta]);


  const addWater = (amount) => {
    setAgua((prev) => Math.min(prev + amount, meta));
  };

  const resetWater = async () => {
    setAgua(0);
    await AsyncStorage.removeItem("@agua_diaria");
  };

  const waterHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

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
            <Text style={[styles.circlePercent, {fontFamily:'Poppins_500Medium',}]}>{Math.round(fill)}%</Text>
          </View>
        )}
      </AnimatedCircularProgress>

    
     

    </View>
  );
}
