// customHooks.ts
import { useState, useEffect } from 'react';
import { isInSelectedMonth, isInSelectedWeek, isSelectedDate } from '../../helpers/dateHelpers';

type ScopeType = 'month' | 'week' | 'day';

export function useFilteredTasks(tasks: any, selectedDate: Date, selectedScope: ScopeType): any {
  const [filteredTasks, setFilteredTasks] = useState<any>([]);

  const isTaskForSelectedScope = (task: any, scope: ScopeType, selectedDate: Date): boolean => {
    const scopeCheckers = {
      month: isInSelectedMonth,
      week: isInSelectedWeek,
      day: isSelectedDate
    };
    
    const checkScope = scopeCheckers[scope];
    
    if (!checkScope) return false;
  
    const scopeValue = task[`inScope${capitalize(scope)}` as keyof any];
  
    if (typeof scopeValue === "string") {
      return checkScope(new Date(scopeValue), selectedDate);
    } else if (scopeValue instanceof Date) {
      return checkScope(scopeValue, selectedDate);
    }
    
    return false;
  }
  
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  useEffect(() => {
    const scopeTasks = tasks.filter(task => isTaskForSelectedScope(task, selectedScope, selectedDate));
    setFilteredTasks(scopeTasks);
  }, [tasks, selectedDate, selectedScope]);

  return filteredTasks;
}
