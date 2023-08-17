import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { stripTimeFromDate } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import HeaderNew from '../../components/HeaderNew';

export default function DailyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  function isTaskForSelectedDate(task: TaskInterface) {
    if (task.inScopeDay) {
        const taskDateStripped = stripTimeFromDate(new Date(task.inScopeDay));
        const selectedDateStripped = stripTimeFromDate(selectedDate);
        return taskDateStripped.getTime() === selectedDateStripped.getTime();
    }
    return false;
}

  useEffect(() => {
    console.log("Tasks or selectedDate has changed");
    const dailyTasks = tasks.filter((t) => isTaskForSelectedDate(t) || isTaskRecurring(t));
    console.log("Number of tasks after filter: ", dailyTasks.length);
    setFilteredTasks(dailyTasks);
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
        navigateToAdd="ScopeDay"
        navigateToReview="ReviewDay"
      />
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import { TaskInterface } from '../../src/types/TaskTypes';
// import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
// import { todayFormatted } from '../../helpers/dateHelpers';
// import ReviewContainer from '../../components/reviews/ReviewContainer';

// export default function ReviewDayScreen() {
//   const { state: tasks } = useTaskContext();
//   const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

//   function isTaskForToday(task: TaskInterface) {
//     return task.inScopeDay && task.inScopeDay.toString() === todayFormatted;
//   }

//   function isTaskRecurring(task: TaskInterface) {
//     return task.recurringOptions && task.recurringOptions.isRecurring
//   }

//   useEffect(() => {
//     const dailyTasks = tasks.filter((t) => isTaskForToday(t) || isTaskRecurring(t));
//     setFilteredTasks(dailyTasks);
//   }, [tasks]);

//   return (
//     <ReviewContainer tasks={filteredTasks} />
//   );
// }