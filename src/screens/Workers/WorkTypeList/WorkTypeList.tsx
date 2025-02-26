import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../utils/VectorIcons';
import { Colors } from '../../../utils';
import { useWorkTypeList } from './useWorkTypeList';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkTypeEditForm from '../WorkTypeEditForm/WorkTypeEditForm';
import { WorkTypeProps } from '../DTOs/WorkTypeProps';


const WorkTypeList = ({ workTypeList, setWorkTypeList }: WorkTypeProps) => {
    const { handleDelete, handleEdit, selectedItem, bottomSheetRef } = useWorkTypeList({ workTypeList, setWorkTypeList });
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
                        setWorkTypeList={setWorkTypeList}
                        Ref={bottomSheetRef}
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
