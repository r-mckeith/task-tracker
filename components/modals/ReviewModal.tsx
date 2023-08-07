import React from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/modals/reviewModal'
import { Action, ActionType } from '../../src/types/TaskTypes';

interface ReviewModalProps {
  visible: boolean;
  actions: Action[];
  children?: React.ReactNode;
  onAddNote?: () => void;
  noteText?: string;
  setNoteText?: (text: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  actions,
  children,
  noteText,
  onAddNote,
  setNoteText
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {children}
        <View style={styles.iconRow}>
          {actions.map((action, index) => (
            <MaterialCommunityIcons 
              key={index}
              {...action}
              style={styles.icon}
            />
          ))}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={'Add a note...'}
          value={noteText}
          onChangeText={setNoteText}
        />
        <TouchableOpacity onPress={onAddNote}>
          <Text style={styles.addNoteText}>Add Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ReviewModal;
