// Scope Options
export interface RecurringOptions {
  isRecurring?: boolean | null;
  selectedDays?: string | null;
  timesPerDay?: string | null;
}

// Main Task Data
export interface TaskData {
  id: number;
  name?: string;
  parentId?: number | null;
  completed?: Date | null;
  recurringOptions?: RecurringOptions;
  depth: number;
  inScopeDay: Date | string | null;
  inScopeWeek: Date | string | null;
  inScopeQuarter?: boolean | string | null;
}

// For Task Props
export interface TaskProps extends TaskData {
  onAddTask?: (name: string, parentId: number, recurringOptions: RecurringOptions) => void;
  onAddNote?: (id: number, text: string, taskIdId: number) => void;
}

// For New Task
export interface NewTask {
  name: string;
  parentId: number;
  depth: number;
  userId: string;
  recurringOptions: RecurringOptions;
  inScopeQuarter: Date | string | null;
  inScopeDay: Date | string | null;
  inScopeWeek: Date | string | null;
}

// Complete Task Interface
export interface TaskInterface extends NewTask {
  id: number;
  created_at: string;
  scope: Scope;
  completed: Date | null;
}

// Scope Definition
export interface Scope {
  inScopeDay: Date | string | null;
  inScopeWeek: Date | string | null;
  inScopeQuarter: Date | string | null;
}

// Add Task Props
export interface AddTaskProps {
  parentId: number;
  depth: number;
}

// Review Actions
export type Action = {
  name: string;
  size: number;
  color: string;
  actionType: ActionType;
  onPress: () => void;
};

export type ActionType = 'delete' | 'complete' | 'push' | 'scope';


