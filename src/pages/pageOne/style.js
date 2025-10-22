import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

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

  boasvindas:{ 
    position:'absolute',
    top:'42%',
    textAlign:'left',
    fontWeight:'bold',
    fontSize: width * 0.15,
    marginBottom:'20%',
    lineHeight: 50,
  },

  textSaude:{
    position:'absolute',
    top:'53%',
    textAlign:'left',
    fontSize: width * 0.06,
    marginRight:'20%',
  },

    btn:{
        width:'80%',
        height:'8%',
        borderRadius:30,
        backgroundColor:'#ffffffff',
        margin:'20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },

    btnText:{
        color:'black',
        fontSize: width * 0.05,
        textAlign:'center',
        marginTop:'6%',

    }
});