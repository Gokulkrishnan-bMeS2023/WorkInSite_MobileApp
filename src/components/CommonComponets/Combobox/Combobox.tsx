import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ComboboxProps} from './DTOs';
import {useCombobox} from './useCombobox';
import {Colors, SH} from '../../../utils';
const Combobox = (props: ComboboxProps) => {
  const {
    label,
    items = [],
    placeholder = 'Select',
    showCreateButton,
    required = false,
    errorMessage,
    selectedValue,
  } = props;
  const searchInputRef = useRef<TextInput>(null);
  const {
    open,
    handleOnOpenChange,
    searchString,
    filteredItems = [],
    handleValueChange,
    handleCreate,
    handleSearch,
  } = useCombobox(props);
  const displayValue =
    items.find(item => item.value === String(selectedValue))?.label ||
    placeholder;
  useEffect(() => {
    if (open) {
      searchInputRef.current?.focus();
    }
  }, [open]);
  const renderItem = (item: {label: string; value: string}) => {
    const isSelected = item.value === String(selectedValue);
    return (
      <TouchableOpacity
        key={item.value}
        onPress={() => handleValueChange(item.value)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          height: SH(40),
          borderRadius: SH(7),
          backgroundColor: isSelected
            ? Colors.selecthoverbgcolor
            : Colors.white, // Highlight selected item
        }}>
        <Feather
          name="check"
          size={20}
          style={{
            opacity: isSelected ? 1 : 0, // Show check icon only for selected item
            marginRight: 8,
            color: Colors.primaryColor,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: Colors.grayColor,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {label && (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
          <Text style={{fontSize: 16, color: Colors.black, fontWeight: '500'}}>
            {label}
          </Text>
          {required && (
            <Text
              style={{
                color: Colors.dangerColor,
                marginLeft: 4,
                fontWeight: 500,
              }}>
              *
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={handleOnOpenChange}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: SH(7),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: Colors.grayColor,
          height: 50,
        }}>
        <Text style={{fontSize: 16}}>{displayValue}</Text>
        <View style={{flexDirection: 'column', marginVertical: 6}}>
          <Feather name="chevron-up" size={16} />
          <Feather name="chevron-down" size={16} />
        </View>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            marginTop: 8,
            borderWidth: 1,
            borderRadius: SH(7),
            borderColor: Colors.grayColor,
            // borderColor: open ? Colors.primaryColor : Colors.grayColor,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name="search"
              size={24}
              style={{
                marginHorizontal: 8,
              }}
            />
            <TextInput
              ref={searchInputRef}
              value={searchString}
              onChangeText={handleSearch}
              placeholder="Search here"
              style={{
                flex: 1,
                paddingVertical: 8,
                height: 50,
                borderTopLeftRadius: SH(7),
                fontSize: 16,
                backgroundColor: Colors.white,
              }}
            />
          </View>
          <ScrollView
            style={{
              maxHeight: SH(200),
              backgroundColor: Colors.white,
              borderRadius: SH(7),
            }}
            nestedScrollEnabled={true}>
            {filteredItems.map(item => renderItem(item))}
          </ScrollView>
          {showCreateButton &&
            searchString &&
            !filteredItems.some(item => item.label === searchString) && (
              <TouchableOpacity
                onPress={handleCreate}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 12,
                }}>
                <Text
                  style={{
                    color: Colors.secondaryColor,
                    fontSize: 16,
                    flex: 1,
                    borderRadius: SH(7),
                    paddingHorizontal: 24,
                  }}>
                  {'"'}
                  {searchString}
                  {'"'}
                </Text>
                <View>
                  <Text
                    style={{
                      color: Colors.black,
                      backgroundColor: Colors.primaryColor,
                      paddingVertical: 4,
                      paddingHorizontal: 6,
                      borderRadius: SH(7),
                      fontWeight: 'bold',
                    }}>
                    New
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          {filteredItems?.length === 0 && !showCreateButton && (
            <Text style={{padding: 16, textAlign: 'center'}}>
              No items found.
            </Text>
          )}
        </View>
      )}
      {errorMessage && (
        <Text
          style={{
            color: Colors.dangerColor,
            marginTop: 4,
            fontSize: 16,
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
export {Combobox};
