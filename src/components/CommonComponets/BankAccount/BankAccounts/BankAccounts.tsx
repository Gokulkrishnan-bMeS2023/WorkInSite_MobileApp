import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BankAccountEditDeleteButtons} from '../BankAccountEditDeleteButtons/BankAccountEditDeleteButtons';
import images from '../../../..';
import {Colors} from '../../../../utils';
// import {BankAccountsProp} from './DTOs';

// Define a unified type for worker and supplier details
interface DynamicBankAccountsProp {
  details: {
    bankAccounts: {
      accountName: string;
      accountNumber: string;
      ifscCode: string;
    }[];
  };
  // setDetails: React.Dispatch<
  //   React.SetStateAction<{
  //     bankAccounts: { accountName: string; accountNumber: string; ifscCode: string }[];
  //   }>
  // >;
  setDetails: any;
}

const BankAccounts = (props: DynamicBankAccountsProp) => {
  const {details, setDetails} = props;

  return (
    <>
      {details.bankAccounts.map((item, index) => (
        <React.Fragment key={index}>
          {item.accountName && (
            <View style={styles.container}>
              <View style={styles.infoContainer}>
                <Image
                  source={images.bank_account_img}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{item.accountName}</Text>
                  <Text style={styles.label}>{item.accountNumber}</Text>
                  <Text style={styles.label}>{item.ifscCode}</Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.link}>View More</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <BankAccountEditDeleteButtons
                details={details}
                setDetails={setDetails}
                selectedItem={{id: index, item}}
              />
            </View>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 26,
  },
  textContainer: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.grayColor,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export {BankAccounts};
