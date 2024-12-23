import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {UpiEditDeleteButtons} from '../UpiEditDeleteButtons/UpiEditDeleteButtons';
import {UpiTypesProp} from './DTOs';
import {Icons} from '../../Suppliers/UpiTypes/UpiTypesIcon';

const UpiTypes = (props: UpiTypesProp) => {
  const {workerDetails, setWorkerDetails} = props;

  return (
    <>
      {workerDetails.upiDetails.map((item, index) => (
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
                workerDetails={workerDetails}
                setWorkerDetails={setWorkerDetails}
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
    flexShrink: 1,
  },
});

export {UpiTypes};
