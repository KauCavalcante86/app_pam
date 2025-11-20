
import { StyleSheet , Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const scale = width / 375

function normalize(size) {
    return Math.round( size * scale)
}

export default StyleSheet.create({

    container: {
    backgroundColor: '#F8F9FF',
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'column',
  },

  tituloPag: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },

  cabecalho: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    mmarginTop: 30
  },
  
  titulo: {
    fontFamily: 'Poppins_700Bold',
    fontSize: normalize(30),
    textAlign: 'center',
  },
  
  tituloCadastre: {
    fontFamily: 'Poppins_400Regular',
    fontSize: normalize(12),
    marginTop: -20
  },
  
  buttonVoltarContainer: {
    position: 'absolute', 
    top: -0,
    left: 20, 
  },

  buttonVoltar: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  buttonVoltarIcon: {
    fontSize: 24, // Tamanho do ícone '<'
    color: '#333', // Cor do ícone
    fontWeight: 'bold', // Deixa o ícone mais visível
  },

  
  buttonCadastro:{
    borderColor: 'black',
    borderBottomWidth: 2,
    width: '90%',
    marginBottom:20,
    fontSize: 25,
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
  },

  infosPrincipais: {
    width: '100%',
    alignItems: 'center',
  },

  nomeButton: {
    fontFamily: 'Poppins_400Regular',
    fontSize: normalize(15),
    color: '#333',
    width: '50%',
    marginLeft: '-35%',

  },

  buttonCadastroPrincipal: {
    width: '90%',
    backgroundColor: '#6c9fffff',
    borderWidth: 1, 
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },

});