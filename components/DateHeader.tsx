import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from './DatePicker';
import { StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function Header({ title, selectedDate, onDateChange }: HeaderProps) {
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

const styles=StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: "capitalize",
  },
});
