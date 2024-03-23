import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTagData } from '../../api/SupabaseTags';
import { TagDataContext } from './TagDataContext';
import { tagDataReducer } from '../../reducers/TagDataReducer';
import { DateRange } from '../../types/TagTypes';
import { useDateContext } from '../date/useDateContext';

interface TagDataContextProviderProps {
  children: ReactNode;
}

const TagDataContextProvider = ({ children }: TagDataContextProviderProps) => {
  const [tagData, dispatchTagData] = useReducer(tagDataReducer, []);
  const { selectedDate } = useDateContext();


  useEffect(() => {
    const fetchTagData = async () => {
      const tagData = await getTagData(DateRange.Today, selectedDate);
      dispatchTagData({ type: 'INITIALIZE_TAG_DATA', payload: tagData });
    };

    fetchTagData();
  }, []);

  return (
    <TagDataContext.Provider value={{ tagData, dispatch: dispatchTagData }}>
      {children}
    </TagDataContext.Provider>
  );
};

export default TagDataContextProvider;
