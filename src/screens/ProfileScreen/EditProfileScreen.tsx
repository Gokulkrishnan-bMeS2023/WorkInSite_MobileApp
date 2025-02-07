import React from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import {useUserProfile} from './useUserProfile';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../../components/CommonComponets/Button/Button';
import {Input} from '../../components/CommonComponets';
import Textarea from '../../components/CommonComponets/Notes/Notes';
import Switch from '../../components/CommonComponets/Switch/Switch';
import Header from '../../components/CommonComponets/Header/Header';
import commonStyle from '../../styles/commonStyle';

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
    handleBackPress,
  } = useUserProfile(navigation);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBackPress();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <ScrollView
      style={commonStyle.container}
      keyboardShouldPersistTaps="handled">
      <Header title="Edit Personal Details" onBackPress={handleBackPress} />
      <View style={commonStyle.inputfieldContainer}>
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
          <Text style={commonStyle.label}>Role</Text>
          <Text style={commonStyle.labelText}>{user?.role?.name}</Text>
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
            <Button onPress={handleSubmission} title="Save" />
          </>
        )}
      </View>
    </ScrollView>
  );
}
