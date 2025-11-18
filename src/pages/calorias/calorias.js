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

// API OpenFoodFacts
const buscarNutrientes = async (query) => {
    try {
        const response = await axios.get(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&json=1`
        );
        return response.data.products;
    } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
        throw error;
    }
};

// Componente principal
export default function Calorias() {

  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState([]);
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

  return (
    <View style={styles.container}>
        <Text style={styles.textTitulo}>Calorias diárias</Text>

        <View style={styles.buscarAlimentos}>
            <TextInput
              style={styles.inputDigitar}
              placeholder="Digite um alimento: (Ex: Banana)"
              value={query}
              onChangeText={setQuery}
            />

            <Pressable onPress={handleBuscar} style={styles.buttonBuscar}>
                <Text style={styles.buttonBuscarText}> {loading ? 'Buscando...' : 'Buscar'} </Text>
            </Pressable>
        </View>     

        <ScrollView>
        {resultado.length > 0 ? resultado.map((food, index) => (
          <View key={index} style={styles.infoAlimento}>
            <Text style={styles.titulo}>{food.product_name || 'Nome não disponível'}</Text>
            <Text>Marca: {food.brands || 'Não disponível'}</Text>
            {food.nutriments && (
              <View>
                <Text>Energia: {food.nutriments['energy-kcal'] || 'N/A'} kcal</Text>
                <Text>Proteínas: {food.nutriments.proteins || 'N/A'} g</Text>
                <Text>Carboidratos: {food.nutriments.carbohydrates || 'N/A'} g</Text>
                <Text>Gordura: {food.nutriments.fat || 'N/A'} g</Text>
              </View>
            )}
          </View>
        )) : (
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        )}
        </ScrollView>

    </View>
  );
}
