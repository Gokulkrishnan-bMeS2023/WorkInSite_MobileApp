

import React from "react";
import { View } from "react-native";
import Input from "../../../components/CommonComponets/Input/input";
import Button from "../../../components/CommonComponets/Button/Button";
import { useUnitEdit } from "./useUnitEdit";
import commonStyle from "../../../styles/commonStyle";
import { UnitDetailsProps } from "../DTOs/UnitDetails"; // Import the interface

export function UnitEditScreen({ id, unitSheetRef, onUpdateSuccess }: UnitDetailsProps){
  const { name, setName, error, unitDetails, handleSubmission } = useUnitEdit(id);

  const handleUpdate = async () => {
    await handleSubmission();
    unitSheetRef.current?.close();  // Close the bottom sheet after update
    onUpdateSuccess();  // Call onUpdateSuccess to refresh the unit list
  };

  return (
    <View style={commonStyle.inputfieldContainer}>
      {unitDetails && (
        <Input
          title="Unit"
          value={name}
          onChangeText={setName}
          required
          errorMessage={error.name}
        />
      )}
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

