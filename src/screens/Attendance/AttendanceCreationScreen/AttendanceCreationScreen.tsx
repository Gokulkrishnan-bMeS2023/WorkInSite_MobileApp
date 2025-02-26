import React, { useCallback } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import { useFocusEffect } from '@react-navigation/native';
import { useAttendanceCreationScreen } from './useAttendanceCreationScreen';
import { dobRegex } from '../../../utils/regex';

const AttendanceCreationScreen = ({ navigation }: any) => {
    const {
        siteDetails,
        workTypeDetails,
        unitDetails,
        workerDetails,
        wageTypeDetails,
        shiftDetails,
        workModeDetails,
        error,
        siteId,
        workTypeId,
        unitId,
        workerId,
        wageTypeId,
        shiftId,
        workModeId,
        notes,
        workedQuantity,
        date,
        setDate,
        setWorkedQuantity,
        setSiteId,
        setWorkTypeId,
        setUnitId,
        setWorkerId,
        setWageTypeId,
        setShiftId,
        setWorkModeId,
        setNotes,
        fetchSites,
        fetchWorkTypes,
        fetchUnits,
        fetchWorkers,
        fetchWageTypes,
        fetchShifts,
        fetchWorkModes,
        handleBackPress,
        handleSubmit,
        hasUnsavedChanges
    } = useAttendanceCreationScreen(navigation)

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => handleBackPress();
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [hasUnsavedChanges]),
    );

    return (
        <>
            <Header title="Create Attendance" onBackPress={handleBackPress} />
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={{ padding: 16, gap: 10 }}>
                    <Input
                        title="Date of Birth"
                        placeholder="DD/MM/YYYY"
                        value={date}
                        onChangeText={setDate}
                        errorMessage={error.date}
                        required={true}
                        maxLength={10}
                        regex={dobRegex}
                    />

                    <Combobox
                        label="Site"
                        items={siteDetails}
                        selectedValue={siteId}
                        onValueChange={setSiteId}
                        required
                        onSearch={fetchSites}
                        errorMessage={error.site}
                    />
                    <Combobox
                        label="Wage Type"
                        items={wageTypeDetails}
                        selectedValue={wageTypeId}
                        onValueChange={setWageTypeId}
                        required
                        onSearch={fetchWageTypes}
                        errorMessage={error.workType}
                    />
                    <Combobox
                        label="Work Type"
                        items={workTypeDetails}
                        selectedValue={workTypeId}
                        onValueChange={setWorkTypeId}
                        required
                        onSearch={fetchWorkTypes}
                        errorMessage={error.workType}
                    />
                    <Combobox
                        label="Worker"
                        items={workerDetails}
                        selectedValue={workerId}
                        onValueChange={setWorkerId}
                        onSearch={fetchWorkers}
                        required
                        errorMessage={error.worker}
                    />
                    <Input
                        title="Worked Quantity"
                        placeholder="Enter Worked Quantity"
                        value={workedQuantity}
                        onChangeText={setWorkedQuantity}
                        inputType='numeric'
                        required
                        errorMessage={error.workedQuantity}
                    />

                    <Combobox
                        label="Unit"
                        items={unitDetails}
                        selectedValue={unitId}
                        onValueChange={setUnitId}
                        onSearch={fetchUnits}
                        required
                        errorMessage={error.unit}
                    />
                    <Combobox
                        label="Shift"
                        items={shiftDetails}
                        selectedValue={shiftId}
                        onValueChange={setShiftId}
                        onSearch={fetchShifts}
                        required
                        errorMessage={error.shift}
                    />
                    <Combobox
                        label="Work Mode"
                        items={workModeDetails}
                        selectedValue={workModeId}
                        onValueChange={setWorkModeId}
                        onSearch={fetchWorkModes}
                        required
                        errorMessage={error.workMode}
                    />
                    <Textarea
                        label="Notes"
                        placeholder="Enter your Notes"
                        value={notes}
                        onChange={setNotes}
                    />
                    <Button title="Save" onPress={handleSubmit} />
                </View>
            </ScrollView>
        </>
    );
};

export default AttendanceCreationScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
});


