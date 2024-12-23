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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <Header title="Edit Contact" onBackPress={handleBack} />
          <View style={styles.formContainer}>
            {contactList.name && (
              <Input
                title="Name"
                value={name}
                onChangeText={setName}
                errorMessage={error.name}
                required={true}
              />
            )}
            <FormActionButton
              heading="Contact Types"
              iconType="add-circle"
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
  );
};

export default ContactEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContainer: {
    gap: 15,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
