// import {BackHandler, View} from 'react-native';
// import {useWorkerCategoryEdit} from './useWorkerCategoryEdit';
// import Header from '../../../components/CommonComponets/Header/Header';
// import {Input} from '../../../components/CommonComponets';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import Switch from '../../../components/CommonComponets/Switch/Switch';
// import Button from '../../../components/CommonComponets/Button/Button';
// import {useFocusEffect} from '@react-navigation/native';
// import {useCallback} from 'react';
// import commonStyle from '../../../styles/commonStyle';
// import React from 'react';
// import {nameRegex} from '../../../utils/regex';

// const WorkerCategoryEditPage = ({route, navigation}: any) => {
//   const {workerCategoryId, redirect} = route.params;

//   const {
//     workerCategoryName,
//     setWorkerCategoryName,
//     notes,
//     setNotes,
//     isActive,
//     setIsActive,
//     error,
//     handleBack,
//     hasUnsavedChanges,
//     handleSubmission,
//   } = useWorkerCategoryEdit(
//     workerCategoryId as string,
//     navigation,
//     redirect,
//     route,
//   );

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
//       <Header title="Edit Worker Category" onBackPress={handleBack} />
//       <View style={commonStyle.container}>
//         <View style={commonStyle.container}>
//           <View style={commonStyle.inputfieldContainer}>
//             <Input
//               title="Worker Category Name"
//               value={workerCategoryName}
//               onChangeText={setWorkerCategoryName}
//               errorMessage={error.workerCategoryName}
//               placeholder="Enter worker category name"
//               required={true}
//               regex={nameRegex}
//             />

//             <Textarea
//               label="Notes"
//               value={`${notes ? notes : ''}`}
//               onChange={setNotes}
//               placeholder="Enter your notes"
//             />
//             <Switch
//               label="Is Active"
//               value={isActive}
//               onValueChange={setIsActive}
//             />
//             <Button title="Update" onPress={handleSubmission} />
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// export {WorkerCategoryEditPage};


//2


import React, { useCallback, useRef } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../components/CommonComponets/Header/Header';
import { Input } from '../../../components/CommonComponets';
import commonStyle from '../../../styles/commonStyle';
import { nameRegex } from '../../../utils/regex';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import Button from '../../../components/CommonComponets/Button/Button';
import { FormActionButton } from '../../Contacts/FormActionButton/FormActionButton';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkTypeCreateForm from "../WorkTypeCreateForm/WorkTypeCreateForm"
import WorkTypeList from '../WorkTypeList/WorkTypeList';
import WorkerRoleCreateForm from '../WorkerRoleCreateForm/WorkerRoleCreateForm';
import WorkerRoleList from '../WorkerRoleList/WorkerRoleList';
import { useWorkerCategoryCreation } from './useWorkerCategoryEdit';


const WorkerCategoryEditPage = ({ navigation, route }: any) => {
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

export { WorkerCategoryEditPage };


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