import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types/taskTypes';  // Importing the Task type to define the structure of a task
import { taskItemStyles } from '../theme/styles';  // Importing the styles for the task item

// Defining the props for the TaskItem component
interface TaskItemProps {
  task: Task;  // The task object that holds the task's details
  onToggle: (id: string) => void;  // Function to toggle the completion status of the task
  onEdit: (id: string) => void;  // Function to edit the task
  onDelete: (id: string) => void;  // Function to delete the task
}

// TaskItem component that represents a task in the list
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  // Checking if the task's due date is today
  const isDueToday = new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    // Container for the task item
    <View style={[
      taskItemStyles.container,  // Basic container style
      task.completed && taskItemStyles.completed,  // If the task is completed, apply the completed style
      isDueToday && taskItemStyles.dueToday  // If the task is due today, apply the dueToday style
    ]}>
      {/* Container for task information */}
      <View style={taskItemStyles.infoContainer}>
        {/* Task text with category, applies completed style if task is completed */}
        <Text style={[taskItemStyles.text, task.completed && taskItemStyles.completedText]}>
          {task.text} 📁 ({task.category})  {/* Displaying task text and category */}
        </Text>
        {/* Due date of the task, displays 'Hoy' if the task is due today */}
        <Text style={[
          taskItemStyles.dueDateText,  // Styling for the due date
          isDueToday && taskItemStyles.dueTodayText  // If due today, apply dueTodayText style
        ]}>
          📅 {new Date(task.dueDate).toLocaleDateString('es-ES')}  {/* Displaying the formatted due date */}
          {isDueToday && ' - ¡Hoy!'}  {/* If the task is due today, append 'Hoy' */}
        </Text>
      </View>
      
      {/* Container for action buttons */}
      <View style={taskItemStyles.buttonContainer}>
        {/* Complete button */}
        <TouchableOpacity
          style={[taskItemStyles.button, taskItemStyles.completeButton]}  // Styling for the button
          onPress={() => onToggle(task.id)}  // Calling onToggle function when pressed
        >
          <Text style={taskItemStyles.text}>{task.completed ? '↩️' : '✅'}</Text>  {/* Showing '↩️' if task is completed, '✅' otherwise */}
        </TouchableOpacity>

        {/* Edit button */}
        <TouchableOpacity
          style={[taskItemStyles.button, taskItemStyles.editButton]}  // Styling for the edit button
          onPress={() => onEdit(task.id)}  // Calling onEdit function when pressed
        >
          <Text style={taskItemStyles.text}>✏️</Text>  {/* Edit icon */}
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          style={[taskItemStyles.button, taskItemStyles.deleteButton]}  // Styling for the delete button
          onPress={() => onDelete(task.id)}  // Calling onDelete function when pressed
        >
          <Text style={taskItemStyles.text}>❌</Text>  {/* Delete icon */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Exporting the TaskItem component to be used in other parts of the application
export default TaskItem;
