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
    backgroundColor:'#7ba8f7ff',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
  },

  btnHeader:{
    width:'20%',
    height:'20%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginLeft:'75%',
    gap:10,
  },

  perfil:{
    width:'40%',
    height:'100%',
    backgroundColor:'#D9D9D9',
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
  },

  campoRetan:{
     width:'45%',
    height:'100%',
    gap:30,
  },

  opBody:{
    width:'100%',
    height:'45%',
    borderRadius:30,
    backgroundColor:'#FFFFFF',
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
},

  nomeCampo:{
    color:'#7ba8f7ff',
    fontSize:20,
    margin:'6%',
    fontFamily: "Poppins_500Medium"
  },



});