import {useState, useEffect} from 'react';
import {useContactService} from '../../../services/ContactService';
import {useClientService} from '../../../services/ClientService';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {Client, ClientRequest} from '../DTOs/ClientProps';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useInputValidate} from '../useClientInputValidate';
import {useContactValidate} from '../ContactValidate/ContactValidate';
enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

const useClientCreation = ({navigation}: any) => {
  const route = useRoute<any>();
  const clientService = useClientService();
  const contactService = useContactService();

  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [contactId, setContactId] = useState('');
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>({
    id: 0,
    name: '',
    contactDetails: [],
  });
  const isFocused = useIsFocused();

  const [clientDetails, setClientDetails] = useState<Client | ClientRequest>({
    name: '',
    contactId: parseInt(contactId),
    note: '',
    kycDetails: [
      {kycType: KYCTypes.AADHAAR, value: ''},
      {kycType: KYCTypes.PAN, value: ''},
      {kycType: KYCTypes.GST, value: ''},
    ],
  });

  const fetchContacts = async (searchString: string = '') => {
    if (searchString) {
      const contacts = await contactService.getContacts(searchString, false);
      if (contactId && contacts) {
        const validContacts = contacts.filter(
          (item: Contact) => item.id !== parseInt(contactId),
        );
        setContactList([contact, ...validContacts.slice(0, 3)]);
        return;
      }
      if (contacts) setContactList(contacts.slice(0, 3));
    }
  };

  useEffect(() => {
    const fetchContactById = async () => {
      if (contactId) {
        try {
          const fetchedContact = await contactService.getContact(
            parseInt(contactId),
          );
          setContact(fetchedContact);
          setContactList([fetchedContact]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };
    fetchContactById();
  }, [contactId, isFocused]);

  const {error, validate, setError, initialError} = useInputValidate({
    name,
    contactId,
  });
  const {primaryContactDetails, hasMoreDetails} = useContactValidate(contact);

  const contactDetails = contactList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const validKycDetails = clientDetails.kycDetails.filter(item => item.value);

  const isAddDisabled = [KYCTypes.AADHAAR, KYCTypes.PAN, KYCTypes.GST].every(
    type =>
      clientDetails.kycDetails.some(
        item => item.kycType === type && item.value,
      ),
  );

  const handleContactChange = (value: string) => setContactId(value);

  const handleContactCreate = (searchString: string) => {
    const redirectUrl = RouteName.CLIENT_CREATION_SCREEN;
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN, {
      name: searchString,
      redirect: redirectUrl,
    });
  };
  const handleContactEdit = () => {
    const redirectUrl = RouteName.CLIENT_CREATION_SCREEN;
    navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {
      redirect: redirectUrl,
      contactId: contactId,
    });
  };

  useEffect(() => {
    if (route.params?.name && isFocused) {
      setName(route.params.name);
    }
    if (route.params?.contactId && isFocused) {
      setContactId(route.params?.contactId);
    }
  }, [route.params?.name && isFocused, route.params?.contactId && isFocused]);

  const resetFormFields = () => {
    setName('');
    setNotes('');
    setContactId('');
    setContact({
      id: 0,
      name: '',
      contactDetails: [],
    });
    setContactList([]);
    setClientDetails({
      name: '',
      contactId: 0,
      note: '',
      kycDetails: [
        {kycType: KYCTypes.AADHAAR, value: ''},
        {kycType: KYCTypes.PAN, value: ''},
        {kycType: KYCTypes.GST, value: ''},
      ],
    });
    setError(initialError);
  };

  const hasUnsavedChanges = () => {
    return (
      name.trim() !== '' || // Check if the name has been modified
      notes.trim() !== '' || // Check if the notes have been modified
      contactId!== '' || // Check if contactId has been set
      isKycDetailsFilled(clientDetails.kycDetails)
      // iskycDetailsFilled(clientDetails.kycDetails) // Check if any KYC details have been entered
    );
  };
  // const iskycDetailsFilled = (kycDetails: any[]) => {
  //   return kycDetails.some(item => item.value.trim().length > 0);
  // };
  const isKycDetailsFilled = (kycDetails: {kycType: string; value: string}[]) =>
    kycDetails.some(item => item.value.trim() !== '');

  const handleBackPress = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          {
            text: 'Cancel',
            onPress: () => {}, // Stay on the current screen
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: () => handleSubmission(),
          },
          {
            text: 'Exit Without Save',
            onPress: () => {
              resetFormFields();
              navigation.navigate(RouteName.CLIENT_LIST_SCREEN);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      resetFormFields();
      navigation.navigate(RouteName.CLIENT_LIST_SCREEN);
    }
    return true;
  };


  const handleSubmission = async () => {
    if (validate()) {
      const client = {
        name,
        note: notes,
        contactId: parseInt(contactId),
        kycDetails: validKycDetails,
      };
      const response = await clientService.createClient(client);
      resetFormFields();
      if (route.params?.redirect) {
        navigation.navigate(route.params.redirect, {clientId: response.id});
        return;
      }
      navigation.navigate(RouteName.CLIENT_LIST_SCREEN, {
        clientId: response.id,
      });
      resetFormFields();
    }
  };

  return {
    name,
    setName,
    notes,
    setNotes,
    clientDetails,
    setClientDetails,
    error,
    handleSubmission,
    isAddDisabled,
    contactDetails,
    contactId,
    setContactId,
    setContact,
    setContactList,
    handleContactCreate,
    handleContactChange,
    fetchContacts,
    contact,
    primaryContactDetails,
    hasMoreDetails,
    handleContactEdit,
    handleBackPress,
    hasUnsavedChanges,
  };
};

export {useClientCreation};
