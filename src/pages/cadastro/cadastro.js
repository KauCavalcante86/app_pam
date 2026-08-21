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
import Popup from '../../components/Popup';
import userIcon from '../../../assets/user.png';
import emailIcon from '../../../assets/email.png';
import padlockIcon from '../../../assets/padlock.png';
import { cadastrarUsuario, verificarEmail } from '../../../services/usuario';

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
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.buttonVoltarContainer}>
          <Pressable
            style={styles.btnVoltar}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.imgVoltar}
              source={require('../../../assets/btnVoltar.png')}
            />
          </Pressable>
        </View>

        <View style={styles.textos}>
          <Text style={styles.titulo}>Vamos começar</Text>
          <Text style={styles.tituloCadastre}>Cadastre-se</Text>
        </View>
      </View>

      <View style={styles.infosPrincipais}>
        <Text style={styles.nomeButton}>
          Como podemos te chamar?
        </Text>

        <View style={styles.inputIconContainer}>
          <Image source={userIcon} style={styles.iconStyle} />

          <TextInput
            style={styles.inputComIcon}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite aqui"
            placeholderTextColor="#000"
          />
        </View>

        <Text style={styles.nomeButton}>E-mail</Text>

        <View style={styles.inputIconContainer}>
          <Image source={emailIcon} style={styles.iconStyle} />

          <TextInput
            style={styles.inputComIcon}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="exemplo@email.com"
            placeholderTextColor="#000"
          />
        </View>

        <Text style={styles.nomeButton}>Senha</Text>

        <View style={styles.inputIconContainer}>
          <Image source={padlockIcon} style={styles.iconStyle} />

          <TextInput
            style={styles.inputComIcon}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            placeholder="Sua senha"
            placeholderTextColor="#000"
          />

          <Pressable
            style={styles.eyeButton}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Text style={styles.eyeText}>
              {mostrarSenha ? '🙈' : '👁️'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.nomeButton}>Confirmar senha</Text>

        <View style={styles.inputIconContainer}>
          <Image source={padlockIcon} style={styles.iconStyle} />

          <TextInput
            style={styles.inputComIcon}
            value={senhaConfirmacao}
            onChangeText={setSenhaConfirmacao}
            secureTextEntry={!mostrarSenhaConfirmacao}
            placeholder="Confirme sua senha"
            placeholderTextColor="#000"
          />

          <Pressable
            style={styles.eyeButton}
            onPress={() =>
              setMostrarSenhaConfirmacao(
                !mostrarSenhaConfirmacao
              )
            }
          >
            <Text style={styles.eyeText}>
              {mostrarSenhaConfirmacao ? '🙈' : '👁️'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.btn}
          onPress={proximoCadastro}
        >
          <Text style={styles.btnTexto}>
            Próximo →
          </Text>
        </Pressable>
      </View>
      <Popup
        visible={popupVisible}
        title={popupTitle}
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A9FEE',
  },

  cabecalho: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingHorizontal: 20,
  },

  buttonVoltarContainer: {
    width: 70,
    alignItems: 'flex-start',
  },

  btnVoltar: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#6B91E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgVoltar: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  textos: {
    flex: 1,
    alignItems: 'center',
    marginRight: 55,
  },

  titulo: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  },

  tituloCadastre: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },

  infosPrincipais: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
  },

  nomeButton: {
    fontSize: 17,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },

  inputIconContainer: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  iconStyle: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    marginRight: 10,
  },

  inputComIcon: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },

  eyeButton: {
    padding: 5,
  },

  eyeText: {
    fontSize: 20,
  },

  btn: {
    width: '100%',
    height: 55,
    backgroundColor: '#0077FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  btnTexto: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
  },
});