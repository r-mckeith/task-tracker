import React, { useEffect, useReducer, ReactNode } from 'react';
import { getNotes } from '../../api/SupabaseNotes';
import { NoteContext } from './NoteContext';
import { NoteReducer } from '../../reducers/NoteReducer';

interface NoteContextProviderProps {
  children: ReactNode;
}

const NoteContextProvider: React.FC<NoteContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(NoteReducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getNotes();
      dispatch({ type: 'INITIALIZE', payload: tasks });
    };

    fetchTasks();
  }, []);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;