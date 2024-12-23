import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetStartedCardProps} from './DTOs';
import {Colors} from '../../utils';
import Button from '../../components/CommonComponets/Button/Button';

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Icon
            name="arrow-left-circle"
            size={25}
            color={Colors.secondaryBgTextColor}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Get Started</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.content}>
            {imgSrc ? (
              <Image
                source={imgSrc}
                style={styles.image}
                resizeMode="contain"
              />
            ) : null}
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.description}>{children}</Text>
            <Button
              title={buttonLabel}
              onPress={() => navigation.navigate(buttonClick as never)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  headerText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.grayColor,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GetStartedCard;
