import React, {useState} from 'react';
import {
  View,
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
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {useSupplierList} from './useSupplierList';
import {ContactTypes} from '../../Contacts/DTOs/ContactProps';
import Icon from '../../../utils/VectorIcons';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Loader from '../../../components/Loader/Loader';

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

  const filteredSupplierrList = supplierDetails.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSupplier();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <Loader />;
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
    <View style={commonStyle.container}>
      <ToastNotification />
      <Header
        title="Supplier List"
        onBackPress={handleBack}
        handleCreate={handlePress}
      />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View>
        {filteredSupplierrList.length === 0 ? (
          <Text style={Styles.emptyText}>No suppliers found</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredSupplierrList}
            keyExtractor={supplier => supplier.id.toString()}
            renderItem={({item: supplier}: any) => (
              <TouchableOpacity
                style={Styles.card}
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
