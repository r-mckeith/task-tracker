import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from './DatePicker';
import styles from '../styles/screens/dailyScreen'

type HeaderProps = {
  title: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const Header: React.FC<HeaderProps> = ({ title, selectedDate, onDateChange }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />
    </View>  
  );
};

export default Header;
