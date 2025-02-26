import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../utils/VectorIcons';
import { Colors } from '../../../utils';
import { useWorkerRoleList } from './useWorkerRoleList';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkerRoleEditForm from '../WorkerRoleEditForm/WorkerRoleEditForm';
import { WorkerRoleProps } from '../DTOs/WorkerRoleProps';


const WorkerRoleList = ({ workerRoleList, setWorkerRoleList }: WorkerRoleProps) => {
    const { handleDelete, handleEdit, selectedItem, workerRoleBottomSheetRef } = useWorkerRoleList({ workerRoleList, setWorkerRoleList, });
    return (
        <View>
            {workerRoleList.map((item, index) => (
                <View key={`${item.name}-${index}`} style={styles.listItem}>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="middle">{item.name}</Text>
                    <Text style={styles.nameText}>{item.salaryPerShift}</Text>
                    <Text style={styles.nameText}>{item.hoursPerShift}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(index, item)}>
                            <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDelete(index)}  
                            style={{ opacity: 1, padding: 8 }}
                        >
                            <Icon icon="MaterialIcons" name="delete" size={24} color="#F44336" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <CustomBottomSheet ref={workerRoleBottomSheetRef} title="Edit Worker Role" onClose={() => workerRoleBottomSheetRef.current?.close()}>
                {selectedItem && (
                    <WorkerRoleEditForm
                        workerRoleList={workerRoleList}
                        setWorkerRoleList={setWorkerRoleList}
                        refProp={workerRoleBottomSheetRef}
                        selectedItem={selectedItem}
                    />
                )}
            </CustomBottomSheet>
        </View>
    );
};

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

export default WorkerRoleList;
