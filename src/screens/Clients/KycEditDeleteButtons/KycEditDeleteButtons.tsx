import React, {useRef, useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useKycEditDeleteButtons} from './useKycEditDeleteButtons';
import {KycEditForm} from '../KycEditForm/KycEditForm';
import {ClientEditDeleteButtonsProps} from './DTOs';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import {KYCTypes} from '../DTOs/ClientProps';
import {Colors} from '../../../utils';

const KycEditDeleteButtons = (props: ClientEditDeleteButtonsProps) => {
  const {clientDetails, setClientDetails, selectedItem} = props;
  const {handleDelete} = useKycEditDeleteButtons(props);

  const [editingItem, setEditingItem] = useState<{
    id: number;
    type: KYCTypes;
    value: string;
  } | null>(null);

  const rbSheetRef = useRef<any>(null);

  // Open RBSheet with editing content
  const handleEdit = (id: number, type: KYCTypes, value: string) => {
    setEditingItem({id, type, value});
    rbSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      {/* Edit Button */}
      <View style={styles.iconspace}>
        <TouchableOpacity
          onPress={() =>
            handleEdit(
              selectedItem.id,
              selectedItem.item.kycType,
              selectedItem.item.value,
            )
          }>
          <MaterialIcons name="edit" size={24} color={Colors.secondaryColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(selectedItem.id)}>
          <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        ref={rbSheetRef}
        title="KYC Type"
        onClose={() => rbSheetRef.current.close()}>
        {editingItem && (
          <KycEditForm
            clientDetails={clientDetails}
            setClientDetails={setClientDetails}
            selectedItem={editingItem}
            Ref={rbSheetRef}
          />
        )}
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconspace: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export {KycEditDeleteButtons};
