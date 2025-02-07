import {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useClientService} from '../../../services/ClientService';
import {useContactService} from '../../../services/ContactService';
import {useSiteService} from '../../../services/SiteService';
import {Client} from '../../Clients/DTOs/ClientProps';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {useSiteInputValidate} from '../SiteInputValidate';
import {Alert} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useContactValidate} from '../../Clients/ContactValidate/ContactValidate';
import RouteName from '../../../navigation/RouteName';

const useSiteCreation = ({navigation}: any) => {
  const route = useRoute<any>();
  const clientService = useClientService();
  const contactService = useContactService();
  const siteService = useSiteService();

  const [name, setName] = useState('');
  const [clientId, setClientId] = useState<string>('');
  const [googleLocation, setGoogleLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [contactId, setContactId] = useState('');
  const [supervisorIds, setSupervisorIds] = useState<number[]>([]);

  const [clientList, setClientList] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>();
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>({
    id: 0,
    name: '',
    contactDetails: [],
  });
  const isFocused = useIsFocused();

  const fetchClients = async (searchString: string = '') => {
    if (searchString) {
      const clients = await clientService.getClients(searchString, false);
      if (clientId && clients) {
        const validClients = clients.filter(
          (item: Client) => item.id !== parseInt(clientId),
        );
        setClientList([client, validClients.slice(0, 3)].flat());
        return;
      }
      if (clients) setClientList(clients.slice(0, 3));
    }
  };

  const fetchContacts = async (searchString: string = '') => {
    if (searchString) {
      const contacts = await contactService.getContacts(searchString, false);
      if (contactId && contacts) {
        const validContacts = contacts.filter(
          (item: Contact) => item.id !== parseInt(contactId),
        );
        setContactList([contact, validContacts.slice(0, 3)].flat());
        return;
      }
      if (contacts) setContactList(contacts.slice(0, 3));
    }
  };

  useEffect(() => {
    const fetchClientById = async () => {
      if (clientId) {
        const client = await clientService.getClient(parseInt(clientId));
        setClient(client);
        setClientList([client]);
      }
    };
    fetchClientById();
  }, [clientId]);

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

  const {error, validate, setError, initialError} = useSiteInputValidate({
    name,
    clientId,
    googleLocation,
    contactId,
  });
  const {primaryContactDetails, hasMoreDetails} = useContactValidate(contact);

  const clientDetails = clientList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const contactDetails = contactList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const handleClientChange = (value: string) => setClientId(value);
  const handleContactChange = (value: string) => setContactId(value);

  const handleClientCreate = (searchString: string) => {
    const redirectUrl = RouteName.SITE_CREATION_SCREEN;
    navigation.navigate(RouteName.CLIENT_CREATION_SCREEN, {
      name: searchString,
      redirect: redirectUrl,
    });
  };

  const handleContactCreate = (searchString: string) => {
    const redirectUrl = RouteName.SITE_CREATION_SCREEN;
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN, {
      name: searchString,
      redirect: redirectUrl,
    });
  };
  const handleContactEdit = () => {
    const redirectUrl = RouteName.SITE_CREATION_SCREEN;
    navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {
      redirect: redirectUrl,
      contactId: contactId,
    });
  };

  const resetFormFields = () => {
    setName('');
    setNotes('');
    setClientId('');
    setClientList([]);
    setContactId('');
    setContact({
      id: 0,
      name: '',
      contactDetails: [],
    });
    setContactList([]);
    setGoogleLocation('');
    setSupervisorIds([]);   
    setError(initialError);
  };

  const hasUnsavedChanges = () => {
    return (
      name.trim() !== '' ||
      notes.trim() !== '' ||
      clientId !== '' ||
      contactId !== '' ||
      googleLocation.trim() !== '' ||
      supervisorIds.length > 0
    );
  };
  const handleBackPress = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: () => {
              handleSubmission();
            },
          },
          {
            text: 'Exit Without Save',
            onPress: () => {
              resetFormFields();
              navigation.navigate(RouteName.SITE_LIST_SCREEN);
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      resetFormFields();
      navigation.navigate(RouteName.SITE_LIST_SCREEN);
    }
    return true;
  };

  useEffect(() => {
    if (route.params?.clientId && isFocused) {
      setClientId(route.params?.clientId);
    }
    if (route.params?.contactId && isFocused) {
      setContactId(route.params?.contactId);
    }
  }, [
    route.params?.clientId && isFocused,
    route.params?.contactId && isFocused,
  ]);

  const handleSubmission = async () => {
    if (validate()) {
      if (supervisorIds.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please add at least one supervisor.',
        });
      } else {
        const site = {
          name,
          clientId: parseInt(clientId),
          googleLocation,
          note: notes,
          contactId: parseInt(contactId),
          supervisorIds,
        };
        await siteService.createSite(site);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Site created successfully.',
        });
        resetFormFields();
        navigation.navigate(RouteName.SITE_LIST_SCREEN);
      }
    }
  };

  return {
    name,
    setName,
    clientDetails,
    clientId,
    setClientId,
    handleClientCreate,
    handleClientChange,
    fetchClients,
    googleLocation,
    setGoogleLocation,
    notes,
    setNotes,
    contact,
    contactId,
    setContactId,
    contactDetails,
    fetchContacts,
    handleContactChange,
    handleContactCreate,
    handleContactEdit,
    primaryContactDetails,
    hasMoreDetails,
    error,
    handleSubmission,
    supervisorIds,
    setSupervisorIds,
    handleBackPress,
    hasUnsavedChanges
  };
};

export {useSiteCreation};
