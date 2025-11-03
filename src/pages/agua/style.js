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
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

containerBtn: {
    alignItems: "center",
    marginTop: 20,
  },
  btnOpcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "33%", 
    height: 80,
    backgroundColor: "#e5e5e5ff",
    gap: 10,
    borderRadius: 10,

  },
  btn: {
    backgroundColor: "#e5e5e5ff",
    paddingVertical: '10%',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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

});
