import {useState} from 'react';

const useWorkerCategoryInputValidate = (workerCategoryName: string) => {
  const initialError = {workerCategoryName: ''};
  const [error, setError] = useState(initialError);

  const resetErrors = () => setError(initialError);

  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError(prev => ({...prev, [field]: message}));
      isValid = false;
    };

    if (!workerCategoryName)
      updateError('workerCategoryName', 'Please enter worker category name');
    if (
      workerCategoryName &&
      (workerCategoryName.length < 2 ||
        !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(workerCategoryName))
    )
      updateError('workerCategoryName', 'Invalid worker category name');

    return isValid;
  };

  return {error, validate, initialError, setError};
};

export {useWorkerCategoryInputValidate};

//2

// import {useState} from 'react';

// interface ValidationError {
//   workerCategoryName: string;
//   workerRole: string;
//   salaryPerShift: string;
//   hoursPerShift: string;
//   workType: string;
//   workTypeList: any;
//   workerRoleList: any;
// }

// const useWorkerCategoryInputValidate = (
//   workerCategoryName: string,
//   workerRole: string,
//   salaryPerShift: string,
//   hoursPerShift: string,
//   workType: string,
//   workTypeList: string[],
//   workerRoleList: string[],
// ) => {
//   const initialError: ValidationError = {
//     workerCategoryName: '',
//     workerRole: '',
//     salaryPerShift: '',
//     hoursPerShift: '',
//     workType: '',
//     workTypeList: [],
//     workerRoleList: [],
//   };
//   const [error, setError] = useState(initialError);

//   const resetErrors = () => setError(initialError);

//   const validate = () => {
//     resetErrors();
//     let isValid = true;

//     const updateError = (field: keyof ValidationError, message: string) => {
//       setError(prev => ({...prev, [field]: message}));
//       isValid = false;
//     };

//     // Worker Category Name Validation
//     if (!workerCategoryName) {
//       updateError('workerCategoryName', 'Please enter worker category name');
//     } else if (
//       workerCategoryName.length < 2 ||
//       !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(workerCategoryName)
//     ) {
//       updateError('workerCategoryName', 'Invalid worker category name');
//     }

//     // Worker Role Validation
//     if (workerRoleList.length === 0) {
//       updateError('workerRole', 'Please add worker role');
//     }
//     //  else if (workerRole.length < 3) {
//     //   updateError(
//     //     'workerRole',
//     //     'Worker role must be at least 3 characters long',
//     //   );
//     // }

//     // Salary Per Shift Validation
//     if (!salaryPerShift) {
//       updateError('salaryPerShift', 'Please enter salary per shift');
//     } else if (!/^\d+(\.\d{1,2})?$/.test(salaryPerShift)) {
//       updateError(
//         'salaryPerShift',
//         'Salary must be a valid number (e.g., 100, 100.50)',
//       );
//     }

//     // Hours Per Shift Validation
//     if (!hoursPerShift) {
//       updateError('hoursPerShift', 'Please enter hours per shift');
//     } else if (
//       !/^\d+$/.test(hoursPerShift) ||
//       parseInt(hoursPerShift, 10) <= 0
//     ) {
//       updateError(
//         'hoursPerShift',
//         'Hours per shift must be a positive whole number',
//       );
//     }

//     // Work Type Validation
//     if (workTypeList.length === 0) {
//       updateError('workType', 'Please add work type');
//     }
//     // else if (!/^[a-zA-Z ]+$/.test(workType) && workTypeList.length !== 0) {
//     //   updateError('workType', 'Work type must only contain letters');
//     // }

//     return isValid;
//   };

//   return {error, validate, setError, initialError};
// };

// export {useWorkerCategoryInputValidate};
