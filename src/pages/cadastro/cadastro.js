import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Popup from '../../components/Popup';
import userIcon from '../../../assets/user.png';
import emailIcon from '../../../assets/email.png';
import padlockIcon from '../../../assets/padlock.png';
import { cadastrarUsuario, verificarEmail } from '../../../services/usuario';
import { LinearGradient } from 'expo-linear-gradient';

import CoraChat from './components/CoraChat';
import ChatSaude from './components/ChatSaude';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function Cadastro() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirmacao, setMostrarSenhaConfirmacao] =
    useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('warning');

  const showPopup = (title, message, type = 'warning') => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
  };

  const [etapa, setEtapa] = useState('cadastro');
  const [dadosCoraChat, setDadosCoraChat] = useState(null);

  const proximoCadastro = async () => {
  if (!nome.trim()) {
    showPopup(
      'Atenção',
      'Digite seu nome.',
      'warning'
    );
    return;
  }

  if (!email.trim()) {
    showPopup(
      'Atenção',
      'Digite seu e-mail.',
      'warning'
    );
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email.trim())) {
    showPopup(
      'E-mail inválido',
      'Digite um e-mail válido.',
      'warning'
    );
    return;
  }

  if (!senha) {
    showPopup(
      'Atenção',
      'Digite sua senha.',
      'warning'
    );
    return;
  }

  if (senha.length < 6) {
    showPopup(
      'Senha inválida',
      'A senha deve ter pelo menos 6 caracteres.',
      'warning'
    );
    return;
  }

  if (!senhaConfirmacao) {
    showPopup(
      'Atenção',
      'Confirme sua senha.',
      'warning'
    );
    return;
  }

  if (senha !== senhaConfirmacao) {
    showPopup(
      'Senhas diferentes',
      'As senhas não coincidem.',
      'warning'
    );
    return;
  }

  const resultado = await verificarEmail(email.trim());

  if (!resultado.disponivel) {
    showPopup(
      'E-mail já cadastrado',
      'Esse e-mail já está cadastrado. Use outro e-mail.',
      'warning'
    );
    return;
  }

  setEtapa('cora');
};

 const finalizarCadastro = async (dados) => {
  try {
    const usuario = {
      nome,
      email,
      senha,
      genero: dados.genero,
      altura: dados.altura,
      peso: dados.peso,
      tipoSangue: dados.tipoSangue,
    };

    console.log('DADOS ENVIADOS:', usuario);

    const resposta = await cadastrarUsuario(usuario);

    console.log('RESPOSTA DO SERVIDOR:', resposta);

    alert('Cadastro concluído! 🎉');

    navigation.navigate('Login');
  } catch (error) {
    console.log(
      'ERRO AO CADASTRAR:',
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      'Não foi possível concluir o cadastro.'
    );
  }
};

  if (!fontsLoaded) {
    return null;
  }

  if (etapa === 'cora') {
    return (
      <CoraChat
        nome={nome}
        voltar={() => setEtapa('cadastro')}
        proximo={(dados) => {
          setDadosCoraChat(dados);
          setEtapa('chat');
        }}
      />
    );
  }

  if (etapa === 'chat') {
    return (
      <ChatSaude
        nome={nome}
        voltar={() => setEtapa('cora')}
        dados={dadosCoraChat}
        finalizar={finalizarCadastro}
      />
    );
  }

  return (
     <LinearGradient
          colors={[
            '#9EC8FF',
            '#C4DCFF',
            '#E7F1FF',
            '#FFFFFF',
          ]}
          locations={[0, 0.35, 0.7, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        >

        
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.buttonVoltarContainer}>
         
            <View style={{width: "40%", height: 28, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10 }}>
              <Image source={require('../../../assets/logoBrancaCora.png')} style={{ height: 48, width: 42 }} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: "white" }}>CORA</Text>
            </View>
        </View>
       
        <View style={styles.textos}>
          <Text style={[styles.titulo, { fontFamily: "Poppins_400Regular", color: "white" }]}>Seu agente de saúde na palma da sua mão.</Text>
        </View>
      </View>

      <View style={styles.infosPrincipais}>
        
        <View style={styles.inputIconContainer}>
          <Image source={userIcon} style={styles.iconStyle} />

          <TextInput
            style={styles.inputComIcon}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="#919191"
          />
        </View> 

      
        <View style={styles.inputIconContainer}>
          <Image source={require('../../../assets/emailIcon.png')} style={styles.iconStyleEmail} />

          <TextInput
            style={styles.inputComIcon}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            placeholderTextColor="#919191"
          />
        </View>


        <View style={styles.inputIconContainer}>
          <Image source={require('../../../assets/senhaIcon.png')} style={styles.iconStyleSenha} />
          <TextInput
            style={styles.inputComIcon}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#919191"
          />

          <Pressable
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={{
              padding: 10,
              marginRight: 5,
            }}
          >
            <Image
              source={
                  mostrarSenha
                  ? require("../../../assets/passOpen.png")
                  : require("../../../assets/passClose.png")
                  }
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: "rgb(117, 116, 116)",
                  }}
              />
            </Pressable>
        </View>

        <View style={styles.inputIconContainer}>
          <Image source={require('../../../assets/senhaIcon.png')} style={styles.iconStyleSenha} />

          <TextInput
            style={styles.inputComIcon}
            value={senhaConfirmacao}
            onChangeText={setSenhaConfirmacao}
            secureTextEntry={!mostrarSenhaConfirmacao}
            placeholder="Confirme sua senha"
            placeholderTextColor="#919191"
          />

              <Pressable
                onPress={() => setMostrarSenhaConfirmacao(
                !mostrarSenhaConfirmacao
              )}
                style={{
                  padding: 10,
                  marginRight: 5,
                }}
              >
                <Image
                  source={
                  mostrarSenhaConfirmacao
                      ? require("../../../assets/passOpen.png")
                      : require("../../../assets/passClose.png")
                  }
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: "rgb(117, 116, 116)",
                  }}
                />
              </Pressable>
        </View>

        <View style={{width: '100%', height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 48,}}>
           
           <Pressable
            style={styles.btnVoltar}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
                        colors={['#4DAFFF', '#008CFF', '#0077FF']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={{
                          height:'100%',
                          width:'100%',
                          borderRadius: 64,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>          
            <Image
              style={styles.imgVoltar}
              source={require('../../../assets/btnVoltar.png')}
            />
            </LinearGradient>  
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={proximoCadastro}
          >
            <LinearGradient
                        colors={['#4DAFFF', '#008CFF', '#0077FF']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={{
                          height:'100%',
                          width:'100%',
                          paddingHorizontal: 22,
                          borderRadius: 64,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
            <Text style={styles.btnTexto}>
              Próximo 
            </Text>
            <Image style={{ width: 12, height: 22,     resizeMode: 'contain', }} source={require('../../../assets/Arrow.png')} />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
      <Popup
        visible={popupVisible}
        title={popupTitle}
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupVisible(false)}
      />
    </View>
    </LinearGradient>
  );
}
