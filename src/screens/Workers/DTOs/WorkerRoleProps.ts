// export interface WorkerRole {
//     name: string;
//     salaryPerShift: string;
//     hoursPerShift: string;
//   }

//   export interface WorkerRoleEditFormProps {
//     workerRoleList: WorkerRole[];
//     setWorkerRoleList: (newList: WorkerRole[]) => void;
//     selectedItem: {
//       index: number;
//       value: WorkerRole;
//     };
//     refProp: any;
//   }

//   export interface WorkerRoleProps {
//     workerRoleList: WorkerRole[];
//     setWorkerRoleList: (newList: WorkerRole[]) => void;
//     Ref?: any;
//   }

//2

export interface WorkerRole {
  name: string;
  salaryPerShift: string;
  hoursPerShift: string;
}

export interface WorkerRoleEditFormProps {
  workerRoleList: WorkerRole[];
  setWorkerRoleList: (newList: WorkerRole[]) => void;
  selectedItem: {
    index: number;
    value: WorkerRole;
  };
  refProp: any;
}

export interface WorkerRoleProps {
  workerRoleList: WorkerRole[];
  setWorkerRoleList: (newList: WorkerRole[]) => void;
  // setWorkerRoleList: React.Dispatch<React.SetStateAction<WorkerRole>>;
  Ref?: any;
}
