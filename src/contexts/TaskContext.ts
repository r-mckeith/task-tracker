import React from 'react';
import { TaskInterface } from '../types/TaskTypes';
import { Action } from '../reducers/TaskReducer';

interface TaskState {
  state: TaskInterface[];
  dispatch: React.Dispatch<any>;
}

export interface TaskContextType {
  state: TaskInterface[];
  dispatch: React.Dispatch<Action>;
}

export const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

