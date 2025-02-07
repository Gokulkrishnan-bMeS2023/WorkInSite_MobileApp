import React, {useCallback, useRef} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import {useUserCreation} from './useUserCreation';
import Input from '../../../components/CommonComponets/Input/input';
import Header from '../../../components/CommonComponets/Header/Header';
import {UserCreationPinForm} from '../UserCreationPinForm/UserCreationPinForm';
import Button from '../../../components/CommonComponets/Button/Button';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';
import commonStyle from '../../../styles/commonStyle';
import {nameRegex, numberRegex} from '../../../utils/regex';

const UserCreationPage = ({route, navigation}: any) => {
  const {SupervisorOnly = false} = route.params || {};
  const {supervisorIds} = route.params || '[]';
  const {redirect} = route.params || '';
  const {supervisorname} = route.params || '';

  const handleOnSave = () => {
    if (validate()) {
      bottomSheetRef.current?.open();
    }
  };

  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    error,
    validate,
    roles,
    userDetail,
    handleBack,
    hasUnsavedChanges,
  } = useUserCreation(
    SupervisorOnly,
    supervisorname,
    redirect,
    navigation,
    handleOnSave,
  );

  const bottomSheetRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBack();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  return (
    <>
      <Header title="Create User" onBackPress={handleBack} />
      <View style={commonStyle.container}>
        <View style={commonStyle.inputfieldContainer}>
          <View style={commonStyle.toast}>
            <ToastNotification />
          </View>
          <Input
            title="Name"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            errorMessage={error.name}
            required={true}
            inputContainerStyle={{height: 50}}
            regex={nameRegex}
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
            regex={numberRegex}
          />
          <RadioButtonGroup
            label="Role"
            items={roles.filter(role =>
              supervisorIds ? role.label === 'Supervisor' : true,
            )}
            onValueChange={setRole}
            selectedValue={role}
            errorMessage={error.role}
            required={true}
          />
          <Button title="Save" onPress={handleOnSave} />
        </View>
        <CustomBottomSheet
          ref={bottomSheetRef}
          title="Set up a PIN"
          onClose={() => bottomSheetRef.current.close()}>
          <UserCreationPinForm
            supervisorIds={supervisorIds}
            redirect={redirect}
            navigation={navigation}
            userDetail={userDetail}
            bottomSheetRef={bottomSheetRef}
          />
        </CustomBottomSheet>
      </View>
    </>
  );
};

export default UserCreationPage;
