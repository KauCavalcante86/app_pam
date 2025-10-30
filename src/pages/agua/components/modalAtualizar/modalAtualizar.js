import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function ModalAtualizar({ meta, setMeta }) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [showModal, setShowModal] = useState(false);
  const [inputMeta, setInputMeta] = useState(meta ? meta.toString() : ""); // 👈 estado de texto

  const fecharModal = () => {
    setShowModal(false);
  };

  const abrirModal = () => {
    setInputMeta(meta ? meta.toString() : "");
    setShowModal(true);
  };

  const salvarMeta = async () => {
    const num = parseInt(inputMeta) || 0;
    setMeta(num);
    try {
      await AsyncStorage.setItem("@meta_diaria", num.toString());
    } catch (error) {
      console.log("Erro ao salvar meta:", error);
    }
    fecharModal();
  };

  const aumentarMeta = () => {
    const num = parseInt(inputMeta) || 0;
    const novoValor = num + 100;
    setInputMeta(novoValor.toString());
  };

    const diminuirMeta = () => {  
    const num = parseInt(inputMeta) || 0;
    const novoValor = num - 100 >= 0 ? num - 100 : 0;
    setInputMeta(novoValor.toString());
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnEditarMeta} onPress={abrirModal}>
        <Text style={styles.textoBtn}>Editar</Text>
      </Pressable>

      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.containerModal}>
          <View style={styles.appModal}>
            <Text style={styles.titleModal}>Atualizar Meta Diária</Text>
            <View style={styles.areaInpunt}>
                <Pressable style={styles.btnInput} onPress={() => aumentarMeta()}>
                    <Text style={styles.txtbtn}>+</Text>
                </Pressable>
                <TextInput
                keyboardType="numeric"
                placeholder="Defina sua meta (ml)"
                value={inputMeta}
                onChangeText={setInputMeta} 
                style={styles.campoMeta}
                />
                <Pressable style={styles.btnInput} onPress={() => diminuirMeta()}>
                    <Text style={styles.txtbtn}>-</Text>
                </Pressable>
            </View>
            <View style={styles.areaSemana}>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Seg</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Ter</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Qua</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Qui</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Sex</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Sab</Text></Pressable>
                <Pressable style={styles.btnSemana}><Text style={styles.txtSemana}>Dom</Text></Pressable>
            </View>

            <View style={styles.botoes}>
              <Pressable style={styles.btn} onPress={fecharModal}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={salvarMeta}>
                <Text>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
