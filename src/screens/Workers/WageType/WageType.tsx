import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import RouteName from '../../../navigation/RouteName';
import {Input} from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';

const WageType = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Handle back button press
  const handleBackPress = () => {
    navigation.navigate(RouteName.Home_SCREEN);
    return true;
  };

  // Validate input and handle form submission
  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setError(''); // Clear any previous errors
    // Proceed with form submission logic
    console.log('Name:', name);
    // Navigate to another screen or perform other actions
    navigation.navigate(RouteName.Home_SCREEN);
  };

  return (
    <>
      <Header title="Wage Type" onBackPress={handleBackPress} />
      <View style={styles.container}>
        <Input
          title="Name"
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </>
  );
};

export default WageType;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 8,
  },
});
