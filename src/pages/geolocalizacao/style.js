import { StyleSheet } from "react-native";

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
       width:365,
        height:60,
        backgroundColor:'#b6c9edff',
        borderRadius:999,
        alignItems:'center',
        zIndex:2,
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
        backgroundColor:'#b6c9edff',
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
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    modalImagem: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 10
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