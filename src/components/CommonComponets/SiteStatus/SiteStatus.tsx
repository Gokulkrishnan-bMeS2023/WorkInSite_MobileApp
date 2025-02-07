import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Icon from '../../../utils/VectorIcons';
import { Colors } from '../../../utils';


const SiteStatus = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTooltip}>
        <Icon 
          icon="MaterialCommunityIcons"
          name="information"
          size={30}
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
              <Icon icon="MaterialCommunityIcons" name="checkbox-blank-circle" size={12} color={Colors.warningColor} />
              <Text style={styles.label}>Yet To Start</Text>
            </View>
            <View style={styles.statusRow}>
              <Icon icon="MaterialCommunityIcons" name="checkbox-blank-circle" size={12} color={Colors.successColor} />
              <Text style={styles.label}>Working</Text>
            </View>
            <View style={styles.statusRow}>
              <Icon icon="MaterialCommunityIcons" name="checkbox-blank-circle" size={12} color={Colors.dangerColor} />
              <Text style={styles.label}>Halt</Text>
            </View>
            <View style={styles.statusRow}>
              <Icon icon="MaterialCommunityIcons" name="checkbox-blank-circle" size={12} color={Colors.activeColor} />
              <Text style={styles.label}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SiteStatus;

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
