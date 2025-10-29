import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View,Pressable, TextInput } from 'react-native';
import styles from './style';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function cadastro() {

  const [endereco, SetEndereco] = useState('');
  const [rua, SetRua] = useState('');
  const [bairro, SetBairro] = useState('');
  const [cidade, SetCidade] = useState('');
  const [uf, SetUf] = useState('');
  const [nome, SetNome] = useState('');
  const [email, SetEmail] = useState('');
  const [senha, SetSenha] = useState('');

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
};

  function criarUsuario(){
    const dados = {
      nome: nome,
      email:email,
      senha:senha,
      cep: endereco,
      bairro: bairro,
      rua: rua,
      cidade: cidade,
      uf: uf,
    };

    const config = {
      headers: {"Accept": "application/json"}
    }

     axios.post('http://10.67.5.127:8000/api/CriarUser', dados, config)
    .then(response => {
      console.log('Usuário criado com sucesso!');
      alert('Usuário criado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao criar usuário', error.response ? error.response.data : error.message);
      alert('Erro ao criar usuário. Verifique os dados e tente novamente.');
    });
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TextInput style={styles.buttonCadastro} placeholder='Nome' onChangeText={(txt) => SetNome(txt)}></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='Email' onChangeText={(txt) => SetEmail(txt)} ></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='Senha' onChangeText={(txt) => SetSenha(txt)} ></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='CEP' maxLength={8} onChangeText={automatizacaoCep} ></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='Cidade' value={cidade} onChangeText={automatizacaoCep} ></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='Bairro' value={bairro} onChangeText={automatizacaoCep} ></TextInput>
      <TextInput style={styles.buttonCadastro} placeholder='Rua' value={rua} onChangeText={automatizacaoCep} ></TextInput>
  
      <Pressable style={styles.btn} onPress={() => criarUsuario() }></Pressable>

    </View>
  )};

