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
        marginTop: 50,
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
        height: '50%',
        marginTop: '20%',
        borderColor: 'white',
        borderWidth: 4,        
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
        justifyContent: 'center',
        marginBottom: 200
    },
    
    btnVoltar: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        height: '25%',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: 'white'
    }

});