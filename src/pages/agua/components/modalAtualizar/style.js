import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
  },

  areaBtnModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 10,
    paddingHorizontal: 20,
  },

  areaTitulo:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
  },

  btnEditarMeta:{
      borderRadius:999,
      width:60,
      height:60,
      backgroundColor:'#92d2ec83',
      justifyContent:'center',
        alignItems:'center',
    },
  btnCalendario:{
      borderRadius:30,
      width:100,
      height:60,
      backgroundColor:'#92d2ec83',
      flexDirection:'row',
      justifyContent:'space-evenly',
        alignItems:'center',
    },

    containerModal:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#03030312',
    },

    appModal:{
        width:'90%',
        height: '30%',
        backgroundColor:'#FFFFFF',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        gap:20,
    },

    areaSemana:{
        width:'80%',
        flexDirection:'row',
        justifyContent:'center',
        gap:10,
    },
    btnSemana:{
        
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:'#98d1f5ff',
        paddingVertical:8,  
        paddingHorizontal:12,  
    },
    txtSemana:{
        color:'#fff',
        fontSize:18,
    },


    areaInpunt:{
        width:'80%',
        height:'18%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
    },

    btnInput:{
        width:'16%',
        height:'80%',
        backgroundColor:'#87bfe2ff',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    txtbtn:{
        color:'#fff',
        fontSize:26,
    },
    
    campoMeta:{
        width:'40%',
        borderWidth:1,
        borderColor:'#cccccc',
        fontSize:26,
        borderRadius:10,
    },

    botoes:{
        flexDirection:'row',
        gap:20,
        marginTop:20,
    },

    btn:{
        backgroundColor:'#79c3eaff',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:8,
    },

     meta: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#606FDD",
    marginBottom: 10,
  },

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  appModal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  titleModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "Poppins_700Bold",
  },
  itemDiaSemana: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  txtDiaSemana: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  txtMetaAtual: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#555",
  },
  seta: {
    fontSize: 18,
    color: "#888",
  },
  campoMeta: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 15,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#687CFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
  },


   listaDias: {
    marginVertical: 10,
    maxHeight: 250, // opcional, para limitar altura e permitir scroll
  },
  btnListaDia: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  txtListaDia: {
    fontSize: 16,
  },

});
