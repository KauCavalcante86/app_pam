import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Modal, Alert, Image } from "react-native";
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
  const [showModalDate, setShowModalDate] = useState(false);
  const [inputMeta, setInputMeta] = useState(meta ? meta.toString() : "");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [metasPorDia, setMetasPorDia] = useState({});
  const [metaHoje, setMetaHoje] = useState(null);

  const dias = ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sab"];

  // Carrega as metas e determina o dia atual
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("@metas_por_dia");
      const metas = data ? JSON.parse(data) : {};
      setMetasPorDia(metas);

      const diaAtualIndex = new Date().getDay(); // 0 = Domingo, 1 = Segunda...
      const nomeDia = dias[diaAtualIndex];
      setMetaHoje(metas[nomeDia] || null);
    })();
  }, []);

  const abrirModal = () => setShowModal(true);
  const fecharModal = () => setShowModal(false);
  const abrirModalDate = () => setShowModalDate(true);
  const fecharModalDate = () => setShowModalDate(false);

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((item) => item !== dia)
        : [...prev, dia]
    );
  };

  const salvarMeta = async () => {
  if (diasSelecionados.length === 0) {
    Alert.alert("Selecione pelo menos um dia!");
    return;
  }

  const num = parseInt(inputMeta);
  if (isNaN(num) || num <= 0) {
    Alert.alert("Digite uma meta válida!");
    return;
  }

  const novasMetas = { ...metasPorDia };
  diasSelecionados.forEach((dia) => {
    novasMetas[dia] = num;
  });

  setMetasPorDia(novasMetas);
  await AsyncStorage.setItem("@metas_por_dia", JSON.stringify(novasMetas));

  const diaAtual = dias[new Date().getDay()];
  const metaDoDia = novasMetas[diaAtual] || null;

  setMetaHoje(metaDoDia);

  setMeta(metaDoDia);

  Alert.alert("Sucesso", "Meta aplicada aos dias selecionados!");
  setDiasSelecionados([]);
  fecharModal();
};


  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.areaBtnModal}>
        <Pressable style={styles.btnCalendario} onPress={abrirModalDate}>
            <Image
            source={require("../../../../../assets/date.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ fontSize: 18, color: '#687CFF' }}>
         <Text style={{ fontWeight: "bold" }}>{dias[new Date().getDay()]}</Text>
      </Text>
        </Pressable >
        <Pressable style={styles.btnEditarMeta} onPress={abrirModal} >
          <Image
            source={require("../../../../../assets/edit.png")}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
      </View>
      
      {/* Mostra a meta do dia atual */}
      <View style={styles.areaTitulo}>
      
      {metaHoje ? (
        <Text style={styles.meta}>Sua meta hoje: {metaHoje} ml</Text>
      ) : (
        <Text style={styles.meta}>
          Nenhuma meta definida para hoje
        </Text>
      )}
      </View>

      {/* Botão para editar metas */}
     

      {/* Modal */}
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.containerModal}>
          <View style={styles.appModal}>
            <Text style={styles.titleModal}>Atualizar Meta Diária</Text>

            <View style={styles.areaSemana}>
              {dias.map((dia) => {
                const selecionado = diasSelecionados.includes(dia);
                return (
                  <Pressable
                    key={dia}
                    onPress={() => toggleDia(dia)}
                    style={[
                      styles.btnSemana, 
                      selecionado && { backgroundColor: "#63a7ecff" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.txtSemana,
                        selecionado && { color: "#fff" },
                      ]}
                    >
                      {dia}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              keyboardType="numeric"
              placeholder="Defina sua meta (ml)"
              value={inputMeta}
              onChangeText={setInputMeta}
              style={styles.campoMeta}
            />

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

      <Modal visible={showModalDate} animationType="fade" transparent>
          <View style={styles.containerModal}>
              <View style={styles.appModal}>
                <Text style={styles.titleModal}>Atualizar Meta Diária</Text>

                

              <Pressable style={styles.btn} onPress={fecharModalDate}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={salvarMeta}>
                <Text>Salvar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
    </View>
  );
}
