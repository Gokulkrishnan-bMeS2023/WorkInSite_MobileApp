import {useState, useEffect} from 'react';
import {useUserService} from '../../../services/UserService';
import {User} from '../DTOs/User';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';

const useUserList = (navigation: any) => {
  const userService = useUserService();
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchUser = async (searchString: string = '') => {
    const userList = await userService.getUsers(searchString);
    setUserList(userList);
    if (userList) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isFocused]);

  const handleEditUser = (id: number) => {
    navigation.navigate(RouteName.USER_EDIT_SCREEN, {urlName: id});
  };

  return {userList, loading, handleEditUser, fetchUser};
};

export {useUserList};
