import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, Switch, TouchableOpacity } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskDataInterface } from '../src/types/TaskTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddTask: React.FC<TaskDataInterface> = ({
  id,
  depth,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');

  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { dispatch } = context;

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
    dispatch({ 
      type: 'ADD_TASK', 
      payload: { 
        name: newSubTaskName, 
        parentId: id, 
        recurringOptions: {isRecurring, selectedDays, timesPerDay}
      } ,
      inScopeDay: false,
      inScopeWeek: false,
    }); 
    setNewSubTaskName('');
    setIsRecurring(false);
    setShowModal(false);
  };

  return (
    <View>
     <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
      <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#000" />
    </TouchableOpacity>
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
              style={[styles.textInput, styles.input, { marginBottom: 10 }]}
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
                <MaterialCommunityIcons name="check-circle-outline" size={24} color="#4CAF50" /> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={() => setShowModal(false)}>
                <MaterialCommunityIcons name="cancel" size={24} color="#F44336" /> 
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
  input: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  textInput: {
    width: '100%',
  },
  
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25, 
    padding: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});


export default AddTask;