import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375

function normalize(size) {
    return Math.round( size * scale)
}

export default StyleSheet.create ({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F8F9FF'
    },

    textTitulo: {
        marginTop: '13%',
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(35),
        marginLeft: '-17%',
        color: '#007bff'
    },

    calorias: {
        flex: 1,
        alignItems: 'center',

    },

    
    buscarAlimentos: {
        flexDirection: 'column',
        width: '90%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    inputDigitar: {
        flex: 1,
        backgroundColor: '#6c9fffff',
        color: 'white',
        height: '10%',
        width: '90%',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 13,
        marginRight: 10,
        fontSize: 20,
        fontFamily:'Poppins_400Regular'
    },
    
    buttonBuscar: {
        backgroundColor: '#6c9fffff',
        paddingHorizontal: 20,
        width: '50%',
        height: "15%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
    },
    
    buttonBuscarText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    
    infoAlimento: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#4183ff72',
        borderRadius: 20,
        width: '1000',
        height: '220',
    },
    
    titulo: {
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(20),
        marginLeft: 20,
        color: 'white'
    },
    
    tituloMarca: {
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(15),
       marginLeft: 20,
       color: 'white'
    },
    
    tituloCalorias: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),  
        marginLeft: 20,
        color: 'white'
    },

    tituloProteinas: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),
        marginLeft: 20,
        color: 'white'
    },

    tituloCarboidratos: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),
        marginLeft: 20,
        color: 'white'
    },

    tituloGordura: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),
        marginLeft: 20,
        color: 'white'
    }
    
});