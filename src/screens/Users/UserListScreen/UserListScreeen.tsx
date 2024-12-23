import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import UserCard from '../../../components/CommonComponets/UserCard/UserCard';
import {useUserList} from './useUserList';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import {Colors} from '../../../utils';
import UserStatus from '../../../components/CommonComponets/UserStatus/UserStatus';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import CustomHeader from '../../../components/CommonComponets/Header/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';

export default function UserListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {userList, loading, handleEditUser, fetchUser} =
    useUserList(navigation);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setSearchText(''); // search text
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
    user.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser(); // Call fetchUser to refresh the data
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
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
    <View style={styles.container}>
      <CustomHeader
        leftNode={
          <View style={styles.heading}>
            <TouchableOpacity onPress={handleBack}>
              <Icon
                name="arrow-left-circle"
                size={25}
                color={Colors.secondaryBgTextColor}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.secondaryBgTextColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              User List
            </Text>
          </View>
        }
        rightNode={
          <View style={styles.iconContainer}>
            <UserStatus />
            <TouchableOpacity onPress={handlePress}>
              <Icon1
                name="pluscircle"
                size={30}
                color={Colors.secondaryColor}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        {filteredUserList.length === 0 ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>No users found</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredUserList}
            keyExtractor={user => user.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleEditUser(item.id)}>
                <UserCard
                  name={item.name}
                  role={item.role.name}
                  phoneNumber={item.phone}
                  isActive={item.isActive}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardConatiner: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
  },

  listContainer: {
    paddingBottom: 150,
  },
  noUsersContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 16,
    color: Colors.grayColor,
  },
});
