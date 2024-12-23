import {useEffect, useState} from 'react';
import {ComboboxProps} from './DTOs';
import {useIsFocused} from '@react-navigation/native';
const useCombobox = (props: ComboboxProps) => {
  const {items, selectedValue, onValueChange, onCreate, onSearch} = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(selectedValue || '');
  const [searchString, setSearchString] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (!isFocused) {
      // setValue(''); //note
      setOpen(false);
      setSearchString('');
      setHover(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!selectedValue) {
      setValue(''); // Reset the value when selectedValue is null or empty
    }
  }, [selectedValue]);

  const handleOnOpenChange = () => {
    setOpen(!open);
    setSearchString('');
    setHover(false);
  };
  const filteredItems = items?.filter(item =>
    item.label.toLowerCase().includes(searchString.trim().toLowerCase()),
  );
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setOpen(false);
    setSearchString('');
  };
  const handleCreate = () => {
    if (onCreate) {
      onCreate(searchString);
    }
  };
  const handleSearch = (text: string) => {
    const trimmedText = text.trimStart();
    setSearchString(trimmedText);
    if (onSearch) {
      onSearch(trimmedText);
    }
  };
  return {
    open,
    handleOnOpenChange,
    value,
    searchString,
    setSearchString,
    filteredItems,
    handleValueChange,
    hover,
    setHover,
    handleCreate,
    handleSearch,
  };
};
export {useCombobox};
