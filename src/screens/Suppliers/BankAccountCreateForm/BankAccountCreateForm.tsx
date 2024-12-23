import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useBankAccountCreateForm} from './useBankAccountCreateForm';
import {SupplierDetailsType} from '../DTOs/SupplierDetails';
import {Input} from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';

const BankAccountCreateForm = (props: SupplierDetailsType) => {
  const {
    accountName,
    setAccountName,
    accountNumber,
    setAccountNumber,
    ifscCode,
    setIfscCode,
    error,
    handleAdd,
  } = useBankAccountCreateForm(props);

  return (
    <View style={styles.container}>
      <Input
        value={accountName}
        onChangeText={setAccountName}
        placeholder="Account name"
        maxLength={75}
        title=""
        errorMessage={error.accountName}
      />
      <Input
        value={accountNumber}
        onChangeText={setAccountNumber}
        maxLength={18}
        placeholder="Account number"
        errorMessage={error.accountNumber}
      />
      <Input
        value={ifscCode}
        onChangeText={setIfscCode}
        maxLength={11}
        placeholder="IFSC Code"
        errorMessage={error.ifscCode}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16, // Native gap simulation, alternative to "gap-4" in web
  },
});

export {BankAccountCreateForm};
