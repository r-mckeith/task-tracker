import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import TaskScreen from '../../components/task/TaskScreen'

export default function DailyScreen() {
  const filterTasks = (tasks: TaskInterface[]) => tasks.filter((t) => t.inScopeDay);

  return (
    <TaskScreen
      filterTasks={filterTasks}
      navigateToAdd="ScopeDay"
      navigateToReview="ReviewDay"
    />
  );
}

