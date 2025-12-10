// src/pages/saudeInterativa/style.js
import { StyleSheet } from "react-native";

export const Cores = {
  principal: "#6F94F3",
  acao: "#6F94F3",
  fundo: "#eff1fcff",
  cardFundo: "#FFFFFF",
  textoTitulo: "#465981ff",
  textoSecundario: "#6B7280",
  bordaInput: "#E5E7EB",
  sombra: "rgba(0, 0, 0, 0.08)",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Cores.fundo,
  },

  scrollContent: {
    paddingTop: 80,
    flexGrow: 2,
  },

  fundo3: {
    flex: 1,  
    width: "100%",
    padding: 15,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: "#6c9fff",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 12,
  },

  card: {
    backgroundColor: Cores.cardFundo,
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    marginTop: 20,
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  form: {
    marginBottom: 8,
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  inputHalf: {
    width: "48%",
  },

  input: {
    backgroundColor: "#e5e5e5ff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 15,
    color: Cores.textoTitulo,
    borderWidth: 1,
    borderColor: Cores.bordaInput,
  },

  botao: {
    backgroundColor: Cores.acao,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: Cores.acao,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  botaoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: Cores.cardFundo,
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  mensagemContainer: {
    backgroundColor: Cores.cardFundo,
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: Cores.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  mensagemTexto: {
    color: Cores.textoSecundario,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },

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
  btnVoltar:{
        width: 60,
        height: 60,
        backgroundColor:'#4888ffff',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:999,
        zIndex:2,
    },

    imgVoltar:{
        width: 15,
        height: 26,
        marginRight:5,
    },
});
