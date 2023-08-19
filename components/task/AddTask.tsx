import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Switch, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DayName } from '../../src/types/TaskTypes';
import styles from '../../styles/tasks/addTask';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { AddTaskProps } from '../../src/types/TaskTypes';
import { handleAddTask } from '../../helpers/taskHelpers';

const AddTask: React.FC<AddTaskProps> = ({
  parentId,
  depth,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [timesPerDay, setTimesPerDay] = useState('');
  const [showDailyCheckboxes, setShowDailyCheckboxes] = useState(false);
  const [selectedDays, setSelectedDays] = useState<{ [key in DayName]: boolean }>({
    Sun: true,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
  });

  const route = useRoute();
  const { dispatch } = useTaskContext();

  const getTaskLevelName = (depth: number) => {
    switch (depth) {
      case 0:
        return 'Section';
      case 1:
        return 'Goal';
      case 2:
        return 'Objective';
      case 3:
        return 'Task';
      default:
        return 'Subtask';
    }
  }

  const onAddTask = async () => {
    const success = await handleAddTask(newTaskName, parentId, depth, isRecurring, selectedDays, timesPerDay, route.name, dispatch);
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.modalText}>{`New ${getTaskLevelName((depth ?? 0) + 1)}`}</Text>
            <View style={styles.switchRow}>
            <Text style={[styles.labelStyle, { marginTop: 6 }]}>Recurring: </Text>
              <View style={{ transform: [{ scale: 0.8 }] }}>
                <Switch 
                  trackColor={{ false: "#767577", true: "#bbb" }}
                  thumbColor={isRecurring ? "#767577" : "#f4f3f4"}
                  onValueChange={(newValue) => {
                    setIsRecurring(newValue);
                    if (!newValue) {
                      setShowDailyCheckboxes(false);
                      setSelectedDays({
                        Sun: false,
                        Mon: false,
                        Tue: false,
                        Wed: false,
                        Thu: false,
                        Fri: false,
                        Sat: false,
                      });
                    }
                  }}
                  value={isRecurring}
                />
              </View>
            </View>
          </View>
            <TextInput
              style={[styles.textInput, styles.input, { marginBottom: 10 }]}
              placeholder={`${getTaskLevelName((depth ?? 0) + 1)} Name`}
              value={newTaskName}
              onChangeText={setNewTaskName}
            />
            {isRecurring && 
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={styles.buttonColumn}>
                {/* <TouchableOpacity style={styles.button} onPress={() => setShowDailyCheckboxes(!showDailyCheckboxes)}> */}
                <TouchableOpacity style={styles.button} onPress={() => {
                    setShowDailyCheckboxes(true);
                    setSelectedDays({
                      Sun: true,
                      Mon: true,
                      Tue: true,
                      Wed: true,
                      Thu: true,
                      Fri: true,
                      Sat: true,
                    });
                  }}>
                  <Text>Daily</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Handle Monthly */}}>
                        <Text>Monthly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Handle Periodic */}}>
                        <Text>Periodic</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonColumn}>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Handle Weekly */}}>
                        <Text>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                    setShowDailyCheckboxes(true);
                    setSelectedDays({
                      Sun: false,
                      Mon: false,
                      Tue: false,
                      Wed: false,
                      Thu: false,
                      Fri: false,
                      Sat: false,
                    });
                  }}>
                      <Text>Specific Days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Handle Yearly */}}>
                        <Text>Yearly</Text>
                    </TouchableOpacity>
                </View>
              </View>
            }
            {showDailyCheckboxes && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
                {Object.keys(selectedDays).map((day, index) => (
                  <TouchableOpacity key={index} style={selectedDays[day as DayName] ? styles.checkedBox : styles.uncheckedBox} onPress={() => {
                    setSelectedDays(prev => ({ ...prev, [day]: !prev[day as DayName] }));
                  }}>
                    <Text>{day}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttonStyle} 
              onPress={onAddTask}
            >
              <Text>{`Add ${getTaskLevelName((depth ?? 0) + 1)}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonStyle} 
              onPress={() => setShowModal(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTask;