import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#ffffffff',

  },

  header: {
    width:'100%',
    height:'8%',
    padding:10,
    backgroundColor:'#6F94F3',
    justifyContent:'center',
  },

  app:{
    width:'100%',
    height:'92%',
    alignItems:'center',
    gap:20,
  },

  areaFoto:{
    width:'35%',
    height:'18%',
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center',
          borderRadius:999,

  },

    foto:{
      width:'100%',
      height:'100%',
      backgroundColor:'#ff0000ff',
      borderRadius:999,
    },

  areaInfo:{
    width:'90%',
    backgroundColor:'#ffffff',
    padding:10,
    boxShadow:'0px 0px 4px #00000029',
    borderRadius:12,
  },
    campo:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#00000029',
        padding:5,
        paddingTop:8,
        paddingBottom:8,
    },
    senha:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
        paddingTop:8,
        paddingBottom:8,
    },

    labelInfo:{
        color:'#0000009a',
    },

    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
});