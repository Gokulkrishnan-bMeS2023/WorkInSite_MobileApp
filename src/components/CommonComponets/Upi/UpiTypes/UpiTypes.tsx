import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {UpiEditDeleteButtons} from '../UpiEditDeleteButtons/UpiEditDeleteButtons';
import {Icons} from './UpiTypesIcon';
import {Colors} from '../../../../utils';
import {UpiTypes as UpipProps} from '../DTOs/DTOs';

// Unified Prop Type
interface UpiTypesProp<T> {
  details: T; // Accepts either supplierDetails or workerDetails
  setDetails: any; // Setter function
}

const UpiTypes = <
  T extends {upiDetails: {upiType: UpipProps; value: string}[]},
>({
  details,
  setDetails,
}: UpiTypesProp<T>) => {
  return (
    <>
      {details.upiDetails.map((item, index) => (
        <React.Fragment key={index}>
          {item.value && (
            <View style={styles.row}>
              <View style={styles.iconTextContainer}>
                <View style={styles.icon}>
                  {Icons[item.upiType] || Icons.DEFAULT}
                </View>
                <Text style={styles.text}>{item.value}</Text>
              </View>
              <UpiEditDeleteButtons
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 8,
    width: '100%',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.grayColor,
    flexShrink: 1,
  },
});

export {UpiTypes};
