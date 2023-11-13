import React from 'react';
import { Action } from '../../reducers/TagDataReducer';
import { TagDataProps } from '../../types/TagTypes';

export interface TagDataContextType {
  tagData: TagDataProps[];
  dispatch: React.Dispatch<Action>;
}

export const TagDataContext = React.createContext<TagDataContextType | undefined>(undefined);

