import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },

    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'column',
  },

  textSaude:{
    color:'#1899f5',
    position:'absolute',
    top:'75%',
    left:'12%',
    textAlign:'left',
    fontSize: 18,
    marginRight:'34%',
    fontStyle: 'bold',
  },

    btn:{
        width:'80%',
        height:'8%',
        borderRadius:64,
        margin:'20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        alignItems:'flex-start',
        justifyContent:'center',
    },

    btnText:{
        color:'#dbe5f5',
        fontSize:22,
        marginLeft:18,
    }
});