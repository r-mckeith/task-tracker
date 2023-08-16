import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInCurrentMonth } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/reviews/ReviewContainer';

export default function ReviewQuarterScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForThisMonth(task: TaskInterface) {
    return task.inScopeQuarter && isInCurrentMonth(task.inScopeQuarter);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring
  }

  useEffect(() => {
    const monthlyTasks = tasks.filter((t) => isTaskForThisMonth(t) || isTaskRecurring(t));
    setFilteredTasks(monthlyTasks);
  }, [tasks]);

  return (
    <ReviewContainer tasks={filteredTasks} />
  );
}

