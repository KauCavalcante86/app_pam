
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')

export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'colum',
  },
  
  buttonNome: {
    
  },

  buttonCadastro:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    height: '6%',
    marginBottom:20,
    fontSize: width * 0.04,
    fontFamily: "Poppins_400Regular",
    paddingLeft: 20,
    textAlignVertical: 'center',
  },

  textoEndereco: {
    fontSize: 20,
  },

  btn:{
      width:'80%',
      height:'8%',
      borderRadius:30,
      backgroundColor:'#cfcc25ff',
      margin:'20%',
      fontFamily: 'Poppins: '
  },

  textoCadastro :{
    textAlign: 'center',
    fontSize: width * 0.10,
    fontFamily: "Poppins_700Bold"
  },

  descricaoCadastro: {
    fontSize: width * 0.04,
    fontFamily: "Poppins_500Medium",
    marginTop: '-12'
  },

  userPng: {
    width: '30',
    height: '3%'
  }


});