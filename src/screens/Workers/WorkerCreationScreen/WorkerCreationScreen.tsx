import {BackHandler, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {useWorkerCreation} from './useWorkerCreation';
import {Colors} from '../../../utils';
import Header from '../../../components/CommonComponets/Header/Header';
import {Input} from '../../../components/CommonComponets';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {KycTypes} from '../KycTypes/KycTypes';
import {BankAccounts} from '../BankAccounts/BankAccounts';
import {UpiTypes} from '../UpiTypes/UpiTypes';
import {BankAccountCreateForm} from '../BankAccountCreateForm/BankAccountCreateForm';
import {UpiCreateForm} from '../UpiCreateForm/UpiCreateForm';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import {KycCreateForm} from '../KycCreateForm/KycCreateForm';
import Button from '../../../components/CommonComponets/Button/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';

const WorkerCreationScreen = ({navigation, route}: any) => {
  const {
    name,
    setName,
    dateOfBirth,
    setDateOfBirth,
    genderItems,
    gender,
    setGender,
    notes,
    setNotes,
    workerDetails,
    setWorkerDetails,
    error,
    handleSubmission,
    isKycAddDisabled,
    isBankAccountsAddDisabled,
    isUpiAddDisabled,
    contactDetails,
    workerCategoryDetails,
    contactId,
    workerCategoryId,
    handleWorkerCategoryCreate,
    handleWorkerCategoryEdit,
    handleContactCreate,
    handleContactEdit,
    handleContactChange,
    handleWorkerCategoryChange,
    fetchContacts,
    fetchWorkerCategories,
    contact,
    workerCategory,
    primaryContactDetails,
    hasMoreDetails,
    handleBackPress,
    hasUnsavedChanges,
  } = useWorkerCreation({navigation, route});

  const kycSheetRef = useRef<any>(null);
  const bankAccountSheetRef = useRef<any>(null);
  const upiSheetRef = useRef<any>(null);
  const contactSheetRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  return (
    <>
      <Header title="Create Worker" onBackPress={handleBackPress} />
      <ScrollView style={styles.parentContainer}>
        <View style={styles.container}>
          {/* Name Input */}
          <Input
            title="Name"
            placeholder="Enter supplier name"
            value={name}
            onChangeText={setName}
            errorMessage={error.name}
            required
          />
          {/* Date of Birth Input */}
          <Input
            title="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            errorMessage={error.dateOfBirth}
            required={true}
            maxLength={10}
            // inputType='phone-pad'
          />

          {/* Contact Combobox */}
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
          {/* Worker Combobox */}
          <Combobox
            label="Worker Category"
            showCreateButton={true}
            items={workerCategoryDetails}
            selectedValue={workerCategoryId}
            onCreate={handleWorkerCategoryCreate}
            onValueChange={handleWorkerCategoryChange}
            onSearch={fetchWorkerCategories}
            required={true}
            errorMessage={error.workerCategoryId}
          />

          {/* Primary Contact Details */}
          {contactId && (
            <>
              <FormActionButton
                heading="Contact detail"
                iconType="edit"
                onClick={handleContactEdit}
              />

              <ContactTypes
                contactList={primaryContactDetails}
                showEditDeleteButtons={false}
              />
              {hasMoreDetails && (
                <Text
                  style={styles.viewMore}
                  onPress={() => contactSheetRef.current?.open()}>
                  More details...
                </Text>
              )}
            </>
          )}
          {workerCategoryId && (
            <View>
              <FormActionButton
                heading="Worker Category detail"
                iconType="edit"
                onClick={handleWorkerCategoryEdit}
              />
              <View style={styles.wokerDetails}>
                <Icon style={styles.wokerIcon} name="account-hard-hat" />
                <Text style={styles.wokerText}>
                  {workerCategory.workerCategoryName}
                </Text>
              </View>
            </View>
          )}

          {/* Gender */}
          <RadioButtonGroup
            label="Gender"
            items={genderItems}
            selectedValue={gender}
            onValueChange={setGender}
            errorMessage={error.gender}
            required={true}
          />

          {/* Notes Input */}
          <Textarea
            label="Notes"
            placeholder="Enter your notes"
            value={notes}
            onChange={setNotes}
          />

          {/* KYC Section */}
          <View>
            <FormActionButton
              heading="KYC"
              iconType="add-circle"
              onClick={() => kycSheetRef.current?.open()}
              isIconDisabled={isKycAddDisabled}
            />
            <KycTypes
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
            />
          </View>

          {/* Bank Accounts Section */}
          <View>
            <FormActionButton
              heading="Bank Accounts"
              iconType="add-circle"
              onClick={() => bankAccountSheetRef.current?.open()}
              isIconDisabled={isBankAccountsAddDisabled}
            />
            <BankAccounts
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
            />
          </View>

          {/* UPI Section */}
          <View>
            <FormActionButton
              heading="UPIs"
              iconType="add-circle"
              onClick={() => upiSheetRef.current?.open()}
              isIconDisabled={isUpiAddDisabled}
            />
            <UpiTypes
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
            />
          </View>

          {/* Save and Cancel Buttons */}
          <Button
            buttonStyle={{marginTop: 10}}
            title="Save"
            onPress={handleSubmission}
          />
          {/* KYC Bottom Sheet */}

          <CustomBottomSheet
            ref={kycSheetRef}
            title="KYC Type"
            onClose={() => kycSheetRef.current.close()}>
            <KycCreateForm
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
              Ref={kycSheetRef}
            />
          </CustomBottomSheet>
          {/* Bank Account Bottom Sheet */}
          <CustomBottomSheet
            ref={bankAccountSheetRef}
            title="Bank Account"
            onClose={() => bankAccountSheetRef.current.close()}>
            <BankAccountCreateForm
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
              Ref={bankAccountSheetRef}
            />
          </CustomBottomSheet>

          {/* UPI Bottom Sheet */}
          <CustomBottomSheet
            ref={upiSheetRef}
            title="UPI Type"
            onClose={() => upiSheetRef.current.close()}>
            <UpiCreateForm
              workerDetails={workerDetails}
              setWorkerDetails={setWorkerDetails}
              Ref={upiSheetRef}
            />
          </CustomBottomSheet>

          {/* Contact Bottom Sheet */}
          <CustomBottomSheet
            ref={contactSheetRef}
            title="Contacta"
            onClose={() => contactSheetRef.current.close()}>
            <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
          </CustomBottomSheet>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  viewMore: {
    fontSize: 16,
    color: Colors.secondaryColor,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  wokerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 6,
  },
  wokerText: {
    fontSize: 16,
    color: Colors.black,
  },
  wokerIcon: {
    fontSize: 24,
    color: Colors.secondaryColor,
  },
});

export default WorkerCreationScreen;
