import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../utils';
import { Alert } from 'react-native';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { useWorkTypeEditForm } from './useWorkTypeEditForm';

interface WorkTypeEditFormProps {
  workTypeList: string[];
  setworkTypeList: (newList: string[]) => void;
  refProp?: React.RefObject<any>;
  selectedItem?: { index: number; value: string };
}

const WorkTypeEditForm = (props: WorkTypeEditFormProps) => {
  const { newName, setNewName, error, handleSave } = useWorkTypeEditForm(props)

  return (
    <View style={styles.container}>
      <Input
        title="Work Type"
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter work type"
        errorMessage={error}
      />
      <Button title='Update' onPress={handleSave} />
    </View>
  );
};

export default WorkTypeEditForm;

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
});
