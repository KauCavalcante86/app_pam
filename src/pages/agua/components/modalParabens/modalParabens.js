import { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function ModalParabens({ agua, meta }) {
  const [showModal, setShowModal] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Abrir modal automaticamente ao cumprir meta
  useEffect(() => {
    if (meta > 0 && agua >= meta) {
      setShowModal(true);
    }
  }, [agua, meta]);

  const fecharModal = () => setShowModal(false);

  if (!fontsLoaded) return null;

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View style={styles.containerModal}>
        <View style={styles.appModal}>
          <Text style={[styles.titleModal, { fontFamily: "Poppins_700Bold", fontSize: 20 }]}>
            Parabéns!
          </Text>
          <Text style={[styles.meta, { marginVertical: 10, fontFamily: "Poppins_500Medium" }]}>
            Você atingiu sua meta diária de {meta} ml 💧
          </Text>
          <Pressable style={[styles.btn, { backgroundColor: "#687CFF" }]} onPress={fecharModal}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
