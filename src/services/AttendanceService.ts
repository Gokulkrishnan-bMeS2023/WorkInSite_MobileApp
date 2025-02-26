import axios from 'axios';

export const useAttendanceService = () => {
  const baseUrl = 'https://workinsite-test-api.onrender.com/Attendance'; // Update URL if needed
  // Fetch all purchase materials with optional search
  const getAttendances = async (searchString: string = ''): Promise<any[]> => {
    const response = await axios.get(`${baseUrl}?q=${searchString}`);
    return response.data;
  };
  // Fetch specific purchase material by ID
  const getAttendance = async (id: number): Promise<any> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };
  // Create a new purchase material entry
  const createAttendance = async (Attendance: any): Promise<void> => {
    await axios.post(baseUrl, Attendance);
  };
  // Update an existing purchase material entry
  const updateAttendance = async (
    id: number,
    Attendance: any,
  ): Promise<void> => {
    await axios.put(`${baseUrl}/${id}`, Attendance);
  };
  // Delete a purchase material entry
  const deleteAttendance = async (id: number): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
  };
  return {
    getAttendances,
    getAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
  };
};
