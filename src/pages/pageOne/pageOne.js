import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

export default function PageOne() {

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../../assets/backSplash.png')} style={styles.background}>


      <View style={styles.container}>
          <Text style={styles.boasvindas}>SEJA BEM VINDO!</Text>
          <Text style={styles.textSaude}>Ao app para sua saúde!</Text>

          <Pressable style={styles.btn} onPress={() => navigation.navigate('Login') }>
            <Text style={styles.btnText}>Vamos começar?</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => navigation.navigate('geo') }>
            <Text style={styles.btnText}>geolocalização</Text>
          </Pressable>
      </View>


    </ImageBackground>
  )};

