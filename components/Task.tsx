import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Modal, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskProps {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  onPress: () => void;
  onAddSubTask: (name: string, parentId: number, isRecurring?: boolean, frequency?: {
    days: 'every day' | 'weekdays' | 'weekends' | 'custom',
    timesPerDay: number;
  }) => void;
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  recurring?: {
    isRecurring: boolean;
    frequency: {
      days: 'every day' | 'weekdays' | 'weekends' | 'custom';
      timesPerDay: number;
    };
  };
}

const Task: React.FC<TaskProps> = ({
  id,
  name,
  parentId,
  completed,
  onPress,
  onAddSubTask,
  onToggleCompleted,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState<'every day' | 'weekdays' | 'weekends' | 'custom'>('every day');
  const [recurrenceCount, setRecurrenceCount] = useState(1);

  const handleAddSubTask = () => {
    onAddSubTask(newSubTaskName, id, isRecurring, { days: recurrenceInterval, timesPerDay: recurrenceCount });
    setNewSubTaskName('');
    setIsRecurring(false);
    setRecurrenceInterval('every day');
    setRecurrenceCount(1);
    setShowModal(false);
  };

  const handleToggleCompleted = () => {
    onToggleCompleted(id);
  };

  const renderRightActions = () => {
    return (
      parentId !== null && (
        <RectButton style={styles.leftSwipeItem} onPress={() => onDelete(id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </RectButton>
      )
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.taskContainer}>
        {parentId && (
          <MaterialCommunityIcons 
            name={completed ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"} 
            size={24} 
            color={completed ? 'green' : 'black'}
            onPress={handleToggleCompleted}
          />
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
              <Switch value={isRecurring} onValueChange={setIsRecurring} /> 
              {isRecurring && (
                <>
                  <Picker selectedValue={recurrenceInterval} onValueChange={setRecurrenceInterval}>
                    <Picker.Item label="Every day" value="every day" />
                    <Picker.Item label="Weekdays" value="weekdays" />
                    <Picker.Item label="Weekends" value="weekends" />
                    <Picker.Item label="Custom" value="custom" />
                  </Picker>
                  <TextInput
                    style={styles.input}
                    placeholder="Number of times per day"
                    value={recurrenceCount.toString()}
                    onChangeText={text => setRecurrenceCount(Number(text))}
                  />
                </>
              )}
              <Button title="Add SubTask" onPress={handleAddSubTask} />
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </Swipeable>  
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // Light gray background
    padding: 10, // Some padding
    borderRadius: 5, // Rounded corners
    borderWidth: 1, // Thin border
    borderColor: '#ddd', // Light gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
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
  leftSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'red',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default Task;

