import React, {useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskInterface } from '../src/types/TaskTypes'
import { TaskContext } from '../src/contexts/TaskContext';
import { handleDelete } from '../helpers/taskHelpers';
import AddTask from './AddTask';
import AddNote from './AddNote';
import ScopeTask from './ScopeTask'
import CompleteTask from './CompleteTask';

const Task: React.FC<TaskInterface> = ({
  id,
  name,
  parentId,
  completed,
  inScopeDay,
  inScopeWeek,
  depth,
  currentTab,
}) => {
  const route = useRoute();
  const swipeableRow = useRef<Swipeable | null>(null);

  const [showNoteModal, setShowNoteModal] = useState(false);

  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { state, dispatch } = context;

  const renderRightActions = () => {
    return (
      <View style={styles.rightActionContainer}>
        <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => handleDelete(id, dispatch)}>
        <MaterialCommunityIcons 
                name="cancel" 
                size={24} 
                color="red"
              />
        </RectButton>
        <RectButton style={[styles.rightSwipeItem, styles.unscopeButton]} onPress={() => 
          {setShowNoteModal(true); if (swipeableRow.current) {swipeableRow.current.close();}}}>
            <MaterialCommunityIcons 
                name="arrow-top-right" 
                size={24} 
                color="#4CAF50"
              />
        </RectButton>
        <RectButton style={[styles.rightSwipeItem, styles.pushButton]} onPress={() => 
          {setShowNoteModal(true); if (swipeableRow.current) {swipeableRow.current.close();}}}>
                 <MaterialCommunityIcons 
                name="arrow-right" 
                size={24} 
                color="orange"
              />
        </RectButton>
      </View>
    );
  };

  function scopeTask() {
    return parentId && route.name === 'ScopeDay' && !completed ||
    parentId && route.name === 'ScopeWeek' && !completed ||
    parentId && route.name === 'ScopeQuarter' && !completed
  }

  function completeTask() {
    return parentId && route.name === 'DailyScreen' ||
    parentId && route.name === 'ScopeDay' && completed ||
    parentId && route.name === 'ReviewDay' ||
    parentId && route.name === 'WeeklyScreen' ||
    parentId && route.name === 'ScopeWeek' && completed ||
    parentId && route.name === 'ReviewWeek' ||
    parentId && route.name === 'QuarterlyScreen'
  }

  function addTask() {
    return route.name === 'DailyScreen' ||
    route.name === 'WeeklyScreen' ||
    route.name === 'QuarterlyScreen'
  }

  return (
    <View>
      <Swipeable ref={swipeableRow} renderRightActions={renderRightActions} overshootLeft={false} rightThreshold={120}>     
        <View style={[
        styles.taskContainer, 
        depth === 0 && styles.sectionLevel, 
        depth === 1 && styles.objectiveLevel,
        depth === 2 && styles.goalLevel,
        depth === 3 && styles.taskLevel,
        depth >= 4 && styles.subtaskLevel,
      ]}>
        {scopeTask() && 
          <ScopeTask 
            id={id} 
            inScopeDay={inScopeDay}
            inScopeWeek={inScopeWeek}
            currentTab={currentTab}
          />
        }
        {completeTask() && 
          <CompleteTask id={id} completed={completed} />
        }
        <Text style={[styles.taskName, (parentId !== null && completed) && styles.completedTask]}>
          {name}
        </Text>
        {addTask() && 
          <AddTask parentId={id} depth={depth} currentTab={currentTab}/>
        }
        <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />
        </View>
      </Swipeable>  
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
  },
  taskName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
},
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionLevel: {
    paddingLeft: 5,
    borderLeftColor: '#4780E6',
    borderLeftWidth: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  objectiveLevel: {
    paddingLeft: 10,
    borderLeftColor: '#c0c0c0',
    borderLeftWidth: 2,
  },
  goalLevel: {
    paddingLeft: 15,
    borderLeftColor: '#a8a8a8',
    borderLeftWidth: 2,
  },
  taskLevel: {
    paddingLeft: 20,
    borderLeftColor: '#909090',
    borderLeftWidth: 2,
  },
  subtaskLevel: {
    paddingLeft: 25,
    borderLeftColor: '#787878',
    borderLeftWidth: 2,
  },
  rightActionContainer: {
    flexDirection: 'row',
    height: 60,
    width: 180,
  },
  rightSwipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 60,
    width: 60,
    marginVertical: 5,
    backgroundColor: '#EE4B60',
  },
  addNoteButton: {
    backgroundColor: '#a8a8a8',
  },
  deleteButton: {
    backgroundColor: '#c0c0c0',
  },
  unscopeButton: {
    backgroundColor: '#a8a8a8',
  },
  pushButton: {
    backgroundColor: '#909090',
  },
  editButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Task;
