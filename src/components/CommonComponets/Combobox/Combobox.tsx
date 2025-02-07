import React, {useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ComboboxProps} from './DTOs';
import {useCombobox} from './useCombobox';
import {Colors, SF, SH} from '../../../utils';
import Icon from '../../../utils/VectorIcons';
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
  // Memoize displayValue to avoid recalculating it on every render
  const displayValue = useMemo(
    () =>
      items.find(item => item.value === String(selectedValue))?.label ||
      placeholder,
    [items, selectedValue, placeholder],
  );
  // Focus the search input when dropdown opens
  useEffect(() => {
    if (open) {
      searchInputRef.current?.focus();
    }
  }, [open]);
  // Memoized function to render items
  const renderItem = useCallback(
    (item: {label: string; value: string}) => {
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
              : Colors.white,
          }}>
          <Icon
            icon="MaterialCommunityIcons"
            name="check"
            size={20}
            style={{
              opacity: isSelected ? 1 : 0,
              marginRight: 8,
              color: Colors.primaryColor,
            }}
          />
          <Text style={{fontSize: 16, color: Colors.grayColor}}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedValue, handleValueChange],
  );
  // Memoized filtered items
  const memoizedFilteredItems = useMemo(
    () => filteredItems.map(item => renderItem(item)),
    [filteredItems, renderItem],
  );
  return (
    <View>
      {label && (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
          <Text
            style={{fontSize: SF(16), color: Colors.black, fontWeight: '500'}}>
            {label}
          </Text>
          {required && (
            <Text
              style={{color: Colors.dangerColor, marginLeft: 4, fontSize: 18}}>
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
          <Icon icon="MaterialCommunityIcons" name="chevron-up" size={18} />
          <Icon icon="MaterialCommunityIcons" name="chevron-down" size={18} />
        </View>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            marginTop: 8,
            borderWidth: 1,
            borderRadius: SH(7),
            borderColor: Colors.grayColor,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              icon="MaterialIcons"
              name="search"
              size={24}
              style={{marginHorizontal: 8}}
            />
            <TextInput
              ref={searchInputRef}
              value={searchString}
              onChangeText={handleSearch}
              placeholder="Search here"
              style={{
                flex: 1,
                paddingVertical: 8,
                height: SH(50),
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
            nestedScrollEnabled>
            {memoizedFilteredItems}
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
        <Text style={{color: Colors.dangerColor, marginTop: 4, fontSize: 16}}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
export {Combobox};
