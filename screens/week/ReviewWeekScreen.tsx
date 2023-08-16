import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInCurrentWeek } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/reviews/ReviewContainer';

export default function ReviewWeekScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForThisWeek(task: TaskInterface) {
    return task.inScopeWeek && isInCurrentWeek(task.inScopeWeek);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring
  }

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => isTaskForThisWeek(t) || isTaskRecurring(t));
    setFilteredTasks(weeklyTasks);
  }, [tasks]);

  return (
    <ReviewContainer tasks={filteredTasks} />
  );
}
