import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContactTypes } from "../../Contacts/ContactTypes/ContactTypes";
import { ContactDetailFormProps } from "./DTOs";
import { Colors } from "../../../utils";
import { FormActionButton } from "../../Contacts/FormActionButton/FormActionButton";

const ContactDetailForm = (props: ContactDetailFormProps) => {
  const { handleContactEdit, primaryContactDetails, hasMoreDetails, handleMoreDetails } = props;
  return (
    <View>
      <FormActionButton 
        heading="Contact detail" 
        iconType="edit"  
        onClick={handleContactEdit}
         />
      <View style={styles.content} >
      <ContactTypes contactList={primaryContactDetails} showEditDeleteButtons={false} classNames="mt-4" />
     </View>
      {hasMoreDetails && (
        <View style={styles.fieldContainer}>
        <TouchableOpacity onPress={handleMoreDetails}>
        <Text style={styles.link}>More details...</Text>
      </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
  },
  fieldContainer: {
    paddingBottom: 10,
  },
  content: {
    marginBottom: 10,
    gap:10,
  },
});

export { ContactDetailForm };

