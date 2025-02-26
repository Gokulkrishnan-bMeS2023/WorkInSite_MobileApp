import axios from 'axios';

export const useWorkRateAbstractService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/workerRateAbstract'; // Update URL if needed
  // Fetch all purchase materials with optional search
  const getWorkRateAbstracts = async (
    searchString: string = '',
  ): Promise<any[]> => {
    const response = await axios.get(`${baseUrl}?q=${searchString}`);
    return response.data;
  };
  // Fetch specific purchase material by ID
  const getWorkRateAbstract = async (id: number): Promise<any> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };
  // Create a new purchase material entry
  const createWorkRateAbstract = async (
    workRateAbstract: any,
  ): Promise<void> => {
    await axios.post(baseUrl, workRateAbstract);
  };
  // Update an existing purchase material entry
  const updateWorkRateAbstract = async (
    id: number,
    workRateAbstract: any,
  ): Promise<void> => {
    await axios.put(`${baseUrl}/${id}`, workRateAbstract);
  };
  // Delete a purchase material entry
  const deleteWorkRateAbstract = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  };
  return {
    getWorkRateAbstracts,
    getWorkRateAbstract,
    createWorkRateAbstract,
    updateWorkRateAbstract,
    deleteWorkRateAbstract,
  };
};
