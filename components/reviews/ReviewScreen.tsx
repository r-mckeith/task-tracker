import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import styles from '../../styles/screens/reviewDayScreen'
import NestedList from '../list/NestedList';
import ReviewModal from './ReviewModal';
import Header from '../Header';
import { addNote } from '../../src/api/SupabaseNotes';
import { handleToggleCompleted, handleDelete, handlePushTaskForDay, handleToggleScopeforDay } from '../../helpers/taskHelpers';

type ReviewComponentProps = {
  timeFrame: 'day' | 'week' | 'quarter';
  navigation: StackNavigationProp<DoStackParamList>;
};

const ReviewComponent: React.FC<ReviewComponentProps> = ({ timeFrame, navigation }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TaskInterface[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);

  const { state, dispatch } = useTaskContext();

  const reversedIncompleteTasks = [...incompleteTasks].reverse();

  useEffect(() => {
    let tasks;
    switch (timeFrame) {
      case 'day':
        tasks = state.filter(t => t.inScopeDay);
        break;
      case 'week':
        tasks = state.filter(t => t.inScopeWeek);
        break;
      case 'quarter':
        tasks = state.filter(t => t.inScopeQuarter);
        break;
    }

    const incomplete = tasks.filter(t => !t.completed);
    setFilteredTasks(tasks);
    setIncompleteTasks(incomplete);
  
    if (incomplete.length === 0) {
      setShowModal(false);
    }
  }, [state, timeFrame]);

   const handleComplete = (task: TaskInterface) => {
    handleToggleCompleted(task.id, task.completed, state, dispatch);
    moveToNextTask();
  };

  const handleDeleteTask = (task: TaskInterface) => {
    handleDelete(task.id, state, dispatch);
    moveToNextTask();
  };

  const handleToggleScope = (task: TaskInterface) => {
    handleToggleScopeforDay(task.id, task.inScopeDay, filteredTasks, dispatch);
    moveToNextTask();
  }
  
  const handlePushTask = async (id: number, completed: Date | null) => {
    await handlePushTaskForDay(id, completed, state, dispatch);
  };

  const handleAddNote = async (noteText: string, taskId: number) => {
    const newNote = { text: noteText, taskId };

    try {
      await addNote(newNote);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const moveToNextTask = () => {
    if (currentTaskIndex < reversedIncompleteTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} />
        </View>
      }
       <ReviewModal
        visible={showModal}
        task={reversedIncompleteTasks[currentTaskIndex]}
        onComplete={handleComplete}
        onDelete={handleDeleteTask}
        onToggleScope={handleToggleScope}
        onPushTask={handlePushTask}
        onAddNote={handleAddNote}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewComponent;