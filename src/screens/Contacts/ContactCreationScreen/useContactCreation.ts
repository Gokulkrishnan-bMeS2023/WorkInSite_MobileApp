import {useContactService} from '../../../services/ContactService';
import {useState, useEffect} from 'react';
import {useInputValidate} from '../InputValidate/InputValidate';
import {ContactRequest, ContactTypes} from '../DTOs/ContactProps';
import Toast from 'react-native-toast-message';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useContactCreation = ({navigation, route}: any) => {
  const [name, setName] = useState(route?.params?.name || '');
  const [contactList, setContactList] = useState<ContactRequest>({
    name: '',
    contactDetails: [],
  });
  const [existingNames, setExistingNames] = useState<string[]>([]);

  const {error, validate, setError, initialError} = useInputValidate({name});
  const contactService = useContactService();

  const redirectUrl = route?.params?.redirect;

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchExistingNames = async () => {
      const contacts = await contactService.getContacts(); // Assuming `getContacts` fetches all contacts.
      const names = contacts.map((contact: {name: string}) => contact.name);
      setExistingNames(names);
    };
    fetchExistingNames();
    if (!isFocused) {
      setName('');
    }
  }, [isFocused]);

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
      if (existingNames.includes(name)) {
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
          const response = await contactService.createContact(contact);
          setContactList({
            name: '',
            contactDetails: [],
          });

          // Handle redirect if a redirectUrl exists
          if (redirectUrl) {
            // Construct redirect URL with query params

            // Navigate to the dynamic URL
            navigation.navigate(redirectUrl, {
              contactId: response.id,
              id: route?.params?.id || '',
            });
          } else {
            // Default navigation
            navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
          }
          // navigation.navigate(RouteName.CONTACT_LIST_SCREEN); // Navigate to the contact list screen.
        } catch (err) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to create contact. Please try again.',
          });
        }
      }
    }
  };

  // useEffect(() => {
  //   if (route?.params?.name) {
  //     setName(route?.params?.name);
  //   }
  // }, [route?.params?.name]);

  //new
  useEffect(() => {
    if (route?.params?.name && isFocused) {
      setName(route?.params?.name);
    }
  }, [route?.params?.name && isFocused]);

  const resetForm = () => {
    setName('');
    setContactList({
      name: '',
      contactDetails: [],
    });
    setError(initialError);
  };

  const hasUnsavedChanges =
    name.trim() !== '' || contactList.contactDetails.length > 0;

  const handleNavigation = (redirectUrl: any) => {
    resetForm();
    if (redirectUrl) {
      navigation.navigate(redirectUrl, {id: route?.params?.id || ''});
    } else {
      navigation.navigate(RouteName.CONTACT_LIST_SCREEN);
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
          onPress: () => handleNavigation(redirectUrl),
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
      handleNavigation(redirectUrl);
    }
    return true; // Necessary for BackHandler to know the event is handled
  };

  return {
    name,
    setName,
    error,
    contactList,
    setContactList,
    handleSubmission,
    handleBack,
    hasUnsavedChanges,
    isAddDisabled,
  };
};

export {useContactCreation};
