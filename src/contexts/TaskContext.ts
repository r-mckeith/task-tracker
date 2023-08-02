import React, { createContext, useReducer } from 'react';
import { TaskInterface } from '../types/TaskTypes';
import { Action } from '../reducers/TaskReducer';
import { taskReducer } from '../reducers/TaskReducer';

interface TaskState {
  state: TaskInterface[];
  dispatch: React.Dispatch<any>;
}

type TaskContextProps = {
  state: TaskInterface[];
  dispatch: React.Dispatch<any>; // Replace "any" with your action types
};

export interface TaskContextType {
  state: TaskInterface[];
  dispatch: React.Dispatch<Action>;
}

export const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

