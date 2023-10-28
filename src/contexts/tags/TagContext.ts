import React from 'react';
import { Action } from '../../reducers/TagReducer';
import { TagProps, TagDataProps } from '../../types/TagTypes';

interface TagState {
  state: TagProps[];
  dispatch: React.Dispatch<any>;
}

export interface TagContextType {
  tags: TagProps[];
  tagData: TagDataProps[];
  dispatch: React.Dispatch<Action>;
}

export const TagContext = React.createContext<TagContextType | undefined>(undefined);
