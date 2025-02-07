import {Site} from '../screens/Sites/DTOs/SiteProps';
import {useSiteService} from '../services/SiteService';

const SiteService = useSiteService();

export const fetchSites = async (
  searchString: string = '',
  setSiteList: any,
  SiteId: any,
  Site: any,
) => {
  if (searchString) {
    const sites = await SiteService.getSites(searchString);
    if (SiteId && sites) {
      const validContacts = sites.filter(
        (item: Site) => item.id !== parseInt(SiteId),
      );
      setSiteList([Site, validContacts.slice(0, 3)].flat());
      return;
    }
    if (sites) setSiteList(sites.slice(0, 3));
  }
};
