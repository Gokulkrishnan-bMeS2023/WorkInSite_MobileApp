import {
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Header from '../../../components/CommonComponets/Header/Header';
import {useContactEdit} from './useContactEdit';
import {Input} from '../../../components/CommonComponets';
import {FormActionButton} from '../FormActionButton/FormActionButton';
import {ContactTypes} from '../ContactTypes/ContactTypes';
import Button from '../../../components/CommonComponets/Button/Button';
import ContactCreateForm from '../ContactCreateForm/ContactCreateForm';
import {Colors} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import commonStyle from '../../../styles/commonStyle';
import {nameRegex} from '../../../utils/regex';
import Loader from '../../../components/Loader/Loader';

const ContactEditScreen = ({route, navigation}: any) => {
  const {contactId, redirect, id} = route.params;
  const {
    name,
    setName,
    error,
    contactList,
    setContactList,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
    isAddDisabled,
    loading,
  } = useContactEdit(contactId as string, navigation, redirect, id);

  const bottomSheetRef = useRef<any>(null);

  const handleAdd = () => {
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
    return <Loader />;
  }

  return (
    <>
      <Header title="Edit Contact" onBackPress={handleBack} />
      <View style={commonStyle.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={commonStyle.inputfieldContainer}>
              {contactList.name && (
                <Input
                  title="Name"
                  value={name}
                  regex={nameRegex}
                  onChangeText={setName}
                  errorMessage={error.name}
                  required={true}
                />
              )}
              <FormActionButton
                heading="Contact Types"
                iconType="plus-circle"
                onClick={handleAdd}
                isIconDisabled={isAddDisabled}
                required={true}
              />
              <ContactTypes
                contactList={contactList}
                setContactList={setContactList}
              />
              <Button title="Save" onPress={handleSubmission} />
            </View>
            <CustomBottomSheet
              ref={bottomSheetRef}
              title="Contact Type"
              onClose={() => bottomSheetRef.current?.close()}>
              <ContactCreateForm
                contactList={contactList}
                setContactList={setContactList}
                Ref={bottomSheetRef}
              />
            </CustomBottomSheet>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};

export default ContactEditScreen;
