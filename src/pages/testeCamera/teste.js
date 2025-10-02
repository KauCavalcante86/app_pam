import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { View, Text, TextInput, Pressable, Alert, RefreshControl, Image } from 'react-native';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'
import { useNavigation } from "@react-navigation/native";

import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

export default function Teste() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [points, setPoints] = useState ([
    {   
        id: 1,
        latitude: -23.552668102846518,
        longitude: -46.39910218579321,
        title: "Padaria",
        description: 'Padaria ao lado da ETEC onde o clodo sempre fala',
    },
  ])

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleSearchLocation = async () => {

    if (address.trim() === '') {
        alert('Por favor, insira um endereço');
        return;
    }

    try {
        const result = await Location.geocodeAsync(address);
        if(result.length > 0) {
            const { latitude, longitude } = result[0];
            setSearchedLocation ({ latitude, longitude });

        } else {
            alert('Endereço não encontrado.')
        }
    }   catch (error) {
        console.error(error);
        alert('Erro ao buscar o endereço')
    }
  }

  return (
    <View style={styles.container}>

            <View style={styles.buscar}>
                <Text style={styles.tituloPg}>Mapa Geolocalização</Text>
            </View>

            <View style={styles.mapaLocalizacao}>
                {location ? (
                    <MapView style={styles.map} 
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                    }}>
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        title="Você está aqui!"
                        />

                        {points.map((point) => (
                            <Marker
                                key={point.id}
                                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                                title={point.title}
                                description={point.description}

                            />
                        ))}
                    </MapView>
                ) : (
                    <Text>{errorMsg ? errorMsg : "Carregando localização..." }</Text>
                )}
        </View>
    </View>
  );
}
