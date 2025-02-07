// import React from 'react';
// import {
//   View,
//   BackHandler,
//   StyleSheet,
// } from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';

// export default function SettingsScreen({navigation}: any) {

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         navigation.navigate('Home');
//         return true;
//       };
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, []),
//   );
//   const handleback = () => {
//     navigation.navigate('Home');
//   };
//   return (
//     <View style={commonStyle.container}>
//       <Header title="Create Material" onBackPress={handleback} />
//     </View>
//   );
// }


import React, { useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import commonStyle from '../../../styles/commonStyle';

import { Input } from '../../../components/CommonComponets';
import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
import { useMaterialCreation } from './useMaterialCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import Button from '../../../components/CommonComponets/Button/Button';
import { numberRegex } from '../../../utils/regex';

const MaterialCreationScreen = ({ navigation }: any) => {
  const {
    name,
    setName,
    unitId,
    setUnitId,
    hsnCode,
    setHsnCode,
    unitOptions,
    error,
    handleSubmission,
    handleBackPress,
  } = useMaterialCreation({ navigation });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackPress();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [handleBackPress]),
  );

  return (
    <>
      <Header title="Create Material" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={commonStyle.inputfieldContainer}>
              <Input
                title="Material Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter material"
                required={true}
                errorMessage={error.name}
              />

              <Combobox
                label="Unit"
                items={unitOptions}
                selectedValue={unitId}
                onValueChange={setUnitId}
                placeholder="Select Unit"
                required={true}
                errorMessage={error.unitId}
              />

              <Input
                title="HSN Code"
                value={hsnCode}
                onChangeText={setHsnCode}
                placeholder="Enter HSN code"
                required={true}
                inputType="phone-pad"
                regex={numberRegex}
                errorMessage={error.hsnCode}
              />

              <Button title="Save" onPress={handleSubmission} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export { MaterialCreationScreen };


