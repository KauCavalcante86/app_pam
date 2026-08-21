import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import {
  useNavigation,
} from '@react-navigation/native';

export default function ChatSaude({ nome, voltar, dados, finalizar }) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const primeiroNome =
    nome?.split(' ')[0] || 'você';

  const continuar = () => {
    if (finalizar && dados) {
      finalizar(dados);
    }
  };

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>

        <Pressable
          style={styles.btnVoltar}
          onPress={voltar}
        >
          <Text style={styles.setaVoltar}>
            ‹
          </Text>
        </Pressable>

        <View>
          <Text style={styles.titulo}>
            Oi, {primeiroNome}! 👋
          </Text>

          <Text style={styles.subtitulo}>
            Eu sou a Cora.
          </Text>
        </View>

      </View>


      {/* CONTEÚDO */}
      <View style={styles.conteudo}>

        <View style={styles.check}>
          <Text style={styles.checkTexto}>
            ✓
          </Text>
        </View>

        <Text style={styles.tituloFinal}>
          Tudo pronto! 💙
        </Text>

        <Text style={styles.mensagem}>
          Obrigado por responder às
          perguntas.
        </Text>

        <Text style={styles.mensagem}>
          Agora eu já conheço um pouquinho
          mais sobre você e posso ajudar
          a cuidar da sua saúde.
        </Text>


        {/* BALÃO DA CORA */}
        <View style={styles.balao}>

          <Text style={styles.nomeCora}>
            ◉ Cora
          </Text>

          <Text style={styles.textoBalao}>
            Seu perfil está preparado! ✨
          </Text>

          <Text style={styles.textoBalao}>
            Vamos começar sua jornada?
          </Text>

        </View>


        {/* BOTÃO */}
        <Pressable
          style={styles.botao}
          onPress={continuar}
        >

          <Text style={styles.textoBotao}>
            Começar
          </Text>

          <Text style={styles.seta}>
            →
          </Text>

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#DCEBFF',
  },

  cabecalho: {
    paddingTop: 55,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnVoltar: {
    marginRight: 15,
  },

  setaVoltar: {
    fontSize: 32,
    color: '#006DFF',
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 25,
    color: '#006DFF',
    fontFamily: 'Poppins_700Bold',
  },

  subtitulo: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  check: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#087EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkTexto: {
    color: '#FFF',
    fontSize: 45,
    fontFamily: 'Poppins_700Bold',
  },

  tituloFinal: {
    fontSize: 28,
    color: '#006DFF',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  mensagem: {
    fontSize: 17,
    color: '#333',
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 8,
  },

  balao: {
    width: '100%',
    backgroundColor: '#299CF0',
    borderRadius: 20,
    borderTopLeftRadius: 5,
    padding: 20,
    marginTop: 25,
    marginBottom: 25,
  },

  nomeCora: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 8,
  },

  textoBalao: {
    fontSize: 18,
    color: '#FFF',
    lineHeight: 27,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 3,
  },

  botao: {
    width: '100%',
    height: 60,
    backgroundColor: '#0077FF',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 19,
    fontFamily: 'Poppins_700Bold',
  },

  seta: {
    color: '#FFF',
    fontSize: 28,
    marginLeft: 10,
  },

});