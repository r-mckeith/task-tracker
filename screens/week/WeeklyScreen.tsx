import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { isInSelectedWeek } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import Header from '../../components/Header';

export default function WeeklyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { selectedDate, setSelectedDate } = useDateContext();


  function isTaskForSelectedWeek(task: TaskInterface) {
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  }

  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
    setFilteredTasks(weeklyTasks);
  }, [tasks, selectedDate]);

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <TaskContainer
        tasks={filteredTasks}
        navigateToAdd="ScopeWeek"
      />
    </>
  );
}
