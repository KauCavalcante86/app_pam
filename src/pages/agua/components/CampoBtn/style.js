import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#79c3eaff",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#E0E4FF",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  resetText: {
    color: "#4090f3ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  bottleSection: {
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "center",
  marginVertical: 30,
},

});
