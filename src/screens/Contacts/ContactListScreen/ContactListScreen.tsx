import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  FlatList,
  BackHandler,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import {useContactList} from './useContactList';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import {ContactTypes} from '../DTOs/ContactProps';
import Loader from '../../../components/Loader/Loader';

export default function ContactListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {contactList, loading, handleEditContact, fetchContact, confirmDelete} =
    useContactList({navigation});

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(RouteName.Home_SCREEN);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  const filteredContactList = useMemo(
    () =>
      contactList.filter(user =>
        user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
      ),
    [contactList, searchText],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchContact();
    setRefreshing(false);
  }, [fetchContact]);

  const renderItem = useCallback(
    ({item: contact}: any) => (
      <TouchableOpacity
        style={Styles.card}
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
    ),
    [handleEditContact, confirmDelete],
  );

  const keyExtractor = useCallback((user: any) => user.id.toString(), []);

  const handleBack = useCallback(() => {
    navigation.navigate(RouteName.Home_SCREEN);
  }, [navigation]);

  const handlePress = useCallback(() => {
    navigation.navigate(RouteName.CONTACT_CREATION_SCREEN);
  }, [navigation]);

  if (loading && !refreshing) {
    return <Loader />;
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

  return (
    <View style={commonStyle.container}>
      <Header
        title="Contact List"
        onBackPress={handleBack}
        handleCreate={handlePress}
      />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={commonStyle.toast}>
        <ToastNotification />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredContactList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={Styles.listContainer}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
