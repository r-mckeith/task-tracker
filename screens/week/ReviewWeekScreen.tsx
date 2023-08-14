import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import ReviewComponent from '../../components/reviews/ReviewScreen';

type ReviewWeekScreenProps = {
  navigation: StackNavigationProp<DoStackParamList, 'ReviewWeek'>;
  route: RouteProp<DoStackParamList, 'ReviewWeek'>;
};

export default function ReviewWeekScreen() {
  const navigation = useNavigation<StackNavigationProp<DoStackParamList, 'ReviewWeek'>>();
  return (
    <ReviewComponent timeFrame="week" navigation={navigation} />
  );
}
