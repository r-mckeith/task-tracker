import { TagProps } from "../types/TagTypes";
export type Action =
  | { type: 'INITIALIZE_TAGS'; payload: TagProps[] }
  | { type: 'DELETE_TAG'; id: number }
  | { type: 'ADD_TAG'; payload: TagProps }
  | { type: 'UPDATE_TAG'; payload: TagProps}

export const initialState = {
  tags: [],
};

export function tagReducer (state: TagProps[], action: Action): TagProps[] {
  switch (action.type) {
    case 'INITIALIZE_TAGS':
      return action.payload;
    case 'ADD_TAG':
      return [...state, action.payload];
    case 'DELETE_TAG':
      return state.filter((tag) => tag.id !== action.id);
    case 'UPDATE_TAG':
      return state.map((tag) => tag.id ===action.payload.id ? action.payload : tag);
    default:
      return state;
  }
};
