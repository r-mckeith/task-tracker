import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { NoteContext } from '../src/contexts/NoteContext';
import { NoteDataInterface } from '../src/types/NoteTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNote: React.FC<NoteDataInterface> = ({
  taskId,
  onAddNote,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const context = useContext(NoteContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { state, dispatch } = context;
  console.log(state)

  const handleAddNote = () => {
    dispatch({ 
      type: 'ADD_NOTE',
      payload: { 
        id: state.length + 1,
        text: noteText, 
        taskId: taskId,
     
      } ,
    }); 

    setNoteText('');
    setShowModal(false);
  };

  return (
    <View>
     <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
      <MaterialCommunityIcons name="notebook" size={24} color="#000" />
    </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
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

              <TouchableOpacity style={styles.iconButton} onPress={() => setShowModal(false)}>
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