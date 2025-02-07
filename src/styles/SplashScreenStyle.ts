import { StyleSheet } from "react-native";
import { Colors } from "../utils";

export default StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      splashLogoContainer: {
        width: 150,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      splashLogo: {
        width: '100%',
        height: '100%',
      },
});