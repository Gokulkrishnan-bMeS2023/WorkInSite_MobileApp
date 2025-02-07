import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {
  View,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import { Colors } from '../../utils';

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('', 'Are you sure you want to exit the app?', [
          {text: 'No', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    
      <View style={{flexGrow:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:Colors.grayColor,fontWeight:"bold",fontSize:18}}>
          Welcome!
        </Text>
      </View>
  );
};

export default HomeScreen;
