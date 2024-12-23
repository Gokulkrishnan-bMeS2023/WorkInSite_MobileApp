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
import Icon1 from 'react-native-vector-icons/AntDesign';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {useSupplierList} from './useSupplierList';
import {ContactTypes} from '../../Contacts/DTOs/ContactProps';

export default function SupplierListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {
    supplierDetails,
    fetchSupplier,
    handleEditSupplier,
    loading,
    confirmDelete,
  } = useSupplierList({navigation});

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

  const filteredContactList = supplierDetails.filter((user: {name: string}) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSupplier();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!supplierDetails.length) {
    return (
      <GetStartedCard
        buttonClick={RouteName.SUPPLIER_CREATION_SCREEN}
        buttonLabel="New Supplier"
        imgSrc={images.supplier_start_img}>
        Effortlessly manage your suppliers and streamline your construction
        project supply chain with WorkInsite. Get started today and optimize
        your procurement process.
      </GetStartedCard>
    );
  }

  const handlePress = () => {
    navigation.navigate(RouteName.SUPPLIER_CREATION_SCREEN);
  };

  const handleBack = () => {
    navigation.navigate(RouteName.Home_SCREEN);
  };

  return (
    <View style={styles.container}>
      <ToastNotification />
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
              Supplier List
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
      <View>
        {filteredContactList.length === 0 ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>No suppliers found</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredContactList}
            keyExtractor={supplier => supplier.id.toString()}
            renderItem={({item: supplier}: any) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleEditSupplier(supplier.id)}>
                <ContactCard
                  key={supplier.id}
                  name={supplier.name}
                  phone={
                    supplier.contact.contactDetails?.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.PHONE,
                    )?.value
                  }
                  email={
                    supplier.contact.contactDetails?.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.EMAIL,
                    )?.value
                  }
                  onDelete={() => confirmDelete(supplier.id)}
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
