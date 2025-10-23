import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    flexDirection:'column',
  },

  header:{
    width:'100%',
    height:'18%',
    justifyContent:'flex-end',
    backgroundColor:'#90b5f6ff',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
  },

  btnHeader:{
    width:'20%',
    height:'20%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginLeft:'80%',
    gap:10,
  },

  perfil:{
    width:'40%',
    height:'100%',
    backgroundColor:'#ffff',
    borderRadius:'100%',
  },

  logout:{
    width:'40%',
    height:'100%',
    backgroundColor:'#ff0000ff',
    borderRadius:'100%',
  },

  nomeUser:{
    color:'#ffff',
    fontSize:40,
    margin:'5%',
    fontFamily: "Poppins_500Medium"
  },

  app:{
    width:'100%',
    height:'80%',
    alignItems:'center',
    marginTop:'6%',
    gap:30,
  },

  box1:{
    width:'90%',
    height:'18%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    justifyContent:'space-between',
  },

  locali:{
    height: 84,
    width:84,
    marginLeft:'65%',
    marginBottom:'4%',
  },


  box2:{
    width:'90%',
    height:'35%',
    alignContent:'space-evenly',
    justifyContent:'space-between',
    flexDirection:'row',
  },

  btnRetan:{
    width:'45%',
    height:'100%',
    borderRadius:30,
    backgroundColor:'#FFFFFF',
    justifyContent:'space-between',
  },

  agua:{
    height: 95,
    width: 85,
    marginLeft:'45%',
    marginBottom:'12%',
  },

  campoRetan:{
    width:'45%',
    height:'100%',
    gap:30,
  },

  opBody1:{
    width:'100%',
    height:'45%',
    borderRadius:30,
    backgroundColor:'#FFFFFF',
    justifyContent:'space-between',
  },
  
  sangue:{
    height: 58,
    width: 39.8,
    marginLeft:'64%',
    marginBottom:'8%',
  },

  opBody2:{
    width:'100%',
    height:'45%',
    borderRadius:30,
    backgroundColor:'#FFFFFF',
    justifyContent:'space-between',
  },


  alimentacao:{
    height: 68,
    width: 58,
    marginLeft:'60%',
    marginBottom:'8%',
  },

  box3:{
    width:'90%',
    height:'30%',
    gap:30,
  },

  op1:{
    width:'100%',
    height:'50%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
},
  op:{
    width:'30%',
    height:'100%',
    borderRadius:30,
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent:'center',
},

imc:{
  marginTop:'8%',
},

  nomeCampo:{
    color:'#7ba8f7ff',
    fontSize:24,
    marginLeft:16,
    marginTop:16,
    fontFamily: "Poppins_400Regular"
  },

  nomeQuadrado:{
    color:'#7ba8f7ff',
    fontSize:24,
    fontFamily: "Poppins_400Regular"
  },



});