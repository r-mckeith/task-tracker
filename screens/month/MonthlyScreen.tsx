import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { isInSelectedMonth, isInSelectedWeek, isSelectedDate } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import ReviewContainer from '../../components/review/ReviewContainer';
import Header from '../../components/Header';
import AddTask from '../../components/task/AddTask';

type SegmentedControlChangeEvent = {
  nativeEvent: {
    selectedSegmentIndex: number;
  };
};

export default function MonthlyScreen() {
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { selectedDate, setSelectedDate } = useDateContext();
  const [selectedScope, setSelectedScope] = useState('month');
  const [isReviewMode, setIsReviewMode] = useState(false);

  useEffect(() => {
    let scopeTasks;
    switch (selectedScope) {
      case 'week':
        scopeTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)));
        break;
      case 'day':
        scopeTasks = tasks.filter((t) => (isTaskForSelectedDate(t) || isTaskRecurring(t)));
        break;
      case 'month':
      default:
        scopeTasks = tasks.filter((t) => (isTaskForSelectedMonth(t) || isTaskRecurring(t)));
        break;
    }
    setFilteredTasks(scopeTasks);
  }, [tasks, selectedDate, selectedScope]);

  function isTaskForSelectedMonth(task: TaskInterface) {
    return task.inScopeMonth && isInSelectedMonth(task.inScopeMonth, selectedDate);
  }

  function isTaskForSelectedWeek(task: TaskInterface) {
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  }

  function isTaskForSelectedDate(task: TaskInterface) {
    return task.inScopeDay && isSelectedDate(task.inScopeDay, selectedDate);
  }

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  function handleScopeChange(e: SegmentedControlChangeEvent) {
    const index = e.nativeEvent.selectedSegmentIndex;
    let newScope;
    switch (index) {
      case 1:
        setSelectedScope('week');
        break;
      case 2:
        setSelectedScope('day');
        break;
      case 0:
      default:
        setSelectedScope('month');
        break;
    }
  };

  function toggleReviewMode() {
    setIsReviewMode(prevMode => !prevMode);
  };

  function showAddNewGoalButton() {
    return selectedScope === 'month'
  }

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <SegmentedControl
        values={['Month', 'Week', 'Day']}
        selectedIndex={0}
        onChange={handleScopeChange}
      />
      {showAddNewGoalButton() && (
        <AddTask parentId={0} depth={0}/>
      )}
      <View style={styles.container}>
      {isReviewMode ? (
          <ReviewContainer 
            tasks={filteredTasks}
          />
        ) : (
          <TaskContainer
            tasks={filteredTasks}
            filter={selectedScope}
          />
        )}
      {/* {showAddNewGoalButton() && (
        <AddTask parentId={0} depth={0} variant={'button'}/>
      )} */}
    </View>
    <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => toggleReviewMode()}>
            <Text style={styles.addButtonText}>{isReviewMode ? 'Done' : 'Review'}</Text>
          </TouchableOpacity>
        </View>
    </>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addButtonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFCCCB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
