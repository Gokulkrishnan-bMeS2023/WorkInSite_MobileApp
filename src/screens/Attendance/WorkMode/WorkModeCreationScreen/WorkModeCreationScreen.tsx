import React, { useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, BackHandler, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useworkModeCreation } from "./useWorkModeCreation";
import Header from "../../../../components/CommonComponets/Header/Header";
import commonStyle from "../../../../styles/commonStyle";
import { Input } from "../../../../components/CommonComponets";
import Button from "../../../../components/CommonComponets/Button/Button";
import WorkModeListScreen from "../WorkModeListScreen/WorkModeListScreen";

export const WorkModeCreationScreen = ({ navigation }: any) => {
  const { name, setName, error, handleSubmission, handleBackPress } = useworkModeCreation({ navigation });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [handleBackPress])
  );

  return (
    <>
      <Header title="Create Work Mode" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={commonStyle.inputfieldContainer}>
              <Input title="Work Mode" value={name} onChangeText={setName} placeholder="Enter work mode" errorMessage={error.name} />
              <Button title="Save" onPress={handleSubmission} />
            </View>
            <WorkModeListScreen />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

    </>
  );
};


