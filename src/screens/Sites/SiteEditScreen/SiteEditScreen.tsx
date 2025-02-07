import React, {useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler, // Import ActivityIndicator for loading spinner
} from 'react-native';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {SupervisorAddForm} from '../SupervisorAddForm/SupervisorAddForm';
import {SupervisorListForm} from '../SupervisorListForm/SupervisorListForm';
import {useSiteEdit} from './UseSiteEdit';
import Button from '../../../components/CommonComponets/Button/Button';
import Header from '../../../components/CommonComponets/Header/Header';
import Input from '../../../components/CommonComponets/Input/input';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';
import RouteName from '../../../navigation/RouteName';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {useFocusEffect} from '@react-navigation/native';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import commonStyle from '../../../styles/commonStyle';
import {nameRegex} from '../../../utils/regex';
import Loader from '../../../components/Loader/Loader';

const SiteEditScreen = ({navigation, route}: any) => {
  const {id} = route.params;

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
    status,
    setStatus,
    siteStatus,
    siteDetails,
    loading,
    handleBackPress,
    hasUnsavedChanges,
  } = useSiteEdit(id, {navigation});

  const supervisorSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);

  const handleSupervisorsAdd = () => {
    supervisorSheetRef.current?.open();
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
      <Header title="Edit Site" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 80}}>
            {siteDetails && (
              <View style={commonStyle.inputfieldContainer}>
                <Input
                  title="Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  required
                  errorMessage={error.name}
                  regex={nameRegex}
                />
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
                <Textarea
                  label="Google Location"
                  placeholder="Enter google location"
                  required
                  showLocationLink
                  value={googleLocation}
                  onChange={setGoogleLocation}
                  errorMessage={error.googleLocation}
                />
                <Textarea
                  label="Notes"
                  value={notes}
                  onChange={setNotes}
                  placeholder="Enter notes"
                />
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
                {contactId && (
                  <>
                    <ContactDetailForm
                      handleContactEdit={handleContactEdit}
                      primaryContactDetails={primaryContactDetails}
                      hasMoreDetails={hasMoreDetails}
                      handleMoreDetails={() => contactSheetRef.current?.open()}
                    />
                  </>
                )}
                <FormActionButton
                  heading="Supervisors"
                  iconType="plus-circle"
                  onClick={handleSupervisorsAdd}
                  required
                />
                {supervisorIds.length !== 0 && (
                  <SupervisorListForm
                    supervisorIds={supervisorIds}
                    setSupervisorIds={setSupervisorIds}
                  />
                )}
                <RadioButtonGroup
                  label="Status"
                  items={siteStatus}
                  selectedValue={status}
                  onValueChange={setStatus}
                />

                <Button title="Save" onPress={handleSubmission} />
            <CustomBottomSheet
              ref={contactSheetRef}
              title="Contacts"
              scrollview={true}
              onClose={() => contactSheetRef.current.close()}>
              <ContactsEditForm 
                contact={contact} onEdit={handleContactEdit} />
            </CustomBottomSheet>

            <CustomBottomSheet
              ref={supervisorSheetRef}
              title="Supervisors"
              onClose={() => supervisorSheetRef.current.close()}>
              <SupervisorAddForm
                supervisorIds={supervisorIds}
                setSupervisorIds={setSupervisorIds}
                redirectUrl={RouteName.SITE_EDIT_SCREEN}
                Ref={supervisorSheetRef}
                navigation={navigation}
              />
            </CustomBottomSheet>
             </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default SiteEditScreen;
