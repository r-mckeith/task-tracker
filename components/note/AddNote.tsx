import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { useNoteContext } from '../../src/contexts/notes/UseNoteContext'
import { AddNoteProps } from '../../src/types/NoteTypes';
import { NewNote } from '../../src/types/NoteTypes';
import { addNote } from '../../src/api/SupabaseNotes';

export default function AddNote({showModal, taskId, onClose, setShowModal}: AddNoteProps) {
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  textInput: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    borderRadius: 25, 
    padding: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black'
  },
});