import React, {useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { TaskInterface } from '../../src/types/TaskTypes'
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { StyleSheet } from 'react-native';
import { handleDelete, isRouteNameInScope } from '../../helpers/taskHelpers';
import RenderRightActions from './RightSwipe';
import AddTask from './AddTask';
import AddNote from '../note/AddNote';
import ScopeTask from './ScopeTask'
import CompleteTask from './CompleteTask';

export default function Task({id, name, parentId, completed, inScopeDay, inScopeWeek, depth}: TaskInterface) {
  const route = useRoute();
  const { state, dispatch } = useTaskContext();
  const swipeableRow = useRef<Swipeable | null>(null);

  const [showNoteModal, setShowNoteModal] = useState(false);
  
  function showScopeTaskToggle() {
    // const scopeRoutes = ['ScopeDay', 'ScopeWeek', 'ScopeMonth'];
    // return isRouteNameInScope(route.name, scopeRoutes);
    return true
  }
  
  function showAddTaskIcon() {
    route.name
    const addRoutes = ['DailyReviewScreen', 'WeeklyReviewScreen', 'MonthlyReviewScreen'];
    return !isRouteNameInScope(route.name, addRoutes);
  }  

  function getDepthStyle() {
    switch (depth) {
      case 0: return styles.sectionLevel;
      case 1: return styles.objectiveLevel;
      case 2: return styles.goalLevel;
      case 3: return styles.taskLevel;
      default: return styles.subtaskLevel;
    }
  }

  return (
    <View>
      <Swipeable ref={swipeableRow} renderRightActions={() => <RenderRightActions handleDelete={handleDelete} id={id} tasks={state} dispatch={dispatch} setShowNoteModal={setShowNoteModal} swipeableRow={swipeableRow} />} overshootLeft={false} rightThreshold={120}>
        <View style={[styles.taskContainer, getDepthStyle()]}>
          {showScopeTaskToggle() && <ScopeTask id={id} inScopeDay={inScopeDay} inScopeWeek={inScopeWeek} />}
          <Text style={[styles.taskName, parentId !== null && completed && styles.completedTask]}>{name}</Text>
          <CompleteTask id={id} completed={completed} />
          {showAddTaskIcon() && 
            <AddTask parentId={id} depth={depth} />
          }
          <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />
        </View>
      </Swipeable>
    </View>
  );
};

const styles=StyleSheet.create({
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
});
