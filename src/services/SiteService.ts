import Config from 'react-native-config';
import {useAPIHelper} from '../helpers/ApiHelper';
import {
  SiteCreationRequest,
  SiteUpdationRequest,
} from '../screens/Sites/DTOs/SiteProps';

const useSiteService = () => {
  const baseUrl = Config.REACT_APP_SITE_SERVICE_BASE_URL || '';
  const apiHelper = useAPIHelper(baseUrl, true);

  const getSites = async (searchString: string = '') => {
    const response = await apiHelper.get(`sites?searchString=${searchString}`);
    return response.data;
  };

  const getSite = async (id: number) => {
    const response = await apiHelper.get(`sites/${id}`);
    return response.data;
  };

  const createSite = async (site: SiteCreationRequest) => {
    await apiHelper.post('sites', site);
  };

  const updateSite = async (id: number, site: SiteUpdationRequest) => {
    await apiHelper.put(`sites/${id}`, site);
  };

  const deleteSite = async (id: number) => {
    await apiHelper.delete(`sites/${id}`);
  };

  return {getSites, getSite, createSite, updateSite, deleteSite};
};

export {useSiteService};
