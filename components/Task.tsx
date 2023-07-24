import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Modal } from 'react-native';

interface TaskProps {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  onPress: () => void;
  onAddSubTask: (name: string, parentId: number) => void;
  onToggleCompleted: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  name,
  parentId,
  completed,
  onPress,
  onAddSubTask,
  onToggleCompleted,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState('');

  const handleAddSubTask = () => {
    onAddSubTask(newSubTaskName, id);
    setNewSubTaskName('');
    setShowModal(false);
  };

  const handleToggleCompleted = () => {
    onToggleCompleted(id);
  };

  return (
    <View style={styles.taskContainer}>
      {parentId && (
        <Text onPress={handleToggleCompleted} style={styles.completeIcon}>{completed ? '🟢' : '🔴'}</Text>
      )}
      <Text onPress={onPress} style={styles.taskName}>
        {name}
      </Text>
      <Button
        title="+"
        onPress={() => setShowModal(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New SubTask</Text>
            <TextInput
              style={styles.input}
              placeholder="SubTask Name"
              value={newSubTaskName}
              onChangeText={setNewSubTaskName}
            />
            <Button title="Add SubTask" onPress={handleAddSubTask} />
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  completeIcon: {
    fontSize: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
});

export default Task;
