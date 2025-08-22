import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';


export default function login() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('cadastro') }></Pressable>

    </View>
  )};

