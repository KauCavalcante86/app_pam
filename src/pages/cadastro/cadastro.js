import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import styles from './style';
import { useState } from 'react';
import { cadastrarUsuario } from "../../../services/usuario";
import { useNavigation } from '@react-navigation/native';

import userIcon from '../../../assets/user.png';
import emailIcon from '../../../assets/email.png';
import padlockIcon from '../../../assets/padlock.png';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function cadastro() {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [endereco, SetEndereco] = useState('');
  const [rua, SetRua] = useState('');
  const [bairro, SetBairro] = useState('');
  const [cidade, SetCidade] = useState('');
  const [uf, SetUf] = useState('');
  const [nome, SetNome] = useState('');
  const [email, SetEmail] = useState('');
  const [senha, SetSenha] = useState('');

  const navigation = useNavigation();

  // 👉 Automatiza busca do CEP
  const automatizacaoCep = (txt) => {
    SetEndereco(txt);
    if (txt.length === 8) {
      cep(txt);
    }
  };

  function cep(cepDigitado) {
    axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`)
      .then(response => {
        SetRua(response.data.logradouro);
        SetBairro(response.data.bairro);
        SetCidade(response.data.localidade);
        SetUf(response.data.uf);
      })
      .catch(error => {
        console.error("Erro ao buscar CEP", error);
      });
  }

      const criarUsuario = async () => {
      const dados = {
        nome,
        email,
        senha,
        cep: endereco,
        bairro,
        rua,
        cidade,
        uf,
      };

      try {
        const response = await cadastrarUsuario(dados);

        alert("Usuário criado com sucesso!");
        navigation.goBack();

      } catch (error) {
        alert("Erro ao criar usuário. Verifique os dados.");
      }
    };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <View style={styles.buttonVoltarContainer}>
          <Pressable style={styles.btnVoltar} onPress={() => navigation.goBack()}>
             <Image style={styles.imgVoltar} source={require('../../../assets/btnVoltar.png')} />
          </Pressable>
        </View>

        <View style={styles.textos}>
          <Text style={styles.titulo}>Vamos começar</Text>
          <Text style={styles.tituloCadastre}>Cadastre-se</Text>
        </View>
      </View>

      <View style={styles.infosPrincipais}>

        {/* Nome */}
        <Text style={styles.nomeButton}>Nome Completo</Text>
        <View style={styles.inputIconContainer}>
          <Image source={userIcon} style={styles.iconStyle} />
          <TextInput
            style={styles.inputComIcon}
            onChangeText={SetNome}
            placeholder='Seu Nome Completo'
            placeholderTextColor='black'
          />
        </View>

        {/* Email */}
        <Text style={styles.nomeButton}>Email</Text>
        <View style={styles.inputIconContainer}>
          <Image source={emailIcon} style={styles.iconStyle} />
          <TextInput
            style={styles.inputComIcon}
            onChangeText={SetEmail}
            keyboardType="email-address"
            placeholder='exemplo@email.com'
            placeholderTextColor='black'
          />
        </View>

        {/* Senha */}
        <Text style={styles.nomeButton}>Senha:</Text>
        <View style={styles.inputIconContainer}>
          <Image source={padlockIcon} style={styles.iconStyle} />
          <TextInput
            style={styles.inputComIcon}
            onChangeText={SetSenha}
            secureTextEntry={true}
            placeholder='Sua Senha'
            placeholderTextColor='black'
          />
        </View>

        {/* CEP */}
        <Text style={styles.nomeButton}>Cep:</Text>
        <TextInput
          style={styles.inputStylePadrao}
          placeholder='CEP'
          placeholderTextColor='black'
          maxLength={8}
          onChangeText={automatizacaoCep}
          keyboardType="numeric"
          value={endereco}
        />

        {/* Cidade e Bairro */}
        <View style={styles.cepCidadeWrapper}>

          <View style={styles.campoMetade}>
            <Text style={styles.nomeButton}>Cidade:</Text>
            <TextInput
              style={styles.inputMetade}
              placeholder='Cidade'
              value={cidade}
              onChangeText={SetCidade}
              editable={false}
              placeholderTextColor='black'
            />
          </View>

          <View style={styles.campoMetade}>
            <Text style={styles.nomeButton}>Bairro:</Text>
            <TextInput
              style={styles.inputMetade}
              placeholder='Bairro'
              value={bairro}
              onChangeText={SetBairro}
              editable={false}
              placeholderTextColor='black'
            />
          </View>
        </View>

        {/* Rua */}
        <Text style={styles.nomeButton}>Rua:</Text>
        <TextInput
          style={styles.inputStylePadrao}
          placeholder='Rua'
          value={rua}
          onChangeText={SetRua}
          editable={false}
          placeholderTextColor='black'
        />

        {/* Botão */}
        <Pressable style={styles.btn} onPress={criarUsuario}>
          <Text style={styles.btnTexto}>Cadastrar-se</Text>
        </Pressable>

      </View>
    </View>
  );
}
