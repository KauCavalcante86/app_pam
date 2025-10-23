import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },

  titulo:{
    fontSize:33,
    marginTop:'4%',
    marginBottom:'2%',
  },
  areaInfo: {
    width:'100%',
    height:'40%',
    borderWidth:1,
    borderColor:'#94949456',
    borderRadius:22,
    padding: 12,
    paddingTop:22,
    alignItems:'center',
    justifyContent:'center',
    gap: 8,
  },

  areaFicha: {
    width:'100%',
    height:'50%',
    borderWidth:1,
    borderColor:'#94949456',
    borderRadius:22,
    padding:12,
    paddingTop:'10%',
    alignItems:'center',
    justifyContent:'center',
    gap:8,
  },

  campo: {
    width:'95%',
    height:'32%',
  },
  campoFicha: {
    width:'95%',
    height:'24%',
  },

  atualizaCampo:{
    width:'100%',
    height:'30%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },

  imgAtualizar:{
    width: '12',
    height: '100%',
  },

  labelInfo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  txt:{
    fontSize:18,
    color:'#727171ff',
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
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  campoAtualizar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  enviar: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  btnClose: {
    backgroundColor: "#7f8c8d",
    paddingVertical: 12,
    borderRadius: 6,
  },
});

export default styles;
