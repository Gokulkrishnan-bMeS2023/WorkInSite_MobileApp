import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ContactEditDeleteButtonsProps} from './DTOs';
import {useContactEditDeleteButtons} from './useContactEditDeleteButtons';
import {ContactEditForm} from '../ContactEditForm/ContactEditForm';
import {Colors} from '../../../utils';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Icon from '../../../utils/VectorIcons';

const ContactEditDeleteButtons = (props: ContactEditDeleteButtonsProps) => {
  const {contactList, setContactList, selectedItem} = props;
  const {confirmDelete} = useContactEditDeleteButtons(props);
  const bottomSheetRef = useRef<any>(null);

  const handleEdit = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <View style={styles.IconContainer}>
        <TouchableOpacity onPress={handleEdit}>
          <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(selectedItem.id)}>
          <Icon icon="MaterialCommunityIcons" name="delete" size={24} color={Colors.dangerColor} />
        </TouchableOpacity>
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="Contact Type"
        onClose={() => bottomSheetRef.current.close()}>
        <ContactEditForm
          contactList={contactList}
          setContactList={setContactList}
          selectedItem={{
            id: selectedItem.id,
            type: selectedItem.item.contactType,
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  IconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export {ContactEditDeleteButtons};
