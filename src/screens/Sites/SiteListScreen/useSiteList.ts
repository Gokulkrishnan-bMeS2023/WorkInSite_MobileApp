import { useEffect, useState } from 'react';
import { Site } from '../DTOs/SiteProps';
import { useSiteService } from '../../../services/SiteService';
import RouteName from '../../../navigation/RouteName';
import { useIsFocused } from '@react-navigation/native';

const useSiteList = ({navigation}:any) => {
  const siteService = useSiteService();
  const [siteDetails, setSiteDetails] = useState<Site[]>([]);
  const [hasSearchFilter, setHasSearchFilter] = useState<boolean>(false);
  const isFocused= useIsFocused();
  
  const fetchSite = async (searchString: string = "") => {
    const siteData = await siteService.getSites(searchString);
    if (!!searchString) setHasSearchFilter(true);
    setSiteDetails(siteData);
  };

  useEffect(() => {
    fetchSite();
  }, [isFocused]);

  const handleSiteSelect = (id: number) => {
    navigation.navigate(RouteName.SITE_EDIT_SCREEN, { id });
  };

  return { siteDetails, fetchSite, hasSearchFilter,handleSiteSelect };
};

export { useSiteList };
