import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function splash() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('login') }></Pressable>

    </View>

  )};

