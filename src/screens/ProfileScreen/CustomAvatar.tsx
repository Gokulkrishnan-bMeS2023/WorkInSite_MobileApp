import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CustomAvatarProps {
  name: string;
  imageUri?: string | null; // Optional image URI
  size?: number;             // Default size will be 50 if not provided
  backgroundColor?: string;  // Background color for the fallback initials
  textColor?: string;        // Color for the initials text
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  name,
  imageUri,
  size = 50,
  backgroundColor = 'gray',
  textColor = 'white',
}) => {
  const initial = name.charAt(0).toUpperCase(); // Get first letter

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          onError={() => console.warn('Failed to load image')}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size / 2, color: textColor }]}>
          {initial}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: 'bold',
  },
});

export default CustomAvatar;
