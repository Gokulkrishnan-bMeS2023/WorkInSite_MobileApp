import {useState, useEffect, useRef} from 'react';
import {SupervisorAddFormProps} from './DTOs';
import {useUserService} from '../../../services/UserService';
import {User} from '../../Users/DTOs/User';
import RouteName from '../../../navigation/RouteName';

const useSupervisorAddForm = (props: SupervisorAddFormProps) => {
  const {supervisorIds, setSupervisorIds} = props;
  const userService = useUserService();
  const [error, setError] = useState<string>(''); // Error state for validation
  const [supervisorId, setSupervisorId] = useState<string>(''); // Selected supervisor ID
  const [supervisor, setSupervisor] = useState<User | null>(null); // Single supervisor data
  const [supervisorList, setSupervisorList] = useState<User[]>([]); // Supervisor list
  const bottomSheetRef = useRef<any>(null); // Reference for the bottom sheet

  // Fetch supervisors based on the search string
  const fetchSupervisors = async (searchString: string = '') => {
    if (searchString) {
      const supervisors = await userService.getUsers(searchString, false);
      if (supervisors) {
        const validSupervisors = supervisors.filter(
          (item: {id: number}) =>
            item.id !== parseInt(supervisorId) && // Exclude the selected supervisor
            !supervisorIds.includes(item.id), // Exclude already added supervisors
        );
        setSupervisorList(
          supervisor
            ? [supervisor, ...validSupervisors.slice(0, 3)]
            : validSupervisors.slice(0, 3),
        );
      }
    }
  };

  // Fetch supervisor details by ID whenever `supervisorId` changes
  useEffect(() => {
    const fetchSupervisorById = async () => {
      if (supervisorId) {
        const fetchedSupervisor = await userService.getUser(
          parseInt(supervisorId),
        );
        setSupervisor(fetchedSupervisor);
        setSupervisorList(fetchedSupervisor ? [fetchedSupervisor] : []);
      }
    };
    fetchSupervisorById();
  }, [supervisorId]);

  // Supervisor details formatted for Combobox
  const supervisorDetails = supervisorList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  // Handle supervisor selection change
  const handleSupervisorChange = (value: string) => setSupervisorId(value);

  // Validate supervisor selection
  const validate = () => {
    if (!supervisorId) {
      setError('Please select supervisor');
      return false;
    }
    setError(''); // Clear error if valid
    return true;
  };

  // Handle adding supervisor
  const handleAdd = () => {
    if (validate()) {
      setSupervisorIds(prev => [...prev, parseInt(supervisorId)]);
      setSupervisorId(''); // Reset the selected supervisor
      setSupervisor(null); // Reset supervisor state
      props.Ref?.current.close();
    }
  };

  const handleSupervisorCreate = (searchString: string) => {
    // bottomSheetRef.current?.close();
    // navigation.navigate("SupervisorCreationScreen", { searchString });
    props.navigation.navigate(RouteName.USER_CREATION_SCREEN, {
      supervisorname: searchString,
      redirect: RouteName.SITE_CREATION_SCREEN,
      SupervisorOnly: true,
      supervisorIds: supervisorIds || [],
    });
  };

  return {
    supervisorDetails,
    supervisorId,
    error,
    bottomSheetRef,
    handleSupervisorChange,
    fetchSupervisors,
    handleAdd,
    handleSupervisorCreate,
  };
};

export {useSupervisorAddForm};
