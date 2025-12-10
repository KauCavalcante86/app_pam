import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
    return Math.round(size * scale);
}

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  // Botão voltar
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

  // Título
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 110,
    marginBottom: 20,
  },

  titulo: {
    fontSize: normalize(26),
    fontWeight: "700",
    color: "black",
  },

  // Container azul principal
  conteudoPrincipal: {
    flex: 1,
    backgroundColor: "#6c9fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    paddingTop: 30,
  },

  // Cards
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  textoAlergia: {
    fontSize: normalize(17),
    fontWeight: "600",
  },

  nivelMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Botão adicionar
  btnAdd: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    elevation: 6,
  },

  txtAdd: {
    color: "#FFF",
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "600",
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: normalize(20),
    fontWeight: "700",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },

  labelNivel: {
    fontSize: normalize(16),
    marginBottom: 6,
  },

  nivelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nivelButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    minWidth: 90,
    alignItems: "center",
  },

  nivelSelected: {
    backgroundColor: "#007AFF",
  },

  nivelText: {
    color: "#007AFF",
    fontSize: normalize(15),
  },

  nivelTextSelected: {
    color: "white",
    fontSize: normalize(15),
    fontWeight: "700",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  modalBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },

  modalBtnText: {
    color: "white",
    fontSize: normalize(16),
    fontWeight: "700",
  },
  imgVoltar:{
        width: 15,
        height: 26,
        marginRight:5,
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


});