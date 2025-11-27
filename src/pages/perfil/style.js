import { StyleSheet } from "react-native";

export const responsiveStyles = (width, height) => StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  app: {
    flex: 1,
    padding: 20,
  },
  areaFoto: {
    alignItems: "center",
    marginBottom: 2,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },

  titulo:{
    fontSize:33,
    color:'#7ba3daff',
    marginTop:'4%',
    marginBottom:'2%',
    fontFamily: "Poppins_500Medium"
  },
  areaInfo: {
    width:'100%',
    borderWidth:1,
    borderColor:'#94949456',
    borderRadius:22,
    padding: 16,
    alignItems:'center',
    justifyContent:'center',
        backgroundColor:'#fff',
    gap: 18,
  },

  areaFicha: {
    width:'100%',
    borderWidth:1,
    borderColor:'#94949456',
    borderRadius:22,
    padding:18,
    alignItems:'center',
    justifyContent:'center',
    gap:18,
    backgroundColor:'#fff',
  },

  btnAtualizar:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  campo: {
    width:'95%',
  },

  campoFicha: {
    width:'95%',
  },

  atualizaCampo:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },

  imgAtualizar:{
    width: width * 0.03,
    height: height * 0.025,
  },

  labelInfo: {
    fontSize: 16,
    marginBottom: 2,
    color: "#333",
    fontFamily: "Poppins_700Bold"
  },
  txt:{
    fontSize:18,
    color:'#727171ff',
    fontFamily: "Poppins_400Regular"
  },
  senha: {
    marginTop: 10,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  conteudoModal: {
    width: width * 0.80,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    gap:18,
  },
  campoAtualizar: {
    fontSize:16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,

  },
  tituloModal:{
    color:'#000000ff',
    fontSize: 24,
    fontFamily: "Poppins_400Regular"
  },
  campoBtnModal:{
    width:'100%',
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
  },
  enviar: {
    backgroundColor: "#7ba3daff",
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
    padding: width * 0.035,
    borderRadius:16,
  },
  btnClose: {
    backgroundColor: "#8d919195",
    width:'40%',
    padding: width * 0.035,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:12,
  },
  txtBtn:{
    color:'#fff',
    fontSize:16,
    fontFamily: "Poppins_400Regular"
  },
});
