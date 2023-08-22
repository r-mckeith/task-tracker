import React from 'react';

type DateContextType = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const DateContext = React.createContext<DateContextType | undefined>(undefined);

export default DateContext;
