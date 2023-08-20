import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskList: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});