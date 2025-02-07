import { StyleSheet } from "react-native";
import { Colors, SF, SH, widthPercent } from "../utils";

export default StyleSheet.create({
profileHeader: {
    width: widthPercent(100),
    height: widthPercent(20),
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
  },
  profileSection: {
    alignSelf: 'center',
    elevation: 20,
    width: widthPercent(82),
    height: widthPercent(50),
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: SH(20),
    marginTop: SH(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: Colors.secondaryColor,
    fontSize: SF(16),
    paddingTop: SH(10),
  },
  options: {
    marginTop: SH(160),
    marginBottom: SH(100),
  },
  optionContainer: {
    height: SH(60),
    borderBottomWidth: 0.3,
    borderColor: Colors.grayColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  menuText: {
    color: '#000',
    fontSize: SF(16),
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  arrowIcon: {
    position: 'absolute',
    right: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    resizeMode: 'cover',
  },
  avatarText: {
    fontWeight: 'bold',
  },
});