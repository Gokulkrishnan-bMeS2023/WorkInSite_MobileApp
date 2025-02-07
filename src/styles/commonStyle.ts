import { StyleSheet } from "react-native";
import { Colors } from "../utils";

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:Colors.white,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: Colors.grayColor,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast:{
    position: 'absolute',
    zIndex: 9999,
    top: 1,
    right: 1,
    left: 1,
  },
  inputfieldContainer: {
    padding: 16,
    gap: 10,
  },
  label:{
    fontSize:16,
    color:Colors.black,
    fontWeight:'500'
  },
  spacer:{
    gap:16
  },
  flexContainer:{
    flexGrow:1
  }
});