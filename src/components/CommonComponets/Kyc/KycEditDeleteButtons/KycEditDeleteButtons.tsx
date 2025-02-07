import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {KycEditForm} from '../KycEditForm/KycEditForm';
import {useKycEditDeleteButtons} from './useKycEditDeleteButtons';
import {Colors} from '../../../../utils';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import {KycEditDeleteButtonsProp} from './DTOs';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

const KycEditDeleteButtons = ({
  details,
  setDetails,
  selectedItem,
}: KycEditDeleteButtonsProp) => {
  // Pass selectedItem along with details and setDetails to the hook
  const {confirmDelete} = useKycEditDeleteButtons({
    details,
    setDetails,
    selectedItem,
  });

  // Bottom sheet reference for opening/closing the edit form
  const bottomSheetRef = useRef<any>(null);

  // Function to open the bottom sheet for editing

  const handleEdit = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      {/* Edit Button */}
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color={Colors.secondaryColor} />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => confirmDelete(selectedItem.id)}
        style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
      </TouchableOpacity>

      {/* Custom Bottom Sheet for editing */}
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="KYC Type"
        onClose={() => bottomSheetRef.current.close()}>
        <KycEditForm
          details={details}
          setDetails={setDetails}
          selectedItem={{
            id: selectedItem.id,
            type: selectedItem.item.kycType,
            value: selectedItem.item.value,
          }}
          Ref={bottomSheetRef}
        />
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
});

export {KycEditDeleteButtons};
