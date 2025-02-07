import {StyleSheet, View} from 'react-native';
import {useBankAccountEditForm} from './useBankAccountEditForm';
import Input from '../../Input/input';
import Button from '../../Button/Button';


const BankAccountEditForm = <T extends {bankAccounts: any[]}>(
  props: BankAccountEditFormProps<T>,
) => {
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
    gap: 16, // Native gap simulation
  },
});

export {BankAccountEditForm};
