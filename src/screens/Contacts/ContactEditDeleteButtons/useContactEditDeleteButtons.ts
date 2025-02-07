import { Alert } from 'react-native';
import {ContactEditDeleteButtonsProps} from './DTOs';

const useContactEditDeleteButtons = (props: ContactEditDeleteButtonsProps) => {
  const {contactList, setContactList} = props;

   const confirmDelete = (id: number) => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this Contact detail?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => handleDelete(id),
          },
        ],
        {cancelable: true}, // Allows dismissal by tapping outside
      );
    };

  const handleDelete = (id: number) => {
    const filteredContactDetails = contactList.contactDetails.filter(
      (_, index: any) => index !== id,
    );
    setContactList &&
      setContactList((prev: any) => ({
        ...prev,
        contactDetails: filteredContactDetails,
      }));
  };

  return {confirmDelete};
};

export {useContactEditDeleteButtons};
