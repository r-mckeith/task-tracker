import React, {useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { TaskInterface } from '../../src/types/TaskTypes'
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import styles from '../../styles/tasks/task'
import { handleDelete, isRouteNameInScope } from '../../helpers/taskHelpers';
import RenderRightActions from './RightSwipe';
import AddTask from './AddTask';
import AddNote from '../note/AddNote';
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
}) => {
  const route = useRoute();
  const { state, dispatch } = useTaskContext();
  const swipeableRow = useRef<Swipeable | null>(null);

  const [showNoteModal, setShowNoteModal] = useState(false);
  
  function showScopeTaskToggle() {
    if (!parentId) return false;
    const scopeRoutes = ['ScopeDay', 'ScopeWeek', 'ScopeMonth'];
    return isRouteNameInScope(route.name, scopeRoutes);
  }
  
  function showCompleteTaskToggle() {
    if (!parentId) return false;
    return true
    // const completeRoutes = completed ? ['ScopeDay', 'ScopeWeek'] : [];
    // const otherRoutes = ['DailyScreen', 'DailyReviewScreen', 'WeeklyScreen', 'WeeklyReviewScreen', 'MonthlyScreen'];
    // return isRouteNameInScope(route.name, [...completeRoutes, ...otherRoutes]);
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
          {showCompleteTaskToggle() &&
            <CompleteTask id={id} completed={completed} />
          }
          {showAddTaskIcon() && 
            <AddTask parentId={id} depth={depth} />
          }
          <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />
        </View>
      </Swipeable>
    </View>
  );
};

export default Task;
