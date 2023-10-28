import { TagDataProps } from "../types/TagTypes";
export type Action =
  | { type: 'INITIALIZE'; payload: TagDataProps[] }

export const initialState = {
  tagData: [],
};


export function tagDataReducer(state: TagDataProps[], action: Action) {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    default:
      return state;
  }
};
