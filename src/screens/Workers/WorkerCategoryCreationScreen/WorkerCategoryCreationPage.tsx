// import {BackHandler, StyleSheet, View} from 'react-native';
// import {useWorkerCategoryCreation} from './useWorkerCategoryCreation';
// import Header from '../../../components/CommonComponets/Header/Header';
// import {Input} from '../../../components/CommonComponets';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import Button from '../../../components/CommonComponets/Button/Button';
// import {useFocusEffect} from '@react-navigation/native';
// import React, {useCallback} from 'react';
// import {Colors} from '../../../utils';

// const WorkerCategoryCreationPage = ({navigation, route}: any) => {
//   const {
//     workerCategoryName,
//     setWorkerCategoryName,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     hasUnsavedChanges,
//     handleSubmission,
//   } = useWorkerCategoryCreation({navigation, route});

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBack();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [hasUnsavedChanges]),
//   );

//   return (
//     <View style={styles.container}>
//       <Header title="Create Worker Category" onBackPress={handleBack} />
//       <View style={styles.inputContainer}>
//         <Input
//           title="Worker Category Name"
//           placeholder="Enter worker category name"
//           value={workerCategoryName}
//           onChangeText={setWorkerCategoryName}
//           errorMessage={error.workerCategoryName}
//           required={true}
//         />
//         <Textarea
//           label="Notes"
//           placeholder="Enter your notes"
//           value={notes}
//           onChange={setNotes}
//         />
//         <Button
//           buttonStyle={{marginTop: 10}}
//           title="Create"
//           onPress={handleSubmission}
//         />
//       </View>
//     </View>
//   );
// };

// export {WorkerCategoryCreationPage};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   inputContainer: {
//     paddingHorizontal: 16,
//     marginTop: 16,
//     gap: 10,
//   },
// });

//2

import {BackHandler, StyleSheet, View} from 'react-native';
import {useWorkerCategoryCreation} from './useWorkerCategoryCreation';
import Header from '../../../components/CommonComponets/Header/Header';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Button from '../../../components/CommonComponets/Button/Button';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Colors} from '../../../utils';

const WorkerCategoryCreationPage = ({navigation, route}: any) => {
  const {
    workerCategoryName,
    setWorkerCategoryName,
    notes,
    setNotes,
    error,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
  } = useWorkerCategoryCreation({navigation, route});

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
      <Header title="Create Worker Category" onBackPress={handleBack} />
      <View style={styles.inputContainer}>
        <Input
          title="Worker Category Name"
          placeholder="Enter worker category name"
          value={workerCategoryName}
          onChangeText={setWorkerCategoryName}
          errorMessage={error.workerCategoryName}
          required={true}
        />
        <Textarea
          label="Notes"
          placeholder="Enter your notes"
          value={notes}
          onChange={setNotes}
        />
        <Button
          buttonStyle={{marginTop: 10}}
          title="Create"
          onPress={handleSubmission}
        />
      </View>
    </View>
  );
};

export {WorkerCategoryCreationPage};

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
