import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BankAccountEditDeleteButtons} from '../BankAccountEditDeleteButtons/BankAccountEditDeleteButtons';
import {BankAccountsProp} from './DTOs';
import {Colors} from '../../../utils';
import images from '../../..';

const BankAccounts = (props: BankAccountsProp) => {
  const {supplierDetails, setSupplierDetails} = props;

  return (
    <>
      {supplierDetails.bankAccounts.map((item, index) => (
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
                supplierDetails={supplierDetails}
                setSupplierDetails={setSupplierDetails}
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
    fontSize: 14,
    color: Colors.black,
  },
  link: {
    fontSize: 14,
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
});

export {BankAccounts};
