import {useEffect, useState} from 'react';
import {useClientService} from '../../../services/ClientService';
import {Client} from '../DTOs/ClientProps';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const useClientList = ({navigation}: any) => {
  const clientService = useClientService();
  const [clientDetails, setClientDetails] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchClient = async (searchString: string = '') => {
    const clientData = await clientService.getClients(searchString);
    setClientDetails(clientData);
    if (clientData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [isFocused]);

  const handleClientSelect = (id: number) => {
    navigation.navigate(RouteName.CLIENT_EDIT_SCREEN, {id});
  };

  const handleClientDelete = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this client?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await clientService.deleteClient(id);
              fetchClient();
            } catch (error) {
              console.error('Error deleting client:', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    clientDetails,
    fetchClient,
    handleClientSelect,
    handleClientDelete,
    loading,
  };
};

export {useClientList};
