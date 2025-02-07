// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState, useRef } from 'react';
// import Icon from '../../../utils/VectorIcons';
// import { Colors } from '../../../utils';
// import { useWorkerRoleList } from './useWorkerRoleList';
// import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
// import WorkerRoleEditForm from '../WorkerRoleEditForm/WorkerRoleEditForm';

// interface WorkerRoleProps {
//     workerRoleList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[];
//     setworkerRoleList: (newList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[]) => void;
// }

// const WorkerRoleList: React.FC<WorkerRoleProps> = ({ workerRoleList, setworkerRoleList }) => {
//     const { handleDelete } = useWorkerRoleList({ workerRoleList, setworkerRoleList });
//     const workerRoleBottomSheetRef = useRef<any>(null);

//     const [selectedItem, setSelectedItem] = useState<{ index: number; value: { workerRole: string; salaryPerShift: string; hoursPerShift: string } } | null>(null);

//     const handleEdit = (index: number, value: { workerRole: string; salaryPerShift: string; hoursPerShift: string }) => {
//         setSelectedItem({ index, value });
//         workerRoleBottomSheetRef.current?.open();
//     };

//     return (
//         <View>
//             {workerRoleList.map((item, index) => (
//                 <View key={`${item.workerRole}-${index}`} style={styles.listItem}>
//                     <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="middle">{item.workerRole}</Text>
//                     <Text style={styles.nameText}>{item.salaryPerShift}</Text>
//                     <Text style={styles.nameText}>{item.hoursPerShift}</Text>
//                     <View style={styles.actions}>
//                         <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(index, item)}>
//                             <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={() => handleDelete(index)}
//                             style={{ opacity: 1, padding: 8 }}
//                         >
//                             <Icon icon="MaterialIcons" name="delete" size={24} color="#F44336" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             ))}

//             {/* Corrected CustomBottomSheet usage */}
//             <CustomBottomSheet ref={workerRoleBottomSheetRef} title="Edit Worker Role" onClose={() => workerRoleBottomSheetRef.current?.close()}>
//                 {selectedItem && (
//                     <WorkerRoleEditForm
//                         workerRoleList={workerRoleList}
//                         setworkerRoleList={setworkerRoleList}
//                         refProp={workerRoleBottomSheetRef}
//                         selectedItem={selectedItem}
//                     />
//                 )}
//             </CustomBottomSheet>
//         </View>
//     );
// };

// export default WorkerRoleList;

// const styles = StyleSheet.create({
//     listItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 10,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 5,
//         marginBottom: 8,
//     },
//     nameText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     actions: {
//         flexDirection: 'row',
//         gap: 8,
//     },
//     actionButton: {
//         padding: 8,
//     },
// });


//2
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../utils/VectorIcons';
import { Colors } from '../../../utils';
import { useWorkerRoleList } from './useWorkerRoleList';
import CustomBottomSheet from '../../../components/CommonComponets/CustomBottomSheet/CustomBottomSheet';
import WorkerRoleEditForm from '../WorkerRoleEditForm/WorkerRoleEditForm';

interface WorkerRoleProps {
    workerRoleList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[];
    setworkerRoleList: (newList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[]) => void;
}

const WorkerRoleList: React.FC<WorkerRoleProps> = ({ workerRoleList, setworkerRoleList }) => {
    const { handleDelete } = useWorkerRoleList({ workerRoleList, setworkerRoleList });
    const workerRoleBottomSheetRef = useRef<any>(null);

    const [selectedItem, setSelectedItem] = useState<{ index: number; value: { workerRole: string; salaryPerShift: string; hoursPerShift: string } } | null>(null);

    const handleEdit = (index: number, value: { workerRole: string; salaryPerShift: string; hoursPerShift: string }) => {
        setSelectedItem({ index, value });
        workerRoleBottomSheetRef.current?.open();
    };

    return (
        <View>
            {workerRoleList.map((item, index) => (
                <View key={`${item.workerRole}-${index}`} style={styles.listItem}>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="middle">{item.workerRole}</Text>
                    <Text style={styles.nameText}>{item.salaryPerShift}</Text>
                    <Text style={styles.nameText}>{item.hoursPerShift}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(index, item)}>
                            <Icon icon="MaterialIcons" name="edit" size={24} color={Colors.secondaryColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDelete(index)}  // Using the delete handler
                            style={{ opacity: 1, padding: 8 }}
                        >
                            <Icon icon="MaterialIcons" name="delete" size={24} color="#F44336" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {/* Corrected CustomBottomSheet usage */}
            <CustomBottomSheet ref={workerRoleBottomSheetRef} title="Edit Worker Role" onClose={() => workerRoleBottomSheetRef.current?.close()}>
                {selectedItem && (
                    <WorkerRoleEditForm
                        workerRoleList={workerRoleList}
                        setworkerRoleList={setworkerRoleList}
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
