// import React, { useRef, useState } from "react";
// import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import { useShiftList } from "./useShiftList";
// import CustomBottomSheet from "../../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet";
// import Icon from "../../../../utils/VectorIcons";
// import commonStyle from "../../../../styles/commonStyle";
// import Styles from '../../../../styles/ListScreenStyle';
// import Style from '../../../../styles/CreateAndEditScreenStyle';
// import { Colors } from "../../../../utils";
// import { ShiftEditScreen } from "../ShiftEditScreen/ShiftEditScreen";

// const ShiftListScreen = () => {
//   const { shiftDetails, fetchShift, handleShiftDelete } = useShiftList();
//   const shiftSheetRef = useRef<any>();
//   const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);

//   const handleShiftEdit = (id: number) => {
//     setSelectedShiftId(id);
//     shiftSheetRef.current?.open();
//   };

//   return (
//     <View>
//       <FlatList
//         contentContainerStyle={Styles.listContainer}
//         data={shiftDetails}
//         scrollEnabled={false}
//         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//         renderItem={({ item }) => (
//           <View style={[Styles.card, Style.spaceContainer, { padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
//             <Text style={commonStyle.labelText}>{item.name}</Text>
//             <View style={{ flexDirection: 'row' }}>
//               <TouchableOpacity onPress={() => handleShiftEdit(item.id)} style={{ marginRight: 15 }}>
//                 <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleShiftDelete(item.id)}>
//                 <Icon icon="MaterialIcons" name="delete" size={24} color={Colors.dangerColor} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />

//       <CustomBottomSheet
//         ref={shiftSheetRef}
//         height={600}
//         title="Edit Shift"
//         onClose={() => {
//           shiftSheetRef.current?.close();
//         }}
//         scrollview={true}
//       >
//         {selectedShiftId !== null && <ShiftEditScreen id={selectedShiftId.toString()} ShiftSheetRef={shiftSheetRef} onUpdateSuccess={fetchShift} />}
//       </CustomBottomSheet>
//     </View>
//   );
// };

// export default ShiftListScreen;


//2

import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import CustomBottomSheet from "../../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet";
import Icon from "../../../../utils/VectorIcons";
import commonStyle from "../../../../styles/commonStyle";
import Styles from '../../../../styles/ListScreenStyle';
import Style from '../../../../styles/CreateAndEditScreenStyle';
import { Colors } from "../../../../utils";
import { ShiftEditScreen } from "../ShiftEditScreen/ShiftEditScreen";

interface ShiftListProps {
  shiftDetails: any[];
  fetchShift: () => void;
  handleShiftDelete: (id: number) => void;
}
const ShiftListScreen = ({ shiftDetails, fetchShift, handleShiftDelete }: ShiftListProps) => {
  const shiftSheetRef = useRef<any>();
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);

  const handleShiftEdit = (id: number) => {
    setSelectedShiftId(id);
    shiftSheetRef.current?.open();
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={Styles.listContainer}
        data={shiftDetails}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={[Styles.card, Style.spaceContainer, { padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={commonStyle.labelText}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleShiftEdit(item.id)} style={{ marginRight: 15 }}>
                <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShiftDelete(item.id)}>
                <Icon icon="MaterialIcons" name="delete" size={24} color={Colors.dangerColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <CustomBottomSheet
        ref={shiftSheetRef}
        height={600}
        title="Edit Shift"
        onClose={() => {
          shiftSheetRef.current?.close();
        }}
        scrollview={true}
      >
        {selectedShiftId !== null && <ShiftEditScreen id={selectedShiftId.toString()} ShiftSheetRef={shiftSheetRef} onUpdateSuccess={fetchShift} />}
      </CustomBottomSheet>
    </View>
  );
};

export default ShiftListScreen;
