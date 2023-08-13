import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/ReviewScreen';

type ReviewQuarterScreenProps = {
  navigation: StackNavigationProp<DoStackParamList, 'ReviewQuarter'>;
  route: RouteProp<DoStackParamList, 'ReviewQuarter'>;
};

export default function ReviewQuarterScreen({navigation, route}: ReviewQuarterScreenProps) {
  return (
    <ReviewComponent timeFrame="quarter" navigation={navigation} />
  );
}
