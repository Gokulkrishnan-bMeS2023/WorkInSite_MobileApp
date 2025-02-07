// import Toast from 'react-native-toast-message';
// import {useEffect, useState} from 'react';
// import {useInputValidate} from '../InputValidate/InputValidate';
// import {useContactService} from '../../../services/ContactService';
// import {ContactRequest, ContactTypes} from '../DTOs/ContactProps';
// import RouteName from '../../../navigation/RouteName';

// const useContactEdit = (id: string, navigation: any, redirect: string) => {
//   const [name, setName] = useState('');
//   const [contactList, setContactList] = useState<ContactRequest>({
//     name: '',
//     contactDetails: [],
//   });
//   const [existingNames, setExistingNames] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false); // Loading state

//   const {error, validate} = useInputValidate({name});
//   const contactService = useContactService();

//   const fetchContact = async () => {
//     setLoading(true); // Set loading to true before fetching
//     try {
//       const contactData = await contactService.getContact(parseInt(id));
//       setContactList(contactData);
//       setName(contactData.name);
//     } catch (err) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to fetch contact details.',
//       });
//     } finally {
//       setLoading(false); // Set loading to false after fetching
//     }
//   };

//   const fetchExistingNames = async () => {
//     try {
//       const contacts = await contactService.getContacts(); // Assuming `getContacts` fetches all contacts.
//       const names = contacts.map((contact: {name: string}) => contact.name);
//       setExistingNames(names);
//     } catch (err) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to fetch existing contact names.',
//       });
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//     fetchExistingNames();
//   }, [id]);

//   const isAddDisabled = [
//     ContactTypes.PHONE,
//     ContactTypes.EMAIL,
//     ContactTypes.ADDRESS,
//   ].every(type => {
//     const ContactsCount = contactList.contactDetails.filter(
//       item => item.contactType === type,
//     ).length;
//     return ContactsCount >= 5;
//   });

//   const handleSubmission = async () => {
//     if (validate()) {
//       // Check if the name is already in use by another contact (excluding current).
//       if (existingNames.includes(name) && name !== contactList.name) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'A contact with this name already exists.',
//         });
//         return;
//       }

//       if (contactList.contactDetails.length === 0) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Please add at least one contact.',
//         });
//       } else {
//         const contact = {...contactList, name: name};
//         try {
//           await contactService.updateContact(parseInt(id), contact);
//           if (redirect) {
//             navigation.navigate(redirect);
//             return;
//           }
//           navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
//         } catch (err) {
//           Toast.show({
//             type: 'error',
//             text1: 'Error',
//             text2: 'Failed to update contact. Please try again.',
//           });
//         }
//       }
//     }
//   };

//   const handleCancel = () => {
//     if (redirect) {
//       navigation.navigate(redirect);
//       return;
//     }
//     navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
//   };

//   return {
//     name,
//     setName,
//     error,
//     contactList,
//     setContactList,
//     handleCancel,
//     handleSubmission,
//     isAddDisabled,
//     loading, // Expose loading state
//   };
// };

// export {useContactEdit};

//2

import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {useInputValidate} from '../InputValidate/InputValidate';
import {useContactService} from '../../../services/ContactService';
import {ContactRequest, ContactTypes} from '../DTOs/ContactProps';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useContactEdit = (
  contactId: string,
  navigation: any,
  redirect: string,
  id: string,
) => {
  const [name, setName] = useState('');
  const [contactList, setContactList] = useState<ContactRequest>({
    name: '',
    contactDetails: [],
  });
  const [initialcontactList, setinitialContactList] = useState<ContactRequest>({
    name: '',
    contactDetails: [],
  });

  const [existingNames, setExistingNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const {error, validate, setError, initialError} = useInputValidate({name});
  const contactService = useContactService();

  const isFocused = useIsFocused();

  const fetchContact = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const contactData = await contactService.getContact(parseInt(contactId));
      setContactList(contactData);
      setName(contactData.name);
      setinitialContactList(contactData);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch contact details.',
      });
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const fetchExistingNames = async () => {
    try {
      const contacts = await contactService.getContacts(); // Assuming `getContacts` fetches all contacts.
      const names = contacts.map((contact: {name: string}) => contact.name);
      setExistingNames(names);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch existing contact names.',
      });
    }
  };

  useEffect(() => {
    fetchContact();
    fetchExistingNames();
  }, [contactId, isFocused]);

  const isAddDisabled = [
    ContactTypes.PHONE,
    ContactTypes.EMAIL,
    ContactTypes.ADDRESS,
  ].every(type => {
    const ContactsCount = contactList.contactDetails.filter(
      item => item.contactType === type,
    ).length;
    return ContactsCount >= 5;
  });

  const handleSubmission = async () => {
    if (validate()) {
      // Check if the name is already in use by another contact (excluding current).
      if (existingNames.includes(name) && name !== contactList.name) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'A contact with this name already exists.',
        });
        return;
      }

      if (contactList.contactDetails.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please add at least one contact.',
        });
      } else {
        const contact = {...contactList, name: name};
        try {
          await contactService.updateContact(parseInt(contactId), contact);
          if (redirect) {
            navigation.navigate(redirect, {id: id || ''});
            // navigation.navigate(redirect);
            return;
          }
          navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
        } catch (err) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to update contact. Please try again.',
          });
        }
      }
    }
  };

  const hasUnsavedChanges =
    name.trim() !== initialcontactList.name ||
    contactList.contactDetails.length !==
      initialcontactList.contactDetails.length;

  // const handleBack = () => {
  //   if (hasUnsavedChanges) {
  //     Alert.alert(
  //       'Unsaved Changes',
  //       'You have unsaved changes. Do you want to save before exiting?',
  //       [
  //         {
  //           text: 'Save',
  //           onPress: () => {
  //             handleSubmission();
  //           },
  //         },
  //         {
  //           text: 'Exit Without Saving',
  //           onPress: () => {
  //             if (redirect) {
  //               navigation.navigate(redirect, {id: id || ''});
  //               return;
  //             }
  //             navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
  //             // resetForm();
  //           },
  //         },
  //         {
  //           text: 'Cancel',
  //           onPress: () => {},
  //           style: 'cancel',
  //         },
  //       ],
  //       {cancelable: true},
  //     );
  //   } else {
  //     // resetForm();
  //     if (redirect) {
  //       navigation.navigate(redirect, {id: id || ''});
  //       return;
  //     }
  //     navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
  //   }
  //   return true;
  // };

  // Handles navigation logic
  const navigate = () => {
    if (redirect) {
      navigation.navigate(redirect, {id: id || ''});
      setError(initialError);
    } else {
      navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
      setError(initialError);
    }
  };

  // Displays the alert for unsaved changes
  const showUnsavedChangesAlert = () => {
    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Do you want to save before exiting?',
      [
        {
          text: 'Save',
          onPress: handleSubmission,
        },
        {
          text: 'Exit Without Saving',
          onPress: navigate,
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  // Handles the back navigation logic
  const handleBack = () => {
    if (hasUnsavedChanges) {
      showUnsavedChangesAlert();
    } else {
      navigate();
    }
    return true; // Ensures BackHandler processes the event correctly
  };

  return {
    name,
    setName,
    error,
    contactList,
    setContactList,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
    isAddDisabled,
    loading, // Expose loading state
  };
};

export {useContactEdit};
