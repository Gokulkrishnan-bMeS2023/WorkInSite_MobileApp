import {useState} from 'react';

const useInputValidate = (props: {name: string}) => {
  const {name} = props;

  const initialError = {
    name: '',
  };

  const [error, setError] = useState(initialError);

  const resetErrors = () => setError({name: ''});

  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError(prev => ({...prev, [field]: message}));
      isValid = false;
    };

    if (name.length === 0) updateError('name', 'Please enter name');
    if (
      name.length &&
      (name.length < 2 || !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(name))
    )
      updateError('name', 'Invalid name');

    return isValid;
  };

  return {error, validate, setError, initialError};
};

export {useInputValidate};
