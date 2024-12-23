import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Colors, SF, SH, SW} from '../../utils'; // Assuming utils exist
import {Input} from '../../components/CommonComponets';
import Button from '../../components/CommonComponets/Button/Button';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !password || !organisationName) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://sygycm9raj.ap-south-1.awsapprunner.com/user-service/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            password,
            organisationName,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
      } else {
        Alert.alert('Error', data?.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <Input
        title="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        required
      />

      <Input
        title="Phone"
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        inputType="phone-pad"
        required
      />

      <Input
        title="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />

      <Input
        title="Organisation Name"
        placeholder="Enter your organisation name"
        value={organisationName}
        onChangeText={setOrganisationName}
        required
      />
      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: SW(16),
    // justifyContent: 'center',
    gap: 10,
  },
  heading: {
    fontSize: SF(24),
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: SH(20),
  },
});

export default RegisterScreen;
