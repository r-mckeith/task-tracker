import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Modal, Switch, TouchableOpacity } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompleteTask from './CompleteTask';

interface TaskProps {
  id: number;
  onAddSubTask: (name: string, parentId: number, recurringOptions: {isRecurring: boolean, selectedDays: string, timesPerDay: string}) => void;
  depth: number;
}

const AddTask: React.FC<TaskProps> = ({
  id,
  onAddSubTask,
  depth,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');

  const getTaskLevelName = (depth: number) => {
    switch (depth) {
      case 0:
        return 'Section';
      case 1:
        return 'Objective';
      case 2:
        return 'Goal';
      case 3:
        return 'Task';
      default:
        return 'Subtask';
    }
  }

  const handleAddSubTask = () => {
    onAddSubTask(newSubTaskName, id, {isRecurring, selectedDays, timesPerDay});
    setNewSubTaskName('');
    setIsRecurring(false);
    setShowModal(false);
  };

  return (
    <View>
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
            <Text style={styles.modalText}>{`New ${getTaskLevelName(depth + 1)}`}</Text>
            <TextInput
              style={[styles.input, { marginBottom: 10 }]} // Add some margin to bottom
              placeholder={`${getTaskLevelName(depth + 1)} Name`}
              value={newSubTaskName}
              onChangeText={setNewSubTaskName}
            />
            <View style={styles.switchRow}>
              <Text>Recurring: </Text>
              <Switch 
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isRecurring ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={setIsRecurring}
                value={isRecurring}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={handleAddSubTask}>
                <MaterialCommunityIcons name="plus" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => setShowModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    margin: 12,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
});
export default AddTask;
