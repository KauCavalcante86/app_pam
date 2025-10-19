import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './style'
import { ImageBackground } from "react-native";


// API Nutritionix
const APP_ID = 'c5b1b052';
const API_KEY = 'a79f9b4199034cd7d69a6cbb0f440ee3';

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
    <ImageBackground source={require('../../../assets/backLogin.png')} style={styles.background} >
        <View style={styles.container}>

            <View style={styles.tituloPagina}>
                <Text style={styles.txtCalorias}>CONTADOR CALORIAS</Text>
            </View>

            <View style={styles.formCalorias}>
                <View style={styles.buscarAlimentos}>

                    <TextInput style={styles.inputDigitar} placeholder="Digite um alimento: (Ex: Banana)" value={query} onChangeText={setQuery}/>

                    <Pressable onPress={handleBuscar} style={styles.buttonBuscar}>
                        <Text style={styles.buttonBuscarText}> {loading ? 'Buscando...' : 'Buscar'} </Text>
                    </Pressable>

                </View>     

                   {resultado && resultado.foods && resultado.foods.map((food, index) => (
                      <View key={index} style={styles.infoAlimento}>
                        <Text style={styles.titulo}>{food.food_name}</Text>
                        <Text style={styles.infosTxt}>Quantidade: {food.serving_qty} {food.serving_unit}</Text>
                        <Text style={styles.infosTxt}>Calorias: {food.nf_calories}</Text>
                        <Text style={styles.infosTxt}>Proteínas: {food.nf_protein} g</Text>
                        <Text style={styles.infosTxt}>Gorduras: {food.nf_total_fat} g</Text>
                        <Text style={styles.infosTxt}>Carboidratos: {food.nf_total_carbohydrate} g</Text>
                      </View>
                    ))}

            </View>

            <Pressable style={styles.btnNavigation} onPress={() => navigation.navigate('Home')}>
                    <Text>VOLTAR</Text>
            </Pressable>

        </View>

    </ImageBackground>
  );
}


