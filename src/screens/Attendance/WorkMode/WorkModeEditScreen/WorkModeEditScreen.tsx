import React from "react";
import { View } from "react-native";
import Input from "../../../../components/CommonComponets/Input/input";
import Button from "../../../../components/CommonComponets/Button/Button";
import commonStyle from "../../../../styles/commonStyle";
import { workModeDetailsProps } from "../DTOs/WorkModeDetails";
import { useWorkModeEdit } from "./useWorkModeEdit";

export function WorkModeEditScreen({ id, workModeSheetRef, onUpdateSuccess }: workModeDetailsProps) {
  const { name, setName, error, workModeDetails, handleSubmission } = useWorkModeEdit(id);

  const handleUpdate = async () => {
    await handleSubmission();
    workModeSheetRef.current?.close();
    onUpdateSuccess();
  };

  return (
    <View style={commonStyle.inputfieldContainer}>
      {workModeDetails && (
        <Input
          title="Work Mode"
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

