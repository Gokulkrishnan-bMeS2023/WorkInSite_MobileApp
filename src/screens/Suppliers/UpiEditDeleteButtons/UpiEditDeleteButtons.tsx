import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useUpiEditDeleteButtons} from './useUpiEditDeleteButtons';
import {UpiEditForm} from '../UpiEditForm/UpiEditForm';
import {UpiEditDeleteButtonsProp} from './DTOs';
import {Colors} from '../../../utils';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

const UpiEditDeleteButtons = (props: UpiEditDeleteButtonsProp) => {
  const {supplierDetails, setSupplierDetails, selectedItem} = props;
  const {confirmDelete} = useUpiEditDeleteButtons(props);
  const bottomSheetRef = useRef<any>(null);

  const handleEdit = () => {
    bottomSheetRef.current?.open();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleEdit()} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color={Colors.secondaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => confirmDelete(selectedItem.id)}
        style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="UPI Type"
        onClose={() => bottomSheetRef.current.close()}>
        <UpiEditForm
          supplierDetails={supplierDetails}
          setSupplierDetails={setSupplierDetails}
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

export {UpiEditDeleteButtons};
