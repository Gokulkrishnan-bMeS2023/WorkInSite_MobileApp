
import { useEffect, useState } from "react";
import { useUserService } from "../../../services/UserService";
import { User } from "../../Users/DTOs/User";
import { SupervisorListFormProps } from "./DTOs";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const useSupervisorListForm = (props: SupervisorListFormProps) => {
  const { supervisorIds, setSupervisorIds } = props;
  const userService = useUserService();
  const isFocused = useIsFocused();
  const [supervisorList, setSupervisorList] = useState<User[]>([]);

  // Fetch supervisors based on their IDs
  const getSupervisors = async () => {
    try {
      const supervisorsData = await Promise.all(
        supervisorIds.map((id) => userService.getUser(id))
      );
      setSupervisorList(supervisorsData);
    } catch (error) {
      console.error("Failed to fetch supervisors:", error);
    }
  };

  useEffect(() => {
    if (isFocused ){
    getSupervisors();
    }
  }, [isFocused,supervisorIds]);

  const handleSupervisorDelete = (id: number) => {
    // Show a confirmation alert
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this supervisor?",
      [
        {
          text: "Cancel",
          style: "cancel", // Cancel action
        },
        {
          text: "Delete",
          style: "destructive", // Destructive action
          onPress: () => {
            // Proceed with deletion if confirmed
            const filteredSupervisors = supervisorIds.filter((supervisorId) => supervisorId !== id);
            setSupervisorIds(filteredSupervisors);
          },
        },
      ]
    );
  };  

  return { supervisorList, handleSupervisorDelete };
};

export { useSupervisorListForm };
