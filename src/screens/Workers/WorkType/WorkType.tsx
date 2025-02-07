// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import RouteName from '../../../navigation/RouteName';
// import {Input} from '../../../components/CommonComponets';
// import Button from '../../../components/CommonComponets/Button/Button';

// const WorkType = ({navigation}: any) => {
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');

//   // Handle back button press
//   const handleBackPress = () => {
//     navigation.navigate(RouteName.Home_SCREEN);
//     return true;
//   };

//   // Validate input and handle form submission
//   const handleSubmit = () => {
//     if (!name.trim()) {
//       setError('Name is required');
//       return;
//     }
//     setError(''); // Clear any previous errors
//     // Proceed with form submission logic
//     console.log('Name:', name);
//     // Navigate to another screen or perform other actions
//     navigation.navigate(RouteName.Home_SCREEN);
//   };

//   return (
//     <>
//       <Header title="Work Type" onBackPress={handleBackPress} />
//       <View style={styles.container}>
//         <Input
//           title="Name"
//           placeholder="Enter Name"
//           value={name}
//           onChangeText={setName}
//         />
//         {error ? <Text style={styles.errorText}>{error}</Text> : null}
//         <Button title="Save" onPress={handleSubmit} />
//       </View>
//     </>
//   );
// };

// export default WorkType;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//     gap: 10,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: -8,
//     marginBottom: 8,
//   },
// });

//2

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons or any other icon set
import Header from '../../../components/CommonComponets/Header/Header';
import RouteName from '../../../navigation/RouteName';
import {Input} from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import {Colors} from '../../../utils';

const WorkType = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [nameList, setNameList] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleBackPress = () => navigation.navigate(RouteName.Home_SCREEN);

  const handleAction = (actionType: 'add' | 'save') => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setError('');
    if (actionType === 'add') {
      setNameList([...nameList, name]);
    } else if (actionType === 'save' && editingIndex !== null) {
      const updatedList = [...nameList];
      updatedList[editingIndex] = name;
      setNameList(updatedList);
      setEditingIndex(null);
    }
    setName('');
  };

  const handleSubmitList = () => {
    if (nameList.length === 0) {
      Alert.alert('No items to submit', 'Please add items before submitting.');
      return;
    }

    console.log('Submitting List:', nameList);
    Alert.alert('Success', 'List submitted successfully!');
  };

  const handleEdit = (index: number) => {
    setName(nameList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setNameList(prevList => prevList.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header title="Work Type" onBackPress={handleBackPress} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{flexGrow: 1, marginBottom: 25}}>
          <Input
            title="Name"
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
            containerStyle={{flexGrow: 1}}
            errorMessage={error}
          />
          <View>
            {nameList.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.nameText}>{item}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => handleEdit(index)}
                    style={styles.actionButton}>
                    <Icon name="edit" size={24} color={Colors.secondaryColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(index)}
                    style={styles.actionButton}>
                    <Icon name="delete" size={24} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Button
              title={editingIndex === null ? 'Add' : 'Save'}
              onPress={() =>
                handleAction(editingIndex === null ? 'add' : 'save')
              }
              buttonStyle={{width: '48%'}}
            />
            <Button
              title="Save"
              onPress={handleSubmitList}
              buttonStyle={{width: '48%'}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default WorkType;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
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
