import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types/taskTypes';
import { taskFormStyles, appStyles } from '../theme/styles';
import { getLocalDateString } from '../utils/dateUtils';

// Defining the properties (props) that the TaskForm component will receive
interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'completed'>) => void; // Function that is called when the form is submitted
  initialText?: string; // Initial text of the task
  initialCategory?: string; // Initial category of the task
  initialDueDate?: Date; // Initial due date of the task
  isEditing: boolean; // Flag indicating whether the form is in editing mode
  onCancel?: () => void; // Function to cancel the edit (if available)
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialText = '',
  initialCategory = '',
  initialDueDate = new Date(),
  isEditing,
  onCancel,
}) => {
  // Local state to handle the form fields
  const [task, setTask] = useState(initialText); // Stores the task text
  const [category, setCategory] = useState(initialCategory); // Stores the task category
  const [dueDate, setDueDate] = useState(initialDueDate); // Stores the due date of the task
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide the date picker

  // Handles form submission
  const handleSubmit = () => {
    // Checks if task text and category are not empty
    if (task.trim() && category.trim()) {
      // Calls the `onSubmit` function to send task data
      onSubmit({
        text: task,
        category,
        dueDate: new Date(dueDate.setHours(12, 0, 0, 0)), // Adjusts the time to noon before sending
      });
    }
  };

  // Renders the date picker (differentiates between web and mobile platforms)
  const renderDatePicker = () => {
    // If we are on the web, use an <input> with type "date"
    if (Platform.OS === 'web') {
      return (
        <View style={taskFormStyles.dateButtonContainer}>
          <input
            type="date" // Date picker for the web
            value={getLocalDateString(dueDate)} // Converts the date to the local format for the input
            onChange={(e) => {
              const selectedDate = new Date(e.target.value); // Creates a new date from the selected value
              selectedDate.setHours(12, 0, 0, 0); // Adjusts the time to noon
              setDueDate(selectedDate); // Updates the state with the selected date
            }}
            min={getLocalDateString(new Date())} // Ensures that the minimum selectable date is today
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #4a90e2',
              width: '50%',
              maxWidth: 250,
              backgroundColor: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          />
        </View>
      );
    } else {
      // If we are on a mobile device, show a button and a DateTimePicker
      return (
        <View style={taskFormStyles.dateButtonContainer}>
          <TouchableOpacity 
            style={[taskFormStyles.dateButton, { width: '50%', maxWidth: 250 }]}
            onPress={() => setShowDatePicker(true)} // When pressed, show the date picker
          >
            <Text style={taskFormStyles.dateButtonText}>
              Fecha: {dueDate.toLocaleDateString('es-ES')} {/* Displays the date in local format */}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate} // Passes the selected date as the initial value
              mode="date" // Date mode to select only the date
              display="default" // Uses the system's default interface
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios'); // Hides the picker on iOS after selecting
                if (selectedDate) {
                  const adjustedDate = new Date(selectedDate); // Creates a new date from the selected value
                  adjustedDate.setHours(12, 0, 0, 0); // Adjusts the time to noon
                  setDueDate(adjustedDate); // Updates the state with the adjusted date
                }
              }}
              minimumDate={new Date()} // The minimum selectable date is today
            />
          )}
        </View>
      );
    }
  };

  // Returns the form with its fields and action buttons
  return (
    <View style={taskFormStyles.formContainer}>
      <View style={taskFormStyles.inputRow}>
        <TextInput
          style={appStyles.input} // Style for the text input field
          placeholder="Escribe una tarea" // Placeholder text for the input
          value={task} // The current value of the task text
          onChangeText={setTask} // Updates the task state when the text changes
        />
      </View>

      <View style={taskFormStyles.inputRow}>
        <Picker
          selectedValue={category} // The selected category
          onValueChange={(itemValue) => setCategory(itemValue)} // Updates the category when an option is selected
          style={appStyles.picker}
        >
          {/* Picker items (category selector) */}
          <Picker.Item label="Selecciona una categoría..." value="" enabled={false} />
          <Picker.Item label="🏠 Hogar" value="Hogar" />
          <Picker.Item label="📚 Estudio" value="Estudio" />
          <Picker.Item label="💼 Trabajo" value="Trabajo" />
          <Picker.Item label="🛒 Compras" value="Compras" />
          <Picker.Item label="⚽ Ocio" value="Ocio" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>

      <View style={taskFormStyles.inputRow}>
        {renderDatePicker()} {/* Renders the date picker based on the platform */}
      </View>

      <View style={taskFormStyles.buttonRow}>
        {/* If we are in editing mode, show buttons to cancel or save changes */}
        {isEditing && onCancel ? (
          <>
            <TouchableOpacity 
              style={[appStyles.button, { backgroundColor: '#e57373' }]} 
              onPress={onCancel} // Cancels the edit and returns to the initial state
            >
              <Text style={appStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={appStyles.button} 
              onPress={handleSubmit} // Saves the changes made to the task
            >
              <Text style={appStyles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </>
        ) : (
          // If not editing, only show the button to add a new task
          <TouchableOpacity 
            style={appStyles.button} 
            onPress={handleSubmit} // Sends the new task data
          >
            <Text style={appStyles.buttonText}>Agregar tarea</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TaskForm;
