
import axios from 'axios';

export const useWageTypeService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/WageType'; // Update URL if needed
  // Fetch all purchase materials with optional search
  const getWageTypes = async (searchString: string = ''): Promise<any[]> => {
    const response = await axios.get(`${baseUrl}?q=${searchString}`);
    return response.data;
  };
  // Fetch specific purchase material by ID
  const getWageType = async (id: number): Promise<any> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };
  // Create a new purchase material entry
  const createWageType = async (WageType: any): Promise<void | any> => {
    const response = await axios.post(baseUrl, WageType);
    return response.data;
  };
  // Update an existing purchase material entry
  const updateWageType = async (id: number, WageType: any): Promise<void> => {
    await axios.put(`${baseUrl}/${id}`, WageType);
  };
  // Delete a purchase material entry
  const deleteWageType = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  };
  return {
    getWageTypes,
    getWageType,
    createWageType,
    updateWageType,
    deleteWageType,
  };
};
