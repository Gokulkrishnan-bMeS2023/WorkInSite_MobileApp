import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Switch,
} from 'react-native';
import {AuthHelper} from '../../helpers/AuthHelper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAvatar from './CustomAvatar';

const Colors = {
  primaryColor: 'rgb(250, 212, 39)', // Yellow
  primaryBgTextColor: 'black', // Black text
  secondaryColor: 'rgb(79, 67, 15)', // Dark brown
  secondaryBgTextColor: 'white', // White text
  successColor: 'rgb(25, 134, 83)', // Green
  successBgTextColor: 'white', // White text on success
  warningColor: 'rgb(255, 193, 7)', // Yellow
  warningBgTextColor: 'white', // White text on warning
  dangerColor: 'rgb(220, 56, 72)', // Red
  dangerBgTextColor: 'white', // White text on danger
  grayColor: 'rgb(130, 126, 125)', // Gray
};

export default function ProfilePage({navigation}: any) {
  const [profile, setProfile] = useState<any>({
    id: '',
    name: '',
    phone: '',
    language: '',
    role: {id: '', name: ''},
    isActive: false,
    notes: '',
    imageUri: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const userProfile = await AuthHelper.getUserProfile();
        if (userProfile) {
          setProfile(userProfile);
        }
      } catch (error) {
        console.log('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      // await AuthHelper.setUserProfile(profile);
      Alert.alert('Success', 'Profile saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleLogout = async () => {
    try {
      await AuthHelper.logout();
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon
              name="arrow-left-circle"
              size={25}
              color={Colors.secondaryBgTextColor}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <CustomAvatar
            name={profile.name}
            imageUri={null}
            size={60}
            backgroundColor={Colors.primaryColor}
            textColor={Colors.secondaryColor}
          />
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          value={profile.name}
          onChangeText={text => setProfile({...profile, name: text})}
          style={styles.input}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          value={profile.phone}
          onChangeText={text => setProfile({...profile, phone: text})}
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Role: {profile?.role?.name}</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is Active:</Text>
          <Switch
            value={profile.isActive}
            onValueChange={value => setProfile({...profile, isActive: value})}
          />
        </View>

        <Text style={styles.label}>Notes:</Text>
        <TextInput
          value={profile.notes}
          onChangeText={text => setProfile({...profile, notes: text})}
          style={styles.textarea}
          placeholder="Enter any notes"
          multiline={true}
          numberOfLines={4} // You can adjust this to change the initial height
          textAlignVertical="top" // Align text to the top
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setProfile(profile)}
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: Colors.secondaryColor,
  },
  headerContainer: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    color: Colors.secondaryBgTextColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grayColor,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondaryBgTextColor,
    color: Colors.primaryBgTextColor,
    marginBottom: 15,
  },
  textarea: {
    borderWidth: 1,
    borderColor: Colors.grayColor,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondaryBgTextColor,
    color: Colors.primaryBgTextColor,
    height: 100,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.secondaryColor,
    color: Colors.secondaryBgTextColor,
  },
  saveButton: {
    backgroundColor: Colors.primaryColor,
    color: Colors.secondaryColor,
  },
  logoutButton: {
    backgroundColor: Colors.dangerColor,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.secondaryBgTextColor,
    fontWeight: 'bold',
  },
});
