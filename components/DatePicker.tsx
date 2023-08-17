import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity, Text, View } from 'react-native';

type DatePickerProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePickerComponent: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDateValue?: Date) => {
    if (selectedDateValue) {
      onDateChange(selectedDateValue);
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setShow(true)}>
        <Text style={{ color: '#767577', fontSize: 20, fontWeight: 'bold' }}>
          {formattedDate}
        </Text>
        <Text style={{ marginLeft: 5 }}>v</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

export default DatePickerComponent;
