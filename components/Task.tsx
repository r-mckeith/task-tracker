import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { TaskInterface } from '../src/types/Types';
import CompleteTask from './CompleteTask';
import ScopeToggle from './ScopeToggle';
import AddTask from './AddTask';

const Task: React.FC<TaskInterface> = ({
  id,
  name,
  parentId,
  completed,
  onPress,
  onAddSubTask,
  depth,
  planningScreen,
  tasks,
  toggleInScopeWeek,
  toggleInScopeDay,
  onDelete,
  inScopeDay,
  inScopeWeek,
}) => {

  const renderRightActions = () => {
    return (
      parentId !== null && (
        <RectButton style={styles.rightSwipeItem} onPress={() => onDelete(id)}>
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
          <CompleteTask id={id} completed={completed} onToggleCompleted={onToggleCompleted}/>
        }
         {parentId && !planningScreen && 
          <ScopeToggle 
          id={id} 
          tasks={tasks} 
          mode={mode}
          toggleInScopeWeek={toggleInScopeWeek}
          inScopeWeek={inScopeWeek} 
          onToggleScope={onToggleScope}
        />
        }
        <Text onPress={onPress} style={[styles.taskName]}>
          {name}
        </Text>
        <AddTask id={id} onAddSubTask={onAddSubTask} depth={depth}/>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
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
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionLevel: {
    backgroundColor: 'rgb(0, 0, 255)',
  },
  objectiveLevel: {
    backgroundColor: 'rgb(70, 70, 255)',
  },
  goalLevel: {
    backgroundColor: 'rgb(100, 100, 255)',
  },
  taskLevel: {
    backgroundColor: 'rgb(135, 135, 255)',
  },
  subtaskLevel: {
    backgroundColor: 'rgb(175, 175, 255)',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'red',
  },
});

export default Task;
