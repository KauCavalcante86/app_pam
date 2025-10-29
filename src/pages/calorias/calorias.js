import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './style'
import { ImageBackground } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";



// API Nutritionix
const APP_ID = 'c5b1b052';
const API_KEY = '2dc88d40299921562a38251e05db2ff9';

const buscarNutrientes = async (query) => {
    try {
        const response = await axios.post(
            'https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query },
            {
                headers: {
                    'x-app-id': APP_ID,
                    'x-app-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar nutrientes:', error);
        throw error;
    }
};

// Componente principal
export default function Calorias() {

  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await buscarNutrientes(query);
      setResultado(data);
    } catch (error) {
      alert('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users/1');
        console.log('Usuário de exemplo:', response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.textTitulo}>Calorias diárias</Text>


        <View style={styles.totalC}>
        
        </View>

          <View style={styles.buscarAlimentos}>

              <TextInput style={styles.inputDigitar} placeholder="Digite um alimento: (Ex: Banana)" value={query} onChangeText={setQuery}/>

              <Pressable onPress={handleBuscar} style={styles.buttonBuscar}>
                  <Text style={styles.buttonBuscarText}> {loading ? 'Buscando...' : 'Buscar'} </Text>
              </Pressable>

          </View>     
        
        {resultado && resultado.foods && resultado.foods.map((food, index) => (
          <View key={index} style={styles.infoAlimento}>

            <View style={styles.calorias}>
                <View style={styles.tituloCalorias}>
                    <Text style={styles.titulo}>{food.food_name}</Text>
                </View>
            </View>

          </View>

        ))}


    </View>
  );
}