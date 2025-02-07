import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../utils';
import { Alert } from 'react-native';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';

interface WorkTypeEditFormProps {
  workTypeList: string[];
  setworkTypeList: (newList: string[]) => void;
  refProp?: React.RefObject<any>;
  selectedItem?: { index: number; value: string };
}

const WorkTypeEditForm: React.FC<WorkTypeEditFormProps> = ({
  workTypeList,
  setworkTypeList,
  refProp,
  selectedItem,
}) => {
  const [newName, setNewName] = useState(selectedItem?.value || '');
  const [error, setError] = useState("")


  // Sync state when selectedItem changes
  useEffect(() => {
    setNewName(selectedItem?.value || '');
  }, [selectedItem]);

  const handleSave = () => {
    if (!selectedItem) return;

    if (newName.trim() === '') {
      setError("Enter work type");
      return;
    }
    const updatedList = [...workTypeList];
    updatedList[selectedItem.index] = newName.trim();
    setworkTypeList(updatedList);
    refProp?.current?.close();
    setError("");
  };

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
