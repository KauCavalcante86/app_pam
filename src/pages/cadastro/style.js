import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'column',
  },
  
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  buttonCadastro:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 40,
    marginBottom:10,
    fontSize: 20,
  },

  btn:{
      alignItems:'center',
      justifyContent:'center',
      width:200,
      height:40,
      borderRadius:30,
      backgroundColor:'#339dffff',
      marginTop: 50
  },

  imagem: {
    width: 120,
    height: 120,
    borderRadius: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },

  camera: {
    alignItems:'center',
    justifyContent:'center',
    width:180,
    height:60,
    marginTop: 30
  },

  btnCam: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    marginBottom: 5
  }


});