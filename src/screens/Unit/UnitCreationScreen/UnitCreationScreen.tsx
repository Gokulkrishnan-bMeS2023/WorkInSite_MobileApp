// import React, { useRef, useCallback } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   BackHandler,
// } from 'react-native';
// import { useUnitCreation } from './useUnitCreation';
// import { useFocusEffect } from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';
// import Input from '../../../components/CommonComponets/Input/input';
// import Button from '../../../components/CommonComponets/Button/Button';
// import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
// const unitOptions = [
//   { label: 'Kilogram (kg)', value: 'kg' },
//   { label: 'Metric Ton (ton)', value: 'ton' },
//   { label: 'Gram (g)', value: 'g' },
//   { label: 'Quintal (quint)', value: 'quint' },
//   { label: 'Meter (m)', value: 'm' },
//   { label: 'Centimeter (cm)', value: 'cm' },
//   { label: 'Millimeter (mm)', value: 'mm' },
//   { label: 'Foot (ft)', value: 'ft' },
//   { label: 'Inch (in)', value: 'in' },
//   { label: 'Square Meter (m²)', value: 'm2' },
//   { label: 'Square Foot (ft²)', value: 'ft2' },
//   { label: 'Liter (L)', value: 'L' },
//   { label: 'Cubic Meter (m³)', value: 'm3' },
//   { label: 'Piece (Nos)', value: 'nos' },
//   { label: 'Set (sets)', value: 'sets' },
//   { label: 'Bag (bags)', value: 'bags' },
//   { label: 'Roll (rolls)', value: 'rolls' },
//   { label: 'Tonnes (tons)', value: 'tons' },
// ];

// const UnitCreationScreen = ({ navigation }: any) => {
//   const {
//     name,
//     setName,
//     handleSubmission,
//     handleBackPress,
//     error,
//   } = useUnitCreation({ navigation });

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [handleBackPress]),
//   );

//   return (
//     <>
//       <Header title="Create Unit" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               {/* <Input
//                 title="Unit Name"
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter unit"
//                 required={true}
//                 errorMessage={error.name}
//               /> */}
//               <Combobox
//   label="Unit"
//   items={unitOptions}
//   // selectedValue={unitId}
//   // onValueChange={setUnitId}
//   placeholder="Select Unit"
//   required={true}

// />

//               <Button title="Save" onPress={handleSubmission} />
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };

// export { UnitCreationScreen };


//1

// import React, {useCallback } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   BackHandler,
// } from 'react-native';
// import { useUnitCreation } from './useUnitCreation';
// import { useFocusEffect } from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';
// import Input from '../../../components/CommonComponets/Input/input';
// import Button from '../../../components/CommonComponets/Button/Button';
// const UnitCreationScreen = ({ navigation }: any) => {
//   const {
//     name,
//     setName,
//     handleSubmission,
//     handleBackPress,
//     error,
//   } = useUnitCreation({ navigation });

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [handleBackPress]),
//   );

//   return (
//     <>
//       <Header title="Create Unit" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               <Input
//                 title="Unit"
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter unit"
//                 required={true}
//                 errorMessage={error.name}
//               />
//            <Button title="Save" onPress={handleSubmission} />
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };

// export { UnitCreationScreen };

// 2

// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   BackHandler,
//   Text,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';
// import Input from '../../../components/CommonComponets/Input/input';
// import Button from '../../../components/CommonComponets/Button/Button';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this icon library is installed
// import RouteName from '../../../navigation/RouteName';

// const UnitCreationScreen = ({ navigation }: any) => {
//   const [name, setName] = useState('');
//   const [units, setUnits] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [error, setError] = useState({ name: '' });

//   const handleSubmission = () => {
//     if (!name.trim()) {
//       setError({ name: 'Unit name is required' });
//       return;
//     }

//     if (editingIndex !== null) {
//       // Update existing unit
//       const updatedUnits = [...units];
//       updatedUnits[editingIndex] = name;
//       setUnits(updatedUnits);
//       setEditingIndex(null);
//     } else {
//       // Add new unit
//       setUnits([...units, name]);
//     }

//     setName('');
//     setError({ name: '' });
//   };

//   const handleEdit = (index: number) => {
//     setEditingIndex(index);
//     setName(units[index]);
//   };

//   const handleBackPress = () => {
//     navigation.navigate(RouteName.Home_SCREEN)
//     return true;
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [handleBackPress]),
//   );

//   return (
//     <>
//       <Header title="Create Unit" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               {/* Input for unit */}
//               <Input
//                 title="Unit"
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter unit"
//                 required={true}
//                 errorMessage={error.name}
//               />
//               <Button
//                 title={editingIndex !== null ? 'Update' : 'Save'}
//                 onPress={handleSubmission}
//               />
//               {/* List of units */}
//               {units.map((unit, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 8,
//                   }}>
//                   <Text style={{ flex: 1, fontSize: 16 }}>{unit}</Text>
//                   <Icon
//                     name="edit"
//                     size={24}
//                     color="blue"
//                     onPress={() => handleEdit(index)}
//                   />
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };

// export { UnitCreationScreen };



//3

// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   BackHandler,
//   Text,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';
// import Input from '../../../components/CommonComponets/Input/input';
// import Button from '../../../components/CommonComponets/Button/Button';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this icon library is installed
// import RouteName from '../../../navigation/RouteName';

// const UnitCreationScreen = ({ navigation }: any) => {
//   const [name, setName] = useState('');
//   const [units, setUnits] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [error, setError] = useState({ name: '' });
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleSubmission = () => {
//     if (!name.trim()) {
//       setError({ name: 'Unit name is required' });
//       return;
//     }

//     if (editingIndex !== null) {
//       // Update existing unit
//       const updatedUnits = [...units];
//       updatedUnits[editingIndex] = name;
//       setUnits(updatedUnits);
//       setEditingIndex(null);
//       setModalVisible(false); // Close the modal after updating
//     } else {
//       // Add new unit
//       setUnits([...units, name]);
//     }

//     setName('');
//     setError({ name: '' });
//   };

//   const handleEdit = (index: number) => {
//     setEditingIndex(index);
//     setName(units[index]);
//     setModalVisible(true); // Open the modal for editing
//   };

//   const handleBackPress = () => {
//     navigation.navigate(RouteName.Home_SCREEN);
//     return true;
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [handleBackPress]),
//   );

//   return (
//     <>
//       <Header title="Create Unit" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               {/* Input for unit */}
//               <Input
//                 title="Unit"
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter unit"
//                 required={true}
//                 errorMessage={error.name}
//               />
//               <Button
//                 title={editingIndex !== null ? 'Update' : 'Save'}
//                 onPress={handleSubmission}
//               />
//               {/* List of units */}
//               {units.map((unit, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 8,
//                   }}>
//                   <Text style={{ flex: 1, fontSize: 16 }}>{unit}</Text>
//                   <Icon
//                     name="edit"
//                     size={24}
//                     color="blue"
//                     onPress={() => handleEdit(index)}
//                   />
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>

//       {/* Modal for editing */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Unit</Text>
//             <Input
//               title="Unit"
//               value={name}
//               onChangeText={setName}
//               placeholder="Edit unit"
//               required={true}
//               errorMessage={error.name}
//             />
//             <Button title="Save" onPress={handleSubmission} />
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   cancelButton: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export { UnitCreationScreen };



//4

// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   BackHandler,
//   Text,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import commonStyle from '../../../styles/commonStyle';
// import Header from '../../../components/CommonComponets/Header/Header';
// import Input from '../../../components/CommonComponets/Input/input';
// import Button from '../../../components/CommonComponets/Button/Button';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this icon library is installed
// import RouteName from '../../../navigation/RouteName';

// const UnitCreationScreen = ({ navigation }: any) => {
//   const [name, setName] = useState('');
//   const [units, setUnits] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [error, setError] = useState({ name: '' });
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleSubmission = () => {
//     if (!name.trim()) {
//       setError({ name: 'Unit name is required' });
//       return;
//     }

//     if (editingIndex !== null) {
//       // Update existing unit
//       const updatedUnits = [...units];
//       updatedUnits[editingIndex] = name;
//       setUnits(updatedUnits);
//       setEditingIndex(null);
//       setModalVisible(false); // Close the modal after updating
//     } else {
//       // Add new unit
//       setUnits([...units, name]);
//     }

//     setName('');
//     setError({ name: '' });
//   };

//   const handleEdit = (index: number) => {
//     setEditingIndex(index);
//     setName(units[index]);
//     setModalVisible(true); // Open the modal for editing
//   };

//   const handleBackPress = () => {
//     navigation.navigate(RouteName.Home_SCREEN);
//     return true;
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => handleBackPress();
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, [handleBackPress]),
//   );

//   return (
//     <>
//       <Header title="Create Unit" onBackPress={handleBackPress} />
//       <View style={commonStyle.container}>
//         <KeyboardAvoidingView enabled>
//           <ScrollView keyboardShouldPersistTaps="handled">
//             <View style={commonStyle.inputfieldContainer}>
//               {/* Input for unit */}
//               <Input
//                 title="Unit"
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter unit"
//                 required={true}
//                 errorMessage={error.name}
//               />
//               <Button
//                 title={editingIndex !== null ? 'Update' : 'Save'}
//                 onPress={handleSubmission}
//               />
//               {/* List of units */}
//               {units.map((unit, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 8,
//                   }}>
//                   <Text style={{ flex: 1, fontSize: 16 }}>{unit}</Text>
//                   <Icon
//                     name="edit"
//                     size={24}
//                     color="blue"
//                     onPress={() => handleEdit(index)}
//                   />
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>

//       {/* Modal for editing */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {/* Close "X" Button */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}>
//               <Icon name="close" size={24} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Edit Unit</Text>
//             <Input
//               title="Unit"
//               value={name}
//               onChangeText={setName}
//               placeholder="Edit unit"
//               required={true}
//               errorMessage={error.name}
//             />
//             <Button title="Save" onPress={handleSubmission} />
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
// });

// export { UnitCreationScreen };










import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import commonStyle from '../../../styles/commonStyle';
import Header from '../../../components/CommonComponets/Header/Header';
import Input from '../../../components/CommonComponets/Input/input';
import Button from '../../../components/CommonComponets/Button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RouteName from '../../../navigation/RouteName';
import Colors from '../../../utils/color';

const UnitCreationScreen = ({ navigation }: any) => {
  const [name, setName] = useState(''); // Input for adding new units
  const [units, setUnits] = useState<string[]>([]); // List of units
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Index of the unit being edited
  const [editName, setEditName] = useState(''); // Independent input state for editing
  const [error, setError] = useState({ name: '' });
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmission = () => {
    if (!name.trim()) {
      setError({ name: 'Unit name is required' });
      return;
    }

    // Add a new unit
    setUnits([...units, name]);
    setName('');
    setError({ name: '' });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditName(units[index]); // Load the selected unit into the editing input
    setModalVisible(true); // Open the modal for editing
  };

  const handleEditSave = () => {
    if (!editName.trim()) {
      setError({ name: 'Unit name is required' });
      return;
    }

    if (editingIndex !== null) {
      // Update the specific unit in the list
      const updatedUnits = [...units];
      updatedUnits[editingIndex] = editName;
      setUnits(updatedUnits);
    }

    // Reset editing states
    setEditingIndex(null);
    setEditName('');
    setModalVisible(false);
  };

  const handleBackPress = () => {
    navigation.navigate(RouteName.Home_SCREEN);
    return true;
  };

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
      <Header title="Create Unit" onBackPress={handleBackPress} />
      <View style={commonStyle.container}>
        <KeyboardAvoidingView enabled>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={commonStyle.inputfieldContainer}>
              {/* Input for adding new units */}
              <Input
                title="Unit"
                value={name}
                onChangeText={setName}
                placeholder="Enter unit"
                required={true}
                errorMessage={error.name}
              />
              <Button title="Save" onPress={handleSubmission} />
              {/* List of units with edit functionality */}
              {units.map((unit, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 8,
                  }}>
                  <Text style={{ flex: 1, fontSize: 18 }}>{unit}</Text>
                  <Icon
                    name="edit-square"
                    size={28}
                    color={Colors.secondaryColor}
                    onPress={() => handleEdit(index)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Modal for editing */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close "X" Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color={Colors.secondaryColor} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Unit</Text>
            <View style={commonStyle.inputfieldContainer}>
            <Input
              title="Unit"
              value={editName}
              onChangeText={setEditName}
              placeholder="Edit unit"
              required={true}
              errorMessage={error.name}
            />
            <Button title="Update" onPress={handleEditSave} />
          </View>
          </View>
          </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export { UnitCreationScreen };
