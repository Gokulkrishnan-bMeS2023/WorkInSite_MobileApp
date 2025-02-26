import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../../components/CommonComponets';
import Button from '../../../components/CommonComponets/Button/Button';
import { useWorkerRoleEditForm } from './useWorkerRoleEditForm';
import { WorkerRoleEditFormProps } from '../DTOs/WorkerRoleProps';

const WorkerRoleEditForm = (props: WorkerRoleEditFormProps) => {
    const {
        name,
        setName,
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
                value={name}
                onChangeText={setName}
                placeholder=' Enter worker role'
                errorMessage={error.name}
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
