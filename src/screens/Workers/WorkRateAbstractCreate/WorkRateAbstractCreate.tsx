import React, { useCallback } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import { useWorkRateAbstractCreate } from './useWorkRateAbstractCreate';
import { useFocusEffect } from '@react-navigation/native';

const WorkRateAbstract = ({ navigation }: any) => {
  const {
    siteDetails,
    workTypeDetails,
    error,
    siteId,
    unitId,
    unitDetails,
    workTypeId,
    totalRate,
    totalQuantity,
    notes,
    handleBackPress,
    hasUnsavedChanges,
    setSiteId,
    fetchSites,
    fetchWorkTypes,
    fetchUnits,
    setWorkTypeId,
    setTotalRate,
    setTotalQuantity,
    setNotes,
    handleSubmit,
    setUnitId,
  } = useWorkRateAbstractCreate(navigation)

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
      <Header title="Create Work Rate Abstract" onBackPress={handleBackPress} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 16, gap: 10 }}>
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
            label="Work Type"
            items={workTypeDetails}
            selectedValue={workTypeId}
            onValueChange={setWorkTypeId}
            required
            onSearch={fetchWorkTypes}
            errorMessage={error.workType}
          />
          <Input
            title="Total Rate"
            placeholder="Enter Total Rate"
            value={totalRate}
            onChangeText={setTotalRate}
            inputType='numeric'
            required
            errorMessage={error.totalRate}
          />
          <Input
            title="Total Quantity"
            placeholder="Enter Total Quantity"
            value={totalQuantity}
            onChangeText={setTotalQuantity}
            inputType='numeric'
            required
            errorMessage={error.totalQuantity}
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
          <Textarea
            label="Remark"
            placeholder="Enter your Remark"
            value={notes}
            onChange={setNotes}
          />
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

export default WorkRateAbstract;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});


