import { StyleSheet } from "react-native";

export const Cores = {
    primaria: '#D32F2F', 
    secundaria: '#FFCDD2', 
    fundo: '#FAFAFA', 
    cardFundo: '#FFFFFF', 
    borda: '#EEEEEE',
    textoPrimario: '#212121',
    textoSecundario: '#757575',
};

export const styles = StyleSheet.create ({

    safeArea: {
        flex: 1,
        backgroundColor: Cores.fundo,
        justifyContent:'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20, 
        justifyContent: 'center', 
        paddingVertical:120,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Cores.fundo,
    },

    header: {
        marginBottom: 20, // Ajustado
        alignItems: 'center',
    },

    tituloContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "700",
        color: Cores.textoPrimario,
    },

    tipoContainer: {
        backgroundColor: Cores.cardFundo,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: Cores.primaria,
        elevation: 6,
        shadowColor: Cores.primaria,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 20, 
    },

    tipo: {
        fontSize: 70,
        fontWeight: "900",
        color: Cores.primaria,
    },
    
    // ESTILOS: Botão de Mudar Tipo
    btnMudarTipo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Cores.primaria,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20, // Espaço após o botão
    },
    btnMudarTipoText: {
        color: Cores.cardFundo,
        fontWeight: 'bold',
        fontSize: 16,
    },

    // ⭐️ ESTILOS: Área de Seleção de Tipos Sanguíneos
    selectionArea: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Cores.secundaria + '50', // Cor de fundo leve
        borderRadius: 10,
    },
    selectionRow: {
        justifyContent: 'space-around',
        width: '90%', // Controla a largura total da linha
        marginBottom: 10,
    },
    selectionCard: {
        width: 70, 
        height: 40,
        backgroundColor: Cores.cardFundo,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Cores.borda,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    selectionCardSelected: {
        backgroundColor: Cores.primaria,
        borderColor: Cores.primaria,
        borderWidth: 2,
    },
    selectionCardText: {
        fontSize: 18,
        fontWeight: '700',
        color: Cores.primaria,
    },
    selectionCardTextSelected: {
        color: Cores.cardFundo,
    },
    // FIM DOS ESTILOS DE SELEÇÃO

    separator: {
        height: 1,
        backgroundColor: Cores.borda,
        marginVertical: 10,
    },

    subtituloWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },

    subtitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: Cores.textoPrimario,
    },

    listContent: {
        paddingBottom: 20,
        flexGrow: 1,
    },

    card: {
        backgroundColor: Cores.cardFundo,
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: Cores.primaria,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },

    cardTxt: {
        fontSize: 22,
        fontWeight: "600",
        color: Cores.textoPrimario,
    },

    buttonVoltarContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    buttonVoltar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonVoltarIcon: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});