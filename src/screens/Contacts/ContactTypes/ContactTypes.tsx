import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ContactEditDeleteButtons} from '../ContactEditDeleteButtons/ContactEditDeleteButtons';
import {ContactTypesProps} from './DTOs';
import {Colors} from '../../../utils';
import Icon from '../../../utils/VectorIcons';
import Styles from '../../../styles/CreateAndEditScreenStyle'

const Icons: {[key: string]: JSX.Element} = {
  Phone: <Icon icon="MaterialCommunityIcons" name="phone" size={24} color={Colors.secondaryColor} />,
  Email: <Icon icon="MaterialCommunityIcons" name="email" size={24} color={Colors.secondaryColor} />,
  Address: <Icon icon="MaterialIcons" name="location-on" size={24} color={Colors.secondaryColor} />,
  DEFAULT: <Icon icon="MaterialIcons" name="info" size={24} color={Colors.secondaryColor} />,
};

const ContactTypes = (props: ContactTypesProps) => {
  const {contactList, setContactList, showEditDeleteButtons = true} = props;

  return (
    <>
      {contactList.contactDetails.map((item: any, index: any) => (
        <React.Fragment key={index}>
          {item.value && (
            <View
              style={[
                Styles.iconContainer,
                showEditDeleteButtons ? Styles.buttonWidht : Styles.buttonWidht,
              ]}>
              <View style={Styles.iconAndLabel}>
                <View>{Icons[item.contactType] || Icons.DEFAULT}</View>
                <Text style={Styles.labelStyle}>{item.value}</Text>
              </View>
              {showEditDeleteButtons && (
                <ContactEditDeleteButtons
                  contactList={contactList}
                  setContactList={setContactList}
                  selectedItem={{id: index, item}}
                />
              )}
            </View>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export {ContactTypes};






// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {ContactEditDeleteButtons} from '../ContactEditDeleteButtons/ContactEditDeleteButtons';
// import {ContactTypesProps} from './DTOs';
// import {Colors} from '../../../utils';
// import Icon from '../../../utils/VectorIcons';

// const Icons: {[key: string]: JSX.Element} = {
//   Phone: <Icon icon="MaterialCommunityIcons" name="phone" size={24} color={Colors.secondaryColor} />,
//   Email: <Icon icon="MaterialCommunityIcons" name="email" size={24} color={Colors.secondaryColor} />,
//   Address: <Icon icon="MaterialIcons" name="location-on" size={24} color={Colors.secondaryColor} />,
//   DEFAULT: <Icon icon="MaterialIcons" name="info" size={24} color={Colors.secondaryColor} />,
// };

// const ContactTypes = (props: ContactTypesProps) => {
//   const {contactList, setContactList, showEditDeleteButtons = true} = props;

//   return (
//     <>
//       {contactList.contactDetails.map((item: any, index: any) => (
//         <React.Fragment key={index}>
//           {item.value && (
//             <View
//               style={[
//                 showEditDeleteButtons ? styles.withButtons : styles.fullWidth,
//               ]}>
//               <View style={styles.iconAndLabel}>
//                 <View>{Icons[item.contactType] || Icons.DEFAULT}</View>
//                 <Text style={styles.label}>{item.value}</Text>
//               </View>
//               {showEditDeleteButtons && (
//                 <ContactEditDeleteButtons
//                   contactList={contactList}
//                   setContactList={setContactList}
//                   selectedItem={{id: index, item}}
//                 />
//               )}
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
//   withButtons: {
//     width: '100%',
//   },
//   fullWidth: {
//     width: '100%',
//   },
//   iconAndLabel: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     flex: 3,
//     gap:8,
//   },
//   label: {
//     flex: 1,   
//     fontSize: 16,
//     color: Colors.grayColor,   
//   },
// });

// export {ContactTypes};
