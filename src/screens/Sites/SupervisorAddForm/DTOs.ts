
interface SupervisorAddFormProps {
  supervisorIds: number[];
  setSupervisorIds: React.Dispatch<React.SetStateAction<number[]>>;
  redirectUrl: string | ((id: number) => string);
  // redirectParams: URLSearchParams;
  Ref?: React.MutableRefObject<any>;
  navigation?: any;
}

export type {SupervisorAddFormProps};
