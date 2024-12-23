import React, {useCallback, useRef} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {Input} from '../../../components/CommonComponets';
import {useContactCreation} from './useContactCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import {FormActionButton} from '../FormActionButton/FormActionButton';
import {Colors} from '../../../utils';
import ContactCreateForm from '../ContactCreateForm/ContactCreateForm';
import Button from '../../../components/CommonComponets/Button/Button';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {ContactTypes} from '../ContactTypes/ContactTypes';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

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
    <View style={styles.formContainer}>
      <Header title={'Create Contact'} onBackPress={handleBack} />
      <View style={styles.container}>
        <Input
          title="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          required={true}
          errorMessage={error.name}
        />
        <FormActionButton
          heading="Contact Types"
          iconType="add-circle"
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
    </View>
  );
};

export default ContactCreationScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    gap: 10,
  },
});
