import React, { useState, ReactNode } from 'react';
import DateContext from './DateContext';

type DateProviderProps = {
  children: ReactNode;
};

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
