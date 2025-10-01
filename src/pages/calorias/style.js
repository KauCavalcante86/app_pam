import { StyleSheet } from "react-native";

export default StyleSheet.create ({

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        alignItems: 'center'
    },

    tituloPagina: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },

    txtCalorias: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    formCalorias: {
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        marginTop: 150,
        borderRadius: 10,
    },

    buscarAlimentos: {
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "20%",
        marginLeft: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
    },

    inputDigitar: {
        fontSize: 20,
    },

    buttonBuscar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 10,
        width: '80%',
        height: '30%',
        backgroundColor: 'blue',
    },

    buttonBuscarText: {
        color: 'white'
    },

    infoAlimento: {
        width: '90%',
        marginLeft: 10
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    infosTxt: {
        fontSize: 25,
        marginTop: 5
    },

    btnNavigation: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: "50%",
        height: '5%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
    },
});