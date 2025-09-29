import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View,Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as imagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function cadastro() {

  //GALERIA E CAMERA--------------------------------------------------------------      
      const [imagem, setImagem] = useState(null);

      const excluirFoto = () => {
          setImagem(null);
      }
  
      const solicitarPermissoes = async () => {
          const camera = await imagePicker.requestCameraPermissionsAsync();
          const galeria = await imagePicker.requestMediaLibraryPermissionsAsync();
  
          if (camera.status !== 'granted' || galeria.status !== 'granted') {
              Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera e galeria.');
              return false;
          }
          return true;
      };
  
      const tirarFoto = async () => {
          const permissoes = await solicitarPermissoes();
          if (!permissoes) return;
  
          const resultado = await imagePicker.launchCameraAsync({
              mediaTypes: imagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
          });
  
          if (!resultado.canceled) {
              setImagem(resultado.assets[0].uri);
          }
      };
  
      const escolherDaGaleria = async () => {
          const permissoes = await solicitarPermissoes();
          if(!permissoes) return;
  
          const resultado = await imagePicker.launchImageLibraryAsync({
              mediaTypes: imagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
  
          })
  
          if(!resultado.canceled) {
              setImagem(resultado.assets[0].uri);
          }
      };
//---------------------------------------------------------------------------------------------------------

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

    axios.post('http://127.0.0.1:8000/api/CriarUser', dados, config)
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

        <View style={styles.camera}>
            <Pressable style={styles.btnCam} onPress={escolherDaGaleria}>
               
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Image source={{ uri: imagem }} style={styles.imagem} />
              </View>
            </Pressable>
                <TouchableOpacity onPress={excluirFoto}>
                  <Text>Excluir Foto</Text>
                </TouchableOpacity>

        </View>

        <View style={styles.form}>

          <TextInput style={styles.buttonCadastro} placeholder='Nome' onChangeText={(txt) => SetNome(txt)}></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='Email' onChangeText={(txt) => SetEmail(txt)} ></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='Senha' onChangeText={(txt) => SetSenha(txt)} ></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='CEP' maxLength={8} onChangeText={automatizacaoCep} ></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='Cidade' value={cidade} maxLength={8} onChangeText={automatizacaoCep} ></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='Bairro' value={bairro} maxLength={8} onChangeText={automatizacaoCep} ></TextInput>
          <TextInput style={styles.buttonCadastro} placeholder='Rua' value={rua} maxLength={8} onChangeText={automatizacaoCep} ></TextInput>

          <Pressable style={styles.btn} onPress={() => criarUsuario() }>CADASTRAR-SE</Pressable>

        </View>
    </View>
  )};

