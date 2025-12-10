import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
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

export default function Home() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  function PerfilCompleto(usuario) {
    if (!usuario) return false;

    const obrigatorio = [
      "nome",
      "email",
      "genero",
      "altura",
      "peso",
      "tipoSangue",
      "cep",
      "rua",
      "bairro",
      "cidade",
      "uf",
    ];

    return obrigatorio.every((campo) => {
      const valor = usuario[campo];
      return valor !== null && valor !== undefined && valor !== "";
    });
  }

  useFocusEffect(
    useCallback(() => {
      const carregarUsuario = async () => {
        setLoading(true);

        const userStorage = await getUserStorage();
        if (!userStorage) {
          setUsuario(null);
          setMostrarModalPerfil(false);
          setLoading(false);
          return;
        }

        setUsuario(userStorage);

        const flagPerfil = await AsyncStorage.getItem("perfilCompleto");

        if (flagPerfil === "true" && PerfilCompleto(userStorage)) {
          setMostrarModalPerfil(false);
        } else {
          if (!PerfilCompleto(userStorage)) {
            setMostrarModalPerfil(true);
          } else {
            setMostrarModalPerfil(false);
          }
        }

        setLoading(false);
      };

      carregarUsuario();
    }, [])
  );

  async function logout() {
    await AsyncStorage.removeItem("usuario");
    await AsyncStorage.removeItem("perfilCompleto");
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
  }

  if (loading || !fontsLoaded) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  const nomeUsuario = usuario?.nome ?? "Fulano";
  const primeiroNome = nomeUsuario.split(" ")[0];

  return (
    <View style={styles.container}>
      {/* MODAL PERFIL INCOMPLETO */}
      <Modal visible={mostrarModalPerfil} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Perfil incompleto</Text>

            <Text style={styles.modalText}>
              Complete seu perfil para aproveitar todos os recursos do
              aplicativo.
            </Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setMostrarModalPerfil(false);
                navigation.navigate("Perfil");
              }}
            >
              <Text style={styles.modalButtonText}>Ir para o perfil</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.btnHeader}>
          {/* FOTO DO PERFIL */}
          <Pressable
            style={styles.perfil}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Image
              source={{
                uri: usuario?.foto_url
                  ? usuario.foto_url.startsWith("http")
                    ? usuario.foto_url
                    : `http://192.168.0.240:8000/${usuario.foto_url}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                backgroundColor: "#646464ff",
              }}
            />
          </Pressable>
        </View>

        <Text style={[styles.nomeUser, { fontFamily: "Poppins_400Regular" }]}>
          Olá, {primeiroNome}
        </Text>
      </View>

      <View style={styles.app}>
        <Pressable
          style={styles.box1}
          onPress={() => navigation.navigate("Geo")}
        >
          <Text
            style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}
          >
            Hospitais e UBS
          </Text>
          <Image
            style={styles.locali}
            source={require("../../../assets/locali.png")}
          />
        </Pressable>

        <View style={styles.box2}>
          <Pressable
            style={styles.btnRetan}
            onPress={() => navigation.navigate("Agua")}
          >
            <Text
              style={[styles.nomeCampo, { fontFamily: "Poppins_400Regular" }]}
            >
              Água
            </Text>
            <Image
              style={styles.agua}
              source={require("../../../assets/agua.png")}
            />
          </Pressable>

          <View style={styles.campoRetan}>
            <Pressable
              style={styles.opBody1}
              onPress={() => navigation.navigate("sangue")}
            >
              <Text
                style={[
                  styles.nomeCampo,
                  { fontFamily: "Poppins_400Regular" },
                ]}
              >
                Sangue
              </Text>
              <Image
                style={styles.sangue}
                source={require("../../../assets/sangue.png")}
              />
            </Pressable>

            <Pressable
              style={styles.opBody2}
              onPress={() => navigation.navigate("Calorias")}
            >
              <Text
                style={[
                  styles.nomeCampo,
                  { fontFamily: "Poppins_400Regular" },
                ]}
              >
                Alimentação
              </Text>
              <Image
                style={styles.alimentacao}
                source={require("../../../assets/alimentacao.png")}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.box3}>
          <View style={styles.op1}>
            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Imc")}
            >
              <Text style={styles.nomeQuadrado}>IMC</Text>
              <Image
                style={styles.imc}
                source={require("../../../assets/imc.png")}
              />
            </Pressable>

            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Sons")}
            >
              <Text style={styles.nomeQuadrado}>Som</Text>
              <Image
                style={styles.imc}
                source={require("../../../assets/som.png")}
              />
            </Pressable>

            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Vacinas")}
            >
              <Text style={styles.nomeQuadrado}>Vacinas</Text>
              <Image
                style={styles.vacina}
                source={require("../../../assets/vacina.png")}
              />
            </Pressable>
          </View>

          <View style={styles.op1}>
            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Alergias")}
            >
              <Text style={styles.nomeQuadrado}>Alergias</Text>
              <Image
                style={styles.alergia}
                source={require("../../../assets/alergia.png")}
              />
            </Pressable>
            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Dicas")}
            >
              <Text style={styles.nomeQuadrado}>Dicas</Text>
              <Image
                style={styles.dicas}
                source={require("../../../assets/estrategia.png")}
              />
            </Pressable>
            <Pressable
              style={styles.op}
              onPress={() => navigation.navigate("Pressao")}
            >
              <Text style={styles.nomeQuadrado}>Pressão</Text>
              <Image
                style={styles.pressao}
                source={require("../../../assets/pressao.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
