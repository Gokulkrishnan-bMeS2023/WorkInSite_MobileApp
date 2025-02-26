import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input } from '../../../components/CommonComponets'
import { useWorkType } from './useWorkTypeCreateForm';
import Button from '../../../components/CommonComponets/Button/Button';
import { WorkTypeProps } from '../DTOs/WorkTypeProps';

const WorkTypeCreateForm = (props: WorkTypeProps) => {
    const {
        workType,
        setWorkType,
        handleAdd,
        error,
    } = useWorkType(props)
    return (
        <View style={styles.container}>
            <Input
                title="Work Type"
                placeholder="Enter Work Type"
                value={workType}
                onChangeText={setWorkType}
                required
                errorMessage={error}
            />
            <Button title='Save' onPress={handleAdd} />
        </View>
    )
}

export default WorkTypeCreateForm

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
})