import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUpiEditDeleteButtons } from './useUpiEditDeleteButtons';
import { UpiEditDeleteButtonsProps } from './DTOs';
import { Colors } from '../../../../utils';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import { UpiEditForm } from '../UpiEditForm/UpiEditForm';
export const UpiEditDeleteButtons = <T extends { upiDetails: any[] }>({
  details,
  setDetails,
  selectedItem,
}: UpiEditDeleteButtonsProps<T>) => {
  const bottomSheetRef = useRef<any>(null);
  const { confirmDelete } = useUpiEditDeleteButtons(details, setDetails);

  const handleEdit = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color={Colors.secondaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => confirmDelete(selectedItem.id)}
        style={styles.iconButton}
      >
        <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="UPI Type"
        onClose={() => bottomSheetRef.current.close()}
      >
        {/* Assuming UpiEditForm is already generic */}
        <UpiEditForm
          details={details}
          setDetails={setDetails}
          selectedItem={{
            id: selectedItem.id,
            type: selectedItem.item.upiType,
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
