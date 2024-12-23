import React, {useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Input from '../../../components/CommonComponets/Input/input';
import Header from '../../../components/CommonComponets/Header/Header';
import {Colors} from '../../../utils';
import Button from '../../../components/CommonComponets/Button/Button';
import {useUserEdit} from './useUserEdit';
import {UserEditPinForm} from '../UserEditPinForm/UserEditPinForm';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {useFocusEffect} from '@react-navigation/native';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

const UserEditScreen = ({route, navigation}: any) => {
  const {urlName} = route.params;

  const {
    setName,
    setPhoneNumber,
    setRole,
    isActive,
    setIsActive,
    setNotes,
    name,
    phoneNumber,
    role,
    notes,
    error,
    user,
    loading,
    handleSubmission,
    roles,
    handleBack,
    hasUnsavedChanges,
  } = useUserEdit(urlName as string, navigation);

  const bottomSheetRef = useRef<any>(null);

  const handleChangePin = () => {
    bottomSheetRef.current?.open();
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBack();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <>
      <Header title="Edit User" onBackPress={handleBack} />
      <View style={{position: 'absolute', left: 1, right: 1, zIndex: 999}}>
        <ToastNotification />
      </View>
      {user && (
        <View style={styles.container}>
          <View style={styles.PinConatiner}>
            <TouchableOpacity
              style={styles.PinButton}
              onPress={handleChangePin}>
              <Text style={styles.PinLabel}>Change PIN</Text>
            </TouchableOpacity>
          </View>

          <Input
            title="Name"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            errorMessage={error.name}
            required={true}
            inputContainerStyle={{height: 50}}
          />
          <Input
            title="Phone Number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            inputType="phone-pad"
            errorMessage={error.phoneNumber}
            required={true}
            maxLength={10}
            inputContainerStyle={{height: 50}}
          />
          <RadioButtonGroup
            label="Role"
            items={roles}
            onValueChange={setRole}
            selectedValue={role.toString()}
            errorMessage={error.role}
            required={true}
          />
          <Switch
            label="Is Active"
            onValueChange={setIsActive}
            value={isActive}
          />
          <Textarea
            label="Notes"
            onChange={setNotes}
            value={`${notes === null ? '' : notes}`}
            placeholder="Enter your notes"
          />
          <Button title="Save" onPress={handleSubmission} />
        </View>
      )}
      <CustomBottomSheet
        ref={bottomSheetRef}
        title="Change PIN"
        onClose={() => bottomSheetRef.current.close()}>
        <UserEditPinForm userId={urlName} navigation={navigation} />
      </CustomBottomSheet>
    </>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 16, backgroundColor: Colors.white},
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  PinConatiner: {
    alignItems: 'flex-end',
  },
  PinButton: {
    borderBottomWidth: 1,
    borderColor: Colors.secondaryColor,
  },
  PinLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryColor,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
