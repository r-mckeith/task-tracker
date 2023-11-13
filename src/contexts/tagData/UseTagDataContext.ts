import { useContext } from 'react';
import { TagDataContext } from './TagDataContext';

export const useTagDataContext = () => {
  const context = useContext(TagDataContext);

  if (!context) {
    throw new Error('useTagDataContext must be used within a TagDataContextProvider');
  }

  return context;
};