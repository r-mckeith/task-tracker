export interface TaskDataInterface {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurringOptions: {
    isRecurring: boolean | null;
    selectedDays: string | null;
    timesPerDay: string | null;
  };
  depth: number;
  inScopeDay?: boolean | null;
  inScopeWeek?: boolean | null;
}

export interface TaskInterface extends TaskDataInterface {
  planningScreen?: boolean;
  onPress?: () => void;
  onToggleCompleted?: (id: number) => void;
  onToggleScope?: (id: number) => void;
  onDelete?: (id: number) => void;
  subTasks?: any;
  onAddSubTask?: (name: string, parentId: number, recurringOptions: {isRecurring: boolean, selectedDays: string, timesPerDay: string}) => void;
}