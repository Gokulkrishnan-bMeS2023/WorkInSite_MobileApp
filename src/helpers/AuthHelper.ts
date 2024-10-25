import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../screens/Users/DTOs/User';
import {DevSettings} from 'react-native'; // Import DevSettings to reload the app

const AuthHelper = {
  setAccessToken: async (token: string) => {
    try {
      // await AsyncStorage.removeItem("_at");
      await AsyncStorage.setItem('_at', token);
      // console.log('Updated access tokennn');
    } catch (error) {
      console.error('Error saving access token', error);
    }
  },

  getAccessToken: async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('_at');
      // console.log('getAccessTokenss', token);
      return token;
    } catch (error) {
      console.error('Error getting access token', error);
      return null;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('_at');
      await AsyncStorage.removeItem('userProfile');
      // Reload or navigate to a login screen
      // You can use a navigation action instead of reload if you're using React Navigation
      // e.g. navigation.navigate('Login')
      // window.location.reload(); // or navigate
      DevSettings.reload();
    } catch (error) {
      console.error('Error during logout', error);
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AuthHelper.getAccessToken();
      return token !== null;
    } catch (error) {
      console.error('Error checking authentication', error);
      return false;
    }
  },

  setUserProfile: async (profile: User) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile', error);
    }
  },

  getUserProfile: async (): Promise<User | null> => {
    try {
      const profileString = await AsyncStorage.getItem('userProfile');
      return profileString ? JSON.parse(profileString) : null;
    } catch (error) {
      console.error('Error getting user profile', error);
      return null;
    }
  },
};

export {AuthHelper};
