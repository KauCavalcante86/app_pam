import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function splash() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('login') }>
        <Text style={styles.btnText}>Ir para o login</Text>
      </Pressable>
      
      <Pressable style={styles.btn} onPress={() => navigation.navigate('teste') }>
        <Text style={styles.btnText}>Ir para o teste</Text>
      </Pressable>
    </View>

  )};

