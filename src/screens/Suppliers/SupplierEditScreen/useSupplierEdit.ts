import {useCallback, useEffect, useState} from 'react';
import {useSupplierService} from '../../../services/SupplierService';
import {useContactService} from '../../../services/ContactService';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {Supplier, SupplierRequest, UpiTypes} from '../DTOs/SupplierProps';
import {useInputValidate} from '../InputValidate/InputValidate';
import {useContactValidate} from '../../Clients/ContactValidate/ContactValidate';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

const useSupplierEdit = (id: string, navigation: any, route: any) => {
  const supplierService = useSupplierService();
  const contactService = useContactService();
  const [name, setName] = useState('');
  const [contactId, setContactId] = useState('');
  const [notes, setNotes] = useState<string>();
  const [isActive, setIsActive] = useState(true);
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>({
    id: 0,
    name: '',
    contactDetails: [],
  });
  const [loading, setLoading] = useState(true);
  const initilaData = {
    name: '',
    contact: {id: 0, name: '', contactDetails: [{}]},
    note: '',
    kycDetails: [{}],
    bankAccounts: [{}],
    upiDetails: [{}],
    isActive: true,
  };
  const [supplierDetails, setSupplierDetails] = useState<
    Supplier | SupplierRequest
  >(initilaData as Supplier);

  //new
  const [initialsupplierDetails, setinitialSupplierDetails] = useState<
    Supplier | SupplierRequest
  >(initilaData as Supplier);
  const isFocused = useIsFocused();

  const fetchSupplier = async () => {
    setLoading(true);
    const supplierData: Supplier = await supplierService.getSupplier(
      parseInt(id),
    );
    try {
      setSupplierDetails(supplierData);
      setinitialSupplierDetails(supplierData);
      setName(supplierData.name);
      setNotes(supplierData.note);
      setIsActive(supplierData.isActive as boolean);
      // if (!newContactId) setContactId(supplierData.contact.id.toString());
      setContactId(supplierData.contact.id.toString());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, [id]);
  useFocusEffect(
      useCallback(() => {
        fetchSupplier(); // Fetch worker data again when the screen is focused
      }, [id]) // Update dependencies if necessary
    );
    

  const fetchContacts = async (searchString: string = '') => {
    if (searchString) {
      const contacts = await contactService.getContacts(searchString, false);
      if (contactId && contacts) {
        const validContacts = contacts.filter(
          (item: Contact) => item.id !== parseInt(contactId),
        );
        setContactList([contact, validContacts.slice(0, 3)].flat());
        return;
      }
      if (contacts) setContactList(contacts.slice(0, 3));
    }
  };

  useEffect(() => {
    const fetchContactById = async () => {
      if (contactId) {
        try {
          const fetchedContact = await contactService.getContact(
            parseInt(contactId),
          );
          setContact(fetchedContact);
          setContactList([fetchedContact]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };

    fetchContactById();
  }, [contactId, isFocused]);

  useEffect(() => {
    if (route?.params?.contactId) {
      setContactId(route?.params?.contactId);
    }
  }, [route?.params?.contactId]);

  const {error, validate, setError, initialError} = useInputValidate({
    name,
    contactId,
  });
  const {primaryContactDetails, hasMoreDetails} = useContactValidate(contact);

  const contactDetails = contactList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const isKycAddDisabled = [KYCTypes.AADHAAR, KYCTypes.PAN, KYCTypes.GST].every(
    type =>
      supplierDetails.kycDetails.some(
        item => item.kycType === type && item.value,
      ),
  );

  const isBankAccountsAddDisabled = supplierDetails.bankAccounts.length >= 2;

  const isUpiAddDisabled = [
    UpiTypes.GPAY,
    UpiTypes.PHONEPE,
    UpiTypes.UPI_ID,
  ].every(type =>
    supplierDetails.upiDetails.some(
      item => item.upiType === type && item.value,
    ),
  );

  const handleContactChange = (value: string) => setContactId(value);

  const redirectUrl = RouteName.SUPPLIER_EDIT_SCREEN;

  const handleContactCreate = (searchString: string) => {
    const redirect = redirectUrl;
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN, {
      name: searchString,
      redirect,
      id, //note
    });
  };

  const handleContactEdit = () => {
    const redirect = redirectUrl;
    navigation.navigate(RouteName.CONTACT_EDIT_SCREEN, {
      contactId: contactId,
      redirect,
      id, //note
    });
  };

  const handleSubmission = async () => {
    if (validate()) {
      const supplier = {
        name,
        note: notes as string,
        contactId: parseInt(contactId),
        kycDetails: supplierDetails.kycDetails,
        bankAccounts: supplierDetails.bankAccounts,
        upiDetails: supplierDetails.upiDetails,
        isActive,
      };
      await supplierService.updateSupplier(parseInt(id), supplier);
      navigation.navigate(RouteName.SUPPLIER_LIST_SCREEN);
      fetchSupplier();
    }
  };

  // Recursive function to compare two objects
  const areDetailsEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true; // Identical references

    if (
      typeof obj1 !== 'object' ||
      obj1 === null ||
      typeof obj2 !== 'object' ||
      obj2 === null
    ) {
      return obj1 === obj2; // Compare primitive values
    }

    // Compare keys length
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    // Compare keys and values recursively
    for (let key of keys1) {
      if (!keys2.includes(key)) return false; // Different keys
      if (!areDetailsEqual(obj1[key], obj2[key])) return false; // Compare values recursively
    }

    return true;
  };

  const hasChanges =
    name !== initialsupplierDetails.name ||
    notes !== initialsupplierDetails.note ||
    (initialsupplierDetails as Supplier).contact.id.toString() !== contactId ||
    isActive !== initialsupplierDetails.isActive ||
    !areDetailsEqual(supplierDetails, initialsupplierDetails);

  const handleBackPress = () => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before exiting?',
        [
          {
            text: 'Save',
            onPress: () => {
              handleSubmission();
            },
          },
          {
            text: 'Exit Without Saving',
            onPress: () => {
              fetchSupplier(),
                navigation.navigate(RouteName.SUPPLIER_LIST_SCREEN);
              setError(initialError);
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setError(initialError);
      navigation.navigate(RouteName.SUPPLIER_LIST_SCREEN);
    }
    return true;
  };

  return {
    name,
    setName,
    notes,
    setNotes,
    isActive,
    setIsActive,
    supplierDetails,
    setSupplierDetails,
    error,
    handleSubmission,
    isKycAddDisabled,
    isBankAccountsAddDisabled,
    isUpiAddDisabled,
    contactDetails,
    contactId,
    handleContactCreate,
    handleContactChange,
    fetchContacts,
    contact,
    primaryContactDetails,
    hasMoreDetails,
    handleContactEdit,
    loading,
    handleBackPress,
    hasChanges,
  };
};

export {useSupplierEdit};
