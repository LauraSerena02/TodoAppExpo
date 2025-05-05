import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Task } from '../types/taskTypes'; // Importing the Task type definition
import { formatDateToLocale } from '../utils/dateUtils'; // Utility function to format dates

// Props interface for the TodayTasksModal component
interface TodayTasksModalProps {
  visible: boolean; // Controls whether the modal is visible or not
  tasks: Task[]; // Array of tasks to display
  onClose: () => void; // Function to close the modal
}

// Main component that displays today's tasks in a modal
const TodayTasksModal: React.FC<TodayTasksModalProps> = ({ visible, tasks, onClose }) => {
  // If the modal is not visible, don't render anything
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Modal Title */}
        <Text style={styles.modalTitle}>📅 Tareas para hoy</Text>
        
        {/* If there are no tasks, show a message */}
        {tasks.length === 0 ? (
          <Text style={styles.modalText}>No hay tareas programadas para hoy.</Text>
        ) : (
          // If there are tasks, display them in a scrollable list
          <FlatList
            data={tasks} // Array of tasks to render
            keyExtractor={item => item.id} // Unique key for each task
            renderItem={({ item }) => (
              <View style={styles.modalTaskItem}>
                {/* Task text and category */}
                <Text style={styles.modalTaskText}>
                  {item.text} ({item.category})
                </Text>
                {/* Task completion status */}
                <Text style={styles.modalTaskStatus}>
                  Estado: {item.completed ? '✅ Completada' : '⏳ Pendiente'}
                </Text>
                {/* Task due date */}
                <Text style={styles.modalTaskDate}>
                  Fecha: {formatDateToLocale(new Date(item.dueDate))}
                </Text>
              </View>
            )}
          />
        )}
        
        {/* Button to close the modal */}
        <TouchableOpacity 
          style={styles.modalButton}
          onPress={onClose}
        >
          <Text style={styles.modalButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the modal and its contents
const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute', // Covers the whole screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center', // Center the modal horizontally
    zIndex: 1000, // High z-index to appear on top
  },
  modalContainer: {
    backgroundColor: 'white', // Modal background
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%', // Prevents modal from taking up entire screen
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4a90e2', // Light blue title
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTaskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light gray divider between tasks
  },
  modalTaskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalTaskStatus: {
    fontSize: 14,
    color: '#666', // Gray text
    marginTop: 5,
  },
  modalTaskDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  modalButton: {
    backgroundColor: '#4a90e2', // Blue button
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TodayTasksModal; // Export the component so it can be used in other parts of the app
