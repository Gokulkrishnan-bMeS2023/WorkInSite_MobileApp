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
import { useWorkerCategoryList } from './useWorkerCategoryListScreen';

export default function WorkerCategoryListScreen({ navigation }: any) {
    const [searchText, setSearchText] = useState('');
    const { WorkerCategoryDetails, fetchWorkerCategory, handleEditWorkerCategory, loading, confirmDelete } =
        useWorkerCategoryList({ navigation });
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

    const filteredWorkerCategoryList = WorkerCategoryDetails?.filter((user: { workerCategoryName: string; }) =>
        user?.workerCategoryName?.toLowerCase()?.includes(searchText?.trim()?.toLowerCase()),
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchWorkerCategory();
        setRefreshing(false);
    };

    if (loading && !refreshing) {
        return <Loader />;
    }

    if (!WorkerCategoryDetails.length) {
        return (
            <GetStartedCard
                buttonClick={RouteName.WORKER_CATEGORY_CREATION_SCREEN}
                buttonLabel="Create WorkerCategory"
                imgSrc={images.worker_start_img}>
                Simplify the management of your construction workerCategory with WorkInSite.
                Get started today to ensure seamless coordination and productivity on
                your projects.
            </GetStartedCard>
        );
    }

    const handlePress = () => {
        navigation.navigate(RouteName.WORKER_CATEGORY_CREATION_SCREEN);
    };

    const handleBack = () => {
        navigation.navigate(RouteName.Home_SCREEN);
    };

    return (
        <View style={commonStyle.container}>
            <ToastNotification />
            <Header
                title="Worker Category List"
                onBackPress={handleBack}
                handleCreate={handlePress}
            />
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <View>
                {filteredWorkerCategoryList.length === 0 ? (
                    <Text style={Styles.emptyText}>No workers found</Text>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredWorkerCategoryList}
                        keyExtractor={workerCategory => workerCategory.id.toString()}
                        renderItem={({ item: workerCategory }: any) => (
                            <TouchableOpacity
                                style={Styles.card}
                                onPress={() => handleEditWorkerCategory(workerCategory.id)}>
                                <ContactCard
                                    key={workerCategory.id}
                                    name={workerCategory.workerCategoryName}
                                    onDelete={() => confirmDelete(workerCategory.id)}
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
