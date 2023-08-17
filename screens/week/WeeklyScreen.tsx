import React, { useState, useEffect } from 'react';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { isInSelectedWeek } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import HeaderNew from '../../components/HeaderNew';

export default function WeeklyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function isTaskForSelectedWeek(task: TaskInterface) {
    console.log(task.name, task.inScopeWeek, task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate))
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  }

  function isTaskCompleted(task: TaskInterface) {
    return task.completed;
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    console.log("Tasks or selectedDate has changed");
    const weeklyTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
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
      <TaskContainer
        tasks={filteredTasks}
        navigateToAdd="ScopeWeek"
        navigateToReview="ReviewWeek"
      />
    </>
  );
}


// import React, { useState, useEffect } from 'react';
// import { TaskInterface } from '../../src/types/TaskTypes';
// import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
// import { isInSelectedWeek } from '../../helpers/dateHelpers';
// import TaskContainer from '../../components/task/TaskContainer'



// export default function WeeklyScreen() {
//   const { state: tasks } = useTaskContext();
//   const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

//   function isTaskForThisWeek(task: TaskInterface) {
//     return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek);
//   }
  
//   function isTaskCompleted(task: TaskInterface) {
//     return task.completed;
//   }

//   function isTaskRecurring(task: TaskInterface) {
//     return task.recurringOptions && task.recurringOptions.isRecurring
//   }

//   useEffect(() => {
//     const weeklyTasks = tasks.filter((t) => (isTaskForThisWeek(t) || isTaskRecurring(t)) && !isTaskCompleted(t));
//     setFilteredTasks(weeklyTasks);
//   }, [tasks]);

//   return (
//     <TaskContainer
//       tasks={filteredTasks}
//       navigateToAdd="ScopeWeek"
//       navigateToReview="ReviewWeek"
//     />
//   );
// }
