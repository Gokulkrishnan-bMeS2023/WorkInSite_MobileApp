import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../utils';

interface HeaderProps {
  leftNode?: ReactNode; // Left-side element
  centerNode?: ReactNode; // Center element (usually the title)
  rightNode?: ReactNode; // Right-side element
}

const CustomHeader: React.FC<HeaderProps> = ({
  leftNode,
  centerNode,
  rightNode,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sideContainer}>{leftNode}</View>
      <View style={styles.centerContainer}>{centerNode}</View>
      <View style={styles.sideContainer}>{rightNode}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sideContainer: {
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default CustomHeader;
