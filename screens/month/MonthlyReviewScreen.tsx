import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedMonth } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/review/ReviewContainer';
import Header from '../../components/Header';

export default function MonthlyReviewScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedMonth(task: TaskInterface) {
    return task.inScopeMonth && isInSelectedMonth(task.inScopeMonth, selectedDate);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const monthlyTasks = tasks.filter((t) => isTaskForSelectedMonth(t) || isTaskRecurring(t));
    setFilteredTasks(monthlyTasks);
  }, [tasks, selectedDate]);

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <ReviewContainer tasks={filteredTasks} />
    </>
  );
}

