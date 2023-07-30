import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NoteContext } from '../src/contexts/NoteContext';
import { NewNote } from '../src/types/NoteTypes';
import { addNote } from '../src/api/SupabaseNotes';


interface AddNoteProps {
  showModal: boolean;
  onClose: () => void;
  taskId: number;
  setShowModal: (show: boolean) => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  showModal,
  taskId,
  onClose,
  setShowModal,
}) => {

  const context = useContext(NoteContext);

  const [noteText, setNoteText] = useState('');

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

  const { state, dispatch } = context;

  return (
    <View>
      {/* <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
        <MaterialCommunityIcons name="notebook" size={24} color="#000" />
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
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
    backgroundColor: '#4CAF50',
    borderRadius: 25, 
    padding: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});

export default AddNote;