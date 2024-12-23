import React, {forwardRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or another vector icon library
import {Colors} from '../../../utils';

type BottomSheetProps = {
  title?: string;
  children: React.ReactNode;
  height?: number;
  customStyles?: object;
  onClose?: () => void; // Callback for the close icon
  scrollview?: boolean;
};

const CustomBottomSheet = forwardRef<any, BottomSheetProps>(
  ({title, children, height = 400, customStyles, onClose, scrollview}, ref) => {
    return (
      <RBSheet
        ref={ref}
        height={height}
        openDuration={250}
        customStyles={{
          container: [styles.sheetContainer, customStyles],
        }}>
        <View style={styles.header}>
          {title && <Text style={styles.sheetTitle}>{title}</Text>}
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </View>

        {scrollview ? (
          <ScrollView>{children}</ScrollView>
        ) : (
          <View>{children}</View>
        )}
      </RBSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

export default CustomBottomSheet;
