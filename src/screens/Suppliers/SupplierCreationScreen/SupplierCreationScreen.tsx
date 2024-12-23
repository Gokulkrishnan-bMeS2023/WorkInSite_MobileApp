import React, {useCallback, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';
import {Input} from '../../../components/CommonComponets';
import {useSupplierCreation} from './useSupplierCreation';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {Colors} from '../../../utils';
import Header from '../../../components/CommonComponets/Header/Header';
import {KycCreateForm} from '../KycCreateForm/KycCreateForm';
import {BankAccountCreateForm} from '../BankAccountCreateForm/BankAccountCreateForm';
import {UpiCreateForm} from '../UpiCreateForm/UpiCreateForm';
import {KycTypes} from '../KycTypes/KycTypes';
import {BankAccounts} from '../BankAccounts/BankAccounts';
import {UpiTypes} from '../UpiTypes/UpiTypes';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import Button from '../../../components/CommonComponets/Button/Button';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

const SupplierCreationScreen = ({navigation, route}: any) => {
  const {
    name,
    setName,
    notes,
    setNotes,
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
    handleBackPress,
    hasUnsavedChanges,
  } = useSupplierCreation({navigation, route});

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
      <Header title="Create Supplier" onBackPress={handleBackPress} />
      <ScrollView style={styles.parentContainer}>
        <View style={styles.container}>
          <Input
            title="Name"
            placeholder="Enter supplier name"
            value={name}
            onChangeText={setName}
            errorMessage={error.name}
            required
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
          <Textarea
            label="Notes"
            placeholder="Enter your notes"
            value={notes}
            onChange={setNotes}
          />
          <View>
            <FormActionButton
              heading="KYC"
              iconType="add-circle"
              onClick={() => kycSheetRef.current?.open()}
              isIconDisabled={isKycAddDisabled}
            />
            <KycTypes
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
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
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
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
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
            />
          </View>
          <Button title="Save" onPress={handleSubmission} />
          <CustomBottomSheet
            ref={kycSheetRef}
            title="KYC Type"
            onClose={() => kycSheetRef.current.close()}>
            <KycCreateForm
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
              Ref={kycSheetRef}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={bankAccountSheetRef}
            title="Bank Account"
            onClose={() => bankAccountSheetRef.current.close()}>
            <BankAccountCreateForm
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
              Ref={bankAccountSheetRef}
            />
          </CustomBottomSheet>
          <CustomBottomSheet
            ref={upiSheetRef}
            title="UPI Type"
            onClose={() => upiSheetRef.current.close()}>
            <UpiCreateForm
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
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
});

export default SupplierCreationScreen;
