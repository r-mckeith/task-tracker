import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useTaskContext } from '../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import TaskContainer from '../components/task/TaskContainer';
import ReviewContainer from '../components/review/ReviewContainer';
import Header from '../components/Header';
import AddTask from '../components/task/AddTask';
import { useFilteredTasks } from '../src/hooks/useFilteredTasks';

type SegmentedControlChangeEvent = {
  nativeEvent: {
    selectedSegmentIndex: number;
  };
};

type ScopeType = 'week' | 'day' | 'month';

export default function MonthlyScreen() {
  const { state: tasks } = useTaskContext();
  const { selectedDate, setSelectedDate } = useDateContext();
  const [selectedScope, setSelectedScope] = useState<ScopeType>('month');
  const [isReviewMode, setIsReviewMode] = useState(false);

  const filteredTasks = useFilteredTasks(tasks, selectedDate, selectedScope);

  function handleScopeChange(e: SegmentedControlChangeEvent) {
    const index = e.nativeEvent.selectedSegmentIndex;
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
    </View>
    <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={toggleReviewMode}>
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
