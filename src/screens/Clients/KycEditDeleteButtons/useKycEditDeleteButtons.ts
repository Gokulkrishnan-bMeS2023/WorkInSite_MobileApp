import { Alert } from "react-native";
import { ClientEditDeleteButtonsProps } from "./DTOs";

const useKycEditDeleteButtons = (props: ClientEditDeleteButtonsProps) => {
  const { clientDetails, setClientDetails } = props;

  const handleDelete = (id: number) => {
    // Show confirmation alert
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this KYC detail?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // If the user presses Cancel, nothing will happen
        },
        {
          text: 'Delete',
          onPress: () => {
            const filteredKycDetails = clientDetails.kycDetails.filter((_, index) => index !== id);
            setClientDetails((prev) => ({ ...prev, kycDetails: filteredKycDetails }));
          },
          style: 'destructive', // This will style the "Delete" button in red to indicate it's destructive
        },
      ],
      { cancelable: true }
    );
  };
  
  return { handleDelete };
};

export { useKycEditDeleteButtons };
