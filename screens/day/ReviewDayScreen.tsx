import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/ReviewScreen';

export default function ReviewDayScreen() {
  const navigation = useNavigation<StackNavigationProp<DoStackParamList, 'ReviewDay'>>();
  return (
    <ReviewComponent timeFrame="day" navigation={navigation} />
  );
}
