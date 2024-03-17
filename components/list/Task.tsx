import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { handleDeleteTag } from '../../helpers/taskHelpers';
import RightSwipe from './RightSwipe';
import AddTask from './AddTask';
import ScopeTask from './ScopeTask'
import { TagProps } from '../../src/types/TagTypes';
import { useTagContext } from '../../src/contexts/tags/UseTagContext';

export default function Task({id, name, completed, inScopeDay, depth }: TagProps) {
  const { tags, dispatch: tagDispatch} = useTagContext()
  const swipeableRow = useRef<Swipeable | null>(null);

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
      <Swipeable ref={swipeableRow} renderRightActions={() => <RightSwipe handleDelete={handleDeleteTag} id={id} dispatch={tagDispatch} swipeableRow={swipeableRow} />} overshootLeft={false} rightThreshold={120}>
        <View style={[styles.taskContainer, getDepthStyle()]}>
          <ScopeTask id={id} inScopeDay={inScopeDay ? inScopeDay : null} />
          <Text style={[styles.taskName,  completed ? styles.completedTask : null]}>{name}</Text>
          <AddTask parentId={id} depth={depth ? depth : 0} />
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
