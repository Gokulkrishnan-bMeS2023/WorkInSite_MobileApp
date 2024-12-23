import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OfflineScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={100} color="#d9534f" style={styles.icon} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.description}>
        Please check your connection and try again.
      </Text>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
