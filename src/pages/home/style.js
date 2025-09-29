import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#292929ff',
    alignItems: 'center',
    flexDirection:'column',
  },

  header:{
    width:'100%',
    height:'18%',
    justifyContent:'flex-end',
    backgroundColor:'#6F94F3',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
  },

  perfil:{
    width:'9%',
    height:'22%',
    backgroundColor:'#D9D9D9',
    borderRadius:'100%',
    marginLeft:'80%',
  },

  logout:{
        width:'9%',
    height:'22%',
    backgroundColor:'#ff0000ff',
    borderRadius:'100%',
    marginLeft:'60%',
  },

  nomeUser:{
    color:'#ffff',
    fontSize:50,
    margin:'5%',
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
    backgroundColor:'#D9D9D9',
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
    backgroundColor:'#D9D9D9',
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
    backgroundColor:'#D9D9D9',

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
    backgroundColor:'#D9D9D9',
},


});