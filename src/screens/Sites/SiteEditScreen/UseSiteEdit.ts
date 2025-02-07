import {useCallback, useEffect, useState} from 'react';
import {useClientService} from '../../../services/ClientService';
import {useContactService} from '../../../services/ContactService';
import {useSiteService} from '../../../services/SiteService';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {Site, SiteStatus} from '../DTOs/SiteProps';
import Toast from 'react-native-toast-message';
import {useSiteInputValidate} from '../SiteInputValidate';
import RouteName from '../../../navigation/RouteName';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useContactValidate} from '../../Clients/ContactValidate/ContactValidate';
import { Client } from '../../Clients/DTOs/ClientProps';

const useSiteEdit = (id: string, {navigation}: any) => {
  const clientService = useClientService();
  const contactService = useContactService();
  const siteService = useSiteService();

  const initialContactList = {id: 0, name: '', contactDetails: []};
  // State variables for site fields
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [googleLocation, setGoogleLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [contactId, setContactId] = useState<string>('');
  const [supervisorIds, setSupervisorIds] = useState<number[]>([]);
  const [status, setStatus] = useState('');
  const [clientList, setClientList] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>();
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>(initialContactList);
  const [siteDetails, setSiteDetails] = useState<Site>();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const route = useRoute<any>();

  const {clientId: passedClientId} = route.params || {};

  useEffect(() => {
    if (passedClientId && isFocused) {
      setClientId(passedClientId);
    }
    if (route.params?.contactId && isFocused) {
      setContactId(route.params?.contactId);
    }
  }, [passedClientId && isFocused, route.params?.contactId && isFocused]);

  const fetchSite = async () => {
    setLoading(true);
    try {
      const siteData: Site = await siteService.getSite(parseInt(id));
      setSiteDetails(siteData);
      setName(siteData.name);
      setClientId(siteData.client.id.toString());
      setGoogleLocation(siteData.googleLocation);
      setNotes(siteData.note);
      setContactId(siteData.contact.id.toString());
      setSupervisorIds(
        siteData.supervisors.map((supervisor: {id: number}) => supervisor.id),
      );
      setStatus(siteData.status);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch site data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSite();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchSite(); // Fetch worker data again when the screen is focused
    }, [id]) // Update dependencies if necessary
  );
  

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

  const fetchContacts = async (searchString: string = '') => {
    if (searchString) {
      const contacts = await contactService.getContacts(searchString, false);
      if (contactId && contacts) {
        const validContacts = contacts.filter(
          (item: Contact) => item.id !== parseInt(contactId),
        );
        setContactList([contact, validContacts.slice(0, 3)].flat());
      }
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

  const contactDetails = contactList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const handleContactChange = (value: string) => {
    setContactId(value);
  };

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

  const siteStatus = [
    {label: SiteStatus.YET_TO_START, value: SiteStatus.YET_TO_START},
    {label: SiteStatus.WORKING, value: SiteStatus.WORKING},
    {label: SiteStatus.HALT, value: SiteStatus.HALT},
    {label: SiteStatus.COMPLETED, value: SiteStatus.COMPLETED},
  ];

  const handleClientChange = (value: string) => setClientId(value);

  const handleClientCreate = (searchString: string) => {
    const redirectUrl = RouteName.SITE_EDIT_SCREEN;
    navigation.navigate(RouteName.CLIENT_CREATION_SCREEN, {
      name: searchString,
      redirect: redirectUrl,
    });
  };

  const handleContactCreate = (searchString: string) => {
    const redirectUrl = RouteName.SITE_EDIT_SCREEN;
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN, {
      name: searchString,
      redirect: redirectUrl,
      id,
    });
  };
  const handleContactEdit = () => {
    const redirectUrl = RouteName.SITE_EDIT_SCREEN;
    navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {
      redirect: redirectUrl,
      contactId: contactId,
      id,
    });
  };

  const hasUnsavedChanges = () => {
    return (
      name !== siteDetails?.name ||
      notes !== siteDetails?.note ||
      clientId !== siteDetails?.client?.id?.toString() ||
      (siteDetails as Site).contact.id.toString() !== contactId ||
      googleLocation !== siteDetails?.googleLocation ||
      status !== siteDetails?.status ||
      JSON.stringify(supervisorIds) !==
        JSON.stringify(siteDetails?.supervisors?.map(s => s.id))
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
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: handleSubmission,
          },
          {
            text: 'Exit Without Save',
            onPress: () => {
              navigation.navigate(RouteName.SITE_LIST_SCREEN);
              fetchSite();
              setError(initialError);
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    }
    navigation.navigate(RouteName.SITE_LIST_SCREEN); // Navigate directly
    return true; // Prevent default behavior
  };

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
          status,
        };
        await siteService.updateSite(parseInt(id), site);
        navigation.navigate(RouteName.SITE_LIST_SCREEN);
        fetchSite();
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
    status,
    setStatus,
    siteStatus,
    siteDetails,
    loading,
    handleBackPress,
    hasUnsavedChanges,
  };
};

export {useSiteEdit};
