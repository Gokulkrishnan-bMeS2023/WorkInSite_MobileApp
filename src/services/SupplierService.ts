import Config from 'react-native-config';
import {useAPIHelper} from '../helpers/ApiHelper';
import {SupplierRequest} from '../screens/Suppliers/DTOs/SupplierProps';

const useSupplierService = () => {
  const baseUrl = Config.REACT_APP_SUPPLIER_SERVICE_BASE_URL || '';
  const apiHelper = useAPIHelper(baseUrl, true);

  const getSuppliers = async (searchString: string = '') => {
    const response = await apiHelper.get(
      `suppliers?searchString=${searchString}`,
    );
    return response.data;
  };

  const getSupplier = async (id: number) => {
    const response = await apiHelper.get(`suppliers/${id}`);
    return response.data;
  };

  const createSupplier = async (supplier: SupplierRequest) => {
    await apiHelper.post('suppliers', supplier);
  };

  const updateSupplier = async (id: number, supplier: SupplierRequest) => {
    await apiHelper.put(`suppliers/${id}`, supplier);
  };

  const deleteSupplier = async (id: number) => {
    await apiHelper.delete(`suppliers/${id}`);
  };

  return {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

export {useSupplierService};
