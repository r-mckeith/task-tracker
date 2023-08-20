import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import styles from '../../styles/screens/reviewDayScreen'
import NestedList from '../NestedList';
import ReviewModal from './ReviewModal';
import { addNote } from '../../src/api/SupabaseNotes';
import { handleToggleCompleted, handleDelete, handlePushTaskForDay, handleToggleScopeforDay } from '../../helpers/taskHelpers';

type ReviewContainerProps = {
  tasks: TaskInterface[];
};

const ReviewContainer: React.FC<ReviewContainerProps> = ({tasks }) => {
  const [incompleteTasks, setIncompleteTasks] = useState<TaskInterface[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskInterface | null>(null);


  const { dispatch } = useTaskContext();

  const reversedIncompleteTasks = [...incompleteTasks].reverse();

  useEffect(() => {
    const incomplete = tasks.filter(t => !t.completed);
    setIncompleteTasks(incomplete);
  
    if (incomplete.length === 0) {
      setShowModal(false);
    }
    setCurrentTask(incomplete[incomplete.length - 1]);
  }, [tasks]);
  

  const handleDoneButtonPress = () => {
    if (incompleteTasks.length > 0) {
      setShowModal(true);
    }
  };

   const handleComplete = (task: TaskInterface) => {
    handleToggleCompleted(task.id, task.completed, tasks, dispatch);
    moveToNextTask();
  };

  const handleDeleteTask = (task: TaskInterface) => {
    handleDelete(task.id, tasks, dispatch);
    moveToNextTask();
  };

  const handleToggleScope = (task: TaskInterface) => {
    handleToggleScopeforDay(task.id, task.inScopeDay, tasks, dispatch);
    moveToNextTask();
  }
  
  const handlePushTask = async (id: number, completed: Date | null) => {
    await handlePushTaskForDay(id, completed, tasks, dispatch);
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
      </View>
      {tasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={tasks} />
        </View>
      }
      <ReviewModal
        visible={showModal}
        task={currentTask}
        onComplete={handleComplete}
        onDelete={handleDeleteTask}
        onToggleScope={handleToggleScope}
        onPushTask={handlePushTask}
        onAddNote={handleAddNote}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleDoneButtonPress}>
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewContainer;
