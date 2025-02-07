// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import RouteName from '../../../navigation/RouteName';
// import { Input } from '../../../components/CommonComponets';
// import Button from '../../../components/CommonComponets/Button/Button';
// import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import { Site } from '../../Sites/DTOs/SiteProps';
// import { useSiteService } from '../../../services/SiteService';

// const WorkRateAbstract = ({ navigation }: any) => {
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [notes, setNotes] = useState('');
//   const [Site, setSite] = useState<Site[]>([]);
//   const [SiteId, setSiteId] = useState('');
//   const [SiteList, setSiteList] = useState<Site[]>([]);

//   // Handle back button press
//   const handleBackPress = () => {
//     navigation.navigate(RouteName.Home_SCREEN);
//     return true;
//   };

//   // Validate input and handle form submission
//   const handleSubmit = () => {

//   };

//   const SiteDetails = SiteList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const redirectUrl = RouteName.WORK_RATE_ABSTRACT;

//   const handleSiteCreate = (searchString: string) => {
//     const redirect = redirectUrl;
//     navigation.navigate(RouteName.SITE_CREATION_SCREEN, {
//       name: searchString,
//       redirect,
//     });
//   };

//   const handleSiteChange = (value: string) => {
//     setSiteId(value);
//   };

//   const SiteService = useSiteService();


//   const fetchSites = async (searchString: string = '') => {
//     if (searchString) {
//       const sites = await SiteService.getSites(searchString);
//       if (SiteId && sites) {
//         const validContacts = sites.filter(
//           (item: Site) => item.id !== parseInt(SiteId),
//         );
//         setSiteList([Site, validContacts.slice(0, 3)].flat());
//         return;
//       }
//       if (sites) setSiteList(sites.slice(0, 3));
//     }
//   };


//   return (
//     <>
//       <Header title="Work Rate Abstract" onBackPress={handleBackPress} />
//       <View style={styles.container}>
//         <Combobox label="Site"
//           showCreateButton={true}
//           items={SiteDetails}
//           selectedValue={SiteId}
//           onCreate={handleSiteCreate}
//           onValueChange={handleSiteChange}
//           onSearch={fetchSites}
//           required={true} />
//         <Combobox label="Work Type" />
//         <Input title="Total Rate" placeholder="Enter Total Rate" />
//         <Input title="Total Quantity" placeholder="Enter Total Quantity" />
//         <Combobox label="Unit" />
//         <Textarea
//           label="Remark"
//           placeholder="Enter your Remark"
//         value={notes}
//         onChange={setNotes}
//         />
//         <Button title="Save" onPress={handleSubmit} />
//       </View>
//     </>
//   );
// };

// export default WorkRateAbstract;

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

// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import Header from '../../../components/CommonComponets/Header/Header';
// import RouteName from '../../../navigation/RouteName';
// import { Input } from '../../../components/CommonComponets';
// import Button from '../../../components/CommonComponets/Button/Button';
// import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
// import Textarea from '../../../components/CommonComponets/Notes/Notes';
// import { Site } from '../../Sites/DTOs/SiteProps';
// import { useSiteService } from '../../../services/SiteService';

// const WorkRateAbstract = ({ navigation }: any) => {
//   const [name, setName] = useState('');
//   const [notes, setNotes] = useState('');
//   const [site, setSite] = useState<Site[]>([]);
//   const [siteId, setSiteId] = useState('');
//   const [totalRate, setTotalRate] = useState('');
//   const [totalQuantity, setTotalQuantity] = useState('');
//   const [SiteList, setSiteList] = useState<Site[]>([]);
//   const [error, setError] = useState({
//     site: '',
//     workType: '',
//     totalRate: '',
//     totalQuantity: '',
//     unit: '',
//   });
//   const [unit, setUnit] = useState([]);
//   const [unitId, setUnitId] = useState('');
//   const [unitList, setUnitList] = useState([]);
//   const [workType, setWorkType] = useState([]);
//   const [workTypeId, setWorkTypeId] = useState('');
//   const [workTypeList, setWorkTypeList] = useState([]);

//   const resetErrors = () => {
//     setError({ site: '', workType: '', totalRate: '', totalQuantity: '', unit: '' });
//   };

//   const validate = () => {
//     resetErrors();
//     let isValid = true;

//     const updateError = (field: keyof typeof error, message: string) => {
//       setError(prev => ({ ...prev, [field]: message }));
//       isValid = false;
//     };

//     if (!siteId) updateError('site', 'Please select a site');
//     if (!workTypeId) updateError('workType', 'Please select a work type');
//     if (!totalRate || isNaN(Number(totalRate))) updateError('totalRate', 'Enter a valid rate');
//     if (!totalQuantity || isNaN(Number(totalQuantity))) updateError('totalQuantity', 'Enter a valid quantity');
//     if (!unitId) updateError('unit', 'Please select a unit');
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       console.log('Form submitted successfully');
//       // Proceed with form submission logic
//     }
//   };

//   const SiteDetails = SiteList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const handleSiteCreate = (searchString: string) => {
//     navigation.navigate(RouteName.SITE_CREATION_SCREEN, { name: searchString, redirect: RouteName.WORK_RATE_ABSTRACT });
//   };

//   const handleSiteChange = (value: string) => {
//     setSiteId(value);
//   };

//   const SiteService = useSiteService();

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

//   return (
//     <>
//       <Header title="Work Rate Abstract" onBackPress={() => navigation.navigate(RouteName.Home_SCREEN)} />
//       <ScrollView keyboardShouldPersistTaps="handled">
//         <View style={styles.container}>
//           <Combobox label="Site" showCreateButton items={SiteDetails} selectedValue={siteId} onCreate={handleSiteCreate} onValueChange={handleSiteChange} required
//             onSearch={fetchSites} />
//           {error.site ? <Text style={styles.errorText}>{error.site}</Text> : null}

//           <Combobox label="Work Type" items={workTypeList} selectedValue={workTypeId} onValueChange={setWorkTypeId} required />
//           {error.workType ? <Text style={styles.errorText}>{error.workType}</Text> : null}

//           <Input title="Total Rate" placeholder="Enter Total Rate" value={totalRate} onChangeText={setTotalRate} />
//           {error.totalRate ? <Text style={styles.errorText}>{error.totalRate}</Text> : null}

//           <Input title="Total Quantity" placeholder="Enter Total Quantity" value={totalQuantity} onChangeText={setTotalQuantity} />
//           {error.totalQuantity ? <Text style={styles.errorText}>{error.totalQuantity}</Text> : null}

//           <Combobox label="Unit" items={unitList} selectedValue={unitId} onValueChange={setUnitId} required />
//           {error.unit ? <Text style={styles.errorText}>{error.unit}</Text> : null}

//           <Textarea label="Remark" placeholder="Enter your Remark" value={notes} onChange={setNotes} />

//           <Button title="Save" onPress={handleSubmit} />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// export default WorkRateAbstract;

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

//3


import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/CommonComponets/Header/Header';
import RouteName from '../../../navigation/RouteName';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { Combobox } from '../../../components/CommonComponets/Combobox/Combobox';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import { Site } from '../../Sites/DTOs/SiteProps';
import { useSiteService } from '../../../services/SiteService';
import axios from 'axios';

const WorkRateAbstract = ({ navigation }: any) => {
  const [siteId, setSiteId] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [totalRate, setTotalRate] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const [site, setSite] = useState<Site[]>([]);
  const [workType, setWorkType] = useState('');
  const [unit, setUnit] = useState('');

  const [siteList, setSiteList] = useState<Site[]>([]);
  const [workTypeList, setWorkTypeList] = useState([]);
  const [unitList, setUnitList] = useState([]);

  const [error, setError] = useState({
    site: '',
    workType: '',
    totalRate: '',
    totalQuantity: '',
    unit: '',
  });

  const SiteService = useSiteService();

  // Reset error messages
  const resetErrors = () => {
    setError({ site: '', workType: '', totalRate: '', totalQuantity: '', unit: '' });
  };

  // Validation function
  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError(prev => ({ ...prev, [field]: message }));
      isValid = false;
    };

    if (!siteId) updateError('site', 'Please select a site');
    if (!workTypeId) updateError('workType', 'Please select a work type');
    if (!totalRate || isNaN(Number(totalRate))) updateError('totalRate', 'Enter a valid rate');
    if (!totalQuantity || isNaN(Number(totalQuantity))) updateError('totalQuantity', 'Enter a valid quantity');
    if (!unitId) updateError('unit', 'Please select a unit');

    return isValid;
  };

  // Fetch site list from API


  // Handle site selection
  const handleSiteChange = (value: string) => {
    setSiteId(value);
  };

  // Handle new site creation
  const handleSiteCreate = (searchString: string) => {
    navigation.navigate(RouteName.SITE_CREATION_SCREEN, {
      name: searchString,
      redirect: RouteName.WORK_RATE_ABSTRACT,
    });
  };

  const siteDetails = siteList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const fetchSites = async (searchString: string = '') => {
    if (searchString) {
      const sites = await SiteService.getSites(searchString);
      if (siteId && sites) {
        const validContacts = sites.filter(
          (item: Site) => item.id !== parseInt(siteId),
        );
        setSiteList([site, validContacts.slice(0, 3)].flat());
        return;
      }
      if (sites) setSiteList(sites.slice(0, 3));
    }
  };

  // Fetch work types from API (Mocked here)
  const fetchWorkTypes = async (searchString: string = '') => {
    if (searchString) {
      const sites = await SiteService.getSites(searchString);

      if (siteId && sites) {
        const validContacts = sites.filter(
          (item: Site) => item.id !== parseInt(siteId),
        );
        setSiteList([site, validContacts.slice(0, 3)].flat());
        return;
      }
      if (sites) setSiteList(sites.slice(0, 3));
    }
  };

  // Fetch units from API (Mocked here)
  const fetchUnits = async (searchString: string = '') => {
    try {
      const url = `https://workinsite-test-api.onrender.com/unit?name=${searchString}`;
      const response = await axios.get(url);
  
      if (response.data) {
        let units = response.data; // API response array
  
        // If unitId is selected, filter out the selected unit
        if (unitId) {
          units = units.filter((unit: any) => unit.id !== parseInt(unitId));
        }
  
        // Map units to dropdown format
        const unitOptions = units.slice(0, 3).map((unit: any) => ({
          label: unit.name,
          value: unit.id.toString(),
        }));
  
        setUnitList(unitOptions);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };
  

  useEffect(() => {
    fetchSites();
    fetchWorkTypes();
    fetchUnits();
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted successfully');
      // Add API submission logic here
    }
  };

  return (
    <>
      <Header title="Work Rate Abstract" onBackPress={() => navigation.navigate(RouteName.Home_SCREEN)} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Site Selection */}
          <Combobox
            label="Site"
            showCreateButton
            items={siteDetails}
            selectedValue={siteId}
            onCreate={handleSiteCreate}
            onValueChange={handleSiteChange}
            required
            onSearch={fetchSites}
          />
          {error.site ? <Text style={styles.errorText}>{error.site}</Text> : null}

          {/* Work Type Selection */}
          <Combobox
            label="Work Type"
            items={workTypeList}
            selectedValue={workTypeId}
            onValueChange={setWorkTypeId}
            required
          />
          {error.workType ? <Text style={styles.errorText}>{error.workType}</Text> : null}

          {/* Total Rate Input */}
          <Input
            title="Total Rate"
            placeholder="Enter Total Rate"
            value={totalRate}
            onChangeText={setTotalRate}
          />
          {error.totalRate ? <Text style={styles.errorText}>{error.totalRate}</Text> : null}

          {/* Total Quantity Input */}
          <Input
            title="Total Quantity"
            placeholder="Enter Total Quantity"
            value={totalQuantity}
            onChangeText={setTotalQuantity}
          />
          {error.totalQuantity ? <Text style={styles.errorText}>{error.totalQuantity}</Text> : null}

          {/* Unit Selection */}
          <Combobox
            label="Unit"
            items={unitList}
            selectedValue={unitId}
            onValueChange={setUnitId}
            showCreateButton
            // onCreate={handleSiteCreate}
            onSearch={fetchUnits}
            required
          />
          {error.unit ? <Text style={styles.errorText}>{error.unit}</Text> : null}

          {/* Remark Textarea */}
          <Textarea
            label="Remark"
            placeholder="Enter your Remark"
            value={notes}
            onChange={setNotes}
          />

          {/* Save Button */}
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

export default WorkRateAbstract;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 8,
  },
});
