import {StyleSheet, View} from 'react-native';
import {BankAccountEditFormProps} from './DTOs';
import {useBankAccountEditForm} from './useBankAccountEditForm';
import Button from '../../../components/CommonComponets/Button/Button';
import {Input} from '../../../components/CommonComponets';

const BankAccountEditForm = (props: BankAccountEditFormProps) => {
  const {
    accountName,
    setAccountName,
    accountNumber,
    setAccountNumber,
    ifscCode,
    setIfscCode,
    error,
    handleUpdate,
  } = useBankAccountEditForm(props);

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
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16, // Native gap simulation, alternative to "gap-4" in web
  },
});

export {BankAccountEditForm};