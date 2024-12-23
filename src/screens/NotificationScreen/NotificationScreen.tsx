import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const NotificationScreen = ({navigation}: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  return (
    <View>
      <View style={styles.Container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon
            name="arrow-left-circle"
            size={25}
            color={Colors.secondaryBgTextColor}
          />
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>Notification</Text>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
});
