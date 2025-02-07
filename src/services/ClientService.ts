import Config from "react-native-config";
import { useAPIHelper } from "../helpers/ApiHelper";
import { ClientRequest } from "../screens/Clients/DTOs/ClientProps";

const useClientService = () => {
  const baseUrl =  Config.REACT_APP_SITE_SERVICE_BASE_URL || "";
  const apiHelper = useAPIHelper(baseUrl, true);

  const getClients = async (searchString: string = "", setIsLoading?: boolean) => {
    const response = await apiHelper.get(`clients?searchString=${searchString}`, setIsLoading);
    return response.data;
  };

  const getClient = async (id: number) => {
    const response = await apiHelper.get(`clients/${id}`);
    return response.data;
  };

  const createClient = async (client: ClientRequest) => {
    const response = await apiHelper.post("clients", client);
    return response.data;
  };

  const updateClient = async (id: number, client: ClientRequest) => {
    await apiHelper.put(`clients/${id}`, client);
  };

  const deleteClient = async (id: number) => {
    await apiHelper.delete(`clients/${id}`);
  };

  return { getClients, getClient, createClient, updateClient, deleteClient };
};

export { useClientService };
