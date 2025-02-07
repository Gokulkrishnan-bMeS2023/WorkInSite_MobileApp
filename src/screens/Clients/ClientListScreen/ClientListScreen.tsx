import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  RefreshControl,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useClientList} from './useClientList';
import images from '../../../images';
import {ContactTypes} from '../../Contacts/DTOs/ContactProps';
import {useFocusEffect} from '@react-navigation/native';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import RouteName from '../../../navigation/RouteName';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Loader from '../../../components/Loader/Loader';

export default function ClientListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {
    clientDetails,
    fetchClient,
    handleClientSelect,
    handleClientDelete,
    loading,
  } = useClientList({navigation});

  const [refreshing, setRefreshing] = useState(false);

  const filteredClientList = clientDetails.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const handleRefresh = async () => {
    setRefreshing(true); // Trigger refreshing spinner
    await fetchClient(searchText); // Refetch data
    setRefreshing(false); // Stop refreshing once data is loaded
  };

  const handlePress = () => {
    navigation.navigate(RouteName.CLIENT_CREATION_SCREEN);
  };

  const handleBack = () => {
    navigation.navigate(RouteName.Home_SCREEN);
  };

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

  if (loading && !refreshing) {
    return <Loader />;
  }

  if (!clientDetails.length) {
    return (
      <GetStartedCard
        buttonClick="ClientCreationScreen"
        buttonLabel="Create Client"
        imgSrc={images.client_creation}>
        With WorkInSite, managing clients is simple and efficient. Start
        organizing your client relationships today to enhance communication and
        collaboration.
      </GetStartedCard>
    );
  }

  const renderClientItem = ({item}: any) => (
    <TouchableOpacity
      style={Styles.card}
      onPress={() => handleClientSelect(item.id)}>
      <ContactCard
        name={item.name}
        phone={
          item.contact.contactDetails.find(
            (detail: {contactType: any}) =>
              detail.contactType === ContactTypes.PHONE,
          )?.value
        }
        email={
          item.contact.contactDetails.find(
            (detail: {contactType: any}) =>
              detail.contactType === ContactTypes.EMAIL,
          )?.value
        }
        onDelete={() => handleClientDelete(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyle.container}>
      <Header
        title="Client"
        onBackPress={handleBack}
        handleCreate={handlePress}
      />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <KeyboardAvoidingView enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View>
            {filteredClientList.length === 0 ? (
              <Text style={Styles.emptyText}>No clients found</Text>
            ) : (
              <FlatList
                data={filteredClientList}
                renderItem={renderClientItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={Styles.listContainer}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
