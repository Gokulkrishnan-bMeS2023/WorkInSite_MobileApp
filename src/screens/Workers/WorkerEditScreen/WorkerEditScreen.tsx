import React, {useCallback, useRef} from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Header from '../../../components/CommonComponets/Header/Header';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import {Colors} from '../../../utils';
import Button from '../../../components/CommonComponets/Button/Button';
import {useWorkerEdit} from './useWorkerEdit';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import RadioButtonGroup from '../../../components/CommonComponets/RadioButtonGroup/RadioButtonGroup';
import Icon from '../../../utils/VectorIcons';
import commonStyle from '../../../styles/commonStyle';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import {KycTypes} from '../../../components/CommonComponets/Kyc/KycTypes/KycTypes';
import {BankAccounts} from '../../../components/CommonComponets/BankAccount/BankAccounts/BankAccounts';
import {UpiTypes} from '../../../components/CommonComponets/Upi/UpiTypes/UpiTypes';
import {KycCreateForm} from '../../../components/CommonComponets/Kyc/KycCreateForm/KycCreateForm';
import {BankAccountCreateForm} from '../../../components/CommonComponets/BankAccount/BankAccountCreateForm/BankAccountCreateForm';
import {UpiCreateForm} from '../../../components/CommonComponets/Upi/UpiCreateForm/UpiCreateForm';
import {dobRegex, nameRegex} from '../../../utils/regex';
import Loader from '../../../components/Loader/Loader';

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
  const handleMoreDetails = () => {
    contactSheetRef.current?.open();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header title="Edit Worker" onBackPress={handleBackPress} />
      <ScrollView
        style={commonStyle.container}
        keyboardShouldPersistTaps="handled">
        <View style={commonStyle.inputfieldContainer}>
          {workerDetails.name && (
            <Input
              title="Name"
              placeholder="Enter worker name"
              value={name}
              onChangeText={setName}
              errorMessage={error.name}
              required
              regex={nameRegex}
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
            regex={dobRegex}
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
          {contactId && (
            <ContactDetailForm
              handleContactEdit={handleContactEdit}
              primaryContactDetails={primaryContactDetails}
              hasMoreDetails={hasMoreDetails}
              handleMoreDetails={handleMoreDetails}
            />
          )}

          {workerCategoryId && (
            <View>
              <FormActionButton
                heading="Worker Category detail"
                iconType="edit"
                onClick={handleWorkerCategoryEdit}
              />

              <View style={commonStyle.header}>
                <Icon
                  icon="MaterialCommunityIcons"
                  name="account-hard-hat"
                  size={24}
                  color={Colors.secondaryColor}
                />
                <Text style={commonStyle.labelText}>
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
              iconType="plus-circle"
              onClick={() => kycSheetRef.current?.open()}
              isIconDisabled={isKycAddDisabled}
            />
            <KycTypes details={workerDetails} setDetails={setWorkerDetails} />
          </View>
          <View>
            <FormActionButton
              heading="Bank Accounts"
              iconType="plus-circle"
              onClick={() => bankAccountSheetRef.current?.open()}
              isIconDisabled={isBankAccountsAddDisabled}
            />
            <BankAccounts
              details={workerDetails}
              setDetails={setWorkerDetails}
            />
          </View>
          <View>
            <FormActionButton
              heading="UPIs"
              iconType="plus-circle"
              onClick={() => upiSheetRef.current?.open()}
              isIconDisabled={isUpiAddDisabled}
            />
            <UpiTypes details={workerDetails} setDetails={setWorkerDetails} />
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
              details={workerDetails}
              setDetails={setWorkerDetails}
              Ref={kycSheetRef}
            />
          </CustomBottomSheet>
          {/* Bank Account Bottom Sheet */}
          <CustomBottomSheet
            ref={bankAccountSheetRef}
            title="Bank Account"
            onClose={() => bankAccountSheetRef.current.close()}>
            <BankAccountCreateForm
              details={workerDetails}
              setDetails={setWorkerDetails}
              Ref={bankAccountSheetRef}
            />
          </CustomBottomSheet>

          {/* UPI Bottom Sheet */}
          <CustomBottomSheet
            ref={upiSheetRef}
            title="UPI Type"
            onClose={() => upiSheetRef.current.close()}>
            <UpiCreateForm
              details={workerDetails}
              setDetails={setWorkerDetails}
              Ref={upiSheetRef}
            />
          </CustomBottomSheet>

          {/* Contact Bottom Sheet */}
          <CustomBottomSheet
            ref={contactSheetRef}
            title="Contacts"
            onClose={() => contactSheetRef.current.close()}
            scrollview={true}>
            <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
          </CustomBottomSheet>
        </View>
      </ScrollView>
    </>
  );
};

export default WorkerEditScreen;
