import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { KYCTypes } from "../../clients/DTOs/ClientProps";
import {KycEditForm} from '../KycEditForm/KycEditForm';
import {KycEditDeleteButtonsProp} from './DTOs';
import {useKycEditDeleteButtons} from './useKycEditDeleteButtons';
import {Colors} from '../../../utils';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

const KycEditDeleteButtons = (props: KycEditDeleteButtonsProp) => {
  const {workerDetails, setWorkerDetails, selectedItem} = props;
  const {confirmDelete} = useKycEditDeleteButtons(props);

  const bottomSheetRef = useRef<any>(null);

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
        style={styles.iconButton}>
        <MaterialIcons name="delete" size={24} color={Colors.dangerColor} />
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="KYC Type"
        onClose={() => bottomSheetRef.current.close()}>
        <KycEditForm
          workerDetails={workerDetails}
          setWorkerDetails={setWorkerDetails}
          // selectedItem={{id, type, value}}
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
