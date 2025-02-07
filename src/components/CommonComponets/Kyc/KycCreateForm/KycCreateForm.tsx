// import React from 'react';
// import {View} from 'react-native';
// import {useKycCreateForm} from './useKycCreateForm';
// import {KycInputFields} from '../KycInputFields/KycInputFields';
// import Select from '../../Select/Select';
// import Button from '../../Button/Button';
// import {KYCTypes} from '../DTOs/DTOs';

// type KycCreateFormProps<T> = {
//   details: T;
//   setDetails: React.Dispatch<React.SetStateAction<T>>;
//   Ref?: any;
// };

// const KycCreateForm = <
//   T extends {kycDetails: {kycType: KYCTypes; value: string}[]},
// >({
//   details,
//   setDetails,
//   Ref,
// }: KycCreateFormProps<T>) => {
//   const {
//     kycType,
//     kycItems,
//     input,
//     setInput,
//     error,
//     handleSelectChange,
//     handleAdd,
//   } = useKycCreateForm({details, setDetails, Ref});

//   return (
//     <View>
//       <Select
//         items={kycItems}
//         selectedValue={kycType}
//         onValueChange={handleSelectChange}
//         required={false}
//         errorMessage={error.select}
//       />
//       <KycInputFields
//         kycType={kycType as KYCTypes}
//         input={input}
//         setInput={setInput}
//         error={error}
//       />
//       <Button buttonStyle={{marginTop: 16}} title="Add" onPress={handleAdd} />
//     </View>
//   );
// };

// export {KycCreateForm};

//2

import React from 'react';
import {View} from 'react-native';
import {useKycCreateForm} from './useKycCreateForm';
import {KycInputFields} from '../KycInputFields/KycInputFields';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import {KYCTypes} from '../DTOs/DTOs';

interface KycTypesProps {
  details: any;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  Ref?: any;
}

const KycCreateForm = ({details, setDetails, Ref}: KycTypesProps) => {
  const {
    kycType,
    kycItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  } = useKycCreateForm({details, setDetails, Ref});

  return (
    <View>
      <Select
        items={kycItems}
        selectedValue={kycType}
        onValueChange={handleSelectChange}
        required={false}
        errorMessage={error.select}
      />
      <KycInputFields
        kycType={kycType as KYCTypes}
        input={input}
        setInput={setInput}
        error={error}
      />
      <Button buttonStyle={{marginTop: 16}} title="Add" onPress={handleAdd} />
    </View>
  );
};

export {KycCreateForm};
