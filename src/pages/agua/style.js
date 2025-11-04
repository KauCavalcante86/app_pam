import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },

  header: {
    width: '100%',
    marginTop: 50,
    
  },

  areaComponente: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

containerBtn: {
  width: '100%',
  height: 64,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: "row",
  alignItems: "center",
  },

  btnOpcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "25%", 
    height: '100%',
    backgroundColor: "#e5e5e5ff",
    gap: 10,
    borderRadius: 12,

  },
  btn: {
    backgroundColor: "#e5e5e5ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
  },
  btnSelecionado: {
    backgroundColor: "#6F94F3",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#858585ff'
  },
  iconSelecionado: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },

  btnBottom: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginTop: '20%',
  },

});
