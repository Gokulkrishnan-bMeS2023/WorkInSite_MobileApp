import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, SF, SH, widthPercent} from '../../utils';
import CustomAvatar from './CustomAvatar';
import RouteName from '../../navigation/RouteName';
import {AuthHelper} from '../../helpers/AuthHelper';
import {useUserProfile} from './useUserProfile';

interface ProfileScreenProps {
  navigation: {
    navigate: (routeName: string) => void;
  };
}

interface OptionProps {
  iconName: string;
  label: string;
  onPress: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {name} = useUserProfile();

  const handleShare = async () => {
    try {
      const result = await Share.share({message: 'WorkInSite'});
      if (result.action === Share.dismissedAction) return;
    } catch (error: any) {
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await AuthHelper.logout();
              navigation.navigate('Home');
              navigation.navigate(RouteName.LOGIN_SCREEN);
            } catch {
              ToastAndroid.showWithGravity(
                'Logout failed',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderOption = ({iconName, label, onPress}: OptionProps) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <Icon
        name={iconName}
        size={24}
        color={Colors.secondaryColor}
        style={styles.icon}
      />
      <Text style={styles.menuText}>{label}</Text>
      <Icon
        name="arrow-forward"
        size={24}
        color={Colors.grayColor}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <CustomAvatar
            name={name ?? ''}
            backgroundColor={Colors.primaryColor}
            textColor={Colors.secondaryColor}
            borderRadius={true}
          />
          <Text style={styles.profileText}>{name}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.options}>
          {renderOption({
            iconName: 'edit',
            label: 'Edit Personal Details',
            onPress: () => navigation.navigate(RouteName.EDITPROFILE_SCREEN),
          })}
          {renderOption({
            iconName: 'lock',
            label: 'Change PIN',
            onPress: () => navigation.navigate(RouteName.CHANGE_PIN_SCREEN),
          })}
          {renderOption({
            iconName: 'share',
            label: 'Refer A Friend',
            onPress: handleShare,
          })}
          {renderOption({
            iconName: 'logout',
            label: 'Logout',
            onPress: handleLogout,
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
  scrollView: {
    width: '100%',
    height: 'auto',
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
});
