// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Icons} from './KycTypesIcon';
// import {ClientDetailsType} from '../../../../screens/Clients/DTOs/ClientDetails';
// import {KycEditDeleteButtons} from '../KycEditDeleteButtons/KycEditDeleteButtons';
// import {displayWithSegments} from '../../../../utils/app';
// import {Colors} from '../../../../utils';

// enum KYCTypes {
//   AADHAAR = 'AADHAAR',
//   PAN = 'PAN',
//   GST = 'GST',
// }

// interface KYCDetail {
//   kycType: KYCTypes;
//   value: string;
// }

// interface KycDetails {
//   kycDetails: KYCDetail[];
// }

// interface KycTypesProps {
//   details: KycDetails;
//   // setDetails: React.Dispatch<React.SetStateAction<KycDetailsContainer>>;
//   setDetails: any;
//   // typesConfig?: Record<string, (value: string) => string>; // Optional custom formatting for types
// }

// const KycTypes: React.FC<KycTypesProps> = ({details, setDetails}) => {
//   return (
//     <>
//       {details.kycDetails.map((item, index) => (
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
//                 details={details}
//                 setDetails={setDetails}
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
//   },
//   containerColsTwo: {
//     width: '100%',
//   },
//   iconAndLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   label: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: Colors.grayColor,
//   },
// });

// export {KycTypes};

//2

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icons} from './KycTypesIcon';
import {KycEditDeleteButtons} from '../KycEditDeleteButtons/KycEditDeleteButtons';
import {displayWithSegments} from '../../../../utils/app';
import {Colors} from '../../../../utils';
import {KycDetails, KYCTypes} from '../DTOs/DTOs';

interface KycTypesProps {
  details: KycDetails;
  setDetails: any; // Optional custom formatting for types
}

const KycTypes: React.FC<KycTypesProps> = ({details, setDetails}) => {
  return (
    <>
      {details.kycDetails.map((item, index) => (
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
    alignItems: 'flex-start',
  },
  containerColsTwo: {
    width: '100%',
  },
  iconAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.grayColor,
  },
});

export {KycTypes};
