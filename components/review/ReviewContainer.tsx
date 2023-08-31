import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { StyleSheet } from "react-native";
import NestedList from '../NestedList';
import ReviewModal from './ReviewModal';
import { addNote } from '../../src/api/SupabaseNotes';
import { handleToggleCompleted, handleDelete, handlePushTaskForDay, handleToggleScopeforDay } from '../../helpers/taskHelpers';

type ReviewContainerProps = {
  tasks: TaskInterface[];
};

export default function ReviewContainer({tasks }: ReviewContainerProps) {
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
      {tasks.length > 0 ? (
        <ScrollView style={styles.taskList}>
          <NestedList taskProps={tasks} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer} />
      )}

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

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskList: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f5f5f5',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});