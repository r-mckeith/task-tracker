import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type DatePickerProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePickerComponent = ({ selectedDate, onDateChange }: DatePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onDateChange(date);
    hideDatePicker();
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={showDatePicker}
      >
        <Text style={{ color: '#767577', fontSize: 20, fontWeight: 'bold' }}>
          {formattedDate}
        </Text>
        <MaterialCommunityIcons name="menu-down" size={30} color="#767577" /> 
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        display={'inline'}
      />
    </>
  );
};

export default DatePickerComponent;
