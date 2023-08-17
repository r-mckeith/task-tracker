import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedMonth } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import HeaderNew from '../../components/HeaderNew'; // Import the Header

export default function QuarterlyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedMonth(task: TaskInterface) {
    return task.inScopeQuarter && isInSelectedMonth(task.inScopeQuarter, selectedDate);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const quarterlyTasks = tasks.filter((t) => isTaskForSelectedMonth(t) || isTaskRecurring(t));
    setFilteredTasks(quarterlyTasks);
  }, [tasks, selectedDate]);

  return (
    <>
      <HeaderNew
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <ReviewContainer tasks={filteredTasks} />
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import { TaskInterface } from '../../src/types/TaskTypes';
// import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
// import { isInCurrentMonth } from '../../helpers/dateHelpers';
// import ReviewContainer from '../../components/reviews/ReviewContainer';

// export default function ReviewQuarterScreen() {
//   const { state: tasks } = useTaskContext();
//   const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

//   function isTaskForThisMonth(task: TaskInterface) {
//     return task.inScopeQuarter && isInCurrentMonth(task.inScopeQuarter);
//   }

//   function isTaskRecurring(task: TaskInterface) {
//     return task.recurringOptions && task.recurringOptions.isRecurring
//   }

//   useEffect(() => {
//     const monthlyTasks = tasks.filter((t) => isTaskForThisMonth(t) || isTaskRecurring(t));
//     setFilteredTasks(monthlyTasks);
//   }, [tasks]);

//   return (
//     <ReviewContainer tasks={filteredTasks} />
//   );
// }

