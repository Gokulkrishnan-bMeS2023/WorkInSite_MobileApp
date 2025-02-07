import React, {useCallback, useRef} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import Button from '../../../components/CommonComponets/Button/Button';
import Input from '../../../components/CommonComponets/Input/input';
import {useClientEdit} from './useClientEdit';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../ContactsEditForm/ContactsEditForm';
import {useFocusEffect} from '@react-navigation/native';
import commonStyle from '../../../styles/commonStyle';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import {KycTypes} from '../../../components/CommonComponets/Kyc/KycTypes/KycTypes';
import {KycCreateForm} from '../../../components/CommonComponets/Kyc/KycCreateForm/KycCreateForm';
import {nameRegex} from '../../../utils/regex';
import Loader from '../../../components/Loader/Loader';

const ClientEditScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const {
    name,
    setName,
    notes,
    setNotes,
    clientDetails,
    setClientDetails,
    error,
    handleContactEdit,
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
    loading,
    handleBackPress,
    hasUnsavedChanges,
  } = useClientEdit(id, {navigation});

  const kycSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);
  const handleMoreDetails = () => {
    contactSheetRef.current?.open();
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
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
      <Header title="Edit Client" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 80}}>
            <View style={commonStyle.inputfieldContainer}>
              {clientDetails?.name && (
                <Input
                  title="Name"
                  value={name}
                  onChangeText={setName}
                  required
                  errorMessage={error.name}
                  regex={nameRegex}
                />
              )}

              {contactId && (
                <Combobox
                  label="Contact"
                  showCreateButton
                  items={contactDetails}
                  selectedValue={contactId}
                  onCreate={handleContactCreate}
                  onValueChange={handleContactChange}
                  onSearch={fetchContacts}
                  required
                  errorMessage={error.contact}
                />
              )}
              {contactId && (
                <ContactDetailForm
                  handleContactEdit={handleContactEdit}
                  primaryContactDetails={primaryContactDetails}
                  hasMoreDetails={hasMoreDetails}
                  handleMoreDetails={handleMoreDetails}
                />
              )}
              {notes !== undefined && (
                <Textarea
                  label="Notes"
                  value={notes}
                  onChange={setNotes}
                  placeholder="Enter your notes"
                />
              )}
              <FormActionButton
                heading="KYC"
                iconType="plus-circle"
                onClick={() => kycSheetRef.current?.open()}
                isIconDisabled={isAddDisabled}
              />
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
                  // Ref={contactSheetRef}  //note
                />
              </CustomBottomSheet>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ClientEditScreen;
