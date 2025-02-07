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
import {Colors, SF, SH, widthPercent} from '../../utils';
import CustomAvatar from './CustomAvatar';
import RouteName from '../../navigation/RouteName';
import {AuthHelper} from '../../helpers/AuthHelper';
import {useUserProfile} from './useUserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../utils/VectorIcons';
import commonStyle from '../../styles/commonStyle';
import Styles from '../../styles/ProfileScreenStyle';

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
  const {name} = useUserProfile(navigation);

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
              await AsyncStorage.clear();
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
    <TouchableOpacity style={Styles.optionContainer} onPress={onPress}>
      <Icon
        icon="MaterialIcons"
        name={iconName}
        size={24}
        color={Colors.secondaryColor}
        style={Styles.icon}
      />
      <Text style={Styles.menuText}>{label}</Text>
      <Icon
        icon="MaterialIcons"
        name="arrow-forward"
        size={24}
        color={Colors.grayColor}
        style={Styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={commonStyle.container}>
      <View style={Styles.profileHeader}>
        <View style={Styles.profileSection}>
          <CustomAvatar
            name={name ?? ''}
            backgroundColor={Colors.primaryColor}
            textColor={Colors.secondaryColor}
            borderRadius={true}
          />
          <Text style={Styles.profileText}>{name}</Text>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={Styles.options}>
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
