import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import Button from '../../../components/CommonComponets/Button/Button';
import Colors from '../../../utils/color';
import Input from '../../../components/CommonComponets/Input/input';
import {useClientEdit} from './useClientEdit';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import RouteName from '../../../navigation/RouteName';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../ContactsEditForm/ContactsEditForm';
import {KycCreateForm} from '../KycCreateForm/KycCreateForm';
import {KycTypes} from '../KycTypes/KycTypes';

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
  } = useClientEdit(id, {navigation});

  const kycSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);

  const handleBack = () => {
    navigation.navigate(RouteName.CLIENT_LIST_SCREEN);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Clean up the listener
  }, [handleBackPress]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Edit Client" onBackPress={handleBack} />

      <KeyboardAvoidingView enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.container}>
            <View style={styles.fieldContainer}>
              {clientDetails?.name && (
                <Input
                  title="Name"
                  value={name}
                  onChangeText={setName}
                  required
                  errorMessage={error.name}
                />
              )}
            </View>

            <View style={styles.fieldContainer}>
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
            </View>

            {contactId && (
              <>
                <FormActionButton
                  heading="Contact detail"
                  iconType="edit"
                  onClick={handleContactEdit}
                />
                <View style={styles.content}>
                  <ContactTypes
                    contactList={primaryContactDetails}
                    showEditDeleteButtons={false}
                  />
                </View>
                {hasMoreDetails && (
                  <View style={styles.fieldContainer}>
                    <TouchableOpacity
                      onPress={() => contactSheetRef.current?.open()}>
                      <Text style={styles.link}>More details...</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            <View style={styles.fieldContainer}>
              {notes !== undefined && (
                <Textarea
                  label="Notes"
                  value={notes}
                  onChange={setNotes}
                  placeholder="Enter your notes"
                />
              )}
            </View>

            <View style={styles.kycContainer}>
              <FormActionButton
                heading="KYC"
                iconType="add-circle"
                onClick={() => kycSheetRef.current?.open()}
                isIconDisabled={isAddDisabled}
              />
            </View>

            <KycTypes
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
            />

            <Button
              title="Save"
              onPress={handleSubmission}
              buttonStyle={styles.submitButton}
            />

            <CustomBottomSheet
              ref={kycSheetRef}
              title="KYC Type"
              onClose={() => kycSheetRef.current.close()}>
              <KycCreateForm
                clientDetails={clientDetails}
                setClientDetails={setClientDetails}
                Ref={kycSheetRef}
              />
            </CustomBottomSheet>

            <CustomBottomSheet
              ref={contactSheetRef}
              title="Contacts"
              onClose={() => contactSheetRef.current.close()}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    marginBottom: 20,
    gap: 10,
  },
  link: {
    fontSize: 16,
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
  fieldContainer: {
    paddingBottom: 20,
  },
  kycContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonstyle: {
    width: '30%',
  },
  submitButton: {
    marginTop: 16,
  },
  contactDetailButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClientEditScreen;
