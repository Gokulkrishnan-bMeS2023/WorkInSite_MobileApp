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

// import {BackHandler, View} from 'react-native';
// import {useWorkerCategoryCreation} from './useWorkerCategoryCreation';
// import Header from '../../../components/CommonComponets/Header/Header';
// import {Input} from '../../../components/CommonComponets';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import Button from '../../../components/CommonComponets/Button/Button';
// import {useFocusEffect} from '@react-navigation/native';
// import React, {useCallback} from 'react';
// import commonStyle from '../../../styles/commonStyle';
// import { nameRegex } from '../../../utils/regex';

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
//     <>
//       <Header title="Create Worker Category" onBackPress={handleBack} />
//       <View style={commonStyle.container}>
//       <View style={commonStyle.inputfieldContainer}>
//         <Input
//           title="Worker Category Name"
//           placeholder="Enter worker category name"
//           value={workerCategoryName}
//           onChangeText={setWorkerCategoryName}
//           errorMessage={error.workerCategoryName}
//           required={true}
//           regex={nameRegex}
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
//     </>
//   );
// };

// export {WorkerCategoryCreationPage};


// //3
// import React, { useCallback } from 'react';
// import { BackHandler, ScrollView, View } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import { Input } from '../../../components/CommonComponets';
// import commonStyle from '../../../styles/commonStyle';
// import { nameRegex } from '../../../utils/regex';
// import { useWorkerCategoryCreation } from './useWorkerCategoryCreation';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import Button from '../../../components/CommonComponets/Button/Button';

// const WorkerCategoryCreationPage = ({ navigation, route }: any) => {
//   const {
//     workerCategoryName,
//     setWorkerCategoryName,
//     workerRole,
//     setWorkerRole,
//     salaryPerShift,
//     setSalaryPerShift,
//     hoursPerShift,
//     setHoursPerShift,
//     workType,
//     setWorkType,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     handleSubmission,
//   } = useWorkerCategoryCreation({ navigation, route });

//   // Handle hardware back button press
//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBack();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [handleBack])
//   );

//   return (
//     <>
//       <Header title="Create Worker Category" onBackPress={handleBack} />
//       <ScrollView style={commonStyle.container} keyboardShouldPersistTaps="handled">
//         <View style={commonStyle.inputfieldContainer}>
//           <Input
//             title="Worker Category Name"
//             placeholder="Enter worker category name"
//             value={workerCategoryName}
//             onChangeText={setWorkerCategoryName}
//             errorMessage={error.workerCategoryName}
//             required
//             regex={nameRegex}
//           />
//           <Input
//             title="Worker Role"
//             placeholder="Enter Worker Role"
//             value={workerRole}
//             onChangeText={setWorkerRole}
//             errorMessage={error.workerRole}

//           />
//           <Input
//             title="Salary Per Shift"
//             placeholder="Enter Salary Per Shift"
//             value={salaryPerShift}
//             onChangeText={setSalaryPerShift}
//             inputType="numeric"
//             errorMessage={error.salaryPerShift}

//           />
//           <Input
//             title="Hours Per Shift"
//             placeholder="Enter Hours Per Shift"
//             value={hoursPerShift}
//             onChangeText={setHoursPerShift}
//             errorMessage={error.hoursPerShift}
//             inputType="numeric"

//           />
//           <Input
//             title="Work Type"
//             placeholder="Enter Work Type"
//             value={workType}
//             onChangeText={setWorkType}
//             errorMessage={error.workType}
//           />
//           <Textarea
//             label="Notes"
//             placeholder="Enter your notes"
//             value={notes}
//             onChange={setNotes}
//           />
//           <Button
//             buttonStyle={{ marginTop: 10 }}
//             title="Create"
//             onPress={handleSubmission}
//           />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// export { WorkerCategoryCreationPage };


//4


// import React, { useCallback } from 'react';
// import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import { Input } from '../../../components/CommonComponets';
// import commonStyle from '../../../styles/commonStyle';
// import { nameRegex } from '../../../utils/regex';
// import { useWorkerCategoryCreation } from './useWorkerCategoryCreation';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import Button from '../../../components/CommonComponets/Button/Button';
// import { Colors } from '../../../utils';
// import Icon from '../../../utils/VectorIcons';



// const WorkerCategoryCreationPage = ({ navigation, route }: any) => {
//   const {
//     workerCategoryName,
//     setWorkerCategoryName,
//     workerRole,
//     setWorkerRole,
//     salaryPerShift,
//     setSalaryPerShift,
//     hoursPerShift,
//     setHoursPerShift,
//     workType,
//     setWorkType,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     handleSubmission,
//     editingIndex,
//     handleEdit,
//     handleDelete,
//     handleAction,
//     workTypeList,
//     workerRoleList,
//     setworkerRoleist,
//     editingRoleIndex,
//     setEditingRoleIndex,
//     handleRoleAction,
//     handleWorkerRoleEdit,
//     handleWorkerRoleDelete,
//   } = useWorkerCategoryCreation({ navigation, route });

//   // Handle hardware back button press
//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBack();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [handleBack])
//   );

//   return (
//     <>
//       <Header title="Create Worker Category" onBackPress={handleBack} />
//       <ScrollView style={commonStyle.container} keyboardShouldPersistTaps="handled">
//         <View style={commonStyle.inputfieldContainer}>
//           <Input
//             title="Worker Category Name"
//             placeholder="Enter worker category name"
//             value={workerCategoryName}
//             onChangeText={setWorkerCategoryName}
//             errorMessage={error.workerCategoryName}
//             required
//             regex={nameRegex}
//           />
//           <Input
//             title="Worker Role"
//             placeholder="Enter Worker Role"
//             value={workerRole}
//             onChangeText={setWorkerRole}
//             errorMessage={error.workerRole}
//             required
//             rightIcon={
//               <TouchableOpacity
//                 onPress={() =>
//                   handleRoleAction(editingRoleIndex === null ? 'add' : 'update')
//                 }
//               >
//                 <Icon icon='MaterialIcons' name={editingRoleIndex === null ? "add-circle" : "save-alt"} size={30} color={Colors.secondaryColor}
//                 />
//               </TouchableOpacity>

//             }
//           />

//           <View>
//             {workerRoleList?.map((item, index) => (
//               <View key={index} style={styles.listItem}>
//                 <Text style={styles.nameText}>{item}</Text>
//                 <View style={styles.actions}>
//                   <TouchableOpacity
//                     onPress={() => handleWorkerRoleEdit(index)}
//                     style={styles.actionButton}
//                   >
//                     <Icon icon='MaterialIcons' name="edit" size={24} color={Colors.secondaryColor} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     disabled={editingRoleIndex === index}
//                     style={{ opacity: editingRoleIndex === index ? 0.5 : 1, padding: 8 }}
//                     onPress={() => handleWorkerRoleDelete(index)}
//                   >
//                     <Icon icon='MaterialIcons' name="delete" size={24} color="#F44336" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>

//           <Input
//             title="Salary Per Shift"
//             placeholder="Enter Salary Per Shift"
//             value={salaryPerShift}
//             onChangeText={setSalaryPerShift}
//             inputType="numeric"
//             errorMessage={error.salaryPerShift}
//             required
//           />
//           <Input
//             title="Hours Per Shift"
//             placeholder="Enter Hours Per Shift"
//             value={hoursPerShift}
//             onChangeText={setHoursPerShift}
//             errorMessage={error.hoursPerShift}
//             inputType="numeric"
//             required
//           />
//           <Input
//             title="Work Type"
//             placeholder="Enter Work Type"
//             value={workType}
//             onChangeText={setWorkType}
//             errorMessage={error.workType}
//             required
//             rightIcon={
//               <TouchableOpacity
//                 onPress={() =>
//                   handleAction(editingIndex === null ? 'add' : 'update')
//                 }
//               >
//                 <Icon icon='MaterialIcons' name={editingIndex === null ? "add-circle" : "save-alt"} size={30} color={Colors.secondaryColor}
//                 />
//               </TouchableOpacity>

//             }
//           />
//           <View>
//             {workTypeList.map((item, index) => (
//               <View key={index} style={styles.listItem}>
//                 <Text style={styles.nameText}>{item}</Text>
//                 <View style={styles.actions}>
//                   <TouchableOpacity
//                     onPress={() => handleEdit(index)}
//                     style={styles.actionButton}
//                   >
//                     <Icon icon='MaterialIcons' name="edit" size={24} color={Colors.secondaryColor} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     disabled={editingIndex === index}
//                     style={{ opacity: editingIndex === index ? 0.5 : 1, padding: 8 }}
//                     onPress={() => handleDelete(index)}
//                   >
//                     <Icon icon='MaterialIcons' name="delete" size={24} color="#F44336" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//           <Textarea
//             label="Notes"
//             placeholder="Enter your notes"
//             value={notes}
//             onChange={setNotes}
//           />

//           <Button
//             buttonStyle={{ marginTop: 10 }}
//             title="Create"
//             onPress={handleSubmission}
//           />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// export { WorkerCategoryCreationPage };


// const styles = StyleSheet.create({

//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     marginBottom: 8,
//   },
//   nameText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     padding: 8,
//   },
// });

//5
import React, { useCallback, useRef } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../components/CommonComponets/Header/Header';
import { Input } from '../../../components/CommonComponets';
import commonStyle from '../../../styles/commonStyle';
import { nameRegex } from '../../../utils/regex';
import { useWorkerCategoryCreation } from './useWorkerCategoryCreation';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Button from '../../../components/CommonComponets/Button/Button';
import { FormActionButton } from '../../Contacts/FormActionButton/FormActionButton';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkTypeCreateForm from "../WorkTypeCreateForm/WorkTypeCreateForm"
import WorkTypeList from '../WorkTypeList/WorkTypeList';
import WorkerRoleCreateForm from '../WorkerRoleCreateForm/WorkerRoleCreateForm';
import WorkerRoleList from '../WorkerRoleList/WorkerRoleList';


const WorkerCategoryCreationPage = ({ navigation, route }: any) => {
  const {
    workerCategoryName,
    setWorkerCategoryName,
    notes,
    setNotes,
    error,
    handleBack,
    handleSubmission,
    workTypeList,
    setworkTypeList,
    workerRoleList,
    setworkerRoleList,
  } = useWorkerCategoryCreation({ navigation, route });

  // Handle hardware back button press
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBack();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleBack])
  );
  const bottomSheetRef = useRef<any>(null);
  const workerRolebottomSheetRef = useRef<any>(null);

  const handleAdd = (type: "Type" | "Role") => {
    if (type === "Type" && bottomSheetRef?.current) {
      bottomSheetRef.current.open();
    } else if (type === "Role" && workerRolebottomSheetRef?.current) {
      workerRolebottomSheetRef.current.open();
    }
  };
  return (
    <>
      <Header title="Create Worker Category" onBackPress={handleBack} />
      <ScrollView style={commonStyle.container} keyboardShouldPersistTaps="handled">
        <View style={commonStyle.inputfieldContainer}>
          <Input
            title="Worker Category Name"
            placeholder="Enter worker category name"
            value={workerCategoryName}
            onChangeText={setWorkerCategoryName}
            errorMessage={error.workerCategoryName}
            required
            regex={nameRegex}
          />
          <FormActionButton
            heading="Work Type"
            iconType="plus-circle"
            onClick={() => handleAdd("Type")}
            required={true}
          // isIconDisabled={isAddDisabled}
          />
          <CustomBottomSheet
            ref={bottomSheetRef}
            title="Create Work Type"
            onClose={() => bottomSheetRef.current.close()}>
            <WorkTypeCreateForm
              workTypeList={workTypeList}
              setworkTypeList={setworkTypeList}
              Ref={bottomSheetRef}
            />
          </CustomBottomSheet>
          <WorkTypeList
            workTypeList={workTypeList}
            setworkTypeList={setworkTypeList}
          />
          <FormActionButton
            heading="Worker Role"
            iconType="plus-circle"
            onClick={() => handleAdd("Role")}
            required={true}
          />
          <WorkerRoleList
            workerRoleList={workerRoleList}
            setworkerRoleList={setworkerRoleList}
          />
          <CustomBottomSheet
            ref={workerRolebottomSheetRef}
            title="Create Worker Role"
            onClose={() => workerRolebottomSheetRef.current.close()}>
            <WorkerRoleCreateForm
              workerRoleList={workerRoleList}
              setworkerRoleList={setworkerRoleList}
              Ref={workerRolebottomSheetRef}
            />
          </CustomBottomSheet>
          <Textarea
            label="Notes"
            placeholder="Enter your notes"
            value={notes}
            onChange={setNotes}
          />
          <Button
            buttonStyle={{ marginTop: 10 }}
            title="Save"
            onPress={handleSubmission}
          />
        </View>
      </ScrollView>
    </>
  );
};

export { WorkerCategoryCreationPage };


const styles = StyleSheet.create({

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 8,
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});