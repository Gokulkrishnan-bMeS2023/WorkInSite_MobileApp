// import Config from 'react-native-config';
// import {useAPIHelper} from '../helpers/ApiHelper';
// import {
//   WorkerCategoryCreationRequest,
//   WorkerCategoryUpdationRequest,
// } from '../screens/Workers/DTOs/WorkerCategoryProps';

// const useWorkerCategoryService = () => {
//   const baseUrl = Config.REACT_APP_WORKER_SERVICE_BASE_URL || '';
//   const apiHelper = useAPIHelper(baseUrl, true);

//   const getWorkerCategories = async (
//     searchString: string = '',
//     setIsLoading?: boolean,
//   ) => {
//     const response = await apiHelper.get(
//       `worker-categories?searchString=${searchString}`,
//       setIsLoading,
//     );
//     return response.data;
//   };

//   const getWorkerCategory = async (id: number) => {
//     const response = await apiHelper.get(`worker-categories/${id}`);
//     return response.data;
//   };

//   const createWorkerCategory = async (
//     workerCategory: WorkerCategoryCreationRequest,
//   ) => {
//     const response = await apiHelper.post('worker-categories', workerCategory);
//     return response.data;
//   };

//   const updateWorkerCategory = async (
//     id: number,
//     workerCategory: WorkerCategoryUpdationRequest,
//   ) => {
//     await apiHelper.put(`worker-categories/${id}`, workerCategory);
//   };

//   const deleteWorkerCategory = async (id: number) => {
//     await apiHelper.delete(`worker-categories/${id}`);
//   };

//   return {
//     getWorkerCategories,
//     getWorkerCategory,
//     createWorkerCategory,
//     updateWorkerCategory,
//     deleteWorkerCategory,
//   };
// };

// export {useWorkerCategoryService};

//2
import axios from 'axios';
const useWorkerCategoryService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/workerCategory'; // API base URL
  const getWorkerCategorys = (searchString: string = '') => {
    return axios
      .get(baseUrl, {
        params: {search: searchString}, // Search string as query params
      })
      .then(response => response.data);
  };
  const getWorkerCategory = (id: number) => {
    return axios.get(`${baseUrl}/${id}`).then(response => response.data);
  };
  const createWorkerCategory = (WorkerCategory: any) => {
    return axios.post(baseUrl, WorkerCategory).then(response => response.data);
  };
  const editWorkerCategory = (id: number, WorkerCategory: any) => {
    return axios
      .put(`${baseUrl}/${id}`, WorkerCategory)
      .then(response => response.data);
  };
  const deleteWorkerCategory = (id: number) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
  };
  return {
    getWorkerCategorys,
    getWorkerCategory,
    createWorkerCategory,
    editWorkerCategory,
    deleteWorkerCategory,
  };
};
export {useWorkerCategoryService};
