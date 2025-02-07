import {Text,View } from "react-native";
import { ContactDetailFormProps } from "./DTOs";
import { FormActionButton } from "../../../screens/Contacts/FormActionButton/FormActionButton";
import { ContactTypes } from "../../../screens/Contacts/ContactTypes/ContactTypes";
import Styles from '../../../styles/CreateAndEditScreenStyle';

const ContactDetailForm = (props: ContactDetailFormProps) => {
  const { handleContactEdit, primaryContactDetails, hasMoreDetails, handleMoreDetails } = props;
  return (
    <View>     
      <FormActionButton 
        heading="Contact detail" 
        iconType="edit"  
        onClick={handleContactEdit}
         />
      <View>
      <ContactTypes contactList={primaryContactDetails} showEditDeleteButtons={false} />
     </View>
      {hasMoreDetails && (
      //   <TouchableOpacity onPress={handleMoreDetails}>
      //   <Text style={Styles.moreDetails}>More details...</Text>
      // </TouchableOpacity>
      <Text style={Styles.moreDetails}
         onPress={handleMoreDetails}>
            More details...
      </Text>
      )}
    </View>
  );
};

export { ContactDetailForm };

