import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { useWorkerRoleInputValidate } from '../InputValidate/WorkerRoleValidate';

interface WorkerRoleEditFormProps {
    workerRoleList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[];
    setworkerRoleList: (newList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[]) => void;
    selectedItem: { index: number; value: { workerRole: string; salaryPerShift: string; hoursPerShift: string } };
    refProp: any;
}

const WorkerRoleEditForm: React.FC<WorkerRoleEditFormProps> = ({
    workerRoleList,
    setworkerRoleList,
    selectedItem,
    refProp,
}) => {
    // States to hold form data
    const [workerRole, setWorkerRole] = useState(selectedItem.value.workerRole);
    const [salaryPerShift, setSalaryPerShift] = useState(selectedItem.value.salaryPerShift);
    const [hoursPerShift, setHoursPerShift] = useState(selectedItem.value.hoursPerShift);
    const { error, validate, setError, initialError } = useWorkerRoleInputValidate(
        workerRole,
        salaryPerShift,
        hoursPerShift,
    );

    // Effect to update form fields when selectedItem changes
    useEffect(() => {
        setWorkerRole(selectedItem.value.workerRole);
        setSalaryPerShift(selectedItem.value.salaryPerShift);
        setHoursPerShift(selectedItem.value.hoursPerShift);
    }, [selectedItem]);

    // Handle saving the edited worker role
    const handleSave = () => {
        if (validate()) {
            const updatedList = [...workerRoleList];
            updatedList[selectedItem.index] = {
                workerRole,
                salaryPerShift,
                hoursPerShift,
            };
            setworkerRoleList(updatedList);
            refProp.current.close();
            setError(initialError);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                title='Worker Role'
                value={workerRole}
                onChangeText={setWorkerRole}
                placeholder=' Enter worker role'
                errorMessage={error.workerRole}
            />
            <Input
                title='Salary Per Shift'
                value={salaryPerShift}
                onChangeText={setSalaryPerShift}
                inputType="numeric"
                placeholder='Enter Salary Per Shift'
                errorMessage={error.salaryPerShift}
            />
            <Input
                title='Hours Per Shift'
                value={hoursPerShift}
                onChangeText={setHoursPerShift}
                inputType="numeric"
                placeholder='Enter Hours Per Shift'
                errorMessage={error.hoursPerShift}
            />
            <Button title="Update" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
});

export default WorkerRoleEditForm;
