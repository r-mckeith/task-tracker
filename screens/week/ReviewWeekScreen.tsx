import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedWeek } from '../../helpers/dateHelpers';
import ReviewContainer from '../../components/reviews/ReviewContainer';
import HeaderNew from '../../components/HeaderNew';

export default function WeeklyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedWeek(task: TaskInterface) {
    console.log(task.name, task.inScopeWeek, task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate))
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    console.log("Tasks or selectedDate has changed");
    const weeklyTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)));
    console.log("Number of tasks after filter: ", weeklyTasks.length);
    setFilteredTasks(weeklyTasks);
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
// import { isInCurrentWeek } from '../../helpers/dateHelpers';
// import ReviewContainer from '../../components/reviews/ReviewContainer';

// export default function ReviewWeekScreen() {
//   const { state: tasks } = useTaskContext();
//   const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

//   function isTaskForThisWeek(task: TaskInterface) {
//     return task.inScopeWeek && isInCurrentWeek(task.inScopeWeek);
//   }

//   function isTaskRecurring(task: TaskInterface) {
//     return task.recurringOptions && task.recurringOptions.isRecurring
//   }

//   useEffect(() => {
//     const weeklyTasks = tasks.filter((t) => isTaskForThisWeek(t) || isTaskRecurring(t));
//     setFilteredTasks(weeklyTasks);
//   }, [tasks]);

//   return (
//     <ReviewContainer tasks={filteredTasks} />
//   );
// }
