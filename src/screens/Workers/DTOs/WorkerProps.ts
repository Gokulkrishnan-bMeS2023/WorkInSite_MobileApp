import {BankAccountProps, UpiDetail} from '../../suppliers/DTOs/SupplierProps';
import {WorkerCategoryProps} from './WorkerCategoryProps';
import {KYCDetail} from '../../clients/DTOs/ClientProps';
import {Contact} from '../../contacts/DTOs/ContactProps';

enum GenderTypes {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

interface WorkerBase {
  name: string;
  gender: GenderTypes;
  dateOfBirth: string;
  kycDetails: KYCDetail[];
  bankAccounts: BankAccountProps[];
  upiDetails: UpiDetail[];
  note: string;
  isActive?: boolean;
}

interface WorkerRequest extends WorkerBase {
  contactId: number;
  workerCategoryId: number;
}

interface Worker extends WorkerBase {
  id: number;
  contact: Contact;
  workerCategory: WorkerCategoryProps;
}

export {GenderTypes};
export type {WorkerRequest, Worker};
