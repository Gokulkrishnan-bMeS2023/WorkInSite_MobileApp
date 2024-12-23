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
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import {Colors} from '../../../utils';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import CustomHeader from '../../../components/CommonComponets/Header/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContactList} from './useContactList';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import {ContactTypes} from '../DTOs/ContactProps';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import Icon1 from 'react-native-vector-icons/AntDesign';

export default function ContactListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {
    contactList,
    loading,
    handleEditContact,
    fetchContact,
    confirmDelete,
  } = useContactList({navigation});
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setSearchText(''); // reset search text
      const onBackPress = () => {
        navigation.navigate(RouteName.Home_SCREEN);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const filteredContactList = contactList.filter((user: {name: string}) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContact();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!contactList.length) {
    return (
      <GetStartedCard
        buttonClick={RouteName.CONTACT_CREATION_SCREEN}
        buttonLabel="New Contact"
        imgSrc={images.contact_start_img}>
        With WorkInSite, managing contacts and facilitating collaboration is
        easy. Start organizing your contacts today to streamline communication.
      </GetStartedCard>
    );
  }

  const handlePress = () => {
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN);
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
              Contact List
            </Text>
          </View>
        }
        rightNode={
          <TouchableOpacity onPress={handlePress}>
            <Icon1 name="pluscircle" size={30} color={Colors.secondaryColor} />
          </TouchableOpacity>
        }
      />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View
        style={{
          position: 'absolute',
          zIndex: 9999,
          top: 1,
          right: 1,
          left: 1,
        }}>
        <ToastNotification />
      </View>
      <View>
        {filteredContactList.length === 0 ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>No contacts found</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredContactList}
            keyExtractor={user => user.id.toString()}
            renderItem={({item: contact}: any) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleEditContact(contact.id)}>
                <ContactCard
                  key={contact.id}
                  name={contact.name}
                  phone={
                    contact.contactDetails.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.PHONE,
                    )?.value
                  }
                  email={
                    contact.contactDetails.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.EMAIL,
                    )?.value
                  }
                  onDelete={() => confirmDelete(contact.id)}
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
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
