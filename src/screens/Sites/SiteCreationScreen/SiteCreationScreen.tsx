import React, {useCallback, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Input from '../../../components/CommonComponets/Input/input';
import Button from '../../../components/CommonComponets/Button/Button';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import Header from '../../../components/CommonComponets/Header/Header';
import {SupervisorAddForm} from '../SupervisorAddForm/SupervisorAddForm';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {SupervisorListForm} from '../SupervisorListForm/SupervisorListForm';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import RouteName from '../../../navigation/RouteName';
import {useSiteCreation} from './useSiteCreation';
import commonStyle from '../../../styles/commonStyle';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import {nameRegex} from '../../../utils/regex';

const SiteCreationScreen = ({navigation, route}: any) => {
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
    contactDetails,
    contact,
    contactId,
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
    hasUnsavedChanges,
  } = useSiteCreation({navigation});

  const supervisorBottomSheetRef = useRef<any>(null);
  const contactBottomSheetRef = useRef<any>(null);
  const isFocused = useIsFocused();

  // Handle BottomSheet reset on screen focus
  useEffect(() => {
    if (isFocused) {
      supervisorBottomSheetRef.current?.close();
      contactBottomSheetRef.current?.close();
    }
  }, [isFocused]);

  // Handle data from route.params
  useEffect(() => {
    if (route.params?.newSupervisor) {
      const {newSupervisor} = route.params;
      setSupervisorIds(prev => [...prev, newSupervisor.id]);
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  const handleSupervisorsAdd = () => {
    supervisorBottomSheetRef.current?.open();
  };

  const handleMoreDetails = () => {
    contactBottomSheetRef.current?.open();
  };

  return (
    <>
      <Header title="Create Site" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 80}}>
            <View style={commonStyle.inputfieldContainer}>
              <Input
                title="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter site name"
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
                <ContactDetailForm
                  handleContactEdit={handleContactEdit}
                  primaryContactDetails={primaryContactDetails}
                  hasMoreDetails={hasMoreDetails}
                  handleMoreDetails={handleMoreDetails}
                />
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

              <Button title="Save" onPress={handleSubmission} />
            </View>

            {/* BottomSheet for Supervisors */}
            <CustomBottomSheet
              ref={supervisorBottomSheetRef}
              title="Add Supervisors"
              onClose={() => supervisorBottomSheetRef.current.close()}>
              <SupervisorAddForm
                supervisorIds={supervisorIds}
                setSupervisorIds={setSupervisorIds}
                redirectUrl={RouteName.SITE_CREATION_SCREEN}
                Ref={supervisorBottomSheetRef}
                navigation={navigation}
              />
            </CustomBottomSheet>

            <CustomBottomSheet
              ref={contactBottomSheetRef}
              title="Contacts"
              onClose={() => contactBottomSheetRef.current.close()}
              scrollview>
              <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
            </CustomBottomSheet>
          </ScrollView>
        </KeyboardAvoidingView>
        <ToastNotification />
      </View>
    </>
  );
};

export {SiteCreationScreen};
