import { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function Ml({ meta, agua }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (meta > 0) {
      Animated.timing(animatedValue, {
        toValue: (agua / meta) * 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [agua, meta]);

  const waterHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.bottleContainer}>
        <View style={styles.bottle}>
          <Animated.View style={[styles.water, { height: waterHeight }]} />
          <Text style={[styles.waterText, { fontFamily: "Poppins_500Medium" }]}>
            {agua} ml
          </Text>
        </View>
      </View>
    </View>
  );
}
