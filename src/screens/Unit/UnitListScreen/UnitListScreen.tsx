

import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useUnitList } from "./useUnitList";
import { Colors } from "../../../utils";
import Icon from "../../../utils/VectorIcons";
import CustomBottomSheet from "../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet";
import commonStyle from "../../../styles/commonStyle";
import Styles from '../../../styles/ListScreenStyle';
import Style from '../../../styles/CreateAndEditScreenStyle';
import { UnitEditScreen } from "../UnitEditScreen/UnitEditScreen";

const UnitListScreen = () => {
  const { unitDetails, handleUnitDelete, fetchUnit} = useUnitList(); // Assuming fetchUnits is available to fetch the unit list
  const unitSheetRef = useRef<any>();
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const handleUnitEdit = (id: number) => {
    setSelectedUnitId(id);
    unitSheetRef.current?.open();
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={Styles.listContainer}
        data={unitDetails}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={[Styles.card, Style.spaceContainer, { padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={commonStyle.labelText}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleUnitEdit(item.id)} style={{ marginRight: 15 }}>
                <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUnitDelete(item.id)}>
                <Icon icon="MaterialIcons" name="delete" size={24} color={Colors.dangerColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <CustomBottomSheet
        ref={unitSheetRef}
        height={600}
        title="Edit Unit"
        onClose={() => {
          unitSheetRef.current?.close();
        }}
        scrollview={true}
      >
        {selectedUnitId !== null && <UnitEditScreen id={selectedUnitId.toString()} unitSheetRef={unitSheetRef} onUpdateSuccess={fetchUnit} />}
      </CustomBottomSheet>
    </View>
  );
};

export default UnitListScreen;
