import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import Icon from '../../../utils/VectorIcons';
import { Colors } from '../../../utils';
import { useWorkTypeList } from './useWorkTypeList';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkTypeEditForm from '../WorkTypeEditForm/WorkTypeEditForm';

interface WorkTypeProps {
    workTypeList: string[];
    setworkTypeList: (newList: string[]) => void;
}

const WorkTypeList: React.FC<WorkTypeProps> = ({ workTypeList, setworkTypeList }) => {
    const { handleDelete } = useWorkTypeList({ workTypeList, setworkTypeList });
    const bottomSheetRef = useRef<any>(null);

    const [selectedItem, setSelectedItem] = useState<{ index: number; value: string } | null>(null);

    const handleEdit = (index: number, value: string) => {
        setSelectedItem({ index, value });
        bottomSheetRef.current?.open();
    };

    return (
        <View>
            {workTypeList.map((item, index) => (
                <View key={`${item}-${index}`} style={styles.listItem}>
                    <Text style={styles.nameText}>{item}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(index, item)}>
                            <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(index)}>
                            <Icon icon="MaterialIcons" name="delete" size={24} color="#F44336" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {/* Corrected CustomBottomSheet usage */}
            <CustomBottomSheet ref={bottomSheetRef} title="Edit Work Type" onClose={() => bottomSheetRef.current?.close()}>
                {selectedItem && (
                    <WorkTypeEditForm
                        workTypeList={workTypeList}
                        setworkTypeList={setworkTypeList}
                        refProp={bottomSheetRef}
                        selectedItem={selectedItem}
                    />
                )}
            </CustomBottomSheet>
        </View>
    );
};

export default WorkTypeList;

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 8,
    },
    nameText: {
        fontSize: 16,
        color: '#333',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 8,
    },
});
