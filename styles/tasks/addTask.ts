import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    fontSize: 20,
    color: '#757575'
  },
  buttonStyle: {
    padding: 10,
    width: 100,
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#bbb', 
    borderRadius: 5,
    margin: 5,
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
  labelStyle: {
    color: '#bbb',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  buttonColumn: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
},
button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 5,
    textAlign: 'center',
},
checkedBox: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#000',
  backgroundColor: '#bbb',
  borderRadius: 4,
  margin: 3,
},
uncheckedBox: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 4,
  margin: 3,
},


});