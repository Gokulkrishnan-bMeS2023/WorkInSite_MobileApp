import { useState } from "react";

const useWorkerCategoryInputValidate = (workerCategoryName: string ) => {
  const initialError = { workerCategoryName: "" };
  const [error, setError] = useState(initialError);

  const resetErrors = () => setError(initialError);

  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError((prev) => ({ ...prev, [field]: message }));
      isValid = false;
    };

    if (!workerCategoryName) updateError("workerCategoryName", "Please enter worker category name");
    if (workerCategoryName && (workerCategoryName.length < 2 || !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(workerCategoryName))) updateError("workerCategoryName", "Invalid worker category name");

    return isValid;
  };

  return { error, validate };
};

export { useWorkerCategoryInputValidate };
