import {WorkerRole} from './WorkerRoleProps';
import {WorkType} from './WorkTypeProps';

interface WorkerCategoryCreationRequest {
  workerCategoryName: string;
  // workType: WorkType[];
  // workerRole: WorkerRole[];
  note: string;
}

interface WorkerCategoryUpdationRequest extends WorkerCategoryCreationRequest {
  isActive: boolean;
}

interface WorkerCategoryProps extends WorkerCategoryUpdationRequest {
  id: number;
}

export type {
  WorkerCategoryCreationRequest,
  WorkerCategoryUpdationRequest,
  WorkerCategoryProps,
};
