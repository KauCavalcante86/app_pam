import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
// 🚩 IMPORTANTE: Adicionar Image aqui!
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native'; 
import styles from './style';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Importações dos ícones (Caminho mantido como você enviou)
import userIcon from '../../../assets/user.png'
import emailIcon from '../../../assets/email.png'
import padlockIcon from '../../../assets/padlock.png'

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

  function criarUsuario() {
    const dados = {
      nome: nome,
      email: email,
      senha: senha,
      cep: endereco,
      bairro: bairro,
      rua: rua,
      cidade: cidade,
      uf: uf,
    };

    const config = {
      headers: { "Accept": "application/json" }
    }

    axios.post('http://192.168.15.7:8000/api/CriarUser', dados, config)
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

  if (!fontsLoaded) {
    return <View><Text>Carregando...</Text></View>;
  }

return (
        <View style={styles.container}>

            <View style={styles.cabecalho}>
                <View style={styles.buttonVoltarContainer}>
                    <Pressable
                        style={styles.buttonVoltar}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonVoltarIcon}>{'<'}</Text>
                    </Pressable>
                </View>

                <View style={styles.textos}>
                    <Text style={styles.titulo}>Vamos começar</Text>
                    <Text style={styles.tituloCadastre}>Cadastre-se</Text>
                </View>
            </View>

            <View style={styles.infosPrincipais}>


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
                

                <Text style={styles.nomeButton}>Cep:</Text>
                <TextInput 
                    style={styles.inputStylePadrao} 
                    placeholder='CEP' 
                    placeholderTextColor={'black'} 
                    maxLength={8} 
                    onChangeText={automatizacaoCep} 
                    keyboardType="numeric" 
                    value={endereco} 
                />

                <View style={styles.cepCidadeWrapper}>
                    <View style={styles.campoMetade}>
                        <Text style={styles.nomeButton}>Cidade:</Text>
                        <TextInput
                            style={styles.inputMetade}
                            placeholder='Cidade'
                            value={cidade}
                            onChangeText={SetCidade}
                            editable={false}
                            placeholderTextColor={'black'}
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
                            placeholderTextColor={'black'}
                        />
                    </View>
                </View>

                <Text style={styles.nomeButton}>Rua:</Text>
                <TextInput 
                    style={styles.inputStylePadrao} 
                    placeholder='Rua' 
                    value={rua} 
                    onChangeText={SetRua} 
                    editable={false}
                    placeholderTextColor={'black'}
                />

                <Pressable style={styles.btn} onPress={criarUsuario}>
                    <Text style={styles.btnTexto}>Cadastrar-se</Text>
                </Pressable>
            </View>
        </View>
    );
}