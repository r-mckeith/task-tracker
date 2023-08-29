import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskInterface } from '../../src/types/TaskTypes';
import { StyleSheet } from 'react-native';
import { Action, ActionType } from '../../src/types/TaskTypes';

interface ReviewModalProps {
  visible: boolean;
  task: TaskInterface | null;
  onComplete: (task: TaskInterface) => void;
  onDelete: (task: TaskInterface) => void;
  onAddNote: (noteText: string, taskId: number) => void;
  onToggleScope: (task: TaskInterface) => void;
  onPushTask: (id: number, completed: Date | null) => void;
}

export default function ReviewModal({visible, task, onComplete, onDelete, onAddNote, onPushTask, onToggleScope}: ReviewModalProps) {
  const [noteText, setNoteText] = useState('');

  const handleReviewAction = (action: ActionType) => {
    if (task) {
      switch (action) {
        case 'complete':
          onComplete(task);
          break;
        case 'delete':
          onDelete(task);
          break;
        case 'scope':
          onToggleScope(task);
          break;
        case 'push':
          onPushTask(task.id, task.completed);
        break;
      }
    }
  };

  const handleAddNotePress = () => {
    if (task) {
      onAddNote(noteText, task.id);
      setNoteText('');
    }
  };

  const actions: Action[] = [
    {
      name: "cancel",
      size: 30,
      color: "grey",
      actionType: 'delete',
      onPress: () => handleReviewAction('delete')
    },
    {
      name: "check-circle-outline",
      size: 30,
      color: "grey",
      actionType: 'complete',
      onPress: () => handleReviewAction('complete')
    },
    {
      name: 'eye-off',
      size: 30,
      color: 'grey',
      actionType: 'scope',
      onPress: () => handleReviewAction('scope')
    },
    {
      name: "arrow-right",
      size: 30,
      color: "grey",
      actionType: 'push',
      onPress: () => handleReviewAction('push')
    }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {task && <Text style={styles.modalText}>{task.name}</Text>}
          <View style={styles.iconRow}>
            {actions.map((action, index) => (
              <TouchableOpacity key={index} onPress={action.onPress}>
                <MaterialCommunityIcons
                  name={action.name}
                  size={action.size}
                  color={action.color}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setNoteText(text)}
            value={noteText}
            placeholder="Add a note..."
          />
          <TouchableOpacity onPress={handleAddNotePress}>
            <Text style={styles.addNoteText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles=StyleSheet.create({
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
    color: 'grey',
    fontSize: 16,
  },
});
