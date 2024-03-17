import React from 'react';
import { Action } from '../../reducers/TagReducer';
import { TagProps } from '../../types/TagTypes';


export interface TagContextType {
  tags: TagProps[];
  dispatch: React.Dispatch<Action>;
}

export const TagContext = React.createContext<TagContextType | undefined>(undefined);

