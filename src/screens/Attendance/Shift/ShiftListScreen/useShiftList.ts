// import {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import {Alert} from 'react-native';
// import {Shift} from '../DTOs/ShiftProps';
// import {useShiftService} from '../../../../services/ShiftService';

// const useShiftList = () => {
//   const shiftService = useShiftService();
//   const [shiftDetails, setShiftDetails] = useState<Shift[]>([]);
//   const [loading, setLoading] = useState(true);
//   const isFocused = useIsFocused();

//   const fetchShift = async () => {
//     setLoading(true);
//     const shiftData = await shiftService.getShifts('');
//     setShiftDetails(shiftData);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (isFocused) {
//       fetchShift();
//     }
//   }, [isFocused]);

//   const handleShiftDelete = async (id: number) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this Shift?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: async () => {
//             await shiftService.deleteShift(id);
//             fetchShift();
//           },
//           style: 'destructive',
//         },
//       ],
//     );
//   };

//   return {
//     shiftDetails,
//     fetchShift,
//     handleShiftDelete,
//     loading,
//   };
// };

// export {useShiftList};
