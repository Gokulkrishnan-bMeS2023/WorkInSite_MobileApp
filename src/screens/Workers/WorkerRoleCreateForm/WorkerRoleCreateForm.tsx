import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Input } from '../../../components/CommonComponets';
import { useWorkerRoleCreateForm } from './useWorkerRoleCreateForm';
import Button from '../../../components/CommonComponets/Button/Button';
import { WorkerRoleProps } from '../DTOs/WorkerRoleProps';

const WorkerRoleCreateForm = (props: WorkerRoleProps) => {
    const {
        name,
        setName,
        salaryPerShift,
        setSalaryPerShift,
        hoursPerShift,
        setHoursPerShift,
        handleAdd,
        error
    } = useWorkerRoleCreateForm(props);

    return (
        <View style={styles.container}>
            <Input
                title="Worker Role"
                placeholder="Enter Worker Role"
                value={name}
                onChangeText={setName}
                required
                errorMessage={error.name}
            />
            <Input
                title="Salary Per Shift"
                placeholder="Enter Salary Per Shift"
                value={salaryPerShift}
                onChangeText={setSalaryPerShift}
                inputType="numeric"
                required
                errorMessage={error.salaryPerShift}
            />
            <Input
                title="Hours Per Shift"
                placeholder="Enter Hours Per Shift"
                value={hoursPerShift}
                onChangeText={setHoursPerShift}
                inputType="numeric"
                required
                errorMessage={error.hoursPerShift}
            />

            <Button title="Save" onPress={handleAdd} />
        </View>
    );
};

export default WorkerRoleCreateForm;

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
});
