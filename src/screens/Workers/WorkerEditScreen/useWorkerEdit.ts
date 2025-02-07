import {useCallback, useEffect, useState} from 'react';
import {useWorkerService} from '../../../services/WorkerService';
import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
import {useContactService} from '../../../services/ContactService';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {WorkerCategoryProps} from '../DTOs/WorkerCategoryProps';
import {GenderTypes, Worker, WorkerRequest} from '../DTOs/WorkerProps';
import {useWorkerInputValidate} from '../InputValidate/WorkerInputValidate';
import {useContactValidate} from '../../Clients/ContactValidate/ContactValidate';
import {UpiTypes} from '../../Suppliers/DTOs/SupplierProps';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

const useWorkerEdit = (id: string, navigation: any, route: any) => {
  const workerService = useWorkerService();
  const workerCategoryService = useWorkerCategoryService();
  const contactService = useContactService();

  // const newContactId = queryString.get("contactId") || "";
  // const newWorkerCategoryId = queryString.get("workerCategoryId") || "";
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  // const [contactId, setContactId] = useState(newContactId);
  const [contactId, setContactId] = useState('');
  const [workerCategoryId, setWorkerCategoryId] = useState('');
  // const [workerCategoryId, setWorkerCategoryId] = useState(newWorkerCategoryId);
  const [notes, setNotes] = useState<string>('');
  const [gender, setGender] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);

  const [contactList, setContactList] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>({
    id: 0,
    name: '',
    contactDetails: [],
  });
  const [workerCategoryList, setWorkerCategoryList] = useState<
    WorkerCategoryProps[]
  >([]);
  const [workerCategory, setWorkerCategory] = useState<WorkerCategoryProps>({
    id: 0,
    workerCategoryName: '',
    note: '',
    isActive: true,
  });

  const initialData = {
    id: 0,
    name: '',
    dateOfBirth: dateOfBirth,
    contact: {id: 0, name: '', contactDetails: []},
    workerCategory: {id: 0, workerCategoryName: '', note: '', isActive: true},
    note: '',
    gender: gender as GenderTypes,
    kycDetails: [],
    bankAccounts: [],
    upiDetails: [],
    isActive: true,
  };

  const [initialworkerDetails, setinitialWorkerDetails] = useState<
    Worker | WorkerRequest
  >(initialData);

  const [workerDetails, setWorkerDetails] = useState<Worker | WorkerRequest>(
    initialData,
  );
  const isFocused = useIsFocused();

  const fetchWorker = async () => {
    setLoading(true);
    try {
      const workerData: Worker = await workerService.getWorker(parseInt(id));
      setWorkerDetails(workerData);
      setinitialWorkerDetails(workerData); //new
      setNotes(workerData.note);
      setGender(workerData.gender);
      setIsActive(workerData.isActive as boolean);
      setName(workerData.name);
      setDateOfBirth(workerData.dateOfBirth);
      setGender(workerData.gender);
      // if (!newContactId) setContactId(workerData.contact.id.toString());
      // if (!newWorkerCategoryId) setWorkerCategoryId(workerData.workerCategory.id.toString());
      setContactId(workerData.contact.id.toString());
      setWorkerCategoryId(workerData.workerCategory.id.toString());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorker();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchWorker(); // Fetch worker data again when the screen is focused
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

  const fetchWorkerCategories = async (searchString: string = '') => {
    if (searchString) {
      const workerCategories = await workerCategoryService.getWorkerCategories(
        searchString,
        false,
      );
      if (workerCategoryId && workerCategories) {
        const validWorkerCategories = workerCategories.filter(
          (item: WorkerCategoryProps) => item.id !== parseInt(workerCategoryId),
        );
        setWorkerCategoryList(
          [workerCategory, validWorkerCategories.slice(0, 3)].flat(),
        );
        return;
      }
      if (workerCategories) setWorkerCategoryList(workerCategories.slice(0, 3));
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
    const fetchWorkerCategoryById = async () => {
      if (workerCategoryId) {
        try {
          const workerCategory = await workerCategoryService.getWorkerCategory(
            parseInt(workerCategoryId),
          );
          setWorkerCategory(workerCategory);
          setWorkerCategoryList([workerCategory]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };
    fetchWorkerCategoryById();
  }, [workerCategoryId, isFocused]);

  //new
  useEffect(() => {
    if (route?.params?.contactId) {
      setContactId(route?.params?.contactId);
    }
  }, [route?.params?.contactId]);

  useEffect(() => {
    if (route?.params?.workerCategoryId) {
      setWorkerCategoryId(route?.params?.workerCategoryId);
    }
  }, [route?.params?.workerCategoryId]);

  const {genderItems, error, validate, initialError, setError} =
    useWorkerInputValidate({
      name,
      dateOfBirth,
      workerCategoryId,
      contactId,
      gender,
    });
  const {primaryContactDetails, hasMoreDetails} = useContactValidate(contact);

  const contactDetails = contactList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const workerCategoryDetails = workerCategoryList.map(item => ({
    label: item.workerCategoryName,
    value: item.id.toString(),
  }));

  const validKycDetails = workerDetails.kycDetails.filter(item => item.value);
  const validBankAccounts = workerDetails.bankAccounts.filter(
    item => item.accountName && item.accountNumber && item.ifscCode,
  );
  const validUpiDetails = workerDetails.upiDetails.filter(item => item.value);

  const isKycAddDisabled = [KYCTypes.AADHAAR, KYCTypes.PAN, KYCTypes.GST].every(
    type =>
      workerDetails.kycDetails.some(
        item => item.kycType === type && item.value,
      ),
  );

  const isBankAccountsAddDisabled = validBankAccounts.length >= 2;

  const isUpiAddDisabled = [
    UpiTypes.GPAY,
    UpiTypes.PHONEPE,
    UpiTypes.UPI_ID,
  ].every(type =>
    workerDetails.upiDetails.some(item => item.upiType === type && item.value),
  );

  const handleContactChange = (value: string) => setContactId(value);
  const handleWorkerCategoryChange = (value: string) =>
    setWorkerCategoryId(value);

  const redirectUrl = RouteName.WORKER_EDIT_SCREEN;

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

  const handleWorkerCategoryCreate = (searchString: string) => {
    const redirect = redirectUrl;
    navigation.navigate(RouteName.WORKER_CATEGORY_CREATION_SCREEN, {
      workerCategoryName: searchString,
      redirect,
      id, //note
    });
  };

  const handleWorkerCategoryEdit = () => {
    const redirect = redirectUrl;
    navigation.navigate(RouteName.WORKER_CATEGORY_EDIT_SCREEN, {
      workerCategoryId: workerCategoryId,
      redirect,
      id, //note
    });
  };

  const handleSubmission = async () => {
    if (validate()) {
      const worker = {
        name,
        gender: gender as GenderTypes,
        dateOfBirth,
        note: notes as string,
        workerCategoryId: parseInt(workerCategoryId),
        contactId: parseInt(contactId),
        kycDetails: validKycDetails,
        bankAccounts: validBankAccounts,
        upiDetails: validUpiDetails,
        isActive,
      };
      await workerService.updateWorker(parseInt(id), worker);
      navigation.navigate(RouteName.WORKER_LIST_SCREEN);
      fetchWorker(); //note
    }
  };

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

  const hasUnsavedChanges =
    dateOfBirth !== initialworkerDetails.dateOfBirth ||
    gender !== initialData.gender ||
    name !== initialworkerDetails.name ||
    notes !== initialworkerDetails.note ||
    (initialworkerDetails as Worker).contact.id.toString() !== contactId ||
    (initialworkerDetails as Worker).workerCategory.id.toString() !==
      workerCategoryId ||
    isActive !== initialworkerDetails.isActive ||
    !areDetailsEqual(workerDetails, initialworkerDetails);

  const handleBackPress = () => {
    if (hasUnsavedChanges) {
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
              fetchWorker();
              navigation.navigate(RouteName.WORKER_LIST_SCREEN);
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
      navigation.navigate(RouteName.WORKER_LIST_SCREEN);
    }
    return true;
  };

  return {
    name,
    setName,
    dateOfBirth,
    gender,
    setDateOfBirth,
    genderItems,
    setGender,
    notes,
    setNotes,
    isActive,
    setIsActive,
    workerDetails,
    setWorkerDetails,
    error,
    handleSubmission,
    isKycAddDisabled,
    isBankAccountsAddDisabled,
    isUpiAddDisabled,
    contactDetails,
    workerCategoryDetails,
    contactId,
    workerCategoryId,
    handleWorkerCategoryCreate,
    handleWorkerCategoryEdit,
    handleContactCreate,
    handleWorkerCategoryChange,
    handleContactChange,
    fetchContacts,
    fetchWorkerCategories,
    contact,
    workerCategory,
    primaryContactDetails,
    hasMoreDetails,
    handleContactEdit,
    loading,
    handleBackPress,
    hasUnsavedChanges,
  };
};

export {useWorkerEdit};
