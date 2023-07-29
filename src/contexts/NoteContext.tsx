import React from 'react';
import { NoteInterface } from '../types/NoteTypes';
import { Action } from '../reducers/NoteReducer';

interface NoteState {
  state: NoteInterface[];
  dispatch: React.Dispatch<any>;
}

export interface NoteContextType {
  state: NoteInterface[];
  dispatch: React.Dispatch<Action>;
}

export const NoteContext = React.createContext<NoteContextType | undefined>(undefined);
