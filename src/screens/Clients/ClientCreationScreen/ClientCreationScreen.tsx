import React, {useCallback, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useClientCreation} from './useClientCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import Input from '../../../components/CommonComponets/Input/input';
import Button from '../../../components/CommonComponets/Button/Button';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../ContactsEditForm/ContactsEditForm';
import {useFocusEffect} from '@react-navigation/native';
import commonStyle from '../../../styles/commonStyle';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import {KycTypes} from '../../../components/CommonComponets/Kyc/KycTypes/KycTypes';
import {KycCreateForm} from '../../../components/CommonComponets/Kyc/KycCreateForm/KycCreateForm';
import { nameRegex } from '../../../utils/regex';

const ClientCreationScreen = ({navigation}: any) => {
  const {
    name,
    setName,
    notes,
    setNotes,
    clientDetails,
    setClientDetails,
    error,
    handleSubmission,
    isAddDisabled,
    contactDetails,
    contactId,
    handleContactCreate,
    handleContactChange,
    fetchContacts,
    contact,
    primaryContactDetails,
    hasMoreDetails,
    handleContactEdit,
    handleBackPress,
    hasUnsavedChanges,
  } = useClientCreation({navigation});

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  const kycSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);

  const handleAdd = () => {
    kycSheetRef.current?.open();
  };

  const handleMoreDetails = () => {
    contactSheetRef.current?.open();
  };

  return (
    <>
      <Header title="Create Client" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={commonStyle.inputfieldContainer}>
              <Input
                title="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                required={true}
                errorMessage={error.name}
                regex={nameRegex}
              />

              <Combobox
                label="Contact"
                showCreateButton={true}
                items={contactDetails}
                selectedValue={contactId}
                onCreate={handleContactCreate}
                onValueChange={handleContactChange}
                onSearch={fetchContacts}
                required={true}
                errorMessage={error.contact}
              />
              {contactId && (
                <ContactDetailForm
                  handleContactEdit={handleContactEdit}
                  primaryContactDetails={primaryContactDetails}
                  hasMoreDetails={hasMoreDetails}
                  handleMoreDetails={handleMoreDetails}
                />
              )}
              <Textarea
                label="Notes"
                value={notes}
                onChange={setNotes}
                placeholder="Enter your notes"
              />
              <View>
                <FormActionButton
                  heading="KYC"
                  iconType="plus-circle"
                  onClick={handleAdd}
                  isIconDisabled={isAddDisabled}
                />
              </View>
              <KycTypes details={clientDetails} setDetails={setClientDetails} />
              <Button title="Save" onPress={handleSubmission} />

              <CustomBottomSheet
                ref={kycSheetRef}
                title="KYC Type"
                onClose={() => kycSheetRef.current.close()}>
                <KycCreateForm
                  details={clientDetails}
                  setDetails={setClientDetails}
                  Ref={kycSheetRef}
                />
              </CustomBottomSheet>

              <CustomBottomSheet
                ref={contactSheetRef}
                title="Contacts"
                onClose={() => contactSheetRef.current.close()}
                scrollview={true}>
                <ContactsEditForm
                  contact={contact}
                  onEdit={handleContactEdit}
                />
              </CustomBottomSheet>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export {ClientCreationScreen};
