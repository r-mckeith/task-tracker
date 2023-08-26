import React from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { TaskInterface } from '../../src/types/TaskTypes';
import { StyleSheet } from 'react-native';

type RenderRightActionsProps = {
  handleDelete: (id: number, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => Promise<void>;
  id: number;
  tasks: TaskInterface[];
  dispatch: React.Dispatch<any>;
  setShowNoteModal: (show: boolean) => void;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function RenderRightActions({swipeableRow, id, tasks, dispatch, handleDelete, setShowNoteModal}: RenderRightActionsProps) {
  return (
    <View style={styles.rightActionContainer}>
      <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => handleDelete(id, tasks, dispatch)}>
        <MaterialCommunityIcons 
                name="close-circle" 
                size={24} 
                color="red"
              />
      </RectButton>
      <RectButton style={[styles.rightSwipeItem, styles.unscopeButton]} onPress={() => 
        {setShowNoteModal(true); if (swipeableRow.current) {swipeableRow.current.close();}}}>
          <MaterialCommunityIcons 
              name="eye-off" 
              size={24} 
              color="blue"
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

const styles=StyleSheet.create({
  rightActionContainer: {
    flexDirection: 'row',
    height: 60,
    width: 180,
  },
  rightSwipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    height: 60,
    width: 60,
    marginVertical: 5,
    backgroundColor: '#EE4B60',
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
});
