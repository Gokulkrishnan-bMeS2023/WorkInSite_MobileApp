// import React from "react";
// import { View } from "react-native";
// import Input from "../../../../components/CommonComponets/Input/input";
// import Button from "../../../../components/CommonComponets/Button/Button";
// import commonStyle from "../../../../styles/commonStyle";
// import { ShiftDetailsProps } from "../DTOs/ShiftDetails"; 
// import { useShiftEdit } from "./useShiftEdit";

// export function ShiftEditScreen({ id, ShiftSheetRef, onUpdateSuccess }: ShiftDetailsProps) {
//   const { name, setName, error, shiftDetails, handleSubmission } = useShiftEdit(id);

//   const handleUpdate = async () => {
//     await handleSubmission();
//     ShiftSheetRef.current?.close();
//     onUpdateSuccess();
//   };

//   return (
//     <View style={commonStyle.inputfieldContainer}>
//       {shiftDetails && (
//         <Input
//           title="Shift"
//           value={name}
//           onChangeText={setName}
//           required
//           errorMessage={error.name}
//         />
//       )}
//       <Button title="Update" onPress={handleUpdate} />
//     </View>
//   );
// };



//2
import React from "react";
import { View } from "react-native";
import Input from "../../../../components/CommonComponets/Input/input";
import Button from "../../../../components/CommonComponets/Button/Button";
import commonStyle from "../../../../styles/commonStyle";
import { ShiftDetailsProps } from "../DTOs/ShiftDetails";
import { useShiftEdit } from "./useShiftEdit";

export function ShiftEditScreen(Props: ShiftDetailsProps) {
  const { name, setName, error, shiftDetails, handleSubmission } = useShiftEdit(Props);
  return (
    <View style={commonStyle.inputfieldContainer}>
      {shiftDetails && (
        <Input
          title="Shift"
          value={name}
          onChangeText={setName}
          required
          errorMessage={error.name}
        />
      )}
      <Button title="Update" onPress={handleSubmission} />
    </View>
  );
};

