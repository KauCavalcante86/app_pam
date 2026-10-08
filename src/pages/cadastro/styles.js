import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  cabecalho: {
    width: '100%',
    paddingTop: 64,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },

  buttonVoltarContainer: {
    width: "100%",
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  textos: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 26,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'left',
  },

  tituloCadastre: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },

  infosPrincipais: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
  },

  nomeButton: {
    fontSize: 17,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginBottom: 8,
    marginTop: 12,
  },

  inputIconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 26,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 64,
  },

  iconStyle: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: "rgb(71, 71, 71)",
  },

  iconStyleEmail: {
    width: 18,
    height: 14,
    marginRight: 10,
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: "rgb(71, 71, 71)",
  },

  iconStyleSenha: {
    width: 14,
    height: 18,
    marginRight: 10,
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: "rgb(71, 71, 71)",
  },


  inputComIcon: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },

  eyeButton: {
    padding: 5,
  },

  eyeText: {
    fontSize: 20,
  },

  btnVoltar: {
    width: 54,
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4DAFFF',
  },

  btn: {
    width: '50%',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },

    imgVoltar: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },

  btnTexto: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
  },
});