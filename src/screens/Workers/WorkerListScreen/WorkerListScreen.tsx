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
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import {ContactTypes} from '../../Contacts/DTOs/ContactProps';
import {useWorkerList} from './useWorkerList';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Loader from '../../../components/Loader/Loader';

export default function WorkerListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const {workerDetails, fetchWorker, handleEditWorker, loading, confirmDelete} =
    useWorkerList({navigation});
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

  const filteredWorkerList = workerDetails.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWorker();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <Loader />;
  }

  if (!workerDetails.length) {
    return (
      <GetStartedCard
        buttonClick={RouteName.WORKER_CREATION_SCREEN}
        buttonLabel="Create Worker"
        imgSrc={images.worker_start_img}>
        Simplify the management of your construction workers with WorkInSite.
        Get started today to ensure seamless coordination and productivity on
        your projects.
      </GetStartedCard>
    );
  }

  const handlePress = () => {
    navigation.navigate(RouteName.WORKER_CREATION_SCREEN);
  };

  const handleBack = () => {
    navigation.navigate(RouteName.Home_SCREEN);
  };

  return (
    <View style={commonStyle.container}>
      <ToastNotification />
      <Header
        title="Worker List"
        onBackPress={handleBack}
        handleCreate={handlePress}
      />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View>
        {filteredWorkerList.length === 0 ? (
          <Text style={Styles.emptyText}>No workers found</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredWorkerList}
            keyExtractor={worker => worker.id.toString()}
            renderItem={({item: worker}: any) => (
              <TouchableOpacity
                style={Styles.card}
                onPress={() => handleEditWorker(worker.id)}>
                <ContactCard
                  key={worker.id}
                  name={worker.name}
                  phone={
                    worker.contact.contactDetails?.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.PHONE,
                    )?.value
                  }
                  email={
                    worker.contact.contactDetails?.find(
                      (item: {contactType: ContactTypes}) =>
                        item.contactType === ContactTypes.EMAIL,
                    )?.value
                  }
                  onDelete={() => confirmDelete(worker.id)}
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
