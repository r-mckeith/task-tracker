import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/ReviewScreen';

type ReviewDayScreenProps = {
  navigation: StackNavigationProp<DoStackParamList, 'ReviewDay'>;
  route: RouteProp<DoStackParamList, 'ReviewDay'>;
};

export default function ReviewDayScreen({navigation, route}: ReviewDayScreenProps) {
  return (
    <ReviewComponent timeFrame="day" navigation={navigation} />
  );
}
