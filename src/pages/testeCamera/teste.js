import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { View, Text, TextInput, Pressable, Alert, RefreshControl, Image } from 'react-native';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'
import { useNavigation } from "@react-navigation/native";

export default function Teste() {
    const navigation = useNavigation();
    
    const [imagem, setImagem] = useState(null);

    const solicitarPermissoes = async () => {
        const camera = await ImagePicker.requestCameraPermissionsAsync();
        const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (camera.status !== 'granted' || galeria.status !== 'granted') {
            Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera e galeria.');
            return false;
        }
        return true;
    };

    const tirarFoto = async () => {
        const permissoes = await solicitarPermissoes();
        if (!permissoes) return;

        const resultado = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagem(resultado.assets[0].uri);
        }
    };

    const escolherDaGaleria = async () => {
        const permissoes = await solicitarPermissoes();
        if(!permissoes) return;

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,

        })

        if(!resultado.canceled) {
            setImagem(resultado.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
          <Pressable style={styles.btn} onPress={tirarFoto}>
            <Text style={styles.btnText}>Tirar Foto</Text>
          </Pressable>
        
          <Pressable style={styles.btn} onPress={escolherDaGaleria}>
            <Text style={styles.btnText}>Escolher da Galeria</Text>
          </Pressable>
        
          {imagem && (
            <Image source={{ uri: imagem }}
            style={styles.imagem}
            resizeMode = "cover"
            />
          )}
        </View>          
    );
}