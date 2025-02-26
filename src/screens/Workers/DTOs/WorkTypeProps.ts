interface WorkType {
  name: string;
}

interface WorkTypeProps {
  workTypeList: string[];
  setWorkTypeList: (newList: string[]) => void;
  Ref?: any;
}

interface SelectedItemProps {
  index: number;
  value: string;
}

interface WorkTypeEditFormProps {
  workTypeList: string[];
  setWorkTypeList: (newList: string[]) => void;
  Ref?:any;
  selectedItem?: SelectedItemProps;
}

export type {WorkType, WorkTypeProps, SelectedItemProps, WorkTypeEditFormProps};
