import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375

function normalize(size) {
    return Math.round( size * scale)
}

export default StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },      

    container: {
        flex: 1,
    },

    buscar: {
        width:'100%',
        height:'10%',
        marginTop:'8%',
        padding:12,
        gap:12,
        flexDirection:'row',
        position:'absolute',
        zIndex:1,
    },

    barra:{
       width:'80%',
        height:60,
        backgroundColor:'#4888ffff',
        borderRadius:999,
        alignItems:'center',
        zIndex:2,
        justifyContent: 'flex-end'
    },

    pesquisa:{
        width:'90%',
        height:'95%',
        fontSize:20,
        color:'#ffffffff',
        fontFamily: "Poppins_400Regular"
    },

    btnVoltar:{
        width: 60,
        height: 60,
        backgroundColor:'#4888ffff',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:999,
        zIndex:2,
    },

    imgVoltar:{
        width: 15,
        height: 26,
        marginRight:5,
    },  

    tituloPg: {
        fontSize: 40,
        textAlign: 'center'
    },

    descriptionPg: {
        fontSize: 15,
        textAlign: 'center'
    },

    mapaLocalizacao: {  
        flex:1,
        zIndex:0,     
    },

    map: {
        flex: 1,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'

    },

    conteudoModal: {
        height: '50%',
        backgroundColor: '#4888ffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },

    modalTitle: {
        color: 'white',
        fontSize: normalize(25),
        fontFamily: 'Poppins_700Bold'
    },

    modalText: {
        color: 'white',
        fontSize: normalize(15),
        fontFamily: 'Poppins_400Regular',
        lineHeight: normalize(15)
    }, 

    modalImagem: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10
    },

    fecharText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(25),
        backgroundColor: '#93b9ffff',
        width: 300,
        textAlign: 'center',
        borderRadius: 10
    },

    voltar: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    carregando:{
        position:'absolute',
        top:'50%',
        left:'30%',
        fontSize:20,
        fontFamily: "Poppins_400Regular"
    },
    

});