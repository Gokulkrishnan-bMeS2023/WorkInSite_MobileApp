import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../../utils/VectorIcons';
import Styles from '../../styles/OfflineScreenStyle';
const OfflineScreen = () => {
  return (
    <View style={Styles.offlineContainer}>
      <Icon icon="MaterialCommunityIcons" name="wifi-off" size={100} color="#D9534F" style={Styles.OfflineIcon} />
      <Text style={Styles.offlineTitle}>No Internet Connection</Text>
      <Text style={Styles.offlineText}>
        Please check your connection and try again.
      </Text>
    </View>
  );
};
export default OfflineScreen;