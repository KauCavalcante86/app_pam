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
        alignItems: 'center',
        justifyContent: 'center',
        width:200,
        height:40,
        borderRadius:10,
        backgroundColor:'#ffffffff',
        color:'#000',
        margin:'20%',
        marginTop: 200,
        shadowColor: "#000",  
        shadowOffset: {width: 0, height: 2},  
        shadowOpacity: 0.25,  
        shadowRadius: 3.84,
    },

    form: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonCadastro: {
      width: 300,
      backgroundColor: 'white',
      fontSize: 25,
      alignItems: 'center',

      borderColor: '#000',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
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
      marginBottom: 200,
      textDecorationLine: 'underline', 
    },

});