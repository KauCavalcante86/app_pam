import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#6c98f8ff",
    marginBottom: 20,
  },
  bottleContainer: {
    width: 180,
    height: 350,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 20,
  },
  bottle: {
    width: 120,
    height: 300,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#9bc7fcff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#E9ECFF",
  },
  water: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#7cbdffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  waterText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#6170e5ff",
    position: "absolute",
    top: "40%",
  },
  meta: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#606FDD",
    marginBottom: 10,
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

measureContainer: {
  justifyContent: "space-between",
  height: 300,
  marginLeft: 10,
},

measureRow: {
  alignItems: "center",
  justifyContent: "center",
},

measureBar: {
  width: 20,
  height: 4,
  borderRadius: 2,
},

campo:{
    width:'90%',
    borderWidth:2,
    fontSize:50,
},

btnEditarMeta:{
  borderRadius:8,
  width:60,
  height:60,
  backgroundColor:'#50aaceff',
},

});
