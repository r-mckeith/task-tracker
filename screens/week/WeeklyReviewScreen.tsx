import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedWeek } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/review/ReviewContainer';
import Header from '../../components/Header';

export default function WeeklyReviewScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedWeek(task: TaskInterface) {
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)));
    setFilteredTasks(weeklyTasks);
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