import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style';
import { Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function PageOne() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../../assets/welcome/background_welcome.png')} style={styles.background}>
      <View style={styles.container}>
          <Text style={[styles.textSaude, { fontFamily: "Poppins_400Regular" }]}>Cuidando da sua saúde todos os dias.</Text>
          <Pressable style={styles.btn} onPress={() => navigation.navigate('Login') }>
            <LinearGradient
              colors={['#93BEFF', '#4D97FF', '#0077FF']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height:'100%',
                width:'100%',
                borderRadius: 64,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
                <Text style={[styles.btnText, { fontFamily: "Poppins_400Regular" }]}>
                  COMEÇAR
                </Text>

                <Image style={{ width: 12, height: 22, marginRight: 18 }} source={require('../../../assets/Arrow.png')} />
            </LinearGradient>
          </Pressable>
      </View>

     
    </ImageBackground>
  )};

