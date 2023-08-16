import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInCurrentWeek } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer'



export default function WeeklyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => isInCurrentWeek(t.inScopeWeek));
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
