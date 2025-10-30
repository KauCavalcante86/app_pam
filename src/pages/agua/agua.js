import { useEffect, useState } from "react";
import { View, Text, Pressable, Animated, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { styles } from "./style";

import Porcentagem from "./components/porcentagem/porcentagem"
import Ml from "./components/ml/ml"
import CampoBtn from "./components/CampoBtn/campoBtn"
import ModalAtualizar from "./components/modalAtualizar/modalAtualizar"

export default function Agua() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [agua, setAgua] = useState(0); 
  const [meta, setMeta] = useState(0); // meta diária
  const [animatedValue] = useState(new Animated.Value(0)); // animação da água

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const metaArmazenada = await AsyncStorage.getItem("@meta_diaria");
        if (metaArmazenada !== null) {
          setMeta(parseInt(metaArmazenada));
        }
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  
  return (

    <View style={styles.container}>

     <ModalAtualizar meta={meta} setMeta={setMeta}/>

      <Text style={styles.title}>Meu Consumo Diário</Text>

      <Porcentagem meta={meta} agua={agua}/>

      <Ml meta={meta} agua={agua}/>
      
      <Text style={styles.meta}>Meta diária: {meta} ml</Text>

      <CampoBtn meta={meta} setMeta={setMeta} setAgua={setAgua}/>
   


    </View>
  );
}
