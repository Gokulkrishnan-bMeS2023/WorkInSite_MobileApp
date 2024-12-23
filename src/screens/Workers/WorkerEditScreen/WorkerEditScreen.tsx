import React, {useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Header from '../../../components/CommonComponets/Header/Header';
import {KycCreateForm} from '../KycCreateForm/KycCreateForm';
import {BankAccountCreateForm} from '../BankAccountCreateForm/BankAccountCreateForm';
import {UpiCreateForm} from '../UpiCreateForm/UpiCreateForm';
import {KycTypes} from '../KycTypes/KycTypes';
import {BankAccounts} from '../BankAccounts/BankAccounts';
import {UpiTypes} from '../UpiTypes/UpiTypes';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import {Colors} from '../../../utils';
import Button from '../../../components/CommonComponets/Button/Button';
import {useWorkerEdit} from './useWorkerEdit';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';

const WorkerEditScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const {
    name,
    setName,
    dateOfBirth,
    gender,
    setDateOfBirth,
    genderItems,
    setGender,
    notes,
    setNotes,
    isActive,
    setIsActive,
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
    loading,
    handleBackPress,
    hasUnsavedChanges,
  } = useWorkerEdit(id as string, navigation, route);

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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <>
      <Header title="Edit Worker" onBackPress={handleBackPress} />
      <ScrollView style={styles.parentContainer}>
        <View style={styles.container}>
          {workerDetails.name && (
            <Input
              title="Name"
              placeholder="Enter worker name"
              value={name}
              onChangeText={setName}
              errorMessage={error.name}
              required
            />
          )}
          <Input
            title="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            errorMessage={error.dateOfBirth}
            required={true}
            maxLength={10}
          />
          {/* {(workerDetails as Supplier).contact.id && ( */}
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
          <Combobox
            label="Worker Category"
            showCreateButton={true}
            items={workerCategoryDetails}
            selectedValue={workerCategoryId}
            onCreate={handleWorkerCategoryCreate}
            onValueChange={handleWorkerCategoryChange}
            onSearch={fetchWorkerCategories}
            required={true}
          />

          {/* )} */}
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

          <RadioButtonGroup
            label="Gender"
            items={genderItems}
            selectedValue={gender}
            onValueChange={setGender}
            errorMessage={error.gender}
            required={true}
          />

          {notes !== undefined && (
            <Textarea
              label="Notes"
              placeholder="Enter your notes"
              value={`${notes ? notes : ''}`}
              onChange={setNotes}
            />
          )}
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
          <Switch
            label="Is Active"
            value={isActive}
            onValueChange={setIsActive}
          />
          <Button title="Save" onPress={handleSubmission} />
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
    backgroundColor: '#fff',
    gap: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default WorkerEditScreen;
