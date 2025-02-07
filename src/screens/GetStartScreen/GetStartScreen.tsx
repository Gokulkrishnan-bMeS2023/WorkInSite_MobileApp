import React, {useCallback} from 'react';
import {View, Text, Image, BackHandler, StyleSheet} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {GetStartedCardProps} from './DTOs';
import Button from '../../components/CommonComponets/Button/Button';
import commonStyle from '../../styles/commonStyle';
import Header from '../../components/CommonComponets/Header/Header';
import Styles from '../../styles/GetStartScreenStyle';
const GetStartedCard = (props: GetStartedCardProps) => {
  const {imgSrc, buttonLabel, buttonClick, children} = props;
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home' as never);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const handleBack = () => {
    navigation.navigate('Home' as never);
  };
  return (
    <>
      <Header title="Get Started" onBackPress={handleBack} />
      <View style={commonStyle.container}>
        <View style={Styles.getStartContainer}>
          <View style={Styles.getStartCard}>
            <View style={Styles.getStartContent}>
              {imgSrc ? (
                <Image
                  source={imgSrc}
                  style={Styles.getStartImage}
                  resizeMode="contain"
                />
              ) : null}
              <Text style={Styles.getStartTitle}>Get Started</Text>
              <Text style={Styles.getStartDescription}>{children}</Text>
              <Button
                title={buttonLabel}
                onPress={() => navigation.navigate(buttonClick as never)}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default GetStartedCard;
