import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTagsWithTodayData } from '../../api/SupabaseTags';
import { TagContext } from './TagContext';
import { tagReducer } from '../../reducers/TagReducer';
import { tagDataReducer } from '../../reducers/TagDataReducer';


interface TagContextProviderProps {
  children: ReactNode;
}

const TagContextProvider = ({ children }: TagContextProviderProps) => {
  const [tags, dispatchTags] = useReducer(tagReducer, []);
  const [tagData, dispatchTagData] = useReducer(tagDataReducer, []);

  useEffect(() => {
    const fetchTags = async () => {
      const { tags, tagData } = await getTagsWithTodayData();
      dispatchTags({ type: 'INITIALIZE_TAGS', payload: tags });
      dispatchTagData({ type: 'INITIALIZE_TAG_DATA', payload: tagData });
    };

    fetchTags();
  }, []);

  return (
    <TagContext.Provider value={{ tags, tagData, dispatch: { tags: dispatchTags, tagData: dispatchTagData } }}>
      {children}
    </TagContext.Provider>
  );
};


export default TagContextProvider;
