// import React, { useCallback } from "react";
// import { View, ScrollView, KeyboardAvoidingView, BackHandler } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { useShiftCreation } from "./useShiftCreation";
// import Header from "../../../../components/CommonComponets/Header/Header";
// import commonStyle from "../../../../styles/commonStyle";
// import { Input } from "../../../../components/CommonComponets";
// import Button from "../../../../components/CommonComponets/Button/Button";
// import ShiftListScreen from "../ShiftListScreen/ShiftListScreen";

// export const ShiftCreationScreen = ({ navigation }: any) => {
//   const { name, setName, error, handleSubmission, handleBackPress } = useShiftCreation({ navigation });

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener("hardwareBackPress", onBackPress);
//       return () => {
//         BackHandler.removeEventListener("hardwareBackPress", onBackPress);
//       };
//     }, [handleBackPress])
//   );

//   return (
//     <>
//       <Header title="Create Shift" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               <Input title="Shift" value={name} onChangeText={setName} placeholder="Enter work mode" errorMessage={error.name} />
//               <Button title="Save" onPress={handleSubmission} />
//             </View>
//             <ShiftListScreen />
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>

//     </>
//   );
// };


//2
import React, { useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, BackHandler, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useShiftCreation } from "./useShiftCreation";
import Header from "../../../../components/CommonComponets/Header/Header";
import commonStyle from "../../../../styles/commonStyle";
import { Input } from "../../../../components/CommonComponets";
import Button from "../../../../components/CommonComponets/Button/Button";
import ShiftListScreen from "../ShiftListScreen/ShiftListScreen";
import Loader from "../../../../components/Loader/Loader";

export const ShiftCreationScreen = ({ navigation }: any) => {
  const { name, setName, error, handleSubmission, handleBackPress, fetchShift, loading, shiftDetails, handleShiftDelete } = useShiftCreation({ navigation });

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
      <Header title="Create Shift" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <View style={commonStyle.inputfieldContainer}>
            <Input title="Shift" value={name} onChangeText={setName} placeholder="Enter work mode" errorMessage={error.name} />
            <Button title="Save" onPress={handleSubmission} />
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>Shift List</Text>
          </View>
          {loading ? <Loader /> :
            <ScrollView keyboardShouldPersistTaps="handled" style={{ marginBottom: 80 }}>
              <ShiftListScreen fetchShift={fetchShift} shiftDetails={shiftDetails} handleShiftDelete={handleShiftDelete} />
            </ScrollView>}
        </KeyboardAvoidingView>
      </View>

    </>
  );
};
