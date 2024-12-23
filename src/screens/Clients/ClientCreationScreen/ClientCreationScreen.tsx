import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import Colors from '../../../utils/color';
import {useClientCreation} from './useClientCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import Input from '../../../components/CommonComponets/Input/input';
import Button from '../../../components/CommonComponets/Button/Button';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';

import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../ContactsEditForm/ContactsEditForm';
import {KycCreateForm} from '../KycCreateForm/KycCreateForm';
import {KycTypes} from '../KycTypes/KycTypes';

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
    handleBack,
  } = useClientCreation({navigation});

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Clean up the listener
  }, [handleBackPress]);

  const kycSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);

  const handleAdd = () => {
    kycSheetRef.current?.open();
  };

  const handleMoreDetails = () => {
    contactSheetRef.current?.open();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Create Client" onBackPress={handleBack} />
      <KeyboardAvoidingView enabled>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Input
              title="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              required={true}
              errorMessage={error.name}
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
              <>
                <View>
                  <FormActionButton
                    heading="Contact detail"
                    //  iconType="edit"
                    iconType="edit"
                    onClick={handleContactEdit}
                  />
                  <ContactTypes
                    contactList={primaryContactDetails}
                    showEditDeleteButtons={false}
                  />

                  {hasMoreDetails && (
                    <View>
                      <TouchableOpacity onPress={handleMoreDetails}>
                        <Text style={styles.link}>More details...</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </>
            )}

            <Textarea
              label="Notes"
              value={notes}
              onChange={setNotes}
              placeholder="Enter your notes"
            />
            <View style={styles.kycContainer}>
              <FormActionButton
                heading="KYC"
                iconType="add-circle"
                onClick={handleAdd}
                isIconDisabled={isAddDisabled}
              />
            </View>
            <KycTypes
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
            />
            <Button title="Save" onPress={handleSubmission} />

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

            {/* Contact Edit Bottom Sheet */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },

  kycContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    marginVertical: 6,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export {ClientCreationScreen};
