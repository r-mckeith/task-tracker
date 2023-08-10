import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/Review';

type ReviewWeekScreenProps = {
  navigation: StackNavigationProp<DoStackParamList, 'ReviewWeek'>;
  route: RouteProp<DoStackParamList, 'ReviewWeek'>;
};

export default function ReviewWeekScreen({navigation, route}: ReviewWeekScreenProps) {
    return (
      <ReviewComponent timeFrame="week" navigation={navigation} />
    );
}
