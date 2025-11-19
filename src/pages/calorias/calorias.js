import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
// IMPORTANTE: Certifique-se de que o arquivo './style' existe e contém os estilos necessários
import styles from './style' 
import { ImageBackground } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


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


  const getFirstBrand = (brands) => {
    if (!brands) return 'Não disponível';

    return brands.split(',')[0].trim();
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

        <ScrollView>

        {resultado.length > 0 ? (() => {
          const firstFood = resultado[0];
          
          return (
            <View style={styles.infoAlimento}>
                <Text style={styles.titulo}>{firstFood.product_name || 'Nome não disponível'}</Text>
                

                <Text>Marca: {getFirstBrand(firstFood.brands)}</Text>
                
                {firstFood.nutriments && (
                  <View>
                    <Text>Energia: {firstFood.nutriments['energy-kcal'] || 'N/A'} kcal</Text>
                    <Text>Proteínas: {firstFood.nutriments.proteins || 'N/A'} g</Text>
                    <Text>Carboidratos: {firstFood.nutriments.carbohydrates || 'N/A'} g</Text>
                    <Text>Gordura: {firstFood.nutriments.fat || 'N/A'} g</Text>
                  </View>
                )}
              </View>
            );
          })() : (
            // Exibe o indicador de carregamento se estiver buscando, senão exibe um aviso
            loading 
            ? <ActivityIndicator size="large" color="#0000ff" /> 
            : <Text style={{ textAlign: 'center', marginTop: 20 }}>Digite um alimento para buscar.</Text>
          )}
        </ScrollView>

          </View>
    </View>
  ); 
} 