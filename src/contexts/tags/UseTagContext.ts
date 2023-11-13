import { useContext } from 'react';
import { TagContext } from './TagContext';

export const useTagContext = () => {
  const context = useContext(TagContext);

  if (!context) {
    throw new Error('useTagContext must be used within a TagContextProvider');
  }

  return context;
};