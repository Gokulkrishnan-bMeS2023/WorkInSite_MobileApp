// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Colors} from '../../../utils';

// const Icons: {[key: string]: JSX.Element} = {
//   AADHAAR: <Ionicons name="card" size={24} color={Colors.secondaryColor} />,
//   PAN: (
//     <Ionicons name="document-text" size={24} color={Colors.secondaryColor} />
//   ),
//   GST: <Ionicons name="cash" size={24} color={Colors.secondaryColor} />,
//   DEFAULT: (
//     <Ionicons
//       name="information-circle"
//       size={24}
//       color={Colors.secondaryColor}
//     />
//   ),
// };

// export {Icons};

import React from 'react';
import {Image} from 'react-native';
import images from '../../..';

const Icons: {[key: string]: JSX.Element} = {
  AADHAAR: (
    <Image
      source={images.aadhar_img} // Replace with the correct path to your image
      style={{width: 40, height: 26}}
    />
  ),
  PAN: (
    <Image
      source={images.pan_img} // Replace with the correct path to your image
      style={{width: 40, height: 26}}
    />
  ),
  GST: (
    <Image
      source={images.gst_img} // Replace with the correct path to your image
      style={{width: 40, height: 26}}
    />
  ),
  DEFAULT: (
    <Image
      source={images.logo} // Replace with the correct path to your image
      style={{width: 40, height: 26}}
    />
  ),
};

export {Icons};
