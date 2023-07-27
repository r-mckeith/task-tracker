export interface TaskInterface {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  depth: number;
  recurringOptions: {
    isRecurring: boolean | null, 
    selectedDays: string | null, 
    timesPerDay: string | null
  }
  planningScreen: boolean;
  onPress: () => void;
  onAddSubTask: (
    name: string, 
    parentId: number, 
    recurringOptions: {
      isRecurring: boolean | null, 
      selectedDays: string | null, 
      timesPerDay: string | null
    }) => void;
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  inScopeWeek: boolean;
  inScopeDay: boolean;
  tasks?: TaskDataInterface[];
  toggleInScopeWeek?: (id: number) => void;
  toggleInScopeDay?: (id: number) => void;
}

export interface TaskDataInterface {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  depth: number;
  inScopeDay: boolean;
  inScopeWeek: boolean;
}