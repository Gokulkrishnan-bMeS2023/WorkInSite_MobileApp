import Config from 'react-native-config';
import {useAPIHelper} from '../helpers/ApiHelper';
import {WorkerRequest} from '../screens/Workers/DTOs/WorkerProps';

const useWorkerService = () => {
  const baseUrl = Config.REACT_APP_WORKER_SERVICE_BASE_URL || '';
  const apiHelper = useAPIHelper(baseUrl, true);

  const getWorkers = async (searchString: string = '') => {
    const response = await apiHelper.get(
      `workers?searchString=${searchString}`,
    );
    return response.data;
  };

  const getWorker = async (id: number) => {
    const response = await apiHelper.get(`workers/${id}`);
    return response.data;
  };

  const createWorker = async (worker: WorkerRequest) => {
    await apiHelper.post('workers', worker);
  };

  const updateWorker = async (id: number, worker: WorkerRequest) => {
    await apiHelper.put(`workers/${id}`, worker);
  };

  const deleteWorker = async (id: number) => {
    await apiHelper.delete(`workers/${id}`);
  };

  return {getWorkers, getWorker, createWorker, updateWorker, deleteWorker};
};

export {useWorkerService};
