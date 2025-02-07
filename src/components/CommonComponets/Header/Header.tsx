// import React, {Children, ReactNode} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {Colors} from '../../../utils';
// import Icon from '../../../utils/VectorIcons';

// interface HeaderProps {
//   title: string;
//   onBackPress: () => void;
//   handleCreate?: () => void;
//   rightNode?: ReactNode;
// }

// const Header: React.FC<HeaderProps> = ({
//   title,
//   onBackPress,
//   handleCreate,
//   rightNode,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.subContainer}>
//         <TouchableOpacity onPress={onBackPress}>
//           <Icon
//             icon="MaterialCommunityIcons"
//             name="arrow-left-circle"
//             size={25}
//             color={Colors.white}
//           />
//         </TouchableOpacity>
//         <Text style={styles.title}>{title}</Text>
//       </View>
//       <View style={styles.subContainer}>
//         {rightNode && rightNode}
//         {handleCreate && (
//           <TouchableOpacity onPress={handleCreate}>
//             <Icon
//               icon="AntDesign"
//               name="pluscircle"
//               size={30}
//               color={Colors.secondaryColor}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: Colors.primaryColor,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   subContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   title: {
//     color: Colors.white,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Header;

//2

import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../utils';
import Icon from '../../../utils/VectorIcons';

interface HeaderProps {
  title: string;
  onBackPress: () => void;
  handleCreate?: () => void;
  rightNode?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  handleCreate,
  rightNode,
}) => {
  // Helper to render an icon
  const renderIcon = (
    icon: string,
    name: string,
    size: number,
    color: string,
    onPress: () => void,
  ) => (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Icon icon={icon} name={name} size={size} color={color} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.subContainer}>
        {renderIcon(
          'MaterialCommunityIcons',
          'arrow-left-circle',
          25,
          Colors.white,
          onBackPress,
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.subContainer}>
        {rightNode}
        {handleCreate &&
          renderIcon(
            'AntDesign',
            'pluscircle',
            30,
            Colors.secondaryColor,
            handleCreate,
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 5, // Optional padding around touchable icons
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
