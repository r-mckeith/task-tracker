import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { TaskInterface } from '../src/types/TaskTypes'
import CompleteTask from './CompleteTask';
import AddTask from './AddTask';
import AddNote from './AddNote';
import ScopeTask from './ScopeTask'

const Task: React.FC<TaskInterface> = ({
  id,
  name,
  parentId,
  completed,
  inScopeDay,
  inScopeWeek,
  depth,
  planningScreen,
  currentTab,
  onPress,
  onAddSubTask,
  onAddNote,
  onToggleCompleted,
  onToggleDay,
  onToggleWeek,
  onDelete,
}) => {

  const renderRightActions = () => {
    return (
      parentId !== null && (
        <RectButton style={styles.rightSwipeItem} onPress={() => onDelete ? onDelete(id) : () => {}}>
          <Text style={styles.deleteText}>Delete</Text>
        </RectButton>
      )
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={[
          styles.taskContainer, 
          depth === 0 && styles.sectionLevel, 
          depth === 1 && styles.objectiveLevel,
          depth === 2 && styles.goalLevel,
          depth === 3 && styles.taskLevel,
          depth === 4 && styles.subtaskLevel,
        ]}>
        {parentId && planningScreen && 
          <CompleteTask id={id} completed={completed} onToggleCompleted={onToggleCompleted ? onToggleCompleted : () => {}}/>
        }
         {parentId && !planningScreen && 
            <ScopeTask 
              id={id} 
              inScopeDay={inScopeDay}
              inScopeWeek={inScopeWeek}
              currentTab={currentTab}
              onToggleDay={onToggleDay ? onToggleDay : () => {}}
              onToggleWeek={onToggleWeek ? onToggleWeek : () => {}}
            />
         }
        <Text onPress={onPress} style={[styles.taskName]}>
          {name}
        </Text>
        {/* <AddTask id={id} onAddSubTask={onAddSubTask? onAddSubTask : () => {}} depth={depth}/> */}
        <AddNote id={id} text={'text'} taskId={id} onAddNote={onAddNote? onAddNote : () => {}}/>
      </View>
    </Swipeable>  
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10, // Rounded corners
    borderColor: 'lightgray',
    borderWidth: 1,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskName: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionLevel: {
    backgroundColor: '#4A90E2',
  },
  objectiveLevel: {
    backgroundColor: '#50E3C2',
  },
  goalLevel: {
    backgroundColor: '#B8E986',
  },
  taskLevel: {
    backgroundColor: '#F5A623',
  },
  subtaskLevel: {
    backgroundColor: '#D0021B',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'red',
    borderRadius: 10, // Rounded corners
  },
});


export default Task;
