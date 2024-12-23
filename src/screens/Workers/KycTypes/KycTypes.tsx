import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import { KYCTypes } from "../../../screens/clients/DTOs/ClientProps";
import {KycEditDeleteButtons} from '../KycEditDeleteButtons/KycEditDeleteButtons';
import {displayWithSegments} from '../../../utils/app';
import {Icons} from '../../Suppliers/KycTypes/KycTypesIcon';
import {kycTypesProp} from '../KycTypes/DTOs';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}
const KycTypes = (props: kycTypesProp) => {
  const {workerDetails, setWorkerDetails} = props;

  return (
    <>
      {workerDetails.kycDetails.map((item, index) => (
        <React.Fragment key={index}>
          {item.value && (
            <View style={[styles.container, styles.containerColsTwo]}>
              <View style={styles.iconAndLabel}>
                {Icons[item.kycType] || Icons.DEFAULT}
                <Text style={styles.label}>
                  {item.kycType === KYCTypes.AADHAAR
                    ? displayWithSegments(item.value, 4)
                    : item.value}
                </Text>
              </View>
              <KycEditDeleteButtons
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  containerColsTwo: {
    width: '100%',
  },
  iconAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
});

export {KycTypes};
