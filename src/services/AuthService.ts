// import axios, {AxiosResponse} from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_USER_SERVICE_BASE_URL || '',
// });

// const AuthService = {
//   login: async (phoneNumber: string, pin: string): Promise<string> => {
//     try {
//       const response: AxiosResponse<any> = await api.post('/auth/login', {
//         phone: phoneNumber,
//         password: pin,
//       });
//       console.log(response);

//       return response.data.accessToken;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// export {AuthService};

//2

import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
// Define the base URL properly using environment variables (React Native may require using 'react-native-dotenv')
const api = axios.create({
  baseURL: Config.REACT_APP_USER_SERVICE_BASE_URL || '',
});

const AuthService = {
  login: async (phoneNumber: string, pin: string): Promise<string> => {
    try {
      const response: AxiosResponse<any> = await api.post('/auth/login', {
        phone: phoneNumber,
        password: pin,
      });
      // console.log('Login Response:', response.data.accessToken);

      // Return the access token from response
      return response.data.accessToken;
    } catch (error: any) {
      // Handle error and provide more descriptive messages
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  },
};

export {AuthService};
