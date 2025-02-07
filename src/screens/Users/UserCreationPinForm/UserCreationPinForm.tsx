import {MutableRefObject} from 'react';
import PinForm from '../../../components/CommonComponets/PinForm/PinForm';
import {UserBase} from '../DTOs/UserBase';
import {useUserCreationPinForm} from './useUserCreationPinForm';

const UserCreationPinForm = (props: {
  userDetail: UserBase;
  navigation: any;
  supervisorIds?: any;
  redirect?: string;
  bottomSheetRef?: MutableRefObject<any>;
}) => {
  const {pin, setPin, confirmPin, setConfirmPin, error, handleOnSave} =
    useUserCreationPinForm(
      props.userDetail,
      props.navigation,
      props.supervisorIds,
      props.redirect,
      props.bottomSheetRef,
    );
  return (
    <PinForm
      pin={pin}
      setPin={setPin}
      confirmPin={confirmPin}
      setConfirmPin={setConfirmPin}
      error={error}
      onSave={handleOnSave}
    />
  );
};

export {UserCreationPinForm};
