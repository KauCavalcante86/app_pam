import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style';

export default function home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <View style={styles.perfil}>

         </View>
        <Text style={styles.nomeUser}>Olá, Fulano</Text>
      </View>

      <View style={styles.app}>

        <View style={styles.box1}>

        </View>

        <View style={styles.box2}>
            <View style={styles.btnRetan}></View>

            <View style={styles.campoRetan}>
                 <View style={styles.opBody}></View>
                 <View style={styles.opBody}></View>
            </View>
        </View>

        <View style={styles.box3}>
            <View style={styles.op1}>
                <View style={styles.op}></View>
                <View style={styles.op}></View>
                <View style={styles.op}></View>
            </View>

            <View style={styles.op1}>
                <View style={styles.op}></View>
                <View style={styles.op}></View>
                <View style={styles.op}></View>
            </View>
        </View>

      </View>

      
    </View>

  )};

