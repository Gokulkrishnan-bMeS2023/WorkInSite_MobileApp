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
import {useSupplierEdit} from './useSupplierEdit';
import {FormActionButton} from '../../Contacts/FormActionButton/FormActionButton';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import {ContactsEditForm} from '../../Clients/ContactsEditForm/ContactsEditForm';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import {Colors} from '../../../utils';
import Button from '../../../components/CommonComponets/Button/Button';
import {useFocusEffect} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';

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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <>
      <Header title="Edit Supplier" onBackPress={handleBackPress} />
      <ScrollView style={styles.parentContainer}>
        <View style={styles.container}>
          {supplierDetails.name && (
            <Input
              title="Name"
              placeholder="Enter supplier name"
              value={name}
              onChangeText={setName}
              errorMessage={error.name}
              required
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
    fontWeight: 'bold',
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export default SupplierEditScreen;
