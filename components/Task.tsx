import React, {useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskInterface } from '../src/types/TaskTypes'
import { TaskContext } from '../src/contexts/TaskContext';
import { handleToggleCompleted, handleDelete } from '../helpers/taskHelpers';
import AddTask from './AddTask';
import AddNote from './AddNote';
import ScopeTask from './ScopeTask'
import PushTask from './PushTask'

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
      parentId !== null && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => handleDelete(id, dispatch)}>
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
        depth >= 4 && styles.subtaskLevel,
      ]}>
      {parentId && (currentTab === "Week" || currentTab === 'Quarter') && 
          <ScopeTask 
            id={id} 
            inScopeDay={inScopeDay}
            inScopeWeek={inScopeWeek}
            currentTab={currentTab}
          />
        }
          <Text onPress={() => handleToggleCompleted(id, !completed, state, dispatch)} style={[styles.taskName, (parentId !== null && completed) && styles.completedTask]}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {currentTab !== 'ReviewDay' && 
              <AddTask parentId={id} depth={depth} currentTab={currentTab}/>
            }
            
            <Menu>
              <MenuTrigger>
                <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={24} color="#767577" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => alert('Edit task')}>
                  <Text style={styles.optionText}>Edit</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert('Duplicate task')}>
                  <Text style={styles.optionText}>Duplicate</Text>
                </MenuOption>
                {/* Add more options as needed */}
              </MenuOptions>
            </Menu>
          </View>
          {currentTab === 'ReviewDay' && !completed &&
            <PushTask 
              id={id} 
              inScopeDay={inScopeDay}
              inScopeWeek={inScopeWeek}
              currentTab={currentTab}
            />
          }
        </View>
      </Swipeable>  
      <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
  rightSwipeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    height: '75%',
  },
  deleteButton: {
    backgroundColor: '#EE4B60',
  },
  addNoteButton: {
    backgroundColor: '#696969',
    fontSize: 16,
    fontWeight: '500',
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
