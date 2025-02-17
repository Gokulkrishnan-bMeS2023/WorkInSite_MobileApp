import axios from 'axios';
import {useState, useEffect} from 'react';
import {useSiteService} from '../../../services/SiteService';
import {Site} from '../../Sites/DTOs/SiteProps';
import {useWorkRateAbstractValidate} from '../InputValidate/WorkRateAbstractValidate';

const useWorkRateAbstractCreate = () => {
  const [siteId, setSiteId] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [totalRate, setTotalRate] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [notes, setNotes] = useState('');
  //   const [site, setSite] = useState<Site[]>([]);
  //   const [workType, setWorkType] = useState('');
  //   const [unit, setUnit] = useState('');
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [workTypeList, setWorkTypeList] = useState([]);
  const [unitList, setUnitList] = useState([]);

  const SiteService = useSiteService();

  // Reset error messages

  const {error, validate, setError, initialError} = useWorkRateAbstractValidate(
    siteId,
    workTypeId,
    totalRate,
    totalQuantity,
    unitId,
  );

  // Fetch site list from API

  // Handle site selection
  const handleSiteChange = (value: string) => {
    setSiteId(value);
  };

  const siteDetails = siteList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

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

  const fetchSites = async (searchString: string = '') => {
    if (searchString) {
      const sites = await SiteService.getSites(searchString);
      if (sites) setSiteList(sites.slice(0, 3));
    }
  };

  // Fetch work types from API (Mocked here)

  const fetchWorkTypes = async (searchString: string = '') => {
    try {
      const url = `https://workinsite-test-api.onrender.com/workType?name=${searchString}`;
      const response = await axios.get(url);

      if (response.data) {
        let workTypes = response.data; // API response array

        // If  is selected, filter out the selected unit
        if (workTypeId) {
          workTypes = workTypes.filter(
            (workType: any) => workType.id !== parseInt(workTypeId),
          );
        }

        // Map workType to dropdown format
        const workTypeOptions = workTypes.slice(0, 3).map((workType: any) => ({
          label: workType.name,
          value: workType.id.toString(),
        }));
        setWorkTypeList(workTypeOptions);
      }
    } catch (error) {
      console.error('Error fetching workType:', error);
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
      console.error('Error fetching units:', error);
    }
  };

  useEffect(() => {
    fetchSites();
    fetchWorkTypes();
    fetchUnits();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (validate()) {
      const workerRateAbstract = {
        siteId,
        workTypeId,
        unitId,
        totalRate: totalRate,
        totalQuantity: totalQuantity,
        notes,
      };
      axios.post(
        'https://workinsite-test-api.onrender.com/workerRateAbstract',
        workerRateAbstract,
      );
    }
  };
  return {
    siteDetails,
    error,
    siteId,
    workTypeList,
    workTypeId,
    totalRate,
    totalQuantity,
    fetchSites,
    fetchWorkTypes,
    unitList,
    unitId,
    fetchUnits,
    notes,
    handleSiteChange,
    setWorkTypeId,
    setTotalRate,
    setTotalQuantity,
    setNotes,
    handleSubmit,
    setUnitId,
  };
};

export {useWorkRateAbstractCreate};
