import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library
import {Colors} from '../../../utils';

const UserStatus = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTooltip}>
        <Icon
          name="info-circle"
          size={25}
          color={Colors.secondaryColor}
        />
      </TouchableOpacity>
      <Modal
        visible={tooltipVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleTooltip}>
        <TouchableOpacity style={styles.overlay} onPress={toggleTooltip}>
          <View style={styles.tooltipContainer}>
            <View style={styles.statusRow}>
              <Icon name="circle" size={12} color={Colors.successColor} />
              <Text style={styles.label}>Active User</Text>
            </View>
            <View style={styles.statusRow}>
              <Icon name="circle" size={12} color={Colors.dangerColor} />
              <Text style={styles.label}>Inactive User</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UserStatus;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: 200,
    elevation: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.grayColor,
  },
});
