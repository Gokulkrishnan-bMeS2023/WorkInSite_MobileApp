import React, {useCallback, useRef} from 'react';
import {View, ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Header from '../../../components/CommonComponets/Header/Header';
import {useSupplierEdit} from './useSupplierEdit';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import {Colors} from '../../../utils';
import Button from '../../../components/CommonComponets/Button/Button';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import commonStyle from '../../../styles/commonStyle';
import {ContactDetailForm} from '../../../components/CommonComponets/ContactDetailForm/ContactDetailForm';
import {KycTypes} from '../../../components/CommonComponets/Kyc/KycTypes/KycTypes';
import {BankAccounts} from '../../../components/CommonComponets/BankAccount/BankAccounts/BankAccounts';
import {UpiTypes} from '../../../components/CommonComponets/Upi/UpiTypes/UpiTypes';
import {KycCreateForm} from '../../../components/CommonComponets/Kyc/KycCreateForm/KycCreateForm';
import {BankAccountCreateForm} from '../../../components/CommonComponets/BankAccount/BankAccountCreateForm/BankAccountCreateForm';
import {UpiCreateForm} from '../../../components/CommonComponets/Upi/UpiCreateForm/UpiCreateForm';
import {nameRegex} from '../../../utils/regex';
import Loader from '../../../components/Loader/Loader';

const SupplierEditScreen = ({route, navigation}: any) => {
  const {id} = route.params;

  const {
    name,
    setName,
    notes,
    setNotes,
    isActive,
    setIsActive,
    supplierDetails,
    setSupplierDetails,
    error,
    handleSubmission,
    isKycAddDisabled,
    isBankAccountsAddDisabled,
    isUpiAddDisabled,
    contactDetails,
    contactId,
    handleContactCreate,
    handleContactChange,
    fetchContacts,
    contact,
    primaryContactDetails,
    hasMoreDetails,
    handleContactEdit,
    loading,
    handleBackPress,
    hasChanges,
  } = useSupplierEdit(id as string, navigation, route);

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
    }, [hasChanges]),
  );

  if (loading) {
    return <Loader />;
  }
  const handleMoreDetails = () => {
    contactSheetRef.current?.open();
  };

  return (
    <>
      <Header title="Edit Supplier" onBackPress={handleBackPress} />
      <ScrollView
        style={commonStyle.container}
        keyboardShouldPersistTaps="handled">
        <View style={commonStyle.inputfieldContainer}>
          {supplierDetails.name && (
            <Input
              title="Name"
              placeholder="Enter supplier name"
              value={name}
              onChangeText={setName}
              errorMessage={error.name}
              required
              regex={nameRegex}
            />
          )}
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
            <KycTypes
              details={supplierDetails}
              setDetails={setSupplierDetails}
            />
          </View>
          <View>
            <FormActionButton
              heading="Bank Accounts"
              iconType="plus-circle"
              onClick={() => bankAccountSheetRef.current?.open()}
              isIconDisabled={isBankAccountsAddDisabled}
            />
            <BankAccounts
              details={supplierDetails}
              setDetails={setSupplierDetails}
            />
          </View>
          <View>
            <FormActionButton
              heading="UPIs"
              iconType="plus-circle"
              onClick={() => upiSheetRef.current?.open()}
              isIconDisabled={isUpiAddDisabled}
            />
            <UpiTypes
              details={supplierDetails}
              setDetails={setSupplierDetails}
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
              details={supplierDetails}
              setDetails={setSupplierDetails}
              Ref={kycSheetRef}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={bankAccountSheetRef}
            title="Bank Account"
            onClose={() => bankAccountSheetRef.current.close()}>
            <BankAccountCreateForm
              details={supplierDetails}
              setDetails={setSupplierDetails}
              Ref={bankAccountSheetRef}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={upiSheetRef}
            title="UPI Type"
            onClose={() => upiSheetRef.current.close()}>
            <UpiCreateForm
              details={supplierDetails}
              setDetails={setSupplierDetails}
              Ref={upiSheetRef}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={contactSheetRef}
            title="Contacts"
            scrollview={true}
            onClose={() => contactSheetRef.current.close()}>
            <ContactsEditForm contact={contact} onEdit={handleContactEdit} />
          </CustomBottomSheet>
        </View>
      </ScrollView>
    </>
  );
};

export default SupplierEditScreen;
