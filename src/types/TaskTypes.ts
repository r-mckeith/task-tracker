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
  completed?: boolean;
  recurringOptions?: RecurringOptions;
  depth: number;
  inScopeDay?: boolean | null;
  inScopeWeek?: boolean | null;
  inScopeQuarter?: boolean | null;
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
  inScopeQuarter?: Date | null;
  inScopeDay?: Date | null;
  inScopeWeek?: Date | null;
}

// Complete Task Interface
export interface TaskInterface extends NewTask {
  id: number;
  created_at: string;
  scope: Scope;
  currentTab?: string;
  completed?: boolean;
}

// Scope Definition
export interface Scope {
  inScopeDay: string | number | Date;
  inScopeWeek: string | number | Date;
  inScopeQuarter: string | number | Date;
}

// Add Task Props
export interface AddTaskProps {
  parentId: number;
  depth: number;
  currentTab?: string;
}
