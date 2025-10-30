import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
  },


  
  btnEditarMeta:{
      borderRadius:8,
      width:60,
      height:60,
      backgroundColor:'#8bd0ec83',
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
        backgroundColor:'#87bfe2ff',
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


});
