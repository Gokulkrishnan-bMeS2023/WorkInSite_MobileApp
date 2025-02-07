import {useEffect, useState} from 'react';
import {Site} from '../DTOs/SiteProps';
import {useSiteService} from '../../../services/SiteService';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';

const useSiteList = ({navigation}: any) => {
  const siteService = useSiteService();
  const [siteDetails, setSiteDetails] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchSite = async (searchString: string = '') => {
    const siteData = await siteService.getSites(searchString);
    setSiteDetails(siteData);
    if (siteData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSite();
  }, [isFocused]);

  const handleSiteSelect = (id: number) => {
    navigation.navigate(RouteName.SITE_EDIT_SCREEN, {id});
  };

  return {siteDetails, fetchSite, handleSiteSelect, loading};
};

export {useSiteList};
