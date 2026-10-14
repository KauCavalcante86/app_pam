import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserStorage } from "../../utils/storage";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function TipoSangue() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  
  return (
    <View style={styles.container}>

     <View style={styles.header}>
      <LinearGradient
        colors={['#0081DE', '#45A8EE', '#89CEFF']}
        start={{ x:0, y: 0 }}
        end={{ x: 1, y: 1.5 }}
        style={{
          height:'100%',
          width:'100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
          borderRadius: 32,
        }}>

          <View style={styles.headerContent}>

            <Image source={require('../../../assets/logoBrancaCora.png')} style={{ height: 42, width: 42, resizeMode: 'contain' }} />

            <View style={styles.headerAreaBtns}>
              <View style={styles.calendarBtn}>
                <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14, color: "#0081DE" }}>Quin.</Text>
                <Image source={require('../../../assets/Calendario.png')} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
              </View>
              <View style={styles.perfilBtn}>

              </View>
            </View>
          </View>

          <View style={styles.headerNameUser}>
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 24, color: "white" }}>Bom dia, Kauã!</Text>
          </View>

      </LinearGradient>
     </View>

     <View style={styles.content}>
      <View style={styles.box}>

        <View style={styles.box1}>
          
        </View>

        <View style={styles.box2}>

        </View>
        
      </View>

      <View style={styles.boxWatter}>

      </View>
      
     </View>

     <View style={styles.cardCora}>

     </View>

     <View style={styles.boxSleep}>

     </View>

    </View>
  );
}
