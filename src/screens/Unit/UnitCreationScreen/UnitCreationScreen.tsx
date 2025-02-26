
import React, { useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, BackHandler, StyleSheet } from "react-native";
import Input from "../../../components/CommonComponets/Input/input";
import Button from "../../../components/CommonComponets/Button/Button";
import Header from "../../../components/CommonComponets/Header/Header";
import commonStyle from "../../../styles/commonStyle";
import { useFocusEffect } from "@react-navigation/native";
import { useUnitCreation } from "./useUnitCreation";
import UnitListScreen from "../UnitListScreen/UnitListScreen";

export const UnitCreationScreen = ({ navigation }: any) => {
  const { name, setName, error, handleSubmission, handleBackPress } = useUnitCreation({ navigation });

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
      <Header title="Create Unit" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={commonStyle.inputfieldContainer}>
              <Input title="Unit" value={name} onChangeText={setName} placeholder="Enter unit" errorMessage={error.name} />
              <Button title="Save" onPress={handleSubmission} />
            </View>
            <UnitListScreen />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
  
    </>
  );
};


