import React from 'react';
import {Input} from '../../../components/CommonComponets';
import Textarea from '../../../components/CommonComponets/Notes/Notes';
import {ContactTypes} from '../DTOs/ContactProps';
import {ContactInputFieldProps} from './DTOs';
import {emailRegex, numberRegex} from '../../../utils/regex';

const ContactInputFields = (props: ContactInputFieldProps) => {
  const {contactType, input, setInput, error} = props;

  const contactField = {
    [ContactTypes.PHONE]: (
      <Input
        value={input}
        onChangeText={setInput}
        errorMessage={error.phone}
        placeholder="Phone"
        inputType="phone-pad"
        maxLength={10}
        regex={numberRegex}
      />
    ),
    [ContactTypes.EMAIL]: (
      <Input
        value={input}
        onChangeText={setInput}
        errorMessage={error.email}
        placeholder="Email"
        regex={emailRegex}
      />
    ),
    [ContactTypes.ADDRESS]: (
      <Textarea
        length={300}
        value={input}
        onChange={setInput}
        errorMessage={error.address}
        placeholder="Address"
      />
    ),
  };

  return contactField[contactType as keyof typeof contactField] || <></>;
};

export {ContactInputFields};
