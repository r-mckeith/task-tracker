import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInCurrentMonth } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer'

export default function QuarterlyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  function isTaskForThisMonth(task: TaskInterface) {
    return isInCurrentMonth(task.inScopeQuarter)
  }
  
  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  useEffect(() => {
    const quarterlyTasks = tasks.filter((t) => isTaskForThisMonth(t) && !isTaskCompleted(t));
    setFilteredTasks(quarterlyTasks);
  }, [tasks]);

  return (
    <TaskContainer
      tasks={filteredTasks}
      navigateToAdd="ScopeQuarter"
      navigateToReview="ReviewQuarter"
    />
  );
}