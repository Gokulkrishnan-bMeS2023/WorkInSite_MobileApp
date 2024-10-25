import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, Colors, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils';
export default StyleSheet.create({
  setimageviewstyle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white_backgound,
  },
  setbgcolorwhitelogo: {
    backgroundColor: Colors.white_text_color,
    height: SW(150),
    width: SW(150),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SH(200),
  },
  splshimg: {
    width: SW(200),
    height: SH(200)
  },
  scrollviewstyles: {
    width: '100%',
    height: 'auto',
  },
  FlexRowPassword: {
    width: '100%',
    borderRadius: SH(7),
    flexDirection: 'row',
    backgroundColor: Colors.white_text_color,
    height: SH(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.black_text_color,
  },
  InputViewWidth: {
    width: '100%',
  },
  IconPostionAboluteTwo: {
    position: 'absolute',
    right: SH(30),
    height: SH(58),
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeLogo: {
    width: SW(150),
    height: SH(150),
    marginLeft: SH(25)
  },
  homeIcon: {
    width: 28,
    height: 28,
    marginLeft: SH(15)
  },
  flexrowsetaddresh: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(5),
  },
  flexrowsethomeheaderright: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(5),
    marginRight: SH(20)
  },

  topBarView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 14,
    backgroundColor: Colors.primary_color,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topbarText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: SF(15),
    justifyContent: 'center',
    paddingTop: 5,
    letterSpacing: 0.75,
    color: Colors.white_text_color,
    marginRight: 20
  },

})