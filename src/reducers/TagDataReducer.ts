import { TagDataProps } from "../types/TagTypes";

export type TagDataAction = 
  | { type: 'INITIALIZE_TAG_DATA', payload: TagDataProps[] }

export const tagDataReducer = (state: TagDataProps[], action: TagDataAction): TagDataProps[] => {
  switch(action.type) {
    case 'INITIALIZE_TAG_DATA':
      return action.payload;
    default:
      return state;
  }
};
