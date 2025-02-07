import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useBankAccountEditDeleteButtons} from './useBankAccountEditDeleteButtons';
import {BankAccountEditForm} from '../BankAccountEditForm/BankAccountEditForm';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import {Colors} from '../../../../utils';

const BankAccountEditDeleteButtons = <T,>(
  props: BankAccountEditDeleteButtonsProp<T>,
) => {
  const {details, setDetails, selectedItem} = props;
  const {confirmDelete} = useBankAccountEditDeleteButtons(props);
  const bottomSheetRef = useRef<any>(null);

  const handleEdit = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <MaterialIcons name="edit" size={24} color={Colors.secondaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => confirmDelete(selectedItem.id)}
        style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="Bank Account"
        onClose={() => bottomSheetRef.current.close()}>
        <BankAccountEditForm
          details={details}
          setDetails={setDetails}
          selectedItem={{
            id: selectedItem.id,
            ...selectedItem.item,
          }}
          Ref={bottomSheetRef}
        />
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
  },
});

export {BankAccountEditDeleteButtons};
