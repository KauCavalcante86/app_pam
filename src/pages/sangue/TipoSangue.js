import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";

import { styles, Cores } from "./style"; 
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import { getUserStorage } from "../../utils/storage";
import { tiposQuePodeReceber } from "../../utils/sangue";

const ALL_BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const STORAGE_KEY_TIPO = "@user_blood_type";

export default function TipoSangue() {
  const navigation = useNavigation();
  const [tipo, setTipo] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleSelecionarTipo = async (novoTipo) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_TIPO, novoTipo);
      setTipo(novoTipo); 
      setShowPicker(false);
    } catch (error) {
      console.log("Erro ao salvar tipo sanguíneo:", error);
    }
  };

  const carregarDados = useCallback(async () => {
    try {
      let tipoSalvo = await AsyncStorage.getItem(STORAGE_KEY_TIPO);
      
      if (!tipoSalvo) {
        const user = await getUserStorage();
        tipoSalvo = String(user?.tipoSangue);
      }

      if (!tipoSalvo || tipoSalvo === "n sei") {
          setTipo(null);
          setShowPicker(true);
      } else {
          setTipo(tipoSalvo); 
          setShowPicker(false);
      }
      
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );
  

  if (tipo === null && !showPicker) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Cores.primaria} /> 
          <Text style={{ marginTop: 10, color: Cores.textoSecundario }}>
            Carregando informações...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const tipoAtual = tipo === null ? '??' : tipo;
  const podeReceber = (tipo !== null && tiposQuePodeReceber(tipo) || []).map((v) => String(v));

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            
            <View style={styles.buttonVoltarContainer}>
                <Pressable
                    style={styles.buttonVoltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonVoltarIcon}>{'<'}</Text>
                </Pressable>
            </View>

            <View style={styles.header}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>Seu Tipo Sanguíneo</Text>
                </View>

                <View style={styles.tipoContainer}>
                    <Text style={styles.tipo}>{String(tipoAtual)}</Text>
                </View>
                
                <Pressable 
                    style={styles.btnMudarTipo}
                    onPress={() => setShowPicker(prev => !prev)}
                >
                    <Icon name={showPicker ? "eye-off" : "pencil"} size={18} color={Cores.cardFundo} style={{ marginRight: 6 }} />
                    <Text style={styles.btnMudarTipoText}>
                        {showPicker ? 'OCULTAR SELEÇÃO' : 'MUDAR MEU TIPO'}
                    </Text>
                </Pressable>

            </View>
            
            {showPicker && (
                <View style={styles.selectionArea}>
                    <FlatList
                        data={ALL_BLOOD_TYPES}
                        keyExtractor={(item) => item} 
                        numColumns={4}
                        columnWrapperStyle={styles.selectionRow}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.selectionCard,
                                    item === tipoAtual && styles.selectionCardSelected
                                ]}
                                onPress={() => handleSelecionarTipo(item)}
                            >
                                <Text style={[
                                    styles.selectionCardText,
                                    item === tipoAtual && styles.selectionCardTextSelected
                                ]}>
                                    {item}
                                </Text> 
                            </Pressable>
                        )}
                        scrollEnabled={false} 
                        contentContainerStyle={{ alignSelf: 'center' }}
                    />
                </View>
            )}
            
            <View style={styles.separator} />

            {tipo !== null && (
              <>
                <View style={styles.subtituloWrapper}>
                    <Icon 
                        name="heart-plus-outline" 
                        size={20} 
                        color={Cores.textoPrimario} 
                        style={{ marginRight: 8 }} 
                    />
                    <Text style={styles.subtitulo}>Você pode receber sangue de:</Text>
                </View>

                <FlatList
                    data={podeReceber}
                    keyExtractor={(item) => String(item)} 
                    renderItem={({ item }) => (
                        <View style={styles.card}> 
                            <Text style={styles.cardTxt}>{String(item)}</Text> 
                        </View>
                    )}
                    contentContainerStyle={styles.listContent} 
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={podeReceber.length > 4}
                />
              </>
            )}
        </View>
    </SafeAreaView>
  );
}