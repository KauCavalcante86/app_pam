import { View, Text, Pressable, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function CampoBtn({ onAddAgua, onResetAgua }) {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {[100, 250, 500].map((amount) => (
          <Pressable
            key={amount}
            onPress={() => onAddAgua(amount)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+{amount}ml</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.areaBtnZerar}>
        <Pressable onPress={onResetAgua} style={styles.resetButton}>
          <Text style={styles.resetText}>Zerar</Text>
        </Pressable>

        <Pressable style={styles.plusButton}>
          <Image
            style={styles.plusIcon}
            source={require("../../../../../assets/plus_icon.png")}
          />
        </Pressable>
      </View>
    </View>
  );
}
