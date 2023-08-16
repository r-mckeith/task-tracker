import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/ReviewScreen';

export default function ReviewQuarterScreen() {
  const navigation = useNavigation<StackNavigationProp<DoStackParamList, 'ReviewQuarter'>>();
  return (
    <ReviewComponent timeFrame="quarter" navigation={navigation} />
  );
}

