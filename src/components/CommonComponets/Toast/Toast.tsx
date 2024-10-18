import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from vector icons
import {Colors, Fonts} from '../../../utils';

// Dynamic Toast Component
const ToastNotification = () => {
  const toastConfig = {
    success: ({text1, text2, hide}: any) => (
      <View style={[styles.toastContainer, styles.success]}>
        <View style={styles.toastContent}>
          <View>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
          </View>
          {/* Close button */}
          <TouchableOpacity onPress={hide}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ),
    error: ({text1, text2, hide}: any) => (
      <View style={[styles.toastContainer, styles.error]}>
        <View style={styles.toastContent}>
          <View>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
          </View>
          <TouchableOpacity onPress={hide}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ),
    info: ({text1, text2, hide}: any) => (
      <View style={[styles.toastContainer, styles.info]}>
        <View style={styles.toastContent}>
          <View>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
          </View>
          <TouchableOpacity onPress={hide}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ),
    warning: ({text1, text2, hide}: any) => (
      <View style={[styles.toastContainer, styles.waring]}>
        <View style={styles.toastContent}>
          <View>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
          </View>
          <TouchableOpacity onPress={hide}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    fontFamily: Fonts.Inter_Bold,
  },
  toastContent: {
    flexDirection: 'row', // Layout for text and icon
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toastTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  toastMessage: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  success: {
    backgroundColor: Colors.successColor,
  },
  error: {
    backgroundColor: Colors.dangerColor, // Red for error
  },
  info: {
    backgroundColor: '#000', // Blue for info
  },
  waring: {
    backgroundColor: Colors.warningColor, // Orange for warning
  },
});

export default ToastNotification;
