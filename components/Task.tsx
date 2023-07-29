import React, {useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  onToggleCompleted,
  onToggleDay,
  onToggleWeek,
  onDelete,
}) => {

  const swipeableRow = useRef<Swipeable | null>(null);

  const [showNoteModal, setShowNoteModal] = useState(false);

  const renderRightActions = () => {
    return (
      parentId !== null && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => onDelete ? onDelete(id) : () => {}}>
            <MaterialCommunityIcons name="delete" size={30} color="white" />
            <Text style={styles.deleteText}>Delete</Text>
          </RectButton>
          
          <RectButton style={[styles.rightSwipeItem, styles.addNoteButton]} onPress={() => 
            {setShowNoteModal(true); if (swipeableRow.current) {swipeableRow.current.close();}}}>
            <MaterialCommunityIcons name="note-outline" size={30} color="white" />
            <Text style={styles.deleteText}>Add Note</Text>
          </RectButton>
          {/* Add more buttons here */}
        </View>
      )
    );
  };

  return (
        <View>
        <Swipeable ref={swipeableRow} renderRightActions={renderRightActions} overshootRight={false}>     
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
        <AddTask id={id} depth={depth}/>
      </View>
    </Swipeable>  
    {/* <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} /> */}
    <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />

    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 0, // Square corners
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  addNoteButton: {
    backgroundColor: 'orange',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  editButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});


export default Task;
