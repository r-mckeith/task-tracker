import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTags } from '../../api/SupabaseTags';
import { TagContext } from './TagContext';
import { tagReducer } from '../../reducers/TagReducer';
import { DateRange } from '../../types/TagTypes';


interface TagContextProviderProps {
  children: ReactNode;
}

const TagContextProvider = ({ children }: TagContextProviderProps) => {
  const [tags, dispatchTags] = useReducer(tagReducer, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      dispatchTags({ type: 'INITIALIZE_TAGS', payload: tags });
    };

    fetchTags();
  }, []);

  return (
    <TagContext.Provider value={{ tags, dispatch: { tags: dispatchTags } }}>
      {children}
    </TagContext.Provider>
  );
};


export default TagContextProvider;

