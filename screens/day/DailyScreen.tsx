import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { todayFormatted } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer'

export default function DailyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForToday(task: TaskInterface) {
    return task.inScopeDay && task.inScopeDay.toString() === todayFormatted;
  }
  
  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring
  }

  useEffect(() => {
    const dailyTasks = tasks.filter((t) => (isTaskForToday(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
    setFilteredTasks(dailyTasks);
  }, [tasks]);

  return (
    <TaskContainer
      tasks={filteredTasks}
      navigateToAdd="ScopeDay"
      navigateToReview="ReviewDay"
    />
  );
}
