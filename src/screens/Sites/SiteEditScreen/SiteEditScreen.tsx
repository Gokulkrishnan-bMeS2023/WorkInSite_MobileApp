import React, {useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler, // Import ActivityIndicator for loading spinner
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {SupervisorAddForm} from '../SupervisorAddForm/SupervisorAddForm';
import {SupervisorListForm} from '../SupervisorListForm/SupervisorListForm';
import {useSiteEdit} from './UseSiteEdit';
import Button from '../../../components/CommonComponets/Button/Button';
import Header from '../../../components/CommonComponets/Header/Header';
import Input from '../../../components/CommonComponets/Input/input';

import {ContactDetailForm} from '../ContactDetailForm/ContactDetailForm';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';
import RouteName from '../../../navigation/RouteName';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';

const SiteEditScreen = ({navigation, route}: any) => {
  const {id} = route.params;

  const {
    name,
    setName,
    clientDetails,
    clientId,
    setClientId,
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
    status,
    setStatus,
    siteStatus,
    siteDetails,
    loading,
    handleBackPress,
  } = useSiteEdit(id, {navigation});

  const handleBack = () => {
    navigation.navigate(RouteName.SITE_LIST_SCREEN);
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Edit Site" onBackPress={handleBack} />

      <KeyboardAvoidingView enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 80}}>
          {siteDetails && (
            <View style={styles.formContainer}>
              <View style={styles.fieldContainer}>
                <Input
                  title="Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  required
                  errorMessage={error.name}
                />
              </View>

              <View style={styles.fieldContainer}>
                <Combobox
                  label="Client"
                  showCreateButton
                  items={clientDetails}
                  selectedValue={clientId}
                  onCreate={handleClientCreate}
                  onValueChange={handleClientChange}
                  onSearch={fetchClients}
                  required
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
                  showCreateButton
                  items={contactDetails}
                  selectedValue={contactId}
                  onCreate={handleContactCreate}
                  onValueChange={handleContactChange}
                  onSearch={fetchContacts}
                  required
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
                required
              />
              {supervisorIds.length !== 0 && (
                <SupervisorListForm
                  supervisorIds={supervisorIds}
                  setSupervisorIds={setSupervisorIds}
                />
              )}

              <View style={styles.fieldContainer}>
                <RadioButtonGroup
                  label="Status"
                  items={siteStatus}
                  selectedValue={status}
                  onValueChange={setStatus}
                />
              </View>

              <Button title="Save" onPress={handleSubmission} />
            </View>
          )}
          <CustomBottomSheet
            ref={contactBottomSheetRef}
            title="Contacts"
            scrollview={true}
            onClose={() => contactBottomSheetRef.current.close()}>
            <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
          </CustomBottomSheet>

          <CustomBottomSheet
            ref={supervisorBottomSheetRef}
            title="Supervisors"
            onClose={() => supervisorBottomSheetRef.current.close()}>
            <SupervisorAddForm
              supervisorIds={supervisorIds}
              setSupervisorIds={setSupervisorIds}
              redirectUrl={RouteName.SITE_EDIT_SCREEN}
              Ref={supervisorBottomSheetRef}
              navigation={navigation}
            />
          </CustomBottomSheet>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SiteEditScreen;
