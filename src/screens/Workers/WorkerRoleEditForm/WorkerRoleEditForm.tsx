import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { useWorkerRoleEditForm } from './useWorkerRoleEditForm';

interface WorkerRoleEditFormProps {
    workerRoleList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[];
    setworkerRoleList: (newList: { workerRole: string; salaryPerShift: string; hoursPerShift: string }[]) => void;
    selectedItem: { index: number; value: { workerRole: string; salaryPerShift: string; hoursPerShift: string } };
    refProp: any;
}

const WorkerRoleEditForm = (props: WorkerRoleEditFormProps) => {

    const {
        workerRole,
        setWorkerRole,
        salaryPerShift,
        setSalaryPerShift,
        hoursPerShift,
        setHoursPerShift,
        error,
        handleSave,
    } = useWorkerRoleEditForm(props)


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
