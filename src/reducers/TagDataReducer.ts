import { TagDataProps } from "../types/TagTypes";

export type Action = 
  | { type: 'INITIALIZE_TAG_DATA', payload: TagDataProps[] }
  | { type: 'ADD_TAG_DATA', payload: TagDataProps }
  | { type: 'UPDATE_TAG_DATA', payload: TagDataProps }; // New action type

  export const tagDataReducer = (state: TagDataProps[], action: Action): TagDataProps[] => {
    switch(action.type) {
      case 'INITIALIZE_TAG_DATA':
        return action.payload;
      case 'ADD_TAG_DATA':
      case 'UPDATE_TAG_DATA':
        const existingIndex = state.findIndex(item => item.tag_id === action.payload.tag_id);
        if (existingIndex >= 0) {
          // Update the existing tag data
          const updatedState = [...state];
          updatedState[existingIndex] = { ...state[existingIndex], ...action.payload };
          return updatedState;
        } else {
          // Add new tag data
          return [...state, action.payload];
        }
      default:
        return state;
    }
  };
  
