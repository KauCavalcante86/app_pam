import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
    return Math.round(size * scale);
}

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    scrollContent: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    buttonVoltarContainer: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 20,
    },

    buttonVoltar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonVoltarIcon: {
        fontSize: 26,
        color: "#333",
        fontWeight: "bold",
    },

    titulo: {
        fontFamily: "Poppins_700Bold",
        fontSize: normalize(26),
        textAlign: "center",
        marginTop: "25%",
        marginBottom: 20,
        color: "black",
    },

    conteudoPrincipal: {
        flex: 1,
        width: "100%",
        backgroundColor: "#6c9fffff",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingTop: 30,
        paddingHorizontal: 15,
        paddingBottom: 40,
    },

    abasContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 3,
    },

    aba: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    abaTexto: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: normalize(12),
        marginLeft: 6,
        color: "black",
    },

    abaTextoAtivo: {
        color: "white",
    },

    secaoTitulo: {
        width: "100%",
        fontFamily: "Poppins_700Bold",
        fontSize: normalize(20),
        color: "white",
        marginBottom: 15,
        marginTop: 10,
    },

    idadeCard: {
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 6,
        borderLeftColor: "#007AFF",
        elevation: 3,
    },

    idadeCardAtivo: {},

    idadeTexto: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: normalize(17),
        color: "black",
    },

    idadeTextoAtivo: {
        color: "white",
    },

    vacinasBox: {
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 16,
        marginTop: 10,
        elevation: 4,
    },

    vacinasHeader: {
        fontFamily: "Poppins_700Bold",
        fontSize: normalize(18),
        marginBottom: 12,
        color: "black",
    },

    vacinaItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    vacinaTexto: {
        fontFamily: "Poppins_400Regular",
        fontSize: normalize(15),
        color: "black",
    },

});
