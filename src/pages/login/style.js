import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  return Math.round(size * scale);
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // BOTÃO VOLTAR
  buttonVoltarContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  buttonVoltar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonVoltarIcon: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },

  cabecalho: {
    width: "100%",
  },

  textos: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 30,
  },

  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: normalize(25),
    textAlign: "center",
    paddingHorizontal: 10,
    color: "black",
  },

  tituloCadastre: {
    fontFamily: "Poppins_400Regular",
    fontSize: normalize(15),
    marginTop: -14,
    color: "black",
  },

  // ÁREA AZUL
  infosPrincipais: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#6c9fffff",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    paddingTop: 40,
    
  },

  nomeButton: {
    fontFamily: "Poppins_400Regular",
    fontSize: normalize(15),
    color: "white",
    width: "90%",
    textAlign: "left",
    marginBottom: 5,
    marginTop: "30%",
  },

  nomeButtonS: {
    fontFamily: "Poppins_400Regular",
    fontSize: normalize(15),
    color: "white",
    width: "90%",
    textAlign: "left",
    marginBottom: 5,

  },

  // INPUT COM ÍCONE
  inputIconContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#6c9fffff",
  },

  inputComIcon: {
    flex: 1,
    height: 44,
    color: "black",
    paddingVertical: 10,
    backgroundColor: "transparent",
    fontFamily: "Poppins_400Regular",
  },

  // BOTÃO ENTRAR
  btn: {
    width: "80%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  btnTexto: {
    fontFamily: "Poppins_700Bold",
    fontSize: normalize(20),
    color: "black",
  },

  // LINK CADASTRO
  btnFazerCadastro: {
    color: "white",
    marginTop: 20,
    fontSize: normalize(14),
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
});
