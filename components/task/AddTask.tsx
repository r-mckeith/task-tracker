import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Switch, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useUserId from '../../src/contexts/sessions/UseSessionHook';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/tasks/addTask';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { AddTaskProps } from '../../src/types/TaskTypes';
import { handleAddTask, getTaskLevelName } from '../../helpers/taskHelpers';

const AddTask: React.FC<AddTaskProps> = ({
  parentId,
  depth,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const route = useRoute();
  const { dispatch } = useTaskContext();
  const userId = useUserId();

  const onAddTask = async () => {
    const success = await handleAddTask(newTaskName, userId, parentId, depth, isRecurring, selectedDays, timesPerDay, route.name, dispatch);
    if (success) {
      setNewTaskName('');
      setIsRecurring(false);
      setShowModal(false);
    } else {
        console.error('Failed to add task');
    }
  };

  return (
    <View>
     <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
      <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#767577" />
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
            <Text style={styles.modalText}>{`New ${getTaskLevelName(depth)}`}</Text>
            <TextInput
              style={[styles.textInput, styles.input, { marginBottom: 10 }]}
              placeholder={`${getTaskLevelName(depth)} Name`}
              value={newTaskName}
              onChangeText={setNewTaskName}
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
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onAddTask}
            >
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

export default AddTask;