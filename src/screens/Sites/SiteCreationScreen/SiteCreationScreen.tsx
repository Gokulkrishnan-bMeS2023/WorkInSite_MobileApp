import React, {useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useSiteCreation} from './useSiteCreation';
import Input from '../../../components/CommonComponets/Input/input';
import Button from '../../../components/CommonComponets/Button/Button';
import Colors from '../../../utils/color';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import Header from '../../../components/CommonComponets/Header/Header';
import {SupervisorAddForm} from '../SupervisorAddForm/SupervisorAddForm';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {SupervisorListForm} from '../SupervisorListForm/SupervisorListForm';
import {ContactDetailForm} from '../ContactDetailForm/ContactDetailForm';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import RouteName from '../../../navigation/RouteName';

const SiteCreationScreen = ({navigation}: any) => {
  const {
    name,
    setName,
    clientDetails,
    clientId,
    handleClientCreate,
    handleClientChange,
    fetchClients,
    googleLocation,
    setGoogleLocation,
    notes,
    setNotes,
    contact,
    contactId,
    contactDetails,
    fetchContacts,
    handleContactChange,
    handleContactCreate,
    handleContactEdit,
    primaryContactDetails,
    hasMoreDetails,
    error,
    handleSubmission,
    supervisorIds,
    setSupervisorIds,
    handleBackPress,
    handleBack,
  } = useSiteCreation({navigation});

  const supervisorBottomSheetRef = useRef<any>(null);
  const contactBottomSheetRef = useRef<any>(null);

  const handleSupervisorsAdd = () => {
    supervisorBottomSheetRef.current?.open();
  };

  const handleMoreDetails = () => {
    contactBottomSheetRef.current?.open();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Clean up the listener
  }, [handleBackPress]);

  return (
    <View style={styles.container}>
      <Header title="Create Site" onBackPress={handleBack} />
      <KeyboardAvoidingView enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Input
                title="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter site name"
                required={true}
                errorMessage={error.name}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Combobox
                label="Client"
                showCreateButton={true}
                items={clientDetails}
                selectedValue={clientId}
                onCreate={handleClientCreate}
                onValueChange={handleClientChange}
                onSearch={fetchClients}
                required={true}
                errorMessage={error.client}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Textarea
                label="Google Location"
                placeholder="Enter google location"
                required
                showLocationLink
                value={googleLocation}
                onChange={setGoogleLocation}
                errorMessage={error.googleLocation}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Textarea
                label="Notes"
                value={notes}
                onChange={setNotes}
                placeholder="Enter notes"
              />
            </View>

            <View style={styles.fieldContainer}>
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
            </View>

            {contactId && (
              <>
                <ContactDetailForm
                  handleContactEdit={handleContactEdit}
                  primaryContactDetails={primaryContactDetails}
                  hasMoreDetails={hasMoreDetails}
                  handleMoreDetails={handleMoreDetails}
                />
              </>
            )}
            <FormActionButton
              heading="Supervisors"
              iconType="add-circle"
              onClick={handleSupervisorsAdd}
              required={true}
            />

            <View style={styles.fieldContainer}>
              {supervisorIds.length !== 0 && (
                <SupervisorListForm
                  supervisorIds={supervisorIds}
                  setSupervisorIds={setSupervisorIds}
                />
              )}
            </View>
            <Button title="Save" onPress={handleSubmission} />
          </View>

          <CustomBottomSheet
            ref={supervisorBottomSheetRef}
            title="Add Supervisors"
            onClose={() => supervisorBottomSheetRef.current.close()}>
            <SupervisorAddForm
              supervisorIds={supervisorIds}
              setSupervisorIds={setSupervisorIds}
              redirectUrl={RouteName.SITE_CREATION_SCREEN}
              // redirectParams={new URLSearchParams()}
              Ref={supervisorBottomSheetRef}
              navigation={navigation}
            />
          </CustomBottomSheet>

          <CustomBottomSheet
            ref={contactBottomSheetRef}
            title="Contacts"
            onClose={() => contactBottomSheetRef.current.close()}
            scrollview={true}>
            <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
          </CustomBottomSheet>
        </ScrollView>
      </KeyboardAvoidingView>
      <ToastNotification />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
});

export {SiteCreationScreen};
