import { NoteInterface } from "../types/NoteTypes";

export type Action =
  | { type: 'INITIALIZE'; payload: NoteInterface[] }
  | { type: 'ADD_NOTE'; payload: { text: string, taskId: number }}
  | { type: 'DELETE_NOTE'; id: number }
  | { type: 'UPDATE_NOTE'; payload: {id: number, text: string, taskId: number }}

export const NoteReducer = (state: NoteInterface[], action: Action): NoteInterface[] => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.id);
    case 'UPDATE_NOTE':
      return state.map((note) => note.id ===action.payload.id ? action.payload : note);
    default:
      return state;
  }
};