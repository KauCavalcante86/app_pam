import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
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
    backgroundColor: "#E0E4FF",
    width: '80%',
    borderRadius: 15,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  plusButton: {
    backgroundColor: "#E0E4FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
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
areaBtnZerar:{
  flexDirection:'row',
  marginTop:16,
  width:'60%',
  gap:12,
},

plusIcon:{
  width:16,
  height:16,
  tintColor:'#4090f3ff',
},

});