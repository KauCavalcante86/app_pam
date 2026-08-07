import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  return Math.round(size * scale);
}

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: '5%',
  },
  
  imgVoltar:{
    width: 15,
    height: 26,
    marginRight:5,
  },

  cabecalho: {
    width: "100%",
    marginBottom: 6,
  },

  textos: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 42,
  },

  titulo: {
    fontSize: normalize(25),
    textAlign: "left",
    paddingHorizontal: 10,
    color: "white",
  },

  tituloCadastre: {
    fontFamily: "Poppins_400Regular",
    fontSize: normalize(15),
    marginTop: 14,
    color: "black",
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

  iconStyleEmail: {
    width: 18,
    height: 14,
    marginRight: 10,
    marginLeft: 5,
    tintColor: "rgb(71, 71, 71)",
  },

    iconStyleSenha: {
    width: 14,
    height: 18,
    marginRight: 10,
    marginLeft: 5,
    tintColor: "rgb(71, 71, 71)",
  },

  input: {
    flex: 1,
    color: "#494949",
    backgroundColor: "transparent",
    fontFamily: "Poppins_400Regular",
    borderRadius: 8,
    paddingHorizontal: 8,
  },

   btnEsqueciSenha: {
    color: "#003cff70",
    marginTop: 10,
    marginLeft: 16,
    fontSize: normalize(14),
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },

  // BOTÃO ENTRAR
  btn: {
    width: "52%",
    height: 56,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  btnTexto: {
    fontFamily: "Poppins_700Bold",
    fontSize: normalize(18),
    color: "white",
    marginLeft: 18, 
  },

  boxCadContainer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center", 
  },

  boxCad: {
    width: 120,
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#d1d1d144",
    marginHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  iconGoogle: {
    width: 51,
    height: 52,
  },

  iconApple: {
    width: 48,
    height: 58,

  },

   btnFazerCadastro: {
    color: "#035dd37c",
    marginTop: 32,
    fontSize: normalize(14),
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },


});
