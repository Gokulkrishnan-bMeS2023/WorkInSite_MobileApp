// import Config from 'react-native-config';
// import {useAPIHelper} from '../helpers/ApiHelper';
// import {UnitRequest} from '../screens/Unit/DTOs/UnitProps';
// export const useUnitService = () => {
//   const baseUrl = Config.REACT_APP_MASTER_DATA_SERVICE_BASE_URL || '';
//   const apiHelper = useAPIHelper(baseUrl, true);
//   const getUnits = async (
//     searchString: string = '',
//     setIsLoading?: boolean,
//   ) => {
//     const response = await apiHelper.get(
//       `units?searchString=${searchString}`,
//       setIsLoading,
//     );
//     return response.data;
//   };
//   const getUnit = async (id: number) => {
//     const response = await apiHelper.get(`units/${id}`);
//     return response.data;
//   };
//   const createUnit = async (unit: UnitRequest) => {
//     const response = await apiHelper.post('units', unit);
//     return response.data;
//   };
//   const updateUnit = async (id: number, unit: UnitRequest) => {
//     await apiHelper.put(`units/${id}`, unit);
//   };
//   const deleteUnit = async (id: number) => {
//     await apiHelper.delete(`units/${id}`);
//   };
//   return {getUnits, getUnit, createUnit, updateUnit, deleteUnit};
// };

//2

import axios from 'axios';

export const useWorkModeService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/WorkMode'; // Update URL if needed
  // Fetch all purchase materials with optional search
  const getWorkModes = async (searchString: string = ''): Promise<any[]> => {
    const response = await axios.get(`${baseUrl}?q=${searchString}`);
    return response.data;
  };
  // Fetch specific purchase material by ID
  const getWorkMode = async (id: number): Promise<any> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };
  // Create a new purchase material entry
  const createWorkMode = async (WorkMode: any): Promise<void> => {
    await axios.post(baseUrl, WorkMode);
  };
  // Update an existing purchase material entry
  const updateWorkMode = async (id: number, WorkMode: any): Promise<void> => {
    await axios.put(`${baseUrl}/${id}`, WorkMode);
  };
  // Delete a purchase material entry
  const deleteWorkMode = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  };
  return {
    getWorkModes,
    getWorkMode,
    createWorkMode,
    updateWorkMode,
    deleteWorkMode,
  };
};
