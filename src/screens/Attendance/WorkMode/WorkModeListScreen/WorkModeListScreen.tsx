import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useWorkModeList } from "./useWorkModeList";
import CustomBottomSheet from "../../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet";
import Icon from "../../../../utils/VectorIcons";
import commonStyle from "../../../../styles/commonStyle";
import Styles from '../../../../styles/ListScreenStyle';
import Style from '../../../../styles/CreateAndEditScreenStyle';
import { Colors } from "../../../../utils";
import { WorkModeEditScreen } from "../WorkModeEditScreen/WorkModeEditScreen";

const WorkModeListScreen = () => {
  const { workModeDetails, fetchWorkMode, handleWorkModeDelete } = useWorkModeList();
  const workModeSheetRef = useRef<any>();
  const [selectedWorkModeId, setSelectedWorkModeId] = useState<number | null>(null);

  const handleWorkModeEdit = (id: number) => {
    setSelectedWorkModeId(id);
    workModeSheetRef.current?.open();
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={Styles.listContainer}
        data={workModeDetails}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={[Styles.card, Style.spaceContainer, { padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={commonStyle.labelText}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleWorkModeEdit(item.id)} style={{ marginRight: 15 }}>
                <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleWorkModeDelete(item.id)}>
                <Icon icon="MaterialIcons" name="delete" size={24} color={Colors.dangerColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <CustomBottomSheet
        ref={workModeSheetRef}
        height={600}
        title="Edit Work Mode"
        onClose={() => {
          workModeSheetRef.current?.close();
        }}
        scrollview={true}
      >
        {selectedWorkModeId !== null && <WorkModeEditScreen id={selectedWorkModeId.toString()} workModeSheetRef={workModeSheetRef} onUpdateSuccess={fetchWorkMode} />}
      </CustomBottomSheet>
    </View>
  );
};

export default WorkModeListScreen;
