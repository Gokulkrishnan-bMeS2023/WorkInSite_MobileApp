// import React, { useState, useEffect, useCallback } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import RouteName from '../../../navigation/RouteName';
// import { Input } from '../../../components/CommonComponets';
// import Button from '../../../components/CommonComponets/Button/Button';
// import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import { Site } from '../../Sites/DTOs/SiteProps';
// import { useSiteService } from '../../../services/SiteService';
// import axios from 'axios';
// import { useWorkRateAbstractValidate } from '../InputValidate/WorkRateAbstractValidate';
// import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// const WorkRateAbstractEdit = ({ navigation, route }: any) => {
//   const [siteId, setSiteId] = useState('');
//   const [workTypeId, setWorkTypeId] = useState('');
//   const [unitId, setUnitId] = useState('');
//   const [totalRate, setTotalRate] = useState('');
//   const [totalQuantity, setTotalQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [site, setSite] = useState<Site[]>([]);
//   // const [workType, setWorkType] = useState('');
//   // const [unit, setUnit] = useState('');
//   const [siteList, setSiteList] = useState<Site[]>([]);
//   const [workTypeList, setWorkTypeList] = useState<any>([]);
//   const [unitList, setUnitList] = useState<any>([]);

//   const { workRateAbstractId, redirect } = route.params;


//   const SiteService = useSiteService();
//   const isFocused = useIsFocused()

//   // Reset error messages

//   const { error, validate, setError, initialError } =
//     useWorkRateAbstractValidate(siteId, workTypeId, totalRate, totalQuantity, unitId);

//   // Fetch site list from API


//   // Handle site selection
//   const handleSiteChange = (value: string) => {
//     setSiteId(value);
//   };


//   const siteDetails = siteList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const fetchSites = async (searchString: string = '') => {
//     if (searchString) {
//       const sites = await SiteService.getSites(searchString);
//       if (siteId && sites) {
//         const validContacts = sites.filter(
//           (item: Site) => item.id !== parseInt(siteId),
//         );
//         setSiteList([site, validContacts.slice(0, 3)].flat());
//         return;
//       }
//       if (sites) setSiteList(sites.slice(0, 3));
//     }
//   };

//   // Fetch work types from API (Mocked here)

//   const fetchWorkTypes = async (searchString: string = '') => {
//     try {
//       const url = `https://workinsite-test-api.onrender.com/workType?name=${searchString}`;
//       const response = await axios.get(url);

//       if (response.data) {
//         let workTypes = response.data; // API response array

//         // If  is selected, filter out the selected unit
//         if (workTypeId) {
//           workTypes = workTypes.filter((workType: any) => workType.id !== parseInt(workTypeId));
//         }

//         // Map workType to dropdown format
//         const workTypeOptions = workTypes.slice(0, 3).map((workType: any) => ({
//           label: workType.name,
//           value: workType.id.toString(),
//         }));
//         setWorkTypeList(workTypeOptions);
//       }
//     } catch (error) {
//       console.error("Error fetching workType:", error);
//     }
//   };


//   // Fetch units from API (Mocked here)
//   const fetchUnits = async (searchString: string = '') => {
//     try {
//       const url = `https://workinsite-test-api.onrender.com/unit?name=${searchString}`;
//       const response = await axios.get(url);

//       if (response.data) {
//         let units = response.data; // API response array

//         // If unitId is selected, filter out the selected unit
//         if (unitId) {
//           units = units.filter((unit: any) => unit.id !== parseInt(unitId));
//         }

//         // Map units to dropdown format
//         const unitOptions = units.slice(0, 3).map((unit: any) => ({
//           label: unit.name,
//           value: unit.id.toString(),
//         }));

//         setUnitList(unitOptions);
//       }
//     } catch (error) {
//       console.error("Error fetching units:", error);
//     }
//   };


//   useEffect(() => {
//     fetchSites();
//     fetchWorkTypes();
//     fetchUnits();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (validate()) {
//       const workerRateAbstract = {
//         siteId,
//         workTypeId,
//         unitId,
//         totalRate: totalRate,
//         totalQuantity: totalQuantity,
//         notes,
//       }
//       axios.post("https://workinsite-test-api.onrender.com/workerRateAbstract", workerRateAbstract)
//     }
//   };

//   const handleSubmission = async () => {
//     if (validate()) {
//       const workerRateAbstract = {
//         siteId,
//         workTypeId,
//         unitId,
//         totalRate: totalRate,
//         totalQuantity: totalQuantity,
//         notes,
//       }

//       try {
//         await axios.put(
//           `https://workinsite-test-api.onrender.com/workerRateAbstract/${workRateAbstractId}`,
//           workerRateAbstract,
//         );

//         if (redirect) {
//           navigation.navigate(redirect, {
//             workRateAbstractId,
//             id: route?.params?.id || '',
//           });
//         } else {
//           navigation.navigate(RouteName.SITE_LIST_SCREEN);
//         }
//       } catch (error) {
//         console.error('Error updating worker category:', error);
//       }
//     }
//   };
//   const fetchWorkRateAbstract = async () => {
//     try {
//       const response = await axios.get(`https://workinsite-test-api.onrender.com/workerRateAbstract/${workRateAbstractId}`);
//       if (response.data) {
//         const { siteId, workTypeId, unitId, totalRate, totalQuantity, notes } = response.data;
//         setSiteId(siteId.toString());
//         setWorkTypeId(workTypeId.toString());
//         setUnitId(unitId.toString());
//         setTotalRate(totalRate);
//         setTotalQuantity(totalQuantity);
//         setNotes(notes);
//       }
//     } catch (error) {
//       console.error("Error fetching worker rate abstract:", error);
//     }
//   }
//   const fetchWorkRate = async () => {

//   }
//   useEffect(() => {
//     const fetchUnitById = async () => {
//       if (unitId) {
//         try {
//           const response = await axios.get(`https://workinsite-test-api.onrender.com/unit/${unitId}`);

//           if (response.data) {
//             const unit = Array.isArray(response.data) ? response.data : [response.data]; // Ensure it's an array

//             const unitOptions = unit.map((unit: any) => ({
//               label: unit.name,
//               value: unit.id.toString(),
//             }));
//             setUnitList(unitOptions);
//           } else {
//             console.error("API response is empty or undefined");
//           }
//         } catch (error) {
//           console.error("Error fetching worker rate:", error);
//         }
//       }
//     };

//     fetchUnitById();
//   }, [unitId, isFocused]);


//   useEffect(() => {
//     const fetchWorkTypeById = async () => {
//       if (workTypeId) {
//         try {
//           const response = await axios.get(`https://workinsite-test-api.onrender.com/WorkType/${workTypeId}`);
//           if (response.data) {
//             const workType = Array.isArray(response.data) ? response.data : [response.data]; // Ensure it's an array

//             const workTypeOptions = workType.map((unit: any) => ({
//               label: unit.name,
//               value: unit.id.toString(),
//             }));
//             setWorkTypeList(workTypeOptions);
//           } else {
//             console.error("API response is empty or undefined");
//           }
//         } catch (error) {
//           console.error("Error fetching worker rate:", error);
//         }
//       }
//     };

//     fetchWorkTypeById();
//   }, [workTypeId, isFocused]);

//   useEffect(() => {
//     const fetchSiteById = async () => {
//       if (siteId) {
//         try {
//           const site = await SiteService.getSite(
//             parseInt(siteId),
//           );
//           setSiteList([site])
//         } catch (error) {
//           console.error('Failed to fetch contact:', error);
//         }
//       }
//     };

//     fetchSiteById();
//   }, [siteId, isFocused]);

//   useFocusEffect(
//     useCallback(() => {
//       fetchWorkRate(); // Fetch worker data again when the screen is focused
//       fetchWorkRateAbstract(); // Fetch worker data again when the screen is focused
//     }, [workRateAbstractId]) // Update dependencies if necessary
//   );



//   return (
//     <>
//       <Header title="Work Rate Abstract Edit" onBackPress={() => navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST)} />
//       <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
//         <View style={{ padding: 16, gap: 10 }}>
//           <Combobox
//             label="Site"
//             items={siteDetails}
//             selectedValue={siteId}
//             onValueChange={handleSiteChange}
//             required
//             onSearch={fetchSites}
//             errorMessage={error.site}
//           />
//           <Combobox
//             label="Work Type"
//             items={workTypeList}
//             selectedValue={workTypeId}
//             onValueChange={setWorkTypeId}
//             required
//             onSearch={fetchWorkTypes}
//             errorMessage={error.workType}
//           />
//           <Input
//             title="Total Rate"
//             placeholder="Enter Total Rate"
//             value={totalRate}
//             onChangeText={setTotalRate}
//             inputType='numeric'
//             required
//             errorMessage={error.totalRate}
//           />
//           <Input
//             title="Total Quantity"
//             placeholder="Enter Total Quantity"
//             value={totalQuantity}
//             onChangeText={setTotalQuantity}
//             inputType='numeric'
//             required
//             errorMessage={error.totalQuantity}
//           />
//           <Combobox
//             label="Unit"
//             items={unitList}
//             selectedValue={unitId}
//             onValueChange={setUnitId}
//             onSearch={fetchUnits}
//             required
//             errorMessage={error.unit}
//           />
//           <Textarea
//             label="Remark"
//             placeholder="Enter your Remark"
//             value={notes}
//             onChange={setNotes}
//           />
//           <Button title="Save" onPress={handleSubmission} />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// export default WorkRateAbstractEdit;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//   },
// });


//2

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import RouteName from '../../../navigation/RouteName';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import { useWorkRateAbstractEdit } from './useWorkRateAbstractEdit';

const WorkRateAbstractEdit = ({ navigation, route }: any) => {
  const {
    siteDetails,
    workTypeId,
    totalRate,
    totalQuantity,
    notes,
    workTypeList,
    unitList,
    siteId,
    unitId,
    error,
    handleSubmission,
    setWorkTypeId,
    setUnitId,
    setTotalRate,
    setTotalQuantity,
    setNotes,
    fetchWorkTypes,
    fetchUnits,
    fetchSites,
    handleSiteChange
  } = useWorkRateAbstractEdit({ navigation, route })

  return (
    <>
      <Header title="Work Rate Abstract Edit" onBackPress={() => navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST)} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 16, gap: 10 }}>
          <Combobox
            label="Site"
            items={siteDetails}
            selectedValue={siteId}
            onValueChange={handleSiteChange}
            required
            onSearch={fetchSites}
            errorMessage={error.site}
          />
          <Combobox
            label="Work Type"
            items={workTypeList}
            selectedValue={workTypeId}
            onValueChange={setWorkTypeId}
            required
            onSearch={fetchWorkTypes}
            errorMessage={error.workType}
          />
          <Input
            title="Total Rate"
            placeholder="Enter Total Rate"
            value={totalRate}
            onChangeText={setTotalRate}
            inputType='numeric'
            required
            errorMessage={error.totalRate}
          />
          <Input
            title="Total Quantity"
            placeholder="Enter Total Quantity"
            value={totalQuantity}
            onChangeText={setTotalQuantity}
            inputType='numeric'
            required
            errorMessage={error.totalQuantity}
          />
          <Combobox
            label="Unit"
            items={unitList}
            selectedValue={unitId}
            onValueChange={setUnitId}
            onSearch={fetchUnits}
            required
            errorMessage={error.unit}
          />
          <Textarea
            label="Remark"
            placeholder="Enter your Remark"
            value={notes}
            onChange={setNotes}
          />
          <Button title="Save" onPress={handleSubmission} />
        </View>
      </ScrollView>
    </>
  );
};

export default WorkRateAbstractEdit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});

