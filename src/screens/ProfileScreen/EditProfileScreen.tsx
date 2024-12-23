import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useUserProfile} from './useUserProfile';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/CommonComponets/Button/Button';
import {Input} from '../../components/CommonComponets';
import Textarea from '../../components/CommonComponets/Notes/Notes';
import Switch from '../../components/CommonComponets/Switch/Switch';

export default function EditProfileScreen({navigation}: any) {
  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    error,
    isActive,
    setIsActive,
    notes,
    setNotes,
    user,
    handleSubmission,
    isDisabled,
  } = useUserProfile();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Profile');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon
            name="arrow-left-circle"
            size={25}
            color={Colors.secondaryBgTextColor}
          />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          Edit Personal Details
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          title="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          errorMessage={error.name}
          disabled={isDisabled}
          required={true}
          maxLength={30}
        />
        <Input
          title="Phone Number"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          errorMessage={error.phoneNumber}
          disabled={isDisabled}
          inputType="phone-pad"
          required={true}
          maxLength={10}
        />
        <View>
          <Text style={styles.label}>Role</Text>
          <Text style={[styles.label, styles.opacityText]}>
            {user?.role?.name}
          </Text>
        </View>

        <Switch
          label="Is Active"
          onValueChange={() => setIsActive(true)}
          value={isActive}
          disabled={true}
        />
        {!isDisabled && (
          <>
            <Textarea
              label="Notes"
              onChange={setNotes}
              value={notes || ''}
              placeholder="Enter your notes"
            />
            <View style={styles.buttonRow}>
              <Button onPress={handleSubmission} title="Save" />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    paddingHorizontal: 16,
    gap: 16,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
  },
  opacityText: {
    color: Colors.grayColor,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Container: {
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
});
