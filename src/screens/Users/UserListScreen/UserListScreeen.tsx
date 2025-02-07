import React, {useState} from 'react';
import {
  View,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import UserCard from '../../../components/CommonComponets/UserCard/UserCard';
import {useUserList} from './useUserList';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Loader from '../../../components/Loader/Loader';

export default function UserListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {userList, loading, handleEditUser, fetchUser} =
    useUserList(navigation);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
      const onBackPress = () => {
        navigation.navigate(RouteName.Home_SCREEN);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const filteredUserList = userList.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser(); // Call fetchUser to refresh the data
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <Loader />;
  }

  if (!userList.length) {
    return (
      <GetStartedCard
        buttonClick={'UserCreationScreen'}
        buttonLabel="Create User"
        imgSrc={images.user_start_img}>
        Get started by creating a user to manage your team effortlessly.
      </GetStartedCard>
    );
  }

  const handlePress = () => {
    navigation.navigate(RouteName.USER_CREATION_SCREEN, {
      SupervisorOnly: false,
    });
  };

  const handleBack = () => {
    navigation.navigate(RouteName.Home_SCREEN);
  };

  return (
    <View style={commonStyle.container}>
      <Header
        title=" User List"
        onBackPress={handleBack}
        handleCreate={handlePress}
      />
      <View>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        {filteredUserList.length === 0 ? (
          <Text style={Styles.emptyText}>No users found</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredUserList}
            keyExtractor={user => user.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={Styles.card}
                onPress={() => handleEditUser(item.id)}>
                <UserCard
                  name={item.name}
                  role={item.role.name}
                  phoneNumber={item.phone}
                  isActive={item.isActive}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={Styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
}
