import {useEffect, useState} from 'react';
import {useSupplierService} from '../../../services/SupplierService';
import {Supplier} from '../DTOs/SupplierProps';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useSupplierList = ({navigation}: any) => {
  const supplierService = useSupplierService();
  const [supplierDetails, setSupplierDetails] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const IsFocused = useIsFocused();

  const fetchSupplier = async () => {
    const supplierData = await supplierService.getSuppliers('');
    setSupplierDetails(supplierData);
    if (supplierData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, [IsFocused]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this supplier?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await handleSupplierDelete(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleSupplierDelete = async (id: number) => {
    await supplierService.deleteSupplier(id);
    fetchSupplier();
  };

  const handleEditSupplier = (id: number) => {
    navigation.navigate(RouteName.SUPPLIER_EDIT_SCREEN, {id: id});
  };

  return {
    supplierDetails,
    fetchSupplier,
    handleEditSupplier,
    confirmDelete,
    loading,
  };
};

export {useSupplierList};
