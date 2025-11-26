import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Estilos Gerais do Componente
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  
  // Área dos Botões Principais (Calendário e Editar Meta)
  areaBtnModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 15,
  },
  btnCalendario: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#F5F5FF', // Fundo levemente azulado
    borderWidth: 1,
    borderColor: '#E0E0FF',
  },
  btnEditarMeta: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0FF',
  },

  // Área de Exibição da Meta do Dia
  areaTitulo: {
    // Aplicando fundo azul claro e espaçamento no container
    alignItems: 'center',
    marginBottom: 20,
    padding: 15, // Espaçamento interno
    borderRadius: 10, // Cantos arredondados
    backgroundColor: '#F0F8FF', // Cor de fundo: Azul muito claro para destaque
    borderWidth: 1,
    borderColor: '#E6E6FA',
  },
  meta: {
    // CORREÇÃO AQUI: Força o Text a ocupar 100% da largura do container pai
    width: '100%', 
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },

  // Estilos do Modal (Fundo e Container)
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  appModal: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModal: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Área dos Botões de Seleção da Semana
  areaSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // ESTILO btnSemana - Adaptado para 1 letra (pequeno e quadrado)
  btnSemana: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Borda levemente arredondada
    backgroundColor: '#EAEAEA', // Cor padrão não selecionada (cinza claro)
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  txtSemana: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#555',
  },

  // Campo de Input
  campoMeta: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },

  // Botões de Ação do Modal
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  // Estilo base para botões (usado no resetar)
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: '#EAEAEA',
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnSalvar: {
    backgroundColor: '#687CFF', // Azul principal da aplicação
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnFechar: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});