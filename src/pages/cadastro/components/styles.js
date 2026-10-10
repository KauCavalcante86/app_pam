import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#DCEBFF',
  },

  /*
   * INTRO
   */

  introConteudo: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 26,
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },

  logoTitulo: {
    fontSize: 20,
    color: '#0C88E1',
    fontFamily: 'Poppins_500Medium',
  },

  coraTitulo: {
    fontSize: 18,
    color: '#0C88E1',
    fontFamily: 'Poppins_500Medium',
  },

  logoSubtitulo: {
    fontSize: 16,
    color: '#7A8798',
    fontFamily: 'Poppins_400Regular',
  },

  introMensagens: {
    marginTop: 100,
  },

  /*
   * MENSAGENS
   */

  mensagemCoraArea: {
    alignSelf: 'flex-start',
    width: '94%',
    marginBottom: 25,
  },

  nomeCora: {
    fontSize: 15,
    color: '#0077FF',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 5,
  },

  balaoCora: {
    backgroundColor: '#64baf7',
    borderRadius: 22,
    padding: 17,
  },

  textoCora: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Poppins_400Regular',
  },

  /*
   * BOTÃO INTRO
   */

  btnIrChat: {
    alignItems: 'center',
    paddingBottom: 55,
  },

  textoIrChat: {
    fontSize: 23,
    color: '#888787',
    fontFamily: 'Poppins_500Medium',
  },

  /*
   * CABEÇALHO
   */

 cabecalho: {
  width: '100%',
  paddingTop: 45,
  paddingHorizontal: 20,
  paddingBottom: 15,
  alignItems: 'center',
  flexDirection: 'row',
  alignItems: 'center',
},

containerCabecalho: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#ffff',
  borderRadius: 64,
  paddingHorizontal: 4,
},

  btnVoltar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  setaVoltar: {
    color: '#FFF',
    fontSize: 42,
    lineHeight: 45,
  },


  barraProgresso: {
  flex: 1,
  height: 14,
  backgroundColor: '#E5E5E5',
  borderRadius: 20,
  overflow: 'hidden',
  marginLeft: 15,
  marginRight: 10,
},

barraProgressoPreenchida: {
  height: '100%',
  backgroundColor: '#00A6FF',
  borderRadius: 20,
},

progresso: {
  fontSize: 15,
  color: '#777',
  fontFamily: 'Poppins_400Regular',
  marginTop: 5,
  marginBottom: 10,
  marginLeft: 12,
},

  /*
   * CHAT
   */

  chat: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  conversaItem: {
    width: '100%',
    marginBottom: 10,
  },

  /*
   * RESPOSTA USUÁRIO
   */

  mensagemUsuarioArea: {
    alignSelf: 'flex-end',
    maxWidth: '78%',
    marginBottom: 22,
  },

  balaoUsuario: {
    backgroundColor: '#0077FF',
    borderRadius: 18,
    borderTopRightRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },

  respostaLabel: {
    fontSize: 13,
    color: '#DCEBFF',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
  },

  textoUsuario: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
  },

  /*
   * OPÇÕES
   */

  opcoes: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 18,
    padding: 4,
    overflow: 'hidden',
  },

  opcao: {
    minHeight: 58,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  opcaoSelecionada: {
    backgroundColor: '#4DABF5',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 14,
    borderBottomWidth: 0,
  },

  textoOpcao: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  textoOpcaoSelecionada: {
    color: '#FFF',
    fontFamily: 'Poppins_500Medium',
  },

  /*
   * INPUT
   */

  inputArea: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 18,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },

  unidade: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins_500Medium',
  },

  /*
   * PROGRESSO
   */

  progresso: {
    fontSize: 15,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    marginBottom: 10,
  },

  /*
   * BOTÃO PRÓXIMO
   */

  btnProximo: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  btnDesativado: {
    opacity: 0.45,
  },

  textoProximo: {
    fontSize: 22,
    color: '#888',
    fontFamily: 'Poppins_500Medium',
  },

  setaBaixoChat: {
    fontSize: 48,
    color: '#299CF0',
    lineHeight: 45,
  },
});