import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTags } from '../../api/SupabaseTags';
import { TagContext } from './TagContext';
import { tagReducer } from '../../reducers/TagReducer';

interface TagContextProviderProps {
  children: ReactNode;
}

const TagContextProvider = ({ children }: TagContextProviderProps) => {
  const [tags, dispatch] = useReducer(tagReducer, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      dispatch({ type: 'INITIALIZE_TAGS', payload: tags });
    };

    fetchTags();
  }, []);

  return (
    <TagContext.Provider value={{ tags, dispatch }}>
      {children}
    </TagContext.Provider>
  );
};


export default TagContextProvider;

