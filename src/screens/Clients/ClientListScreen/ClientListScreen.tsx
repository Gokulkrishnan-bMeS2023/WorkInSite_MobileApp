import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import Colors from '../../../utils/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import CustomHeader from '../../../components/CommonComponets/Header/CustomHeader';
import RouteName from '../../../navigation/RouteName';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';

const ClientListScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const {
    clientDetails,
    fetchClient,
    handleClientSelect,
    handleClientDelete,
    hasSearchFilter,
  } = useClientList({navigation});

  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    fetchClient(text);
  };

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

  if (!clientDetails.length && !hasSearchFilter) {
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
      style={styles.card}
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
    <SafeAreaView style={styles.container}>
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
              Client List
            </Text>
          </View>
        }
        rightNode={
          <TouchableOpacity onPress={handlePress}>
            <Icon1 name="pluscircle" size={30} color={Colors.secondaryColor} />
          </TouchableOpacity>
        }
      />
      <KeyboardAvoidingView enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View>
            <View>
              <SearchBar searchText={searchText} setSearchText={handleSearch} />
            </View>

            <View>
              {clientDetails.length === 0 ? (
                <Text style={styles.noClientsText}>No clients found</Text>
              ) : (
                <FlatList
                  data={clientDetails}
                  renderItem={renderClientItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.listContent}
                  scrollEnabled={false}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    gap: 10,
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
  buttonStyle: {
    width: '40%',
    alignSelf: 'flex-end',
  },

  listContent: {
    paddingBottom: 70,
  },

  noClientsText: {
    textAlign: 'center',
    color: Colors.grayColor,
    fontSize: 16,
  },
});

export default ClientListScreen;
