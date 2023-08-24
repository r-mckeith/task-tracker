import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../../src/contexts/date/useDateContext'
import { isSelectedDate } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import Header from '../../components/Header';

export default function DailyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { selectedDate, setSelectedDate } = useDateContext();
  
  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  function isTaskForSelectedDate(task: TaskInterface) {
    return task.inScopeDay && isSelectedDate(task.inScopeDay, selectedDate);
  }

  useEffect(() => {
    const dailyTasks = tasks.filter((t) => (isTaskForSelectedDate(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
    setFilteredTasks(dailyTasks);
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
        navigateToAdd="ScopeDay"
      />
    </>
  );
}
