import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 20,
  },
  counter: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  todayButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  todayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    width: '100%',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4a90e2',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export const taskItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    width: '100%',
  },
  completed: {
    backgroundColor: '#e0f7fa',
  },
  dueToday: {
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  dueDateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  dueTodayText: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  completeButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#e57373',
  },
  editButton: {
    backgroundColor: '#ffb74d',
  }
});

export const taskFormStyles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputRow: {
    marginBottom: 15,
    width: '100%',
  },
  dateButtonContainer: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#4a90e2',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonRow: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export const taskFiltersStyles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  }
});

export const modalStyles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  }
});