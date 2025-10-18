import { View, ActivityIndicator, Image } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('usuario');

        // Aguarda 1 segundo só para mostrar a tela de splash
        await new Promise(resolve => setTimeout(resolve,1000));

        if (usuarioSalvo) {
          // Usuário logado → navega para AppStack
          navigation.reset({
            index: 0,
            routes: [{ name: 'AppStack' }],
          });
        } else {
          // Não logado → navega para AuthStack
          navigation.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
          });
        }
      } catch (e) {
        console.error('Erro ao verificar login:', e);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/medicine.gif')} // coloque seu GIF em 'app/assets/splash.gif'
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
    </View>
  );
}