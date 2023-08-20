import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/noteStyles';
import { useNoteContext } from '../../src/contexts/notes/UseNoteContext'
import { AddNoteProps } from '../../src/types/NoteTypes';
import { NewNote } from '../../src/types/NoteTypes';
import { addNote } from '../../src/api/SupabaseNotes';

const AddNote: React.FC<AddNoteProps> = ({
  showModal,
  taskId,
  onClose,
  setShowModal,
}) => {
  const [noteText, setNoteText] = useState('');

  const { dispatch } = useNoteContext();

  const handleAddNote = async (
  ) => {

    const newNote: NewNote = {
      text: noteText,
      taskId: taskId,
    };
  
    try {
      await addNote(newNote);
  
      dispatch({ type: 'ADD_NOTE', payload: newNote });
      setNoteText('');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const renderModalContent = () => (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>{'Add note'}</Text>
      <TextInput
        style={[styles.textInput, styles.input, { marginBottom: 10 }]}
        placeholder={'New note'}
        value={noteText}
        onChangeText={setNoteText}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAddNote}>
          <MaterialCommunityIcons name="check-circle-outline" size={24} color="#4CAF50" /> 
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconButton} onPress={onClose}>
          <MaterialCommunityIcons name="cancel" size={24} color="#F44336" /> 
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="menu" size={24} color="#767577" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          {renderModalContent()}
        </View>
      </Modal>
    </View>
  );
};

export default AddNote;