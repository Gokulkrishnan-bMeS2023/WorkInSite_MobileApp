import React from 'react';
import {View} from 'react-native';
import {useSupervisorAddForm} from './useSupervisorAddForm';
import {SupervisorAddFormProps} from './DTOs';
import Button from '../../../components/CommonComponets/Button/Button';
import {Combobox} from '../../../components/CommonComponets/Combobox/Combobox';

const SupervisorAddForm=(props:SupervisorAddFormProps) => {
  const {
    supervisorDetails,
    supervisorId,
    error,
    handleSupervisorCreate,
    handleSupervisorChange,
    fetchSupervisors,
    handleAdd,
  } = useSupervisorAddForm(props);

  return (
    <View>
       <Combobox 
          label="Supervisor" 
          showCreateButton={true} 
          items={supervisorDetails} 
          selectedValue={supervisorId} 
          onCreate={handleSupervisorCreate} 
          onValueChange={handleSupervisorChange} 
          onSearch={fetchSupervisors} 
          required={true} 
          errorMessage={error} />
      <Button buttonStyle={{marginTop: 16}} title="Add" onPress={handleAdd} />
    </View>
  );
};

export {SupervisorAddForm};
