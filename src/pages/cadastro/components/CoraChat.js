import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { useNavigation } from '@react-navigation/native';

export default function CoraChat({
  nome,
  voltar,
  proximo,
}) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const primeiroNome = nome?.split(' ')[0] || '';

  const [modo, setModo] = useState('intro');
  const [etapa, setEtapa] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [valorTexto, setValorTexto] = useState('');
  const [respostas, setRespostas] = useState([]);

  const perguntas = [
    {
      id: 'objetivo',
      pergunta: 'O que você gostaria de cuidar mais na sua rotina?',
      tipo: 'opcoes',
      opcoes: [
        '💧 Hidratação',
        '😴 Sono',
        '🥗 Alimentação',
        '🧠 Bem-estar',
        '🏃 Atividade física',
        '❤️ Saúde no geral',
      ],
    },

    {
      id: 'genero',
      pergunta: 'Como você se identifica?',
      tipo: 'opcoes',
      opcoes: [
        'Mulher',
        'Homem',
        'Não-binário',
        'Prefiro não informar',
      ],
    },

    {
      id: 'altura',
      pergunta: 'Qual é a sua altura?',
      tipo: 'numero',
      placeholder: 'Ex: 1.75',
      unidade: 'm',
    },

    {
      id: 'peso',
      pergunta: 'E aproximadamente quanto você pesa?',
      tipo: 'numero',
      placeholder: 'Ex: 70',
      unidade: 'kg',
    },

    {
      id: 'tipoSangue',
      pergunta: 'Você sabe qual é o seu tipo sanguíneo?',
      tipo: 'opcoes',
      opcoes: [
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
        'Não sei',
      ],
    },
  ];

  const perguntaAtual = perguntas[etapa];

  // Faz o chat descer automaticamente
  useEffect(() => {
    if (modo === 'chat') {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({
          animated: true,
        });
      }, 150);
    }
  }, [modo, etapa, respostas]);

  const entrarNoChat = () => {
    setModo('chat');
  };

  const selecionarOpcao = (opcao) => {
    setRespostaSelecionada(opcao);
  };

  const proximaPergunta = () => {
    let resposta = respostaSelecionada;

    // Se for campo numérico
    if (perguntaAtual.tipo === 'numero') {
      resposta = valorTexto.trim();

      if (!resposta) {
        return;
      }
    }

    // Se for opção e nenhuma foi selecionada
    if (
      perguntaAtual.tipo === 'opcoes' &&
      !respostaSelecionada
    ) {
      return;
    }

    const novaResposta = {
      id: perguntaAtual.id,
      pergunta: perguntaAtual.pergunta,
      resposta,
    };

    const novasRespostas = [
      ...respostas,
      novaResposta,
    ];

    setRespostas(novasRespostas);

    // Limpa os campos
    setRespostaSelecionada(null);
    setValorTexto('');

    // Última pergunta
    if (etapa === perguntas.length - 1) {
      const dadosFinais = {
        objetivo: novasRespostas.find(
          item => item.id === 'objetivo'
        )?.resposta,

        genero: novasRespostas.find(
          item => item.id === 'genero'
        )?.resposta,

        altura: novasRespostas.find(
          item => item.id === 'altura'
        )?.resposta,

        peso: novasRespostas.find(
          item => item.id === 'peso'
        )?.resposta,

        tipoSangue: novasRespostas.find(
          item => item.id === 'tipoSangue'
        )?.resposta,
      };

      setTimeout(() => {
        proximo(dadosFinais);
      }, 700);

      return;
    }

    // Próxima pergunta
    setTimeout(() => {
      setEtapa(prev => prev + 1);
    }, 350);
  };

  if (!fontsLoaded) {
    return null;
  }

  /*
   * =========================
   * TELA DE INTRODUÇÃO
   * =========================
   */

  if (modo === 'intro') {
    return (
      <View style={styles.container}>

        <View style={styles.introConteudo}>

          <View style={styles.logoArea}>

            <View style={styles.logo}>

              <Text style={styles.logoSimbolo}>
                +
              </Text>

              <View style={styles.logoBolinhas}>
                <Text>●</Text>
                <Text>●</Text>
              </View>

            </View>

            <View>

              <Text style={styles.logoTitulo}>
                Olá, {primeiroNome}! Eu sou a Cora.
              </Text>

              <Text style={styles.logoSubtitulo}>
                Sua assistente de saúde.
              </Text>

            </View>

          </View>

          <View style={styles.introMensagens}>

            <View style={styles.mensagemCoraArea}>

              <Text style={styles.nomeCora}>
                ◉ Cora
              </Text>

              <View style={styles.balaoCora}>

                <Text style={styles.textoCora}>
                  Vou te fazer algumas perguntas rápidas aqui no chat 👇
                </Text>

              </View>

            </View>

            <View style={styles.mensagemCoraArea}>

              <Text style={styles.nomeCora}>
                ◉ Cora
              </Text>

              <View style={styles.balaoCora}>

                <Text style={styles.textoCora}>
                  É só responder e eu cuido do resto.
                </Text>

              </View>

            </View>

          </View>

        </View>

        <Pressable
          style={styles.btnIrChat}
          onPress={entrarNoChat}
        >

          <Text style={styles.textoIrChat}>
            Ir ao Chat
          </Text>

          <Text style={styles.setaBaixo}>
            ↓
          </Text>

        </Pressable>

      </View>
    );
  }

  /*
   * =========================
   * TELA DO CHAT
   * =========================
   */

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

      {/* CHAT */}

      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HISTÓRICO */}

        {respostas.map((item, index) => (

          <View
            key={`${item.id}-${index}`}
            style={styles.conversaItem}
          >

            {/* PERGUNTA DA CORA */}

            <View style={styles.mensagemCoraArea}>

              <Text style={styles.nomeCora}>
                ◉ Cora
              </Text>

              <View style={styles.balaoCora}>

                <Text style={styles.textoCora}>
                  {item.pergunta}
                </Text>

              </View>

            </View>

            {/* RESPOSTA DO USUÁRIO */}

            <View style={styles.mensagemUsuarioArea}>

              <View style={styles.balaoUsuario}>

                <Text style={styles.respostaLabel}>
                  Resposta:
                </Text>

                <Text style={styles.textoUsuario}>
                  {item.resposta}
                </Text>

              </View>

            </View>

          </View>

        ))}

        {/* PERGUNTA ATUAL */}

        <View style={styles.mensagemCoraArea}>

          <Text style={styles.nomeCora}>
            ◉ Cora
          </Text>

          <View style={styles.balaoCora}>

            <Text style={styles.textoCora}>
              {perguntaAtual.pergunta}
            </Text>

            {/* OPÇÕES */}

            {perguntaAtual.tipo === 'opcoes' && (

              <View style={styles.opcoes}>

                {perguntaAtual.opcoes.map((opcao) => {

                  const selecionada =
                    respostaSelecionada === opcao;

                  return (
                    <Pressable
                      key={opcao}
                      style={[
                        styles.opcao,
                        selecionada &&
                          styles.opcaoSelecionada,
                      ]}
                      onPress={() =>
                        selecionarOpcao(opcao)
                      }
                    >

                      <Text
                        style={[
                          styles.textoOpcao,
                          selecionada &&
                            styles.textoOpcaoSelecionada,
                        ]}
                      >
                        {opcao}
                      </Text>

                    </Pressable>
                  );
                })}

              </View>

            )}

            {/* CAMPO NUMÉRICO */}

            {perguntaAtual.tipo === 'numero' && (

              <View style={styles.inputArea}>

                <TextInput
                  value={valorTexto}
                  onChangeText={setValorTexto}
                  keyboardType="decimal-pad"
                  placeholder={perguntaAtual.placeholder}
                  placeholderTextColor="#777"
                  style={styles.input}
                />

                <Text style={styles.unidade}>
                  {perguntaAtual.unidade}
                </Text>

              </View>

            )}

          </View>

        </View>

        {/* PROGRESSO */}

        <Text style={styles.progresso}>
          {etapa + 1}/{perguntas.length}
        </Text>

        {/* PRÓXIMO */}

        <Pressable
          style={[
            styles.btnProximo,

            (
              perguntaAtual.tipo === 'opcoes' &&
              !respostaSelecionada
            ) && styles.btnDesativado,

            (
              perguntaAtual.tipo === 'numero' &&
              !valorTexto.trim()
            ) && styles.btnDesativado,
          ]}
          onPress={proximaPergunta}
        >

          <Text style={styles.textoProximo}>
            {etapa === perguntas.length - 1
              ? 'Finalizar'
              : 'Próximo'}
          </Text>

          <Text style={styles.setaBaixoChat}>
            ↓
          </Text>

        </Pressable>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#DCEBFF',
  },

  /*
   * INTRO
   */

  introConteudo: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 26,
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },

  logo: {
    width: 135,
    height: 135,
    borderRadius: 65,
    backgroundColor: '#087EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 22,
  },

  logoSimbolo: {
    position: 'absolute',
    top: 17,
    color: '#FFF',
    fontSize: 55,
    fontFamily: 'Poppins_700Bold',
  },

  logoBolinhas: {
    flexDirection: 'row',
    gap: 35,
    marginTop: 65,
  },

  logoTitulo: {
    fontSize: 25,
    color: '#006DFF',
    fontFamily: 'Poppins_500Medium',
  },

  logoSubtitulo: {
    fontSize: 21,
    color: '#7A8798',
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },

  introMensagens: {
    marginTop: 100,
  },

  /*
   * MENSAGENS
   */

  mensagemCoraArea: {
    alignSelf: 'flex-start',
    width: '94%',
    marginBottom: 25,
  },

  nomeCora: {
    fontSize: 15,
    color: '#0077FF',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 5,
  },

  balaoCora: {
    backgroundColor: '#299CF0',
    borderRadius: 18,
    borderTopLeftRadius: 5,
    padding: 17,
  },

  textoCora: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Poppins_400Regular',
  },

  /*
   * BOTÃO INTRO
   */

  btnIrChat: {
    alignItems: 'center',
    paddingBottom: 55,
  },

  textoIrChat: {
    fontSize: 23,
    color: '#888',
    fontFamily: 'Poppins_500Medium',
  },

  setaBaixo: {
    color: '#299CF0',
    fontSize: 55,
    lineHeight: 50,
  },

  /*
   * CABEÇALHO
   */

  cabecalho: {
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnVoltar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#6B91E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  setaVoltar: {
    color: '#FFF',
    fontSize: 42,
    lineHeight: 45,
  },

  titulo: {
    fontSize: 25,
    color: '#006DFF',
    fontFamily: 'Poppins_700Bold',
  },

  subtitulo: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  /*
   * CHAT
   */

  chat: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  conversaItem: {
    width: '100%',
    marginBottom: 10,
  },

  /*
   * RESPOSTA USUÁRIO
   */

  mensagemUsuarioArea: {
    alignSelf: 'flex-end',
    maxWidth: '78%',
    marginBottom: 22,
  },

  balaoUsuario: {
    backgroundColor: '#0077FF',
    borderRadius: 18,
    borderTopRightRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },

  respostaLabel: {
    fontSize: 13,
    color: '#DCEBFF',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
  },

  textoUsuario: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
  },

  /*
   * OPÇÕES
   */

  opcoes: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 18,
    overflow: 'hidden',
  },

  opcao: {
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  opcaoSelecionada: {
    backgroundColor: '#4DABF5',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 14,
    borderBottomWidth: 0,
  },

  textoOpcao: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  textoOpcaoSelecionada: {
    color: '#FFF',
    fontFamily: 'Poppins_500Medium',
  },

  /*
   * INPUT
   */

  inputArea: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 18,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  unidade: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins_500Medium',
  },

  /*
   * PROGRESSO
   */

  progresso: {
    fontSize: 15,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    marginBottom: 10,
  },

  /*
   * BOTÃO PRÓXIMO
   */

  btnProximo: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  btnDesativado: {
    opacity: 0.45,
  },

  textoProximo: {
    fontSize: 22,
    color: '#888',
    fontFamily: 'Poppins_500Medium',
  },

  setaBaixoChat: {
    fontSize: 48,
    color: '#299CF0',
    lineHeight: 45,
  },

});
