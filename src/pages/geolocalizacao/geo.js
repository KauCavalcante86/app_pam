import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { View, Text, TextInput, Pressable, Alert, RefreshControl, Image, Modal, ImageBackground } from 'react-native';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";


export default function Geo() {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    
    const [selectedPoint, setSelectedPoint] = useState(null);
    

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    
    const [points, setPoints] = useState ([
        {   
            id: 1,
            latitude: -23.552483886297267 , 
            longitude: -46.405154983469785,
            title: "Hospital Geral de Guainases",
            description: 'Av. Miguel Achiole da Fonseca, 135 - Jardim Sao Paulo(Zona Leste), São Paulo - SP, 08461-110',
            image: require('../../../assets/hospitalGeralDeGuaianases.png')
        },

        {
            id: 2,
            latitude: -23.55362175697605 ,
            longitude: -46.39864820421955,
            title: 'UBS e NIR Jardim Soares',
            description: 'R. Feliciano de Mendonça, 496 - Guaianases, São Paulo - SP, 08460-365',
            image: require('../../../assets/ubsNIRjardim.png')
        },

        {
            id: 3,
            latitude: -23.553388503004733 ,
            longitude: -46.404859945172525,
            title: 'Drogaria Tieza' ,
            description: 'Av. Miguel Achiole da Fonseca, 168 - Jardim São Paulo, São Paulo - SP, 08461-110' ,
            image: require('../../../assets/drogariaTieza.png'),
        },

        {
            id: 4,
            latitude: -23.557884863579222 ,
            longitude: -46.39946779820331 ,
            title: 'Farmais Jardim São Paulo II' ,
            description: 'Av. Miguel Achiole da Fonseca, 985 - Jardim Sao Paulo(Zona Leste), São Paulo - SP, 08461-110' ,
            image: require('../../../assets/drogariaJdSp.png'),
        },

        {
            id: 5,
            latitude: -23.55771275691981 ,
            longitude: -46.41243484873027,
            title: 'UBS - Jardim São Carlos' ,
            description: 'R. Macabu, 35 - Jardim Sao Carlos (Zona Leste), São Paulo - SP, 08411-470' ,
            image: require('../../../assets/ubsJardimSC.png'),
        },

        {
            id: 6,
            latitude: -23.563157969649218,
            longitude: -46.39666659982524 ,
            title: 'UBS - Prefeito Celso Augusto Daniel' ,
            description: 'Rua Jorge Maraccini Pomfilio, 210 - Conj. Hab. Juscelino Kubitschek, São Paulo - SP, 08465-050' ,
            image: require('../../../assets/ubsPrefeitoCelso.png'),
        },

        {
            id: 7,
            latitude: -23.543884479376434 ,
            longitude: -46.414682864427114 ,
            title: 'UBS - Guaianases II' ,
            description: 'R. Cmte. Carlos Ruhl, 189 - Guaianases, São Paulo - SP, 08410-130' ,
            image: require('../../../assets/ubsGuaianases.png'),
        },

        {
            id: 8,
            latitude: -23.570946880401845 ,
            longitude: -46.402787976540345 ,
            title: 'UPA - Cidade Tiradentes' ,
            description: 'R. Cachoeira Camaleão, s/n - Conj. Hab. Inácio Monteiro, São Paulo - SP, 08472-610' ,
            image: require('../../../assets/upaCidadeTiradentes.png'),
        },

        {
            id: 9,
            latitude: -23.570946880401845 ,
            longitude: -46.402787976540345 ,
            title: 'UPA - Cidade Tiradentes' ,
            description: 'R. Cachoeira Camaleão, s/n - Conj. Hab. Inácio Monteiro, São Paulo - SP, 08472-610' ,
            image: require('../../../assets/upaCidadeTiradentes.png'),
        },

        {
            id: 10,
            latitude: -23.545615552503495 ,
            longitude: -46.40850163843965 ,
            title: 'Drogaria Otelo' ,
            description: 'R. Otelo Augusto Ribeiro, 351 - Guaianases, São Paulo - SP, 08412-000' ,
            image: require('../../../assets/drogariaOtelo.png'),
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
    <ImageBackground source={require('../../../assets/backLogin.png')} style={styles.background}>
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.conteudoModal}>
                        {selectedPoint ? (
                            <>
                            <Text style={styles.modalTitle}>{selectedPoint.title}</Text>
                            <Text style={styles.modalText}>{selectedPoint.description}</Text>
                            <Image
                                source={selectedPoint.image}
                                style={styles.modalImagem}
                                resizeMode="cover"
                            />
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Text>Fechar Modal</Text>
                                </Pressable>
                            </>
                        ): (
                            <Text>Carregando...</Text>
                        )}
                    </View>
                </View>
        
            </Modal>
                <View style={styles.buscar}>
                    <Text style={styles.tituloPg}>MAPA</Text>
                    <Text style={styles.descriptionPg}>localização de Postos de saúde, UBS, hospitais e farmácias proxímos à você.</Text>
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
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude
                                    }}
                                    title={point.title}
                                    description={point.description}
                                    onPress={() => {
                                        setModalVisible(true);
                                        setSelectedPoint(point)
                                    }}
                                />
                            ))}
                        </MapView>
                    ) : (
                        <Text>{errorMsg ? errorMsg : "Carregando localização..." }</Text>
                    )}
            </View>
            <View style={styles.voltar}>
                <Pressable style={styles.btnVoltar} onPress={() => navigation.navigate('Home')}>
                    <Text style={{fontWeight:'bold'}}>VOLTAR</Text>
                </Pressable>
            </View>
        </View>
    </ImageBackground>
  );
}
