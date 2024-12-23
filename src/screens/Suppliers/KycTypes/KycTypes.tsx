// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Icons} from './KycTypesIcon';
// import {kycTypesProp} from './DTOs';
// // import { KYCTypes } from "../../../screens/clients/DTOs/ClientProps";
// import {KycEditDeleteButtons} from '../KycEditDeleteButtons/KycEditDeleteButtons';
// import {displayWithSegments} from '../../../utils/app';

// enum KYCTypes {
//   AADHAAR = 'AADHAAR',
//   PAN = 'PAN',
//   GST = 'GST',
// }
// const KycTypes = (props: kycTypesProp) => {
//   const {supplierDetails, setSupplierDetails, isColsTwo = false} = props;

//   return (
//     <>
//       {supplierDetails.kycDetails.map((item, index) => (
//         <React.Fragment key={index}>
//           {item.value && (
//             <View style={[styles.container, styles.containerColsTwo]}>
//               <View style={styles.iconAndLabel}>
//                 {Icons[item.kycType] || Icons.DEFAULT}
//                 <Text style={styles.label}>
//                   {item.kycType === KYCTypes.AADHAAR
//                     ? displayWithSegments(item.value, 4)
//                     : item.value}
//                 </Text>
//               </View>
//               <KycEditDeleteButtons
//                 supplierDetails={supplierDetails}
//                 setSupplierDetails={setSupplierDetails}
//                 selectedItem={{id: index, item}}
//               />
//             </View>
//           )}
//         </React.Fragment>
//       ))}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 10,
//   },
//   containerColsTwo: {
//     width: '100%',
//   },
//   iconAndLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   label: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#000',
//   },
// });

// export {KycTypes};

//2

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icons} from './KycTypesIcon';
import {kycTypesProp} from './DTOs';
// import { KYCTypes } from "../../../screens/clients/DTOs/ClientProps";
import {KycEditDeleteButtons} from '../KycEditDeleteButtons/KycEditDeleteButtons';
import {displayWithSegments} from '../../../utils/app';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}
const KycTypes = (props: kycTypesProp) => {
  const {supplierDetails, setSupplierDetails} = props;

  return (
    <>
      {supplierDetails.kycDetails.map((item, index) => (
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
