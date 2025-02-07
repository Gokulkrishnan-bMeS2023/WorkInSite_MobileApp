import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../utils';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({searchText, setSearchText}) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <TouchableOpacity onPress={() => inputRef.current?.focus()}>
        <Icon
          name="search"
          size={25}
          color={Colors.grayColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={text => {
          const sanitizedText = text.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
          setSearchText(sanitizedText.trimStart()); // Remove leading spaces
        }}
        keyboardType="default"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {searchText ? (
        <TouchableOpacity onPress={() => setSearchText('')}>
          <Icon
            name="cancel"
            size={25}
            color={Colors.grayColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.grayColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  focusedContainer: {
    borderColor: Colors.primaryColor,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBar;
