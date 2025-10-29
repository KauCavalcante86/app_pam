import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375

function normalize(size) {
    return Math.round( size * scale)
}

export default StyleSheet.create ({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fefefe'
    },

    textTitulo: {
        marginTop: '13%',
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(35),
        marginLeft: '-20%'
    },


    calorias: {
        flex: 1,
        alignItems: 'center',

    },

    tituloCalorias: {
        borderWidth: 1.3,
        width: '550%',
        height: '4%',
      
    },

    
});