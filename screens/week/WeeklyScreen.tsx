import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInCurrentWeek } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer'



export default function WeeklyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForThisWeek(task: TaskInterface) {
    return task.inScopeWeek && isInCurrentWeek(task.inScopeWeek);
  }
  
  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring
  }

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => (isTaskForThisWeek(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
    setFilteredTasks(weeklyTasks);
  }, [tasks]);

  return (
    <TaskContainer
      tasks={filteredTasks}
      navigateToAdd="ScopeWeek"
      navigateToReview="ReviewWeek"
    />
  );
}
