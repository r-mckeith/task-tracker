import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskInterface, Action, ActionType } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import NestedList from '../../components/list/NestedList';
import ReviewModal from '../../components/modals/ReviewModal';
import { addNote } from '../../src/api/SupabaseNotes';
import { handleToggleCompleted, handleDelete } from '../../helpers/taskHelpers';

type ReviewDayScreenProps = {
  navigation: StackNavigationProp<DoStackParamList, 'ReviewDay'>;
  route: RouteProp<DoStackParamList, 'ReviewDay'>;
};

export default function ReviewDayScreen({navigation, route}: ReviewDayScreenProps) {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TaskInterface[]>([]);
  const reversedIncompleteTasks = [...incompleteTasks].reverse();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [noteText, setNoteText] = useState('');

  const { state, dispatch } = useTaskContext();

  // Function to handle note addition
  const handleAddNote = async () => {
    const newNote = {
      text: noteText,
      taskId: reversedIncompleteTasks[currentTaskIndex]?.id,
    };

    try {
      await addNote(newNote);
      setNoteText('');
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  useEffect(() => {
    const tasks = state.filter(t => (t.inScopeDay));
    const incomplete = tasks.filter(t => !t.completed);
    setFilteredTasks(tasks);
    setIncompleteTasks(incomplete);
  
    if (incomplete.length === 0) {
      setShowModal(false);
    }
  }, [state]);

  const handleReviewAction = (action: ActionType) => {
    const task = reversedIncompleteTasks[currentTaskIndex];
    switch (action) {
      case 'complete':
        handleToggleCompleted(task.id, !task.completed, state, dispatch);
        break
      case 'delete':
        handleDelete(task.id, dispatch);
        break;
      // ... handle other cases if needed
    }
  
    if (currentTaskIndex < reversedIncompleteTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(false);
    }
  };

  const actions: Action[] = [
    {
      name: "cancel",
      size: 30,
      color: "#F44336",
      actionType: 'delete',
      onPress: () => handleReviewAction('delete')
    },
    {
      name: "check-circle",
      size: 30,
      color: "green",
      actionType: 'complete',
      onPress: () => handleReviewAction('complete')
    },
    // ... more actions
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Review</Text>
      </View>
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} />
        </View>
      }
      <ReviewModal
        visible={showModal}
        actions={actions}
        onAddNote={handleAddNote}
        noteText={noteText}
        setNoteText={setNoteText}
      >
        <Text style={styles.modalText}>{reversedIncompleteTasks[currentTaskIndex]?.name}</Text>
      </ReviewModal>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  addNoteText: {
    color: 'blue',
    fontSize: 16,
  },
});
