import React, { useState } from 'react';
import {
    View,
    FlatList,
    BackHandler,
    TouchableOpacity,
    Text,
    RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GetStartedCard from '../../GetStartScreen/GetStartScreen';
import SearchBar from '../../../components/CommonComponets/SearchBar/Searchbar';
import images from '../../..';
import RouteName from '../../../navigation/RouteName';
import ContactCard from '../../../components/CommonComponets/ContactCard/ContactCard';
import ToastNotification from '../../../components/CommonComponets/Toast/Toast';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/ListScreenStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Loader from '../../../components/Loader/Loader';
import { useWorkRateAbstractionList } from './useWorkRateAbstractList';


export default function WorkRateAbstractListScreen({ navigation }: any) {
    const [searchText, setSearchText] = useState('');
    const { workRateAbstract, fetchWorkRateAbstract, handleEditworkRateAbstract, loading, confirmDelete } =
        useWorkRateAbstractionList({ navigation });
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

    const filteredWorkRateAbstractList = workRateAbstract?.filter((user: { siteName: string; }) =>
        user?.siteName?.toLowerCase()?.includes(searchText?.trim()?.toLowerCase()),
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchWorkRateAbstract();
        setRefreshing(false);
    };

    if (loading && !refreshing) {
        return <Loader />;
    }

    if (!workRateAbstract.length) {
        return (
            <GetStartedCard
                buttonClick={RouteName.WORK_RATE_ABSTRACT_CREATION}
                buttonLabel="Create WorkRateAbstract"
                imgSrc={images.worker_start_img}>
                Simplify the management of your construction WorkRateAbstract with WorkInSite.
                Get started today to ensure seamless coordination and productivity on
                your projects.
            </GetStartedCard>
        );
    }

    const handlePress = () => {
        navigation.navigate(RouteName.WORK_RATE_ABSTRACT_CREATION);
    };

    const handleBack = () => {
        navigation.navigate(RouteName.Home_SCREEN);
    };

    return (
        <View style={commonStyle.container}>
            <ToastNotification />
            <Header
                title="Work Rate Abstract List"
                onBackPress={handleBack}
                handleCreate={handlePress}
            />
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <View>
                {filteredWorkRateAbstractList.length === 0 ? (
                    <Text style={Styles.emptyText}>No workers found</Text>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredWorkRateAbstractList}
                        keyExtractor={workRateAbstract => workRateAbstract.id.toString()}
                        renderItem={({ item: workRateAbstract }: any) => (
                            <TouchableOpacity
                                style={Styles.card}
                                onPress={() => handleEditworkRateAbstract(workRateAbstract.id)}>
                                <ContactCard
                                    key={workRateAbstract.id}
                                    name={workRateAbstract.siteName}
                                    phone={workRateAbstract.workTypeName}
                                    onDelete={() => confirmDelete(workRateAbstract.id)}
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
