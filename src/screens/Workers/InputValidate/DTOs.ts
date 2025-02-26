import {WorkRateAbstract} from '../DTOs/WorkRateAbstract';

interface WorkerInputValidateProps {
  name: string;
  dateOfBirth: string;
  workerCategoryId: string;
  contactId: string;
  gender: string;
  wageType: string; // note
}

interface WorkRateAbstractValidateProps {
  siteId: string;
  workTypeId: string;
  totalRate: string;
  totalQuantity: string;
  unitId: string;
}

export type {WorkerInputValidateProps, WorkRateAbstractValidateProps};
