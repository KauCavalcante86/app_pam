import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'column',
  },

    btn:{
        width:200,
        height:30,
        borderRadius:30,
        backgroundColor:'#ffffffff',
        color:'#000',
        margin:'20%',
        shadowColor: "#000",  
        shadowOffset: {width: 0, height: 2},  
        shadowOpacity: 0.25,  
        shadowRadius: 3.84,
    },

    form: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 180, // afasta do botão
    },

    buttonCadastro: {
      width: 250,
      backgroundColor: 'white',
      fontSize: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 30,
      padding: 10,
      marginBottom: 20,
    },

    textFaça: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 20,
      position: 'absolute',
      top: 50
    },

    btnFazerCadastro: {
      color: '#000',
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 150, // afasta do form
      textDecorationLine: 'underline', // se quiser manter sublinhado
    },

});