import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import styles from './styles';

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

  const progressoAnimado = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressoAnimado, {
      toValue: etapa + 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [etapa]);

  
function EntradaSuave({ children, animacaoKey, style }) {
  const opacidade = React.useRef(new Animated.Value(0)).current;
  const deslocamento = React.useRef(new Animated.Value(14)).current;

  React.useEffect(() => {
    opacidade.setValue(0);
    deslocamento.setValue(14);

    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(deslocamento, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animacaoKey]);

    return (
      <Animated.View
        style={[
          style,
          {
            opacity: opacidade,
            transform: [{ translateY: deslocamento }],
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  function OpcaoAnimada({
    opcao,
    selecionada,
    onPress,
    styles,
  }) {
    const escala = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
      Animated.spring(escala, {
        toValue: selecionada ? 1.025 : 1,
        friction: 6,
        tension: 150,
        useNativeDriver: true,
      }).start();
    }, [selecionada]);

    return (
      <Animated.View
        style={{
          transform: [{ scale: escala }],
        }}
      >
        <Pressable
          style={[
            styles.opcao,
            selecionada && styles.opcaoSelecionada,
          ]}
          onPress={onPress}
        >
          <Text
            style={[
              styles.textoOpcao,
              selecionada && styles.textoOpcaoSelecionada,
            ]}
          >
            {opcao}
          </Text>
        </Pressable>
      </Animated.View>
    );
  }

  const larguraProgresso = progressoAnimado.interpolate({
    inputRange: [0, perguntas.length],
    outputRange: ['0%', '100%'],
  });

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

    if (perguntaAtual.tipo === 'numero') {
      resposta = valorTexto.trim();

      if (!resposta) {
        return;
      }
    }

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

    const voltarPergunta = () => {
    if (etapa > 0) {
      const etapaAnterior = etapa - 1;
      const respostaAnterior = respostas[etapaAnterior];

      setEtapa(etapaAnterior);

      setRespostaSelecionada(
        respostaAnterior?.id === perguntas[etapaAnterior].id &&
        perguntas[etapaAnterior].tipo === 'opcoes'
          ? respostaAnterior.resposta
          : null
      );

      setValorTexto(
        respostaAnterior?.id === perguntas[etapaAnterior].id &&
        perguntas[etapaAnterior].tipo === 'numero'
          ? respostaAnterior.resposta
          : ''
      );

      setRespostas(prev => prev.slice(0, etapaAnterior));
    } else {
      setModo('intro');
    }
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

            <Image source={require('../../../../assets/logoBrancaCora.png')} style={{ height: 116, width: 116, resizeMode: 'contain' }} />    

            <View style={{ marginLeft: 10 }}>

              <Text style={styles.logoTitulo}>
                Olá, {primeiroNome}!
              </Text>

              <Text style={styles.coraTitulo}>
                Eu sou a Cora.
              </Text>

              <Text style={styles.logoSubtitulo}>
                Sua assistente de saúde.
              </Text>

            </View>

          </View>

          <View style={styles.introMensagens}>

            <EntradaSuave
              animacaoKey={etapa}
              style={styles.mensagemCoraArea}
            >
              <Text style={styles.nomeCora}>
                ◉ Cora
              </Text>

              <View style={styles.balaoCora}>
                <Text style={styles.textoCora}>
                  Vou te fazer algumas perguntas rápidas aqui no chat 👇
                </Text>
              </View>
            </EntradaSuave>

            <EntradaSuave
              animacaoKey={etapa}
              style={styles.mensagemCoraArea}
            >
              <Text style={styles.nomeCora}>
                ◉ Cora
              </Text>

              <View style={styles.balaoCora}>
                <Text style={styles.textoCora}>
                  É só responder e eu cuido do resto.
                </Text>
              </View>
            </EntradaSuave>

          </View>

        </View>

        <Pressable
          style={styles.btnIrChat}
          onPress={entrarNoChat}
        >

          <Text style={styles.textoIrChat}>
            Ir ao Chat
          </Text>

            <Image source={require('../../../../assets/btnNextChat.png')} style={{ height: 42, width: 42, resizeMode: 'contain' }} />    

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
        <View style={styles.containerCabecalho}>
          <Pressable
            style={styles.btnVoltar}
            onPress={voltarPergunta}
          >
             <Image source={require('../../../../assets/btnVoltarStep.png')} style={{ height: 32, width: 32, resizeMode: 'contain' }} />
          </Pressable>

          <View style={styles.barraProgresso}>
            <Animated.View
              style={[
                styles.barraProgressoPreenchida,
                {
                  width: larguraProgresso,
                },
              ]}
            />
          </View>
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

         <Image source={require('../../../../assets/btnNextChat.png')} style={{ height: 42, width: 42, resizeMode: 'contain' }} />

        </Pressable>

      </ScrollView>

    </View>
  );
}

