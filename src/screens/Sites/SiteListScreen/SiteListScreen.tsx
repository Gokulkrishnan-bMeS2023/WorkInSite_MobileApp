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
import {useSiteList} from './useSiteList';
import images from '../../../images';
import Colors from '../../../utils/color';
import {SiteCard} from '../SiteCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import CustomHeader from '../../../components/CommonComponets/Header/CustomHeader';
import RouteName from '../../../navigation/RouteName';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';

const SiteListScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {siteDetails, fetchSite, handleSiteSelect, hasSearchFilter} =
    useSiteList({navigation});

  const handleSearch = (text: string) => {
    setSearchText(text);
    fetchSite(text);
  };

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

  if (!siteDetails.length && !hasSearchFilter) {
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
      style={styles.siteCardContainer}>
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
    <SafeAreaView style={{flexGrow: 1, backgroundColor: Colors.white}}>
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
              Site List
            </Text>
          </View>
        }
        rightNode={
          <TouchableOpacity onPress={handlePress}>
            <Icon1 name="pluscircle" size={30} color={Colors.secondaryColor} />
          </TouchableOpacity>
        }
      />
      <SearchBar searchText={searchText} setSearchText={handleSearch} />
      <View style={styles.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            <View>
              <View>
                {siteDetails.length === 0 ? (
                  <Text style={styles.noSitesText}>No sites found</Text>
                ) : (
                  <FlatList
                    data={siteDetails}
                    renderItem={renderSiteItem}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  siteCardContainer: {
    padding: 4,
  },
  noSitesText: {
    textAlign: 'center',
    color: Colors.grayColor,
    fontSize: 16,
    marginTop: 20,
  },
});

export default SiteListScreen;
