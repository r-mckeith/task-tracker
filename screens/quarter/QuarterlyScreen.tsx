import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedMonth } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import HeaderNew from '../../components/HeaderNew'; // Import the Header

export default function QuarterlyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedMonth(task: TaskInterface) {
    return task.inScopeQuarter && isInSelectedMonth(task.inScopeQuarter, selectedDate);
  }

  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const quarterlyTasks = tasks.filter((t) => (isTaskForSelectedMonth(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
    setFilteredTasks(quarterlyTasks);
  }, [tasks, selectedDate]);

  return (
    <>
      <HeaderNew
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <TaskContainer
        tasks={filteredTasks}
        navigateToAdd="ScopeQuarter"
        navigateToReview="ReviewQuarter"
      />
    </>
  );
}
