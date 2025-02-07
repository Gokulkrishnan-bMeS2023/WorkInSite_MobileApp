import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import images from '../../../..';

// Declare styles first
const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 20,
  },
});

const Icons: {[key: string]: JSX.Element} = {
  AADHAAR: (
    <Image
      source={images.aadhar_img}
      style={styles.image}
      resizeMode="contain" // 'contain' will ensure the full image is visible
    />
  ),
  PAN: (
    <Image
      source={images.pan_img}
      style={styles.image}
      resizeMode="contain" // 'contain' will ensure the full image is visible
    />
  ),
  GST: (
    <Image
      source={images.gst_img}
      style={styles.image}
      resizeMode="contain" // 'contain' will ensure the full image is visible
    />
  ),
  DEFAULT: <Feather name="info" size={24} color="#000" />,
};

export {Icons};
