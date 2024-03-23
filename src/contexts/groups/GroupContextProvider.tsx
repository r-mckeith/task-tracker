import React, { useEffect, useReducer, ReactNode } from 'react';
import { getGroups } from '../../api/SupabaseGroups';
import { GroupContext } from './GroupContext';
import { groupReducer } from '../../reducers/GroupReducer';

interface GroupContextProviderProps {
  children: ReactNode;
}

const GroupContextProvider = ({ children }: GroupContextProviderProps) => {
  const [groups, dispatch] = useReducer(groupReducer, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getGroups();
      dispatch({ type: 'INITIALIZE_GROUPS', payload: groups });
    };

    fetchGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ groups, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
};


export default GroupContextProvider;