import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskInterface } from '../src/types/TaskTypes';
import { TaskContext } from '../src/contexts/TaskContext';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import NestedList from '../components/NestedList';
import { addNote } from '../src/api/SupabaseNotes';
import { handleToggleCompleted, handleDelete } from '../helpers/taskHelpers';

export default function ReviewDayScreen() {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TaskInterface[]>([]);
  console.log("INCOMPLETE TASKS", incompleteTasks)
  const reversedIncompleteTasks = [...incompleteTasks].reverse();
  console.log("REVERSED", reversedIncompleteTasks)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  console.log("CURRENT INDEX", currentTaskIndex)
  const [showModal, setShowModal] = useState(true);
  const [noteText, setNoteText] = useState('');

  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { dispatch } = context;

  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
    const tasks = state.filter(t => (t.recurringOptions?.isRecurring || t.inScopeDay));
    const incomplete = tasks.filter(t => !t.completed); // Assuming that "completed" is a property on the task
    setFilteredTasks(tasks);
    setIncompleteTasks(incomplete);
  
    if (incomplete.length === 0) {
      setShowModal(false);
    }
  }, [state]);

  const handleAction = (action: string) => {
    const task = reversedIncompleteTasks[currentTaskIndex];
    switch (action) {
      case 'complete':
        handleToggleCompleted(task.id, !task.completed, state, dispatch);
        break
      case 'delete':
        handleDelete(task.id, dispatch)
        break;
    }
    
    if (currentTaskIndex < reversedIncompleteTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(false);
    }
  };

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Review</Text>
      </View>
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} currentTab={'ReviewDay'} />
        </View>
      }
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{reversedIncompleteTasks[currentTaskIndex]?.name}</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons 
                name="cancel" 
                size={30} 
                color="#F44336"
                style={styles.icon}
                onPress={() => handleAction('delete')}
              />
              <MaterialCommunityIcons 
                name="check-circle" 
                size={30} 
                color="green"
                style={styles.icon}
                onPress={() => handleAction('complete')}
              />
              <MaterialCommunityIcons 
                name="arrow-top-right" 
                size={30} 
                color="#4CAF50"
                style={styles.icon}
                onPress={() => handleAction('pushOutOfScope')}
              />
              <MaterialCommunityIcons 
                name="arrow-right" 
                size={30} 
                color="orange"
                style={styles.icon}
                onPress={() => handleAction('pushToNext')}
              />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder={'Add a note...'}
              value={noteText}
              onChangeText={setNoteText}
            />
            <TouchableOpacity onPress={handleAddNote}>
              <Text style={styles.addNoteText}>Add Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
