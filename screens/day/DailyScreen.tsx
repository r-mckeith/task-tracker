import React from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import TaskScreen from '../../components/task/TaskScreen';
import { todayFormatted } from '../../helpers/taskHelpers';

export default function DailyScreen() {
  const filterTasks = (tasks: TaskInterface[]) => tasks.filter((t) => t.inScopeDay && t.inScopeDay.toString() === todayFormatted && !t.completed);

  return (
    <TaskScreen
      filterTasks={filterTasks}
      navigateToAdd="ScopeDay"
      navigateToReview="ReviewDay"
    />
  );
}

