import { isSelectedDate } from "../../helpers/dateHelpers";
import { TagProps } from "../types/TagTypes";

export type Action =
  | { type: 'INITIALIZE_TAGS'; payload: TagProps[] }
  | { type: 'DELETE_TAG'; id: number }
  | { type: 'ADD_TAG'; payload: TagProps }
  | { type: 'ADD_LIST_TAG'; payload: any }
  | { type: 'UPDATE_TAG'; payload: TagProps}
  | { type: 'TOGGLE_SCOPE'; id: number; selectedDate: string }
  | { type: 'TOGGLE_COMPLETED'; id: number; selectedDate: any }
  | { type: 'SELECT_TAG'; payload: TagProps}

export const initialState = {
  tags: [],
};

const updateScope = (
  state: TagProps[],
  action: { id: number; selectedDate: string }
): TagProps[] => {
  return state.map(tag => {
    if (tag.id === action.id) {
      const newScopeDay = (tag.inScopeDay === action.selectedDate) ? null : action.selectedDate;
      return { ...tag, inScopeDay: newScopeDay };
    }
    return tag;
  });
};

const toggleCompleted = (
  state: TagProps[],
  action: { id: number, selectedDate: any }
): TagProps[] => {
  const dateFormatted = action.selectedDate.toISOString().split('T')[0];
  return state.map((tag) => {
    if (tag.id === action.id) {
      if (tag.completed) {
        return { ...tag, completed: null };
      } else {
        return { ...tag, completed: dateFormatted };
      }
    } else {
      return tag;
    }
  });
}

export function tagReducer (state: TagProps[], action: Action): TagProps[] {
  switch (action.type) {
    case 'INITIALIZE_TAGS':
      return action.payload;
    case 'ADD_TAG':
      return [...state, action.payload];
    case 'ADD_LIST_TAG':
      return [...state, action.payload];
    case 'DELETE_TAG':
      return state.filter((tag) => tag.id !== action.id);
    case 'UPDATE_TAG':
      return state.map((tag) => tag.id ===action.payload.id ? action.payload : tag);
    case 'TOGGLE_SCOPE':
      return updateScope(state, action);
    case 'TOGGLE_COMPLETED':
      return toggleCompleted(state, action);
    case 'SELECT_TAG':
      return state.map(tag => {
        if (tag.id === action.payload.tag_data?.[0]?.tag_id) {
          return {
            ...tag,
            tag_data: [...tag.tag_data, action.payload.tag_data[0]]
          };
        }
        return tag;
      });
    default:
      return state;
  }
};
