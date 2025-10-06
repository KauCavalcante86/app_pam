import { StyleSheet } from "react-native";

export default StyleSheet.create({

    

    container: {
        flex: 1,
    },

    buscar: {
        marginTop: 50,
    },
    
    tituloPg: {
        fontSize: 30,
        textAlign: 'center'
    },

    mapaLocalizacao: {  
        height: '30%',
        marginTop: 200
        
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
    }

});