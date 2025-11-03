import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  appModal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#687CFF",
    textAlign: "center",
  },
  meta: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  btn: {
    marginTop: 15,
    backgroundColor: "#687CFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
