import React, { useReducer, ReactNode } from 'react';
import getNotes from '../api/getNotes';
import { NoteContext } from './NoteContext';
import { NoteReducer } from '../reducers/NoteReducer';

interface NoteContextProviderProps {
  children: ReactNode;
}

const NoteContextProvider: React.FC<NoteContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(NoteReducer, getNotes());

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;