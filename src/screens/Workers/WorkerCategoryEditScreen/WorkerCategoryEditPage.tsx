import {BackHandler, StyleSheet, View} from 'react-native';
import {useWorkerCategoryEdit} from './useWorkerCategoryEdit';
import Header from '../../../components/CommonComponets/Header/Header';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Switch from '../../../components/CommonComponets/Switch/Switch';
import Button from '../../../components/CommonComponets/Button/Button';
import {Colors} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const WorkerCategoryEditPage = ({route, navigation}: any) => {
  const {workerCategoryId, redirect} = route.params;

  const {
    workerCategoryName,
    setWorkerCategoryName,
    notes,
    setNotes,
    isActive,
    setIsActive,
    error,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
  } = useWorkerCategoryEdit(
    workerCategoryId as string,
    navigation,
    redirect,
    route,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBack();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [hasUnsavedChanges]),
  );

  return (
    <View style={styles.container}>
      <Header title="Edit Worker Category" onBackPress={handleBack} />
      <View style={styles.inputContainer}>
        <Input
          title="Worker Category Name"
          value={workerCategoryName}
          onChangeText={setWorkerCategoryName}
          errorMessage={error.workerCategoryName}
          placeholder="Enter worker category name"
          required={true}
        />

        <Textarea
          label="Notes"
          value={`${notes ? notes : ''}`}
          onChange={setNotes}
          placeholder="Enter your notes"
        />
        <Switch
          label="Is Active"
          value={isActive}
          onValueChange={setIsActive}
        />
        <Button title="Update" onPress={handleSubmission} />
      </View>
    </View>
  );
};

export {WorkerCategoryEditPage};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
});
