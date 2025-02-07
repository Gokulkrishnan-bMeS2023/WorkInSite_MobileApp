import {Alert} from 'react-native';

interface WorkerRoleProps {
  workerRoleList: {
    workerRole: string;
    salaryPerShift: string;
    hoursPerShift: string;
  }[];
  setworkerRoleList: (
    newList: {
      workerRole: string;
      salaryPerShift: string;
      hoursPerShift: string;
    }[],
  ) => void;
}

export const useWorkerRoleList = ({
  workerRoleList,
  setworkerRoleList,
}: WorkerRoleProps) => {
  // Handle deleting a worker role
  const handleDelete = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            setworkerRoleList(workerRoleList.filter((_, i) => i !== index)); // Remove the worker role at the given index
            console.log('Worker Role deleted');
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Optionally, add more actions (e.g., for adding or updating roles) if needed

  return {handleDelete};
};
