import React from 'react';
import { Action } from '../../reducers/TagReducer';
import { TagDataAction } from '../../reducers/TagDataReducer';

import { TagProps, TagDataProps } from '../../types/TagTypes';

interface TagState {
  state: TagProps[];
  dispatch: React.Dispatch<any>;
}

export interface TagContextType {
  tags: TagProps[];
  tagData: TagDataProps[];
  dispatch: {
    tags: React.Dispatch<Action>;
    tagData: React.Dispatch<TagDataAction>;
  };
}

export const TagContext = React.createContext<TagContextType | undefined>(undefined);

