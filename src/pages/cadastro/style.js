import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    flex: 1
  },

    container: {
    flex: 1,

    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'column',
  },
  
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
  
  buttonCadastro:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 40,
    marginBottom:10,
    fontSize: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'black'
  },

  btn:{
      alignItems:'center',
      justifyContent:'center',
      width:200,
      height:40,
      borderWidth: 1,
      borderRadius:30,
      backgroundColor:'#ffffffff',
      marginTop: 20,
      borderColor: 'black'
  },

  textoButton: {
    fontSize: 20
  },

  imagem: {
    width: 120,
    height: 120,
    borderRadius: 300,
    borderWidth: 1,
    backgroundColor: '#fefefe',
    borderColor: '#ccc',
    marginBottom: 20,
  },

  camera: {
    alignItems:'center',
    justifyContent:'center',
    width:180,
    height:60,
    marginTop: 30,
    borderColor: 'white'
  },

  btnCam: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    marginBottom: 5,
    borderColor: 'black',
    backgroundColor: 'white',
  },

  textoBtnCam: {
    fontSize: 15,
    color: 'black'
  },

  textoExcluir: {
    fontSize: 20,
    color: 'red'
  },

  infos: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingTop: 10
  },

  infosCep: {
    marginLeft: 10,
    fontSize: 20,
  }

});