import Toast from 'react-native-toast-message';
import RouteName from '../../../navigation/RouteName';
import {useContactService} from '../../../services/ContactService';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useContactList = ({navigation}: any) => {
  const contactService = useContactService();
  const IsFocused = useIsFocused();

  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContact = async (searchString: string = '') => {
    const contactData = await contactService.getContacts(searchString);
    setContactList(contactData);
    if (contactData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [IsFocused]);

  // const handleContactDelete = async (id: number) => {
  //   // e.stopPropagation();
  //   try {
  //     await contactService.deleteContact(id);
  //     fetchContact(); // Refresh the list to reflect the deletion
  //   } catch (error: any) {
  //     error.response.data.forEach((i: any) => {
  //       const messages = JSON.parse(i.message);
  //       messages.forEach((message: string) =>  Toast.show({ type: 'error',text1: "Couldn't Delete!",text2: messages})

  //     });
  //     return;
  //   }
  // };

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // Adds a cancel button
        },
        {
          text: 'Delete',
          style: 'destructive', // Adds a red delete button for emphasis
          onPress: async () => {
            await handleContactDelete(id);
          },
        },
      ],
      {cancelable: true}, // Allows dismissal of the alert by tapping outside
    );
  };

  const handleContactDelete = async (id: number) => {
    try {
      await contactService.deleteContact(id);
      fetchContact(); // Refresh the contact list
    } catch (error: any) {
      // Loop through error response data
      error?.response?.data?.forEach((i: any) => {
        const messages = JSON.parse(i.message); // Parse error messages

        // messages.forEach((message: string) => {
        Toast.show({
          type: 'error',
          text1: "Couldn't Delete!",
          text2: messages,
        });
        // });
      });
      return;
    }
  };

  const handleEditContact = (id: number) => {
    navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {contactId: id});
  };

  return {
    contactList,
    loading,
    fetchContact,
    handleContactDelete,
    handleEditContact,
    confirmDelete,
  };
};

export {useContactList};

//2

// import Toast from 'react-native-toast-message';
// import RouteName from '../../../navigation/RouteName';
// import {useContactService} from '../../../services/ContactService';
// import {Contact} from '../../Contacts/DTOs/ContactProps';
// import {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';

// const useContactList = ({navigation}: any) => {
//   const contactService = useContactService();
//   const IsFocused = useIsFocused();

//   const [contactList, setContactList] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchContact = async (searchString: string = '') => {
//     try {
//       setLoading(true);
//       const contactData = await contactService.getContacts(searchString);
//       setContactList(contactData);
//       if (contactData) {
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       Toast.show({
//         type: 'error',
//         text1: 'error fetching contact',
//       });
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, [IsFocused]);

//   //   const handleContactSelect = (id: number) => navigate(ContactsUrls.edit(id));

//   const handleContactDelete = async (id: number) => {
//     // e.stopPropagation();
//     try {
//       await contactService.deleteContact(id);
//       fetchContact(); // Refresh the list to reflect the deletion
//     } catch (error: any) {
//       error.response.data.forEach((i: any) => {
//         const messages = JSON.parse(i.message);
//         Toast.show({
//           type: 'error',
//           text1: messages,
//           text2: "Couldn't Delete!",
//         });
//       });
//       return;
//     }
//   };

//   const handleEditContact = (id: number) => {
//     navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {urlName: id});
//   };

//   return {
//     contactList,
//     loading,
//     fetchContact,
//     handleContactDelete,
//     handleEditContact,
//   };
// };

// export {useContactList};
