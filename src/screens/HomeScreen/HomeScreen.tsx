import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import {Colors} from '../../utils';

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
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{width: '100%', height: 'auto'}}>
        <KeyboardAvoidingView enabled>
          <View>
            <Text>HomeScreen</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
