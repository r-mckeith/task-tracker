import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { todayFormatted } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/reviews/ReviewContainer';

export default function ReviewDayScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForToday(task: TaskInterface) {
    return task.inScopeDay && task.inScopeDay.toString() === todayFormatted;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring
  }

  useEffect(() => {
    const dailyTasks = tasks.filter((t) => isTaskForToday(t) || isTaskRecurring(t));
    setFilteredTasks(dailyTasks);
  }, [tasks]);

  return (
    <ReviewContainer tasks={filteredTasks} />
  );
}