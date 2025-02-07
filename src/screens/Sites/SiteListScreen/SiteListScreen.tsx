import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  RefreshControl,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {useSiteList} from './useSiteList';
import images from '../../../images';
import {SiteCard} from '../SiteCard';
import {useFocusEffect} from '@react-navigation/native';
import RouteName from '../../../navigation/RouteName';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import Styles from '../../../styles/ListScreenStyle';
import commonStyle from '../../../styles/commonStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import SiteStatus from '../../../components/CommonComponets/SiteStatus/SiteStatus';
import Loader from '../../../components/Loader/Loader';

export default function SiteListScreen({navigation}: any) {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {siteDetails, fetchSite, handleSiteSelect, loading} = useSiteList({
    navigation,
  });

  const filteredSiteList = siteDetails.filter(user =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const handleRefresh = async () => {
    setRefreshing(true); // Trigger refreshing spinner
    await fetchSite(searchText); // Refetch data
    setRefreshing(false); // Stop refreshing once data is loaded
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

  if (!siteDetails.length) {
    return (
      <GetStartedCard
        buttonClick="SiteCreationScreen"
        buttonLabel="Create Sites"
        imgSrc={images.site_creation}>
        Dive into the heart of construction site management. Create, edit, and
        view site information effortlessly. Assign workers, supervisors, and
        track project progress.
      </GetStartedCard>
    );
  }

  const renderSiteItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handleSiteSelect(item.id)}
      style={Styles.card}>
      <SiteCard site={item} />
    </TouchableOpacity>
  );

  const handlePress = () => {
    navigation.navigate(RouteName.SITE_CREATION_SCREEN);
  };

  const handleBack = () => {
    navigation.navigate(RouteName.Home_SCREEN);
  };

  return (
    <View style={commonStyle.container}>
      <Header
        title=" Site List"
        onBackPress={handleBack}
        handleCreate={handlePress}
        rightNode={<SiteStatus />}
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
            {filteredSiteList.length === 0 ? (
              <Text style={Styles.emptyText}>No sites found</Text>
            ) : (
              <FlatList
                contentContainerStyle={Styles.listContainer}
                data={filteredSiteList}
                renderItem={renderSiteItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
