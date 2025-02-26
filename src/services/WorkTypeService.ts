import axios from 'axios';

export const useWorkTypeService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/WorkType'; // Update URL if needed

  //   const getWorkTypes = async (searchString: string = ''): Promise<any[]> => {
  //     const response = await axios.get(`${baseUrl}?q=${searchString}`);
  //     return response.data;
  //   };

  const getWorkTypes = (searchString: string = '') => {
    return axios
      .get(baseUrl, {
        params: {search: searchString}, // Search string as query params
      })
      .then(response => response.data);
  };

  const getWorkType = async (id: number): Promise<any> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const createWorkType = async (WorkType: any): Promise<void> => {
    await axios.post(baseUrl, WorkType);
  };

  const updateWorkType = async (id: number, WorkType: any): Promise<void> => {
    await axios.put(`${baseUrl}/${id}`, WorkType);
  };

  const deleteWorkType = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  };
  return {
    getWorkTypes,
    getWorkType,
    createWorkType,
    updateWorkType,
    deleteWorkType,
  };
};
