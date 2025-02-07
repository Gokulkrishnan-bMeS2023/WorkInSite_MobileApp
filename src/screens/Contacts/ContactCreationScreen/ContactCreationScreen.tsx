import React, {useCallback, useRef} from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import {Input} from '../../../components/CommonComponets';
import {useContactCreation} from './useContactCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import {FormActionButton} from '../FormActionButton/FormActionButton';
import ContactCreateForm from '../ContactCreateForm/ContactCreateForm';
import Button from '../../../components/CommonComponets/Button/Button';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {ContactTypes} from '../ContactTypes/ContactTypes';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import commonStyle from '../../../styles/commonStyle';
import {nameRegex} from '../../../utils/regex';

const ContactCreationScreen = ({navigation, route}: any) => {
  const {
    name,
    setName,
    error,
    contactList,
    setContactList,
    handleSubmission,
    handleBack,
    hasUnsavedChanges,
    isAddDisabled,
  } = useContactCreation({navigation, route});

  const bottomSheetRef = useRef<any>(null);

  const handleAdd = () => {
    bottomSheetRef.current.open();
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

  return (
    <>
      <Header title={'Create Contact'} onBackPress={handleBack} />
      <View style={commonStyle.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={commonStyle.inputfieldContainer}>
              <Input
                title="Name"
                value={name}
                onChangeText={setName}
                regex={nameRegex}
                placeholder="Enter name"
                required={true}
                errorMessage={error.name}
              />
              <FormActionButton
                heading="Contact Types"
                iconType="plus-circle"
                onClick={handleAdd}
                required={true}
                isIconDisabled={isAddDisabled}
              />
              <ContactTypes
                contactList={contactList}
                setContactList={setContactList}
              />
              <Button title="Save" onPress={handleSubmission} />
              <CustomBottomSheet
                ref={bottomSheetRef}
                title="Contact Type"
                onClose={() => bottomSheetRef.current.close()}>
                <ContactCreateForm
                  contactList={contactList}
                  setContactList={setContactList}
                  Ref={bottomSheetRef}
                />
              </CustomBottomSheet>
              <ToastNotification />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};

export default ContactCreationScreen;
