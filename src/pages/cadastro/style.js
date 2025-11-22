import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
    return Math.round(size * scale);
}

export default StyleSheet.create({

    // --------------------------------------------------------
    // GERAL / LAYOUT
    // --------------------------------------------------------

    container: {
        flex: 1,
        // Mantido 'white' para o fundo principal (parte superior)
        backgroundColor: 'white', 
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },

    // --------------------------------------------------------
    // BOTÃO VOLTAR
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // CABEÇALHO (TEXTOS)
    // --------------------------------------------------------

    cabecalho: {
        // Usamos este contêiner para envolver os textos e garantir a largura total
        width: '100%',
    },

    textos: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100, // Ajustado para dar espaço ao botão
        marginBottom: 30,
    },

    titulo: {
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(25),
        textAlign: 'center',
        paddingHorizontal: 10,
        color: 'black'
    },

    tituloCadastre: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),
        marginTop: -14,
        color: 'black'
    },

    // --------------------------------------------------------
    // FORMULÁRIO PRINCIPAL (PARTE AZUL)
    // --------------------------------------------------------

    infosPrincipais: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // Cor de fundo do formulário (Azul Claro)
        backgroundColor: '#6c9fffff', 
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingTop: 40,
    },

    nomeButton: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalize(15),
        // Cor do Label (combina com o fundo azul)
        color: 'white', 
        width: '90%',
        textAlign: 'left',
        marginBottom: 5,
        marginTop: 10,
    },

    // 🚩 ESTILO PADRÃO PARA INPUTS DE LARGURA TOTAL (CEP, RUA)
    inputStylePadrao: {
        width: '90%',
        backgroundColor: 'white', // Fundo Branco
        color: 'black', // Texto Preto
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular'
    },
    
    // --------------------------------------------------------
    // ESTILOS PARA INPUTS COM ÍCONE (Nome, Email, Senha)
    // --------------------------------------------------------

    // 1. Contêiner que envolve Ícone e Input
    inputIconContainer: {
        width: '90%',
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'white', // Fundo Branco
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10, 
        // Adicionando borda caso seja necessário (opcional)
        // borderWidth: 1, 
        // borderColor: '#ddd', 
    },

    // 2. Estilo do Ícone
    iconStyle: {
        width: 20, 
        height: 20,
        marginRight: 10, 
        // Cor do ícone (ajustada para ser visível no fundo branco)
        tintColor: '#6c9fffff', 
    },

    // 3. Estilo do TextInput dentro do Contêiner
    inputComIcon: {
        flex: 1, 
        height: 44, 
        color: 'black',
        paddingVertical: 10,
        paddingHorizontal: 0, 
        backgroundColor: 'transparent',
        fontFamily: 'Poppins_400Regular'
    },

    // --------------------------------------------------------
    // CAMPOS LADO A LADO (CIDADE / BAIRRO)
    // --------------------------------------------------------

    cepCidadeWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
    },

    campoMetade: {
        width: '48%',
        flexDirection: 'column',
    },

    // Estilo para inputs de largura metade (Cidade, Bairro)
    inputMetade: {
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        borderRadius: 8,
        fontFamily: 'Poppins_400Regular'
    },

    // --------------------------------------------------------
    // BOTÃO CADASTRAR
    // --------------------------------------------------------

    btn: {
        width: '80%',
        height: 50,
        borderRadius: 30,
        // Cor do botão (Branco puro)
        backgroundColor: '#ffffffff', 
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTexto: {
        fontFamily: 'Poppins_700Bold',
        fontSize: normalize(20),
        color: 'black', // Texto Preto para o botão Branco
    }

});