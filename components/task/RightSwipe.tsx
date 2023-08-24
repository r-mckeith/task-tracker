import React from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { TaskInterface } from '../../src/types/TaskTypes';
import styles from '../../styles/tasks/rightSwipe'

type RenderRightActionsProps = {
  handleDelete: (id: number, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => Promise<void>;
  id: number;
  tasks: TaskInterface[];
  dispatch: React.Dispatch<any>;
  setShowNoteModal: (show: boolean) => void;
  swipeableRow: React.RefObject<Swipeable | null>;
};

const RenderRightActions = ({swipeableRow, id, tasks, dispatch, handleDelete, setShowNoteModal}: RenderRightActionsProps) => {
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

export default RenderRightActions;
